import os
import re
from PIL import Image

def optimize_images(image_dir):
    print("Starting image optimization...")
    for filename in os.listdir(image_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            base_name = os.path.splitext(filename)[0]
            webp_name = base_name + '.webp'
            webp_path = os.path.join(image_dir, webp_name)
            img_path = os.path.join(image_dir, filename)
            
            # Convert if webp doesn't exist or is older
            if not os.path.exists(webp_path):
                try:
                    with Image.open(img_path) as img:
                        img.save(webp_path, 'WEBP', quality=85)
                    print(f"Converted {filename} to {webp_name}")
                except Exception as e:
                    print(f"Failed to convert {filename}: {e}")

def update_references(root_dir):
    print("Updating original code references to use .webp...")
    # Patterns to match .png, .jpg, .jpeg in quotes or as part of a path
    # We want to be careful not to replace things that shouldn't be
    extensions = ('.html', '.js', '.css')
    
    for subdir, dirs, files in os.walk(root_dir):
        if '.git' in dirs:
            dirs.remove('.git')
        for file in files:
            if file.lower().endswith(extensions):
                file_path = os.path.join(subdir, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Replace image extensions in strings
                    new_content = re.sub(r'(\.png|\.jpg|\.jpeg)', '.webp', content, flags=re.IGNORECASE)
                    
                    if content != new_content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated references in: {file}")
                except Exception as e:
                    print(f"Error updating {file}: {e}")

if __name__ == "__main__":
    base_path = r"c:\Users\iss59\Desktop\antigravity\testlab"
    image_path = os.path.join(base_path, "images")
    
    optimize_images(image_path)
    update_references(base_path)
    print("Optimization complete.")
