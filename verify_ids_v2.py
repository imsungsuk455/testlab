import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Find all IDs in HTML
ids_in_html = set(re.findall(r'id=["\']([^"\']+)["\']', html))

# Find all IDs used in script.js via getElementById
ids_used_in_js = set(re.findall(r'document\.getElementById\(["\']([^"\']+)["\']\)', js))

# Find all selectors used in script.js via querySelector/querySelectorAll
selectors_used_in_js = re.findall(r'document\.querySelector(?:All)?\(["\']\.?([^"\']+)["\']\)', js)

print("IDs in HTML:", sorted(list(ids_in_html)))
print("-" * 20)
print("IDs used in JS:", sorted(list(ids_used_in_js)))
print("-" * 20)
missing = ids_used_in_js - ids_in_html
print("Missing IDs:", missing)

if missing:
    print("FATAL: Missing IDs found!")
else:
    print("No missing IDs found via getElementById.")
