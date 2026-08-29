# -*- coding: utf-8 -*-
"""
Threads API 발행 스크립트 (TesterLab 마케팅).

텍스트(+이미지)를 Threads에 게시한다.
Threads API는 예약 게시를 지원하지 않으므로, GitHub Actions cron으로
매일 1개씩 실행되어 스케줄 JSON의 해당 날짜 슬롯을 발행한다.

사용법:
  # 1) 특정 JSON 슬롯 발행 (오늘 날짜 슬롯 자동 선택)
  python threads_publish.py output/marketing_posts_{slug}.json

  # 2) 특정 날짜/일차 지정
  python threads_publish.py output/marketing_posts_{slug}.json --date 2026-08-13
  python threads_publish.py output/marketing_posts_{slug}.json --day 3

  # 3) 오늘 슬롯이 이미 발행됐으면 건너뜀 (재실행 안전)

API 참고:
  - 이미지 게시: POST /{user-id}/threads {media_type=IMAGE, image_url=...} → creation_id
    → POST /{user-id}/threads_publish {creation_id} → 게시
  - 텍스트 게시: POST /{user-id}/threads {media_type=TEXT, text=...} → creation_id
    → POST /{user-id}/threads_publish {creation_id} → 게시
  - 이미지는 공개 URL이 필요 (testerlab.org 호스팅 이미지 사용)
"""
import argparse
import json
import os
import sys
import time
from datetime import date, datetime, timedelta
from pathlib import Path

import requests
from dotenv import load_dotenv

# Windows 콘솔 UTF-8 출력 보정 (이모지 포함 카피 출력 시)
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

HERE = Path(__file__).parent
ENV_PATH = HERE.parent / ".env"
API_BASE = "https://graph.threads.net/v1.0"


def load_env():
    load_dotenv(ENV_PATH)
    token = os.getenv("THREADS_ACCESS_TOKEN")
    uid = os.getenv("THREADS_USER_ID")
    if not (token and uid):
        raise SystemExit("THREADS_ACCESS_TOKEN / THREADS_USER_ID 가 .env에 없습니다.")
    return token, uid


def create_container(token, uid, payload):
    url = f"{API_BASE}/{uid}/threads"
    params = {"access_token": token, **payload}
    r = requests.post(url, params=params, timeout=30)
    if r.status_code != 200:
        raise RuntimeError(f"컨테이너 생성 실패: {r.status_code} - {r.text[:300]}")
    return r.json()["id"]


def publish_container(token, uid, creation_id):
    url = f"{API_BASE}/{uid}/threads_publish"
    params = {"access_token": token, "creation_id": creation_id}
    r = requests.post(url, params=params, timeout=30)
    if r.status_code != 200:
        raise RuntimeError(f"게시 실패: {r.status_code} - {r.text[:300]}")
    return r.json()


def post_text(token, uid, text):
    cid = create_container(token, uid, {"media_type": "TEXT", "text": text})
    time.sleep(5)
    return publish_container(token, uid, cid)


def post_image(token, uid, text, image_url):
    payload = {"media_type": "IMAGE", "image_url": image_url}
    if text:
        payload["text"] = text
    cid = create_container(token, uid, payload)
    # 이미지 업로드 처리 대기 (권장)
    time.sleep(3)
    return publish_container(token, uid, cid)


def post_reply(token, uid, text, reply_to_id):
    """본문 게시물에 답글(댓글)을 단다. Threads API: reply_to_id에 원본 미디어 ID."""
    payload = {"media_type": "TEXT", "text": text, "reply_to_id": reply_to_id}
    cid = create_container(token, uid, payload)
    return publish_container(token, uid, cid)


def media_exists(token, media_id):
    """미디어(게시물)가 API에서 조회되는지 확인. 발직 직후에는 인덱싱 지연으로 조회 안 될 수 있음."""
    r = requests.get(f"{API_BASE}/{media_id}", params={"access_token": token, "fields": "id"}, timeout=30)
    return r.status_code == 200


