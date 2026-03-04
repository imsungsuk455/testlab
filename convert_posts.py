import re

def convert():
    with open("post.txt", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Split by regex handling things like "---1.", "\n\n1.", "---", etc.
    # The file has sections like "---1. 제목", "---", "2.\n\n제목", etc.
    # Let's just use a simpler approach: finding the titles.
    # It seems the titles are always at the start or after "---" or numbers.
    
    sections = re.split(r'(?m)^---*\s*?\n?|^[0-9]+\.\s*?\n?', content)
    
    parsed_posts = []
    
    for sec in sections:
        sec = sec.strip()
        if not sec:
            continue
        
        # Clean up any leftover numbers or dashes at the start
        sec = re.sub(r'^[0-9]+\.\s*', '', sec).strip()
        
        lines = sec.split('\n')
        if len(lines) < 2:
            continue
            
        title = lines[0].strip()
        body = "\n".join(lines[1:]).strip()
        
        # Ignore things that are not actual posts
        if len(body) < 100:
            continue
            
        # Add to list
        parsed_posts.append(f"{title}\n{body}")
        
    with open("posts.txt", "w", encoding="utf-8") as f:
        f.write("\n###\n".join(parsed_posts))
        
    print(f"변환 완료! {len(parsed_posts)}개의 글이 posts.txt에 저장되었습니다.")

if __name__ == "__main__":
    convert()
