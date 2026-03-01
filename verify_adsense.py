import os

pub_id = "ca-pub-3484572882367046"
script_snippet = "googlesyndication.com/pagead/js/adsbygoogle.js"

def check_file(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        has_script = script_snippet in content
        has_pub_id = pub_id in content
        
        if has_script and has_pub_id:
            return "PASS"
        elif has_script:
            return "PARTIAL (Pub ID Missing)"
        else:
            return "MISSING"
    except Exception as e:
        return f"🔥 Error: {str(e)}"

results = {}

# Check root
for f in ["index.html", "blog.html"]:
    path = os.path.join(r"c:\Users\iss59\.gemini\antigravity\scratch\testlab", f)
    if os.path.exists(path):
        results[f] = check_file(path)

# Check blog dir
blog_dir = r"c:\Users\iss59\.gemini\antigravity\scratch\testlab\blog"
if os.path.exists(blog_dir):
    blog_files = [f for f in os.listdir(blog_dir) if f.endswith(".html")]
    results[f"blog/ ({len(blog_files)} files)"] = "checking samples..."
    samples = blog_files[:3] # check first 3
    for sf in samples:
        results[f"blog/{sf}"] = check_file(os.path.join(blog_dir, sf))

# Check event dir
event_path = r"c:\Users\iss59\.gemini\antigravity\scratch\testlab\event\sanggyeonrye-2026\index.html"
if os.path.exists(event_path):
    results["event/sanggyeonrye-2026/index.html"] = check_file(event_path)

print("-" * 50)
print(f"{'File':<40} | {'Status'}")
print("-" * 50)
for file, status in results.items():
    print(f"{file:<40} | {status}")
print("-" * 50)
