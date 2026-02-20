import re
from collections import Counter

content = open('index.html', 'r', encoding='utf-8').read()
ids = re.findall(r'id=["\']([^"\']+)["\']', content)

duplicates = [item for item, count in Counter(ids).items() if count > 1]
if duplicates:
    print(f"Duplicate IDs found: {duplicates}")
else:
    print("No duplicate IDs found.")
