import os
import re
import datetime
from PIL import Image, ImageDraw, ImageFont

# 설정
POSTS_FILE = "posts.txt"
BLOG_DIR = "blog"
IMAGES_DIR = "images"
BLOG_HTML_FILE = "blog.html"
BASE_IMG = os.path.join(IMAGES_DIR, "somenail.png")

# 워크플로우를 위해 폰트 경로 설정 (우분투/윈도우 지원)
FONT_PATH = "/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf"
if not os.path.exists(FONT_PATH):
    FONT_PATH = "C:\\Windows\\Fonts\\malgun.ttf" # 윈도우 로컬 테스트용

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
        print("posts.txt 파일이 없습니다.")
        return []
    with open(POSTS_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    
    # '###' 구분자로 포스트 나누기
    raw_posts = content.split("###")
    posts = []
    for rp in raw_posts:
        lines = [line.strip() for line in rp.strip().split("\n") if line.strip()]
        if len(lines) >= 2:
            title = lines[0]
            body = "\n".join(lines[1:])
            # 요약 앞 100자 정도
            summary = body[:100].replace("\n", " ") + "..."
            posts.append({"title": title, "body": body, "summary": summary})
    return posts

def create_thumbnail(title, index):
    try:
        img = Image.open(BASE_IMG)
    except FileNotFoundError:
        print(f"썸네일 베이스 이미지 {BASE_IMG}를 찾을 수 없습니다.")
        # 임시 이미지 생성
        img = Image.new('RGB', (800, 800), color = (73, 109, 137))

    draw = ImageDraw.Draw(img)
    try:
        # 썸네일 제목 폰트 사이즈
        font = ImageFont.truetype(FONT_PATH, 50)
    except IOError:
        font = ImageFont.load_default()

    # 제목 줄바꿈 로직 (적당히 자르기)
    words = title.split()
    lines = []
    current_line = []
    for word in words:
        current_line.append(word)
        # 텍스트 길이 체크 (PIL 버전에 따라 다름)
        if hasattr(draw, 'textsize'): # 구버전
            w, h = draw.textsize(" ".join(current_line), font=font)
        else: # 신버전
            w = draw.textlength(" ".join(current_line), font=font)
        if w > img.width - 60:
            current_line.pop()
            lines.append(" ".join(current_line))
            current_line = [word]
    if current_line:
        lines.append(" ".join(current_line))

    # 텍스트 중앙 병합 후 그리기
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
    # webp 포맷으로 저장 (투명도 지원 안하면 RGB 변환 등 필요할수도있으나 썸네일이니 보통 가능)
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
    # 본문 문단별로 <p> 태그 적용
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

    # <div class="blog-grid"> 직후에 추가하여 맨 위로 오게 함 (최신순)
    insert_marker = '<div class="blog-grid">'
    if insert_marker in html:
        parts = html.split(insert_marker, 1)
        new_html = parts[0] + insert_marker + new_card_html + parts[1]
        with open(BLOG_HTML_FILE, "w", encoding="utf-8") as f:
            f.write(new_html)
        print("blog.html 리스트에 새 글 추가 완료")

def main():
    posts = parse_posts()
    if not posts:
        print("작업할 포스트가 없습니다.")
        return

    # 다음 게시물의 인덱스 확인 (11부터 시작하도록 할 수도 있지만, 파일 개수로 동적계산)
    posts_count_to_post = 20
    next_index = get_next_index()
    
    # next_index - 1 이 메모장의 몇 번째 글인지 (만약 메모장의 글 개수가 부족하면 중지)
    # 이미 올라간 글 개수를 기준으로 함. 1번부터 시작
    # 원래 10개의 글이 있으니 next_index는 11일 것. 
    # 그러면 11번째 글을 posts[0]에서 가져와야 할까?
    # posts.txt에 20개 글을 쭉 적어두고, 아직 작성되지 않은 첫번째 글을 찾아야 함.
    offset = max(0, next_index - 11) # 원래 10개 글이 있었으므로, 11번이 posts[0]에 해당하도록
    
    if offset >= len(posts):
        print(f"모든 글이 예약 발행되었습니다. (현재 {offset}개 발행, 파일 내 총 {len(posts)}개)")
        return
        
    current_post = posts[offset]
    print(f"새로운 글 발행 진행: [{current_post['title']}] (post-{next_index}.html)")

    # 썸네일 생성
    thumb_filename = create_thumbnail(current_post['title'], next_index)

    # HTML 생성
    generate_post_html(current_post, next_index, thumb_filename)

    # 블로그 목록 추가
    append_to_blog_list(current_post, next_index, thumb_filename)

if __name__ == "__main__":
    main()
