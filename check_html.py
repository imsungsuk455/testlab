import re

def check_html_balance(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple check for unclosed section tags
    sections_open = len(re.findall(r'<section', content))
    sections_close = len(re.findall(r'</section>', content))
    
    divs_open = len(re.findall(r'<div', content))
    divs_close = len(re.findall(r'</div>', content))
    
    print(f"Sections: Open={sections_open}, Close={sections_close}")
    print(f"Divs: Open={divs_open}, Close={divs_close}")
    
    if sections_open != sections_close:
        print("WARNING: Section tags are imbalanced!")
    if divs_open != divs_close:
        print("WARNING: Div tags are imbalanced!")

check_html_balance('index.html')
