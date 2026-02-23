import os

def rename_korean_images(images_dir):
    mapping = {
        "기개가 높은 장군.webp": "joseon_general.webp",
        "만능 재주꾼 보부상.webp": "joseon_merchant.webp",
        "무녀.webp": "joseon_shaman.webp",
        "백정.webp": "joseon_butcher.webp",
        "사간원 판관.webp": "joseon_judge.webp",
        "안방마님.webp": "joseon_lady.webp",
        "자유로운 광대.webp": "joseon_clown.webp",
        "지혜로운 영의정.webp": "joseon_minister.webp",
        "천재적인 도화서 화원.webp": "joseon_artist.webp",
        "카리스마 넘치는 왕.webp": "joseon_king.webp",
        "풍류를 즐기는 선비.webp": "joseon_scholar.webp",
        "타이틀.webp": "title_joseon.webp",
        "메인.webp": "main_moral.webp",
        "상견례프리패스.webp": "title_inlaws.webp"
    }
    
    for old_name, new_name in mapping.items():
        old_path = os.path.join(images_dir, old_name)
        new_path = os.path.join(images_dir, new_name)
        if os.path.exists(old_path):
            try:
                os.rename(old_path, new_path)
                print(f"Renamed: {old_name} -> {new_name}")
            except Exception as e:
                print(f"Failed to rename {old_name}: {e}")
        else:
            print(f"Not found: {old_name}")

if __name__ == "__main__":
    images_dir = r"c:\Users\iss59\.gemini\antigravity\scratch\testlab\images"
    rename_korean_images(images_dir)
