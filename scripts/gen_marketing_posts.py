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

HERE = Path(__file__).parent
OUTPUT_DIR = HERE.parent / "output"


def main():
    parser = argparse.ArgumentParser(description="TesterLab 마케팅 콘텐츠 생성기")
    parser.add_argument("slug", help="테스트 슬러그 (예: love-type)")
    parser.add_argument("test_name", help="테스트명")
    parser.add_argument("tagline", help="한 줄 소개 (테스트 카드 설명)")
    parser.add_argument("--url", required=True, help="테스트 페이지 URL")
    parser.add_argument("--image", default=None, help="메인 이미지 경로 (site/images/title_*.webp)")
    parser.add_argument("--start", default=None, help="발행 시작일 YYYY-MM-DD (기본: 오늘)")
    parser.add_argument("--days", type=int, default=10, help="발행 일수 (기본 10)")
    parser.add_argument("--time", default=None, help="매일 발행 시각 KST (예: 18:00). 사용자에게 확인 후 설정")
    args = parser.parse_args()

    start = datetime.strptime(args.start, "%Y-%m-%d").date() if args.start else datetime.now().date()
    publish_time = args.time

    image_rel = None
    if args.image:
        p = Path(args.image)
        if p.exists():
            image_rel = str(p).replace("\\", "/")
        else:
            print(f"⚠️  이미지 없음: {args.image}", file=sys.stderr)

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
            "image": image_rel,
            "status": "pending",       # pending | posted | failed
            "posted_at": None,
            "publish_time": publish_time,  # 매일 발행 시각 KST (사용자 설정)
            "content": None,           # 에이전트가 채움 (마케팅 카피)
            "thread_id": None,         # 발행 후 Threads 게시 ID
        })

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUTPUT_DIR / f"marketing_posts_{args.slug}.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({"slug": args.slug, "test_name": args.test_name, "generated_at": datetime.now().isoformat(), "slots": slots}, f, ensure_ascii=False, indent=2)

    print(f"✅ 마케팅 콘텐츠 스케줄 생성: {out_path}")
    print(f"   기간: {start} ~ {start + timedelta(days=args.days - 1)} ({args.days}일, 매일 1개)")
    print("\n📝 다음 단계: SKILL.md 마케팅 워크플로우에 따라")
    print("   각 슬롯의 content(카피)를 채우고 threads_publish.py로 발행합니다.")


if __name__ == "__main__":
    main()
