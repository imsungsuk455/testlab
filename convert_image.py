from PIL import Image
import os

def convert_to_webp(source_path, target_path):
    try:
        with Image.open(source_path) as img:
            img.save(target_path, "WEBP", quality=80)
        print(f"Successfully converted {source_path} to {target_path}")
        return True
    except Exception as e:
        print(f"Failed to convert {source_path}: {e}")
        return False

if __name__ == "__main__":
    source = r"c:\Users\iss59\Desktop\antigravity\testlab\images\thumb_15.png"
    target = r"c:\Users\iss59\Desktop\antigravity\testlab\images\thumb_15.webp"
    if os.path.exists(source):
        convert_to_webp(source, target)
    else:
        print(f"Source file not found: {source}")
