import sys
try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image
from collections import Counter

images = [
    r"c:\Users\Rupak\OneDrive\Desktop\ecommerce\LOGO 5.png",
    r"c:\Users\Rupak\OneDrive\Desktop\ecommerce\logo.png",
    r"c:\Users\Rupak\OneDrive\Desktop\ecommerce\WhatsApp Image 2026-07-21 at 9.45.10 AM.jpeg",
    r"c:\Users\Rupak\OneDrive\Desktop\ecommerce\WhatsApp Image 2026-07-21 at 12.13.11 AM.jpeg",
    r"c:\Users\Rupak\OneDrive\Desktop\ecommerce\WhatsApp Image 2026-07-21 at 12.13.13 AM.jpeg",
    r"c:\Users\Rupak\OneDrive\Desktop\ecommerce\WhatsApp Image 2026-07-21 at 12.13.12 AM.jpeg"
]

def get_colors(image_file, numcolors=5):
    try:
        image = Image.open(image_file)
        image = image.convert("RGB")
        image = image.resize((50, 50))
        colors = image.getcolors(2500)
        colors = sorted(colors, key=lambda t: t[0], reverse=True)
        return [c[1] for c in colors[:numcolors]]
    except Exception as e:
        return str(e)

for img in images:
    print(f"Colors for {img}:")
    print(get_colors(img))
