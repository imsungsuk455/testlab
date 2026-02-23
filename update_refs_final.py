import os

def update_code_references(root_dir):
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
    
    # Moral test mapping (fixing missing images)
    moral_mapping = {
        "images/moral_res_1.webp": "images/char_strategist.webp",
        "images/moral_res_2.webp": "images/char_sports.webp",
        "images/moral_res_3.webp": "images/char_villain.webp",
        "images/moral_res_4.webp": "images/char_hacker.webp",
        "images/moral_res_5.webp": "images/char_rival.webp",
        "images/moral_res_6.webp": "images/char_idol.webp",
        "images/moral_res_7.webp": "images/char_genius.webp",
        "images/moral_res_8.webp": "images/char_supporter.webp",
        "images/moral_res_9.webp": "images/char_knight.webp",
        "images/moral_res_10.webp": "images/char_ghibli.webp"
    }

    extensions = ('.html', '.js')
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.lower().endswith(extensions):
                file_path = os.path.join(subdir, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    # Apply mappings
                    for old, new in mapping.items():
                        new_content = new_content.replace(old, new)
                    
                    for old, new in moral_mapping.items():
                        new_content = new_content.replace(old, new)
                    
                    if content != new_content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {file}")
                except Exception as e:
                    print(f"Error updating {file}: {e}")

if __name__ == "__main__":
    target_dir = r"c:\Users\iss59\.gemini\antigravity\scratch\testlab"
    update_code_references(target_dir)
