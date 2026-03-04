import os
import google.generativeai as genai
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

def generate_posts_from_samples(num_posts=10):
    try:
        # 기존 posts.txt 읽기
        with open("posts.txt", "r", encoding="utf-8") as f:
            sample_content = f.read()
    except FileNotFoundError:
        print("posts.txt 파일이 없어서 기본 샘플로 대체합니다.")
        sample_content = """심리 테스트로 알아보는 진짜 내 모습
최근 심리 테스트가 많은 인기를 끌고 있습니다. 자신을 더 잘 이해할 수 있기 때문이죠...
###"""

    # Gemini API 설정
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY가 .env 파일에 설정되지 않았습니다.")
        return

    genai.configure(api_key=api_key)
    # 모델 최신 권장형으로 설정
    model = genai.GenerativeModel('gemini-2.5-pro')

    prompt = f"""
다음은 블로그에 올릴 글의 샘플 데이터들입니다. 
구분자는 '###' 이며, 첫 줄은 제목이고 그 아래는 내용입니다.

{sample_content}

위의 샘플 글들의 스타일, 어조, 주제 방향(심리, 자아탐구, 스트레스 관리, 관계 등)을 철저히 분석하여, 
완전히 새로우면서도 애드센스 승인에 유리한 고품질 블로그 글을 {num_posts}개 더 작성해주세요.

[조건]
1. 샘플과 동일하게 각 글의 구분자는 반드시 '###' 이어야 합니다.
2. 첫 번째 줄은 무조건 매력적인 '제목'이어야 합니다.
3. 두 번째 줄부터 본문 내용이 옵니다 (각 글당 최소 500자 이상). 
4. 제목과 본문 내용이 샘플과 겹치지 않게 완전히 다른 새로운 주제와 내용을 다뤄주세요 (예: 불면증 극복, 혼자만의 시간의 중요성, 디지털 디톡스 등).
5. 다른 코멘트나 마크다운 기호 없이, 바로 글 내용만 '###'로 구분해서 반환해주세요.
"""
    print(f"Gemini API를 호출하여 {num_posts}개의 새로운 글을 생성 중입니다. 잠시만 기다려주세요...")
    
    response = model.generate_content(prompt)
    
    new_posts = response.text.strip()
    
    # 텍스트가 정상적으로 반환되었는지 확인
    if not new_posts:
        print("API 호출 결과가 비어있습니다.")
        return

    # 기존 posts.txt 끝에 덧붙이기
    # 만약 기존 파일이 '###'로 끝나지 않았다면 줄바꿈과 함께 추가
    try:
         with open("posts.txt", "r", encoding="utf-8") as f:
            existing = f.read()
    except:
         existing = ""

    with open("posts.txt", "a", encoding="utf-8") as f:
        if existing and not existing.strip().endswith("###"):
            f.write("\n###\n")
        elif not existing:
             pass # 파일이 비어있으면 그냥 추가
        else:
             f.write("\n")
        f.write(new_posts)

    print(f"\n성공적으로 {num_posts}개의 새 글이 posts.txt에 추가되었습니다!")

if __name__ == "__main__":
    generate_posts_from_samples(10)
