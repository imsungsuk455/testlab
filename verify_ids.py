import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

ids_in_html = set(re.findall(r'id=["\']([^"\']+)["\']', html))
ids_in_js = set(re.findall(r'document\.getElementById\(["\']([^"\']+)["\']\)', js))

missing_in_html = ids_in_js - ids_in_html

print(f"IDs used in JS but missing in HTML: {missing_in_html}")