def post_reply_with_retry(token, uid, text, reply_to_id, attempts=3, delay=15):
    """본문 미디어 인덱싱 대기 + 답글 발행 재시도.

    발행 직후에는 미디어 전파 지연으로 reply 시도가 'Media Not Found'(코드 24)로 실패할 수 있어,
    미디어가 조회될 때까지 폴링하고 그래도 실패하면 답글 발행을 재시도한다.
    """
    for i in range(attempts):
        if media_exists(token, reply_to_id):
            break
        print(f"  ... 본문 미디어 인덱싱 대기 중 ({i + 1}/{attempts})")
        time.sleep(delay)

    last_err = None
    for i in range(attempts):
        try:
            return post_reply(token, uid, text, reply_to_id)
        except Exception as e:
            last_err = e
            print(f"  ... 댓글 발행 재시도 ({i + 1}/{attempts}): {e}")
            time.sleep(delay)
    raise last_err


def main():
    parser = argparse.ArgumentParser(description="Threads 발행")
    parser.add_argument("schedule", help="마케팅 스케줄 JSON 경로")
    parser.add_argument("--date", default=None, help="발행할 날짜 YYYY-MM-DD (기본: 오늘)")
    parser.add_argument("--day", type=int, default=None, help="발행할 day 번호 (1~10)")
    parser.add_argument("--dry-run", action="store_true", help="실제 발행 없이 카피만 출력")
    args = parser.parse_args()

    token, uid = load_env()

    sched_path = Path(args.schedule)
    if not sched_path.exists():
        raise SystemExit(f"스케줄 없음: {sched_path}")
    with open(sched_path, "r", encoding="utf-8") as f:
        sched = json.load(f)

    today = args.date or date.today().isoformat()
    slot = None
    for s in sched["slots"]:
        if args.day and s["day"] == args.day:
            slot = s
            break
        if s["date"] == today:
            slot = s
            break
    if not slot:
        print(f"오늘({today}) 발행 슬롯이 없습니다. 건너뜁니다.")
        sys.exit(0)

    # 2단계 발행 로직:
    # 1차) PUBLISH_HOUR ±1시간: 해당 크론의 시간대에 맞는 슬롯만 발행 (정상 동작)
    # 2차) 4시간 이상 지연된 미발행 슬롯: 어떤 크론에서든 발행 (백업/캐치업)
    # → 시간 분리 발행이 보장되면서, 크론 지연 시에도 누락 없음
    now_kst = datetime.utcnow() + timedelta(hours=9)
    publish_hour_env = os.getenv("PUBLISH_HOUR")

    if publish_hour_env:
        pub_hour = int(publish_hour_env)
        slot_pub_hour = int(str(slot.get("publish_time", "0:00")).split(":")[0])
        diff = abs(slot_pub_hour - pub_hour)
        if diff > 12:
            diff = 24 - diff

        if diff <= 1:
            # 1차: 정확한 시간대 매칭 (해당 캠페인만 발행)
            pass
        else:
            # 2차: 캐치업 — 오늘 슬롯인데 4시간 이상 지났으면 발행 (누락 방지)
            slot_date = datetime.strptime(slot["date"], "%Y-%m-%d").date()
            today_kst = now_kst.date()
            if slot_date != today_kst:
                print(f"[{slot['date']}] 캐치업 대상 아님 (오늘 아님). 건너뜁니다.")
                sys.exit(0)
            # 슬롯 발행 시각으로부터 경과 시간 계산
            slot_dt = datetime.strptime(f"{slot['date']} {slot_pub_hour:02d}:00", "%Y-%m-%d %H:%M")
            slot_dt_kst = slot_dt  # 이미 KST 기준
            elapsed = (now_kst - slot_dt_kst).total_seconds() / 3600
            if elapsed < 4:
                print(f"[{slot['date']}] 캐치업 대기 중 (경과 {elapsed:.1f}h, 4h 미만). 건너뜁니다.")
                sys.exit(0)
            print(f"  ⏰ 캐치업 발행 (경과 {elapsed:.1f}h)")
    else:
        # PUBLISH_HOUR 미설정 (수동 실행): 날짜 기반
        today_kst = now_kst.date()
        slot_date = datetime.strptime(slot["date"], "%Y-%m-%d").date()
        if slot_date < today_kst - timedelta(days=1):
            print(f"[{slot['date']}] 슬롯 날짜가 2일 이상 지났습니다. 건너뜁니다.")
            sys.exit(0)

    if slot["status"] == "posted":
        print(f"[{slot['date']}] 이미 발행됨 (day {slot['day']}). 건너뜁니다.")
        sys.exit(0)

    if not slot.get("content"):
        print(f"[{slot['date']}] content(카피)가 아직 없습니다. 마케팅 워크플로우에서 카피를 채우세요.")
        sys.exit(1)

    # 사용자 검증 필수 루틴: 실제 발행 전에 반드시 확인
    if not slot.get("user_approved"):
        print("=" * 60)
        print("⚠️  사용자 검증 필요: 이 슬롯은 아직 사용자 승인을 받지 않았습니다.")
        print("  SKILL.md 마케팅 워크플로우에 따라 아래 카피/이미지/발행시간을")
        print("  사용자에게 보여주고 승인을 받은 뒤 재실행하세요.")
        print("  (승인 시 JSON의 slot.user_approved 를 true로 설정)")
        print("=" * 60)
        sys.exit(2)

    # 발행 시간 확인: 슬롯에 설정된 시간(KST) 정보를 안내
    pub_time = slot.get("publish_time")
    if pub_time:
        print(f"  ⏰ 발행 시각: 매일 KST {pub_time} (GitHub Actions cron 기준)")

    text = slot["content"]
    image = slot.get("image")
    comment = slot.get("comment")
    print(f"▶ 발행 슬롯: day {slot['day']} / {slot['date']}")
    print("  ----- 발행될 카피 -----")
    print(text)
    print("  -----------------------")
    if image:
        print(f"  이미지: {image}")
    if comment:
        print(f"  댓글(답글): {comment}")

    if args.dry_run:
        print("  (dry-run: 발행 안 함)")
        sys.exit(0)

    if image:
        # 로컬 파일이면 공개 URL로 변환 필요 - 스케줄 JSON에는 공개 URL 또는 로컬 경로
        image_url = image
        if image.startswith("site/") or image.startswith(".\\") or "\\" in image or image.startswith("."):
            raise SystemExit(
                "로컬 이미지 경로는 발행 불가. 공개 URL로 지정하세요.\n"
                "예: https://testerlab.org/images/title_love-type.webp"
            )
        result = post_image(token, uid, text, image_url)
    else:
        result = post_text(token, uid, text)

    slot["status"] = "posted"
    slot["posted_at"] = datetime.now().isoformat()
    slot["thread_id"] = result.get("id")
    print(f"✅ 발행 완료! Threads 게시 ID: {result.get('id')}")

    # 본문 발행 후 댓글(답글)로 링크 발행 (SKILL.md 규칙: 링크는 본문이 아닌 댓글로)
    # 발행 직후 전파 지연으로 실패할 수 있어 인덱싱 대기 + 재시도 로직 사용
    if comment:
        try:
            reply = post_reply_with_retry(token, uid, comment, result.get("id"))
            slot["comment_id"] = reply.get("id")
            print(f"✅ 댓글 발행 완료! 댓글 ID: {reply.get('id')}")
        except Exception as e:
            print(f"⚠️ 댓글 발행 실패 (본문은 발행됨): {e}")

    with open(sched_path, "w", encoding="utf-8") as f:
        json.dump(sched, f, ensure_ascii=False, indent=2)
    # 확인: 파일이 실제로 기록되었는지 검증
    with open(sched_path, "r", encoding="utf-8") as f:
        verify = json.load(f)
    verify_slot = next((s for s in verify["slots"] if s["date"] == slot["date"]), None)
    if verify_slot and verify_slot["status"] == "posted":
        print(f"✅ 스케줄 JSON 기록 확인 완료")
    else:
        print(f"⚠️ 스케줄 JSON 기록 검증 실패 — 수동 확인 필요")


if __name__ == "__main__":
    main()
