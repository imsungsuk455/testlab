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
# ⚠️ 진실 공급원(single source of truth)은 site/output (GitHub Actions가 읽는 배포본).
# output/(스킬 로컬)은 stale될 수 있으므로 반드시 site/output과 비교한다.
SITE_OUTPUT_DIR = Path(__file__).parent.parent / "site" / "output"
AVAILABLE_SLOTS = [6, 9, 12, 15, 18, 21]  # 3시간 간격


def today_kst():
    from datetime import datetime, timedelta
    return (datetime.utcnow() + timedelta(hours=9)).date().isoformat()


def resolve_publish_time(d):
    """top-level publish_time이 없으면(구 스케줄) 슬롯에서 추출."""
    pt = d.get("publish_time")
    if pt:
        return pt
    for s in d.get("slots", []):
        if s.get("publish_time"):
            return s["publish_time"]
    return None


def load_campaigns(base_dir):
    out = {}
    if not base_dir.exists():
        return out
    for p in base_dir.glob("marketing_posts_*.json"):
        if p.name.startswith("marketing_posts_love-type"):
            continue  # 레거시 제외
        with open(p, encoding="utf-8") as f:
            d = json.load(f)
        out[p.name] = d
    return out


def get_active_campaigns():
    """활성(발행 중) 캠페인의 publish_time을 수집한다. 기준: site/output + 오늘 이후 pending 존재."""
    site_maps = load_campaigns(SITE_OUTPUT_DIR)
    local_maps = load_campaigns(OUTPUT_DIR)
    # 소스 선택: site/output 우선, 없으면 output/ 폴백
    merged = dict(local_maps)
    merged.update(site_maps)
    source_note = "site/output" if site_maps else "output/(폴백)"

    # 불일치 경고: 로컬 output/이 배포본과 다르면 새 세션 겹침의 원인
    for name, local in local_maps.items():
        remote = site_maps.get(name)
        if remote is None:
            print(f"⚠️ {name}: 배포본(site/output)에 없음 — gen 후 복사가 안 됐을 수 있음")
            continue
        lp = sum(1 for s in local.get("slots", []) if s.get("status") != "posted")
        rp = sum(1 for s in remote.get("slots", []) if s.get("status") != "posted")
        if lp != rp:
            print(f"⚠️ {name}: 로컬 잔여 {lp} ≠ 배포본 잔여 {rp} — `git -C site pull` 후 로컬 동기화 필요")

    today = today_kst()
    active = []
    for name, d in merged.items():
        slug = d.get("slug", name.replace("marketing_posts_", "").replace(".json", ""))
        pub_time = resolve_publish_time(d)
        if not pub_time:
            continue
        # 활성 여부: 오늘(KST) 이후 날짜의 미발행 슬롯이 있는지
        # (종료된 캠페인: 전부 posted이거나 pending이 과거 날짜뿐 → 제외)
        future_pending = [s for s in d.get("slots", [])
                          if s.get("status") != "posted" and s.get("date", "") >= today]
        missed = [s for s in d.get("slots", [])
                  if s.get("status") != "posted" and s.get("date", "") < today]
        total = len(d.get("slots", []))
        if future_pending:
            hour = int(pub_time.split(":")[0])
            active.append({
                "slug": slug,
                "name": d.get("test_name", slug),
                "hour": hour,
                "time": pub_time,
                "pending": len(future_pending),
                "total": total,
            })
        elif missed:
            from datetime import datetime, timedelta as _td
            _y = ((datetime.utcnow() + _td(hours=9)).date() - _td(days=1)).isoformat()
            catchable = [s for s in missed if s.get("date") == _y]
            if catchable:
                print(f"📌 {d.get('test_name', slug)}: {len(catchable)}개 슬롯이 어제 미발행 — 다음 cron 어제-캐치업이 처리")
            older = [s for s in missed if s.get("date", "") < _y]
            if older:
                print(f"ℹ️ {d.get('test_name', slug)}: {len(older)}개 슬롯은 2일 이상 지나 발행 불가 (무시됨, 시간대 차지 안 함)")
    print(f"(기준: {source_note}, 오늘 KST {today})")
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
