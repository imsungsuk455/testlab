# -*- coding: utf-8 -*-
"""
기존 마케팅 캠페인의 발행 시간과 충돌을 감지하고 사용 가능 시간대를 제안한다.

사용법:
  python scripts/check_time_conflicts.py              # 현재 상태 출력
  python scripts/check_time_conflicts.py --suggest 15  # 15시가 겹치는지 확인 + 대안 제안
"""
import argparse
import json
import os
import sys
from pathlib import Path

if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

OUTPUT_DIR = Path(__file__).parent.parent / "output"
AVAILABLE_SLOTS = [6, 9, 12, 15, 18, 21]  # 3시간 간격


def get_active_campaigns():
    """활성(발행 중) 캠페인의 publish_time을 수집한다."""
    active = []
    for p in OUTPUT_DIR.glob("marketing_posts_*.json"):
        if p.name.startswith("marketing_posts_love-type"):
            continue  # 레거시 제외
        with open(p, encoding="utf-8") as f:
            d = json.load(f)
        slug = d.get("slug", p.stem.replace("marketing_posts_", ""))
        pub_time = d.get("publish_time")
        if not pub_time:
            continue
        # 활성 여부: 아직 미발행 슬롯이 있는지 확인
        pending = sum(1 for s in d.get("slots", []) if s.get("status") != "posted")
        total = len(d.get("slots", []))
        if pending > 0:
            hour = int(pub_time.split(":")[0])
            active.append({
                "slug": slug,
                "name": d.get("test_name", slug),
                "hour": hour,
                "time": pub_time,
                "pending": pending,
                "total": total,
            })
    return active


def find_conflicts(target_hour, active):
    """대상 시간과 겹치는 기존 캠페인을 찾는다 (±2시간)."""
    conflicts = []
    for c in active:
        diff = abs(c["hour"] - target_hour)
        if diff > 12:
            diff = 24 - diff
        if diff <= 2:
            conflicts.append(c)
    return conflicts


def suggest_slot(active):
    """사용 가능한 시간대를 찾는다 (기존 캠페인과 ±2시간 안 겹치는 곳)."""
    used = set()
    for c in active:
        for offset in range(-2, 3):
            h = (c["hour"] + offset) % 24
            used.add(h)
    available = [h for h in AVAILABLE_SLOTS if h not in used]
    return available


def main():
    parser = argparse.ArgumentParser(description="마케팅 캠페인 시간 충돌 감지")
    parser.add_argument("--suggest", type=int, default=None,
                        help="제안할 시간 (KST 시). 예: --suggest 15")
    args = parser.parse_args()

    active = get_active_campaigns()

    if not active:
        print("현재 활성 캠페인 없음 — 모든 시간대 사용 가능")
        if args.suggest:
            print(f"  → {args.suggest:02d}:00 사용 가능 ✓")
        return

    print("=== 활성 캠페인 ===")
    for c in active:
        print(f"  {c['name']}: 매일 KST {c['time']} (잔여 {c['pending']}일)")
    print()

    if args.suggest:
        target = args.suggest
        conflicts = find_conflicts(target, active)
        if conflicts:
            print(f"⚠️ {target:02d}:00은 다음 캠페인과 겹칩니다:")
            for c in conflicts:
                diff = abs(c["hour"] - target)
                if diff > 12:
                    diff = 24 - diff
                print(f"  - {c['name']} (KST {c['time']}, 차이 {diff}h)")
            available = suggest_slot(active)
            if available:
                print(f"\n✅ 대안 시간대: {', '.join(f'{h:02d}:00' for h in available)}")
            else:
                print("\n❌ 사용 가능한 시간대 없음 — 기존 캠페인 완료 후 추가 필요")
        else:
            print(f"✅ {target:02d}:00은 사용 가능합니다 (기존 캠페인과 겹치지 않음)")
    else:
        available = suggest_slot(active)
        print(f"=== 사용 가능 시간대 ===")
        if available:
            print(f"  {', '.join(f'{h:02d}:00' for h in available)}")
        else:
            print("  없음 — 기존 캠페인 완료 후 추가 가능")


if __name__ == "__main__":
    main()
