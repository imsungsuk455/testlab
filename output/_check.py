import json
import os

DIR = os.path.dirname(os.path.abspath(__file__))

print("===== social-position =====")
with open(os.path.join(DIR, "marketing_posts_social-position.json"), encoding="utf-8") as f:
    d = json.load(f)
for s in d["slots"]:
    tid = s.get("thread_id") or "-"
    print(f"day {s['day']:2d} | {s['date']} | {s['status']:8s} | time={s['publish_time']} | thread_id={tid}")

print()
print("===== wealth-face-2026 =====")
with open(os.path.join(DIR, "marketing_posts_wealth-face-2026.json"), encoding="utf-8") as f:
    d = json.load(f)
for s in d["slots"]:
    tid = s.get("thread_id") or "-"
    cid = s.get("comment_id") or "-"
    print(f"day {s['day']:2d} | {s['date']} | {s['status']:8s} | time={s['publish_time']} | thread_id={tid} | comment_id={cid}")
