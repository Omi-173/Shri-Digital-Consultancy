#!/usr/bin/env python3
"""
Script to download logos from various websites
"""
import requests
from PIL import Image
from io import BytesIO
from urllib.parse import urlparse
import os
from pathlib import Path

# Create logos directory if it doesn't exist
logos_dir = Path("assets/logos")
logos_dir.mkdir(parents=True, exist_ok=True)

# Mapping of company names to their website URLs
companies = {
    "amazon": "https://www.amazon.in/",
    "flipkart": "https://www.flipkart.com/",
    "myntra": "https://www.myntra.com/",
    "ebay": "https://www.ebay.com/",
    "sareebari": "https://sareebari.com/",
    "aariindia": "https://aariindia.com/",
    "minimaana": "https://www.minimaana.com/",
    "laalzari": "https://laalzari.com/",
    "singhanias": "https://www.singhanias.in/",
    "mahotsavgroup": "https://www.mahotsavgroup.com/",
    "goldenmuslin": "https://goldenmuslin.com/",
    "kalkifashion": "https://kalkifashion.com/",
    "azafashions": "https://www.azafashions.com/",
    "webzaa": "https://webzaa.in/",
    "submitedgeseo": "https://submitedgeseo.com/",
    "9dzine": "https://9dzine.com/",
    "drpremgupta": "https://drpremgupta.com/",
    "hitflik": "https://hitflik.com/",
    "freevedicmath": "https://www.freevedicmath.com/",
    "isshaan": "https://www.isshaan.com/",
    "houseofhiranandani": "https://www.houseofhiranandani.com/",
    "adani": "https://www.adani.com/",
    "rustomjee": "https://www.rustomjee.com/",
    "lodhagroup": "https://www.lodhagroup.com/",
    "ajmera": "https://ajmera.com/",
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

def download_favicon(url, company_name):
    """Download favicon from a website"""
    try:
        # Try to get favicon from common locations
        domain = urlparse(url).netloc
        favicon_urls = [
            f"https://{domain}/favicon.ico",
            f"https://{domain}/favicon.png",
            f"https://{domain}/logo.png",
        ]
        
        for favicon_url in favicon_urls:
            try:
                response = requests.get(favicon_url, headers=headers, timeout=5)
                if response.status_code == 200:
                    # Save as PNG
                    try:
                        img = Image.open(BytesIO(response.content))
                        # Convert to RGB if necessary
                        if img.mode in ('RGBA', 'LA', 'P'):
                            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                            img = rgb_img
                        
                        # Save as PNG
                        output_path = logos_dir / f"{company_name}.png"
                        img.save(output_path, 'PNG')
                        print(f"✓ Downloaded logo for {company_name} from {favicon_url}")
                        return True
                    except Exception as e:
                        print(f"✗ Failed to process image for {company_name}: {e}")
                        continue
            except:
                continue
        
        print(f"✗ Could not download favicon for {company_name}")
        return False
        
    except Exception as e:
        print(f"✗ Error downloading favicon for {company_name}: {e}")
        return False

def create_placeholder_svg(company_name):
    """Create a placeholder SVG if favicon download fails"""
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#f0f0f0" rx="10"/>
  <text x="50%" y="50%" font-size="24" font-weight="bold" fill="#333" text-anchor="middle" dominant-baseline="middle">{company_name[:4].upper()}</text>
</svg>'''
    
    svg_path = logos_dir / f"{company_name}.svg"
    with open(svg_path, 'w') as f:
        f.write(svg_content)
    print(f"✓ Created placeholder SVG for {company_name}")

print("Starting logo download process...")
print(f"Saving to: {logos_dir.absolute()}\n")

for company, url in companies.items():
    if not download_favicon(url, company):
        # Create placeholder if download fails
        create_placeholder_svg(company)

print("\nLogo download complete!")
print(f"Logos saved to: {logos_dir.absolute()}")
