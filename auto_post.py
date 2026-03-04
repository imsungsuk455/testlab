import os
import re
import sys
import datetime
from PIL import Image, ImageDraw, ImageFont

# 설정
POSTS_FILE = "posts.txt"
BLOG_DIR = "blog"
IMAGES_DIR = "images"
BLOG_HTML_FILE = "blog.html"
BASE_IMG = os.path.join(IMAGES_DIR, "somenail.png")
# 시작 글 번호 (1부터 10까지는 기존 글이고, 새로운 시스템은 11번부터 작성)
START_INDEX = 11

FONT_PATH = "/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf"
if not os.path.exists(FONT_PATH):
    FONT_PATH = "C:\\Windows\\Fonts\\malgun.ttf"

def get_next_index():
    if not os.path.exists(BLOG_DIR):
        os.makedirs(BLOG_DIR)
    files = os.listdir(BLOG_DIR)
    indices = []
    for f in files:
        m = re.match(r"post-(\d+)\.html", f)
        if m:
            indices.append(int(m.group(1)))
    return max(indices) + 1 if indices else 1

def parse_posts():
    if not os.path.exists(POSTS_FILE):
        return []
    with open(POSTS_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    
    raw_posts = content.split("###")
    posts = []
    for rp in raw_posts:
        lines = [line.strip() for line in rp.strip().split("\n") if line.strip()]
        if len(lines) >= 2:
            title = lines[0]
            body = "\n".join(lines[1:])
            summary = body[:100].replace("\n", " ") + "..."
            posts.append({"title": title, "body": body, "summary": summary})
    return posts

def generate_via_gemini():
    try:
        import google.generativeai as genai
    except ImportError:
         print("google-generativeai 패키지가 없습니다. Gemini 생성을 건너뜁니다.")
         return None

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY가 없습니다. 생성을 건너뜁니다.")
        return None

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-pro')

    print("기존 posts.txt의 글들을 바탕으로 새로운 블로그 포스트를 Gemini로 생성 중입니다...")
    try:
        with open(POSTS_FILE, "r", encoding="utf-8") as f:
            sample_content = f.read()
    except:
        sample_content = ""

    prompt = f"""
다음은 내 블로그의 글들입니다. 

{sample_content[-3000:]}

위의 샘플 글들의 문체, 길이, 그리고 주제를 철저히 분석해주세요.
당신은 위와 완벽하게 동일한 톤앤매너로 "완전히 새로우면서도 애드센스 승인에 유리한" 고품질의 블로그 글을 딱 1개만 작성해야 합니다.
[조건]
1. 첫 줄은 제목. 두 번째 줄부터 본문. 내용 중간에 어떠한 인사말이나 부연 설명, 마크다운 기호 없이 바로 시작하세요. 
2. 본문 내용은 최소 1000자 이상으로 길게.
3. 구분자 '###' 를 절대로 포함하지 마세요(내가 직접 붙일겁니다).
"""
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text:
            with open(POSTS_FILE, "a", encoding="utf-8") as f:
                f.write("\n###\n" + text)
            print("새로운 글이 posts.txt에 생성 및 추가되었습니다.")
            return True
    except Exception as e:
        print("생성 중 오류 발생:", e)
    return False

def create_thumbnail(title, index):
    try:
        img = Image.open(BASE_IMG)
    except FileNotFoundError:
        img = Image.new('RGB', (800, 800), color = (73, 109, 137))

    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype(FONT_PATH, 50)
    except IOError:
        font = ImageFont.load_default()

    words = title.split()
    lines = []
    current_line = []
    for word in words:
        current_line.append(word)
        if hasattr(draw, 'textsize'):
            w, h = draw.textsize(" ".join(current_line), font=font)
        else:
            w = draw.textlength(" ".join(current_line), font=font)
        if w > img.width - 60:
            current_line.pop()
            lines.append(" ".join(current_line))
            current_line = [word]
    if current_line:
        lines.append(" ".join(current_line))

    y_text = img.height / 2 - (len(lines) * 60) / 2
    for line in lines:
        if hasattr(draw, 'textsize'):
            w, h = draw.textsize(line, font=font)
        else:
            w = draw.textlength(line, font=font)
            h = 50
        draw.text(((img.width - w) / 2, y_text), line, font=font, fill=(255, 255, 255), stroke_width=2, stroke_fill=(0,0,0))
        y_text += h + 15

    thumb_filename = f"thumb_{index}.webp"
    thumb_path = os.path.join(IMAGES_DIR, thumb_filename)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    img.save(thumb_path, "WEBP", quality=85)
    return thumb_filename

def generate_post_html(post_data, index, thumb_filename):
    today_str = datetime.datetime.now().strftime("%Y-%m-%d")
    html_content = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{post_data['title']} | TesterLab (테스터랩) 블로그</title>
    <meta name="description" content="{post_data['summary']}">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
    <meta name="google-adsense-account" content="ca-pub-3484572882367046">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3484572882367046" crossorigin="anonymous"></script>
    <style>
        .post-container {{ text-align: left; padding: 20px; }}
        .post-header {{ margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; }}
        .post-title {{ font-size: 1.8rem; font-weight: 800; margin-bottom: 15px; line-height: 1.3; }}
        .post-meta {{ color: #999; font-size: 0.9rem; }}
        .post-content {{ line-height: 1.8; font-size: 1.05rem; color: #333; }}
        .post-content p {{ margin-bottom: 20px; }}
        .post-thumbnail {{ width: 100%; border-radius: 20px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); display: block; }}
        .back-to-blog {{ display: inline-block; margin-bottom: 20px; color: var(--accent-color); text-decoration: none; font-weight: 600; }}
    </style>
</head>
<body>
    <header class="main-header">
        <div class="header-content">
            <div class="logo-container" onclick="location.href='../index.html'">
                <img src="../images/logo.webp" alt="TesterLab Logo" class="logo-img">
                <span class="logo-text">TesterLab</span>
            </div>
            <nav class="main-nav">
                <a href="../index.html" class="nav-item">홈</a>
                <a href="../blog.html" class="nav-item" style="color: var(--accent-color);">블로그</a>
            </nav>
        </div>
    </header>

    <div id="app" class="fade-in">
        <div class="post-container">
            <a href="../blog.html" class="back-to-blog">← 목록으로 돌아가기</a>
            <header class="post-header">
                <h1 class="post-title">{post_data['title']}</h1>
                <div class="post-meta">작성일: {today_str} | 카테고리: 일상/정보</div>
            </header>
            <img src="../images/{thumb_filename}" alt="{post_data['title']}" class="post-thumbnail">
            <article class="post-content">
"""
    for paragraph in post_data['body'].split("\n"):
        if paragraph.strip():
            html_content += f"                <p>{paragraph.strip()}</p>\n"
            
    html_content += """
            </article>
        </div>
    </div>
    <footer style="padding: 40px 0; text-align: center; color: #aaa; font-size: 0.85rem;">
        <p>&copy; 2026 TesterLab. All rights reserved.</p>
    </footer>
</body>
</html>
"""
    file_path = os.path.join(BLOG_DIR, f"post-{index}.html")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"[{file_path}] 생성 완료")
    return f"post-{index}.html"

def append_to_blog_list(post_data, index, thumb_filename):
    if not os.path.exists(BLOG_HTML_FILE):
        return
        
    with open(BLOG_HTML_FILE, "r", encoding="utf-8") as f:
        html = f.read()

    new_card_html = f"""
                <!-- Blog Post {index} -->
                <a href="blog/post-{index}.html" class="blog-card fade-in">
                    <img src="images/{thumb_filename}" alt="{post_data['title']}" class="blog-card-img" style="width: 100px; height: 100px; border-radius: 12px; object-fit: cover; flex-shrink: 0;">
                    <div class="blog-card-content">
                        <h3>{post_data['title']}</h3>
                        <p>{post_data['summary']}</p>
                    </div>
                </a>
"""
    insert_marker = '<div class="blog-grid">'
    if insert_marker in html:
        parts = html.split(insert_marker, 1)
        new_html = parts[0] + insert_marker + new_card_html + parts[1]
        with open(BLOG_HTML_FILE, "w", encoding="utf-8") as f:
            f.write(new_html)
        print("blog.html 리스트에 새 글 추가 완료")

def main():
    posts = parse_posts()
    next_index = get_next_index()
    
    offset = max(0, next_index - START_INDEX)
    
    # posts.txt에 준비된 글 번호보다 offset이 같거나 크면 새로운 글 생성 필요
    if offset >= len(posts):
        print(f"미리 작성된 {len(posts)}개의 글이 모두 소진되었습니다. AI를 통해 새 글을 생성합니다.")
        success = generate_via_gemini()
        if not success:
            print("새 글 생성에 실패하여 종료합니다.")
            sys.exit(1)
        posts = parse_posts() # 새로 추가된 글을 읽어옴
    
    current_post = posts[offset]
    print(f"새로운 글 발행 진행: [{current_post['title']}] (post-{next_index}.html)")

    thumb_filename = create_thumbnail(current_post['title'], next_index)
    generate_post_html(current_post, next_index, thumb_filename)
    append_to_blog_list(current_post, next_index, thumb_filename)

if __name__ == "__main__":
    main()
