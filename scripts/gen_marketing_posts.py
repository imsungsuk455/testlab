# -*- coding: utf-8 -*-
"""
TesterLab 마케팅 콘텐츠 생성기.

새 테스트가 사이트에 추가되면, 그 테스트를 바탕으로 Threads 발행용
마케팅 콘텐츠 10개를 생성한다 (10일치, 하루 1개).

각 콘텐츠 = 텍스트(후킹 카피) + 이미지(테스트 타이틀/캐릭터 이미지 재사용).

생성 결과:
  output/marketing_posts_{slug}.json  - 발행 대기열 (10일 스케줄)
  output/marketing_{slug}/images/     - 콘텐츠별 이미지 (필요시)

사용법:
  python gen_marketing_posts.py <slug> "<테스트명>" "<한 줄 소개>" --url https://testerlab.org/event/{slug}/
      [--image site/images/title_{slug}.webp]
      [--start 2026-08-13]

설계:
  - 마케팅 글 10개는 에이전트(LLM)가 작성한다. 이 스크립트는:
      1) 메타데이터(테스트 정보, 이미지, 시작일)를 받아 스케줄 골격 생성
      2) 각 슬롯에 day/date 상태를 채운다
      3) 실제 카피는 SKILL.md의 마케팅 워크플로우에 따라 에이전트가
         content 필드에 채운 뒤 scripts/threads_publish.py 로 발행한다.
"""
import argparse
import json
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

# Windows 콘솔 UTF-8 출력 보정 (이모지 포함 출력 시)
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

HERE = Path(__file__).parent
OUTPUT_DIR = HERE.parent / "output"
# ⚠️ 진실 공급원(single source of truth)은 site/output (GitHub Actions가 읽는 배포본).
# 스케줄은 양쪽에 동일하게 기록한다. output/에만 쓰면 발행이 안 된다 (실측 2026-09-05).
SITE_OUTPUT_DIR = HERE.parent / "site" / "output"


def main():
    parser = argparse.ArgumentParser(description="TesterLab 마케팅 콘텐츠 생성기")
    parser.add_argument("slug", help="테스트 슬러그 (예: love-type)")
    parser.add_argument("test_name", help="테스트명")
    parser.add_argument("tagline", help="한 줄 소개 (테스트 카드 설명)")
    parser.add_argument("--url", required=True, help="테스트 페이지 URL")
    parser.add_argument("--image", default=None, help="썸네일 공개 URL (기본: https://testerlab.org/images/title_{slug}.webp 자동 설정)")
    parser.add_argument("--start", default=None, help="발행 시작일 YYYY-MM-DD (기본: 오늘)")
    parser.add_argument("--days", type=int, default=10, help="발행 일수 (기본 10)")
    parser.add_argument("--time", default=None, help="매일 발행 시각 KST (예: 18:00). 사용자에게 확인 후 설정")
    parser.add_argument("--comment", default=None,
                        help="본문 발행 후 댓글(답글)로 달 링크. SKILL.md 규칙상 본문에는 URL을 넣지 않고 댓글로 유도")
    parser.add_argument("--force", action="store_true",
                        help="기존 스케줄이 있어도 덮어씀 (기본: 기존 파일이 있으면 병합/보호)")
    args = parser.parse_args()

    start = datetime.strptime(args.start, "%Y-%m-%d").date() if args.start else datetime.now().date()
    publish_time = args.time

    # 발행 시 썸네일 이미지 공개 URL (필수 포함 규칙): 기본값은 title_{slug}.webp 공개 URL
    image_url = args.image or f"https://testerlab.org/images/title_{args.slug}.webp"

    slots = []
    for i in range(args.days):
        date = start + timedelta(days=i)
        slots.append({
            "day": i + 1,
            "date": date.isoformat(),
            "test_slug": args.slug,
            "test_name": args.test_name,
            "tagline": args.tagline,
            "url": args.url,
            "image": image_url,
            "status": "pending",       # pending | posted | failed
            "posted_at": None,
            "publish_time": publish_time,  # 매일 발행 시각 KST (사용자 설정)
            "content": None,           # 에이전트가 채움 (마케팅 카피, 댓글 유도형)
            "comment": args.comment,   # 본문 발행 후 댓글로 달 링크
            "comment_id": None,        # 댓글 발행 후 Threads 댓글 ID
            "comment_retry_needed": False,  # 댓글 실패 시 다음 cron에서 재시도
            "thread_id": None,         # 발행 후 Threads 게시 ID
        })

    payload = {"slug": args.slug, "test_name": args.test_name,
               "generated_at": datetime.now().isoformat(),
               "publish_time": publish_time,  # 충돌 감지용 최상위 시간 (필수)
               "slots": slots}

    # ⚠️ 덮어쓰기 보호 (실측 2026-09-05: 새 세션에서 재생성하면 posted 상태가 날아가 중복 발행됨)
    # 기존 파일이 있으면 날짜별 상태를 보존하고 병합한다. --force일 때만 완전 교체.
    for target_dir in (OUTPUT_DIR, SITE_OUTPUT_DIR):
        target_dir.mkdir(parents=True, exist_ok=True)
    out_path = OUTPUT_DIR / f"marketing_posts_{args.slug}.json"
    site_path = SITE_OUTPUT_DIR / f"marketing_posts_{args.slug}.json"
    existing = None
    for cand in (site_path, out_path):
        if cand.exists():
            with open(cand, "r", encoding="utf-8") as f:
                existing = json.load(f)
            break
    if existing and not args.force:
        by_date = {s["date"]: s for s in existing.get("slots", [])}
        kept_posted = kept_approved = 0
        for s in slots:
            old = by_date.get(s["date"])
            if old:
                if old.get("status") == "posted":
                    s["status"] = "posted"
                    s["posted_at"] = old.get("posted_at")
                    s["thread_id"] = old.get("thread_id")
                    s["comment_id"] = old.get("comment_id")
                    s["comment_retry_needed"] = old.get("comment_retry_needed", False)
                    s["content"] = old.get("content") or s["content"]
                    kept_posted += 1
                if old.get("user_approved"):
                    s["user_approved"] = True
                    if old.get("content") and not s.get("content"):
                        s["content"] = old["content"]
                    kept_approved += 1
                else:
                    s["user_approved"] = False
        # user_approved 키 보장 (threads_publish가 차단 기준으로 사용)
        for s in slots:
            s.setdefault("user_approved", False)
        print(f"♻️ 기존 스케줄 병합: posted {kept_posted}개 보존, 승인 {kept_approved}개 유지 "
              f"(완전 교체는 --force)")
    else:
        for s in slots:
            s.setdefault("user_approved", False)

    for p in (out_path, site_path):
        with open(p, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"✅ 마케팅 콘텐츠 스케줄 생성: {out_path}")
    print(f"✅ 배포본 동시 기록: {site_path} (GitHub Actions가 읽는 파일)")
    print(f"   기간: {start} ~ {start + timedelta(days=args.days - 1)} ({args.days}일, 매일 1개)")
    print(f"   썸네일 이미지(공개 URL): {image_url}")
    print("\n📝 다음 단계: SKILL.md 마케팅 워크플로우에 따라")
    print("   각 슬롯의 content(카피)를 채우고 threads_publish.py로 발행합니다.")


if __name__ == "__main__":
    main()
