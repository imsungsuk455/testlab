# -*- coding: utf-8 -*-
"""
threads_daily.yml 크론 자동 보장 스크립트.

문제 (실측 2026-09-05): 에이전트가 새 캠페인 시간(예: 06:00, 12:00, 15:00)을 선택해도
threads_daily.yml에 해당 cron이 없으면 GitHub Actions가 절대 실행되지 않아 "예약했는데 안 나감" 발생.
PUBLISH_HOUR 매핑 if-elif도 수동 관리라 빠지면 시간 필터가 무력화됨.

해결: AVAILABLE_SLOTS(06/09/12/15/18/21, check_time_conflicts와 동일) 전체에 대해
cron + PUBLISH_HOUR 분기를 항상 보장한다. 새 시간대를 고를 때 추가로 손댈 것 없음.

사용법:
  python scripts/ensure_cron.py            # 점검만
  python scripts/ensure_cron.py --fix      # yml 자동 수정
"""
import argparse
import re
import sys
from pathlib import Path

if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

HERE = Path(__file__).parent
YML_PATH = HERE.parent / "site" / ".github" / "workflows" / "threads_daily.yml"

AVAILABLE_KST = [6, 9, 12, 15, 18, 21]


def kst_to_utc_cron(kst):
    return (kst - 9) % 24


def needed_hours():
    """고정 슬롯 + 기존 스케줄이 실제 사용하는 시간(예: 레거시 13:00) 합집합."""
    hours = set(AVAILABLE_KST)
    for base in (HERE.parent / "site" / "output", HERE.parent / "output"):
        if not base.exists():
            continue
        for p in base.glob("marketing_posts_*.json"):
            try:
                import json as _j
                d = _j.loads(p.read_text(encoding="utf-8"))
            except Exception:
                continue
            pt = d.get("publish_time")
            if not pt:
                for s in d.get("slots", []):
                    if s.get("publish_time"):
                        pt = s["publish_time"]
                        break
            if pt:
                try:
                    hours.add(int(pt.split(":")[0]))
                except ValueError:
                    pass
    return sorted(hours)


def expected_crons():
    return {f"0 {kst_to_utc_cron(k)} * * *": k for k in needed_hours()}


def main():
    parser = argparse.ArgumentParser(description="threads_daily.yml 크론 보장")
    parser.add_argument("--fix", action="store_true", help="부족한 cron/분기 자동 추가")
    args = parser.parse_args()

    text = YML_PATH.read_text(encoding="utf-8")
    expected = expected_crons()
    hours = needed_hours()
    missing = [c for c in expected if c not in text]
    missing_branches = [k for k in hours if f"PUBLISH_HOUR={k}" not in text]

    if not missing and not missing_branches:
        print("✅ threads_daily.yml: 크론 + PUBLISH_HOUR 분기 모두 존재")
        for cron, kst in sorted(expected.items(), key=lambda x: x[1]):
            print(f"   KST {kst:02d}:00 → cron '{cron}'")
        return

    print(f"⚠️ 부족한 cron: {missing or '없음'}")
    print(f"⚠️ 부족한 PUBLISH_HOUR 분기: {missing_branches or '없음'}")
    if not args.fix:
        print("   --fix 로 자동 수정 가능")
        sys.exit(1)

    # 1) schedule 블록 재작성 (주석 행이 섞여 있어도 schedule:부터 workflow_dispatch: 전까지 교체)
    lines = []
    for kst in hours:
        utc = kst_to_utc_cron(kst)
        lines.append(f"    - cron: '0 {utc} * * *'   # KST {kst:02d}:00")
    schedule_block = ("  schedule:\n"
                      "    # KST→UTC = -9h. ensure_cron.py가 보장 (고정 슬롯 06/09/12/15/18/21 + 기존 캠페인 시간)\n"
                      + "\n".join(lines) + "\n")
    text = re.sub(r"  schedule:\n.*?(?=\n  workflow_dispatch:)", schedule_block.rstrip("\n"), text, flags=re.DOTALL)

    # 2) PUBLISH_HOUR 분기 재작성 (첫 번째 if를 찾아 elif 체인 전체 교체)
    conds = []
    for i, kst in enumerate(hours):
        utc = kst_to_utc_cron(kst)
        kw = "if" if i == 0 else "elif"
        conds.append(f'          {kw} [ "${{{{ github.event.schedule }}}}" = "0 {utc} * * *" ]; then\n'
                     f'            echo "PUBLISH_HOUR={kst}" >> $GITHUB_ENV')
    branch_block = "\n".join(conds) + '\n          else\n            echo "PUBLISH_HOUR=" >> $GITHUB_ENV\n          fi'
    text = re.sub(r"          if \[ .*?PUBLISH_HOUR=.*?fi", branch_block, text, flags=re.DOTALL)

    YML_PATH.write_text(text, encoding="utf-8")
    print("✅ threads_daily.yml 수정 완료 (6개 시간대 보장)")


if __name__ == "__main__":
    main()
