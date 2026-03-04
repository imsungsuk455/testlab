import re

def convert():
    with open("post.txt", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Split by solely '---' on a line
    chunks = re.split(r'(?m)^---+\s*$', content)
    
    parsed_posts = []
    seen_titles = set()
    
    for chunk in chunks:
        lines = chunk.strip().split('\n')
        
        title_line = ""
        while lines:
            line = lines.pop(0).strip()
            if not line:
                continue
            
            # Clean up things like '---1.', '2.', '3. #', etc.
            cleaned_line = re.sub(r'^(?:---|#)*\s*\d+\.\s*(?:#\s*)?', '', line).strip()
            
            if cleaned_line:
                title_line = cleaned_line
                break
                
        body = "\n".join(lines).strip()
        
        if not title_line or not body:
            continue
            
        if title_line in seen_titles:
            continue
            
        seen_titles.add(title_line)
        parsed_posts.append(f"{title_line}\n{body}")
        
    with open("posts.txt", "w", encoding="utf-8") as f:
        f.write("\n###\n".join(parsed_posts))
        
    print(f"변환 완료! {len(parsed_posts)}개의 글이 posts.txt에 저장되었습니다.")

if __name__ == "__main__":
    convert()
