#!/usr/bin/env python3
"""
Download Torah texts from Sefaria API and save them in the library folder.
"""

import requests
import json
import os
import time
from pathlib import Path

SEFARIA_API = "https://www.sefaria.org/api"
LIBRARY_PATH = "./library"

def download_text(book_title, category="Torah"):
    """Download a specific book from Sefaria."""
    print(f"Downloading {book_title}...")

    category_dir = Path(LIBRARY_PATH) / category
    category_dir.mkdir(parents=True, exist_ok=True)

    url = f"{SEFARIA_API}/texts/{book_title}"
    response = requests.get(url)

    if response.status_code != 200:
        print(f"  ✗ Failed to download {book_title}")
        return False

    data = response.json()

    if "text" not in data:
        print(f"  ✗ No text found for {book_title}")
        return False

    book_dir = category_dir / book_title.replace(" ", "_")
    book_dir.mkdir(exist_ok=True)

    text_content = data["text"]

    if isinstance(text_content, list):
        for idx, chapter in enumerate(text_content, 1):
            if isinstance(chapter, list):
                chapter_text = "\n\n".join([
                    f"{verse_idx}. {verse}"
                    for verse_idx, verse in enumerate(chapter, 1)
                    if verse
                ])
            else:
                chapter_text = chapter

            file_path = book_dir / f"chapter_{idx}.txt"
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(chapter_text)

        print(f"  ✓ Saved {len(text_content)} chapters")
    else:
        file_path = book_dir / f"{book_title.replace(' ', '_')}.txt"
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(text_content)
        print(f"  ✓ Saved single text")

    return True

def download_torah():
    """Download the five books of Torah."""
    torah_books = [
        "Genesis",
        "Exodus",
        "Leviticus",
        "Numbers",
        "Deuteronomy"
    ]

    for book in torah_books:
        download_text(book, "Torah")
        time.sleep(1)

def download_talmud_sample():
    """Download a sample of Talmud tractates."""
    tractates = [
        "Berakhot",
        "Shabbat",
        "Eruvin"
    ]

    for tractate in tractates:
        download_text(f"Mishnah_{tractate}", "Mishna")
        time.sleep(1)

def download_pirkei_avot():
    """Download Pirkei Avot (Ethics of the Fathers)."""
    download_text("Pirkei_Avot", "Talmud")

def download_essential_library():
    """Download a curated set of essential texts."""
    print("=" * 60)
    print("Downloading Essential Jewish Library from Sefaria")
    print("=" * 60)

    Path(LIBRARY_PATH).mkdir(exist_ok=True)

    print("\n[1/3] Downloading Torah...")
    download_torah()

    print("\n[2/3] Downloading Pirkei Avot...")
    download_pirkei_avot()

    print("\n[3/3] Downloading Sample Mishna...")
    download_talmud_sample()

    print("\n" + "=" * 60)
    print("Download complete! Library saved to:", LIBRARY_PATH)
    print("Run your app and it will automatically index these texts.")
    print("=" * 60)

def download_full_library():
    """Download the full Otzaria library from GitHub releases."""
    print("=" * 60)
    print("Downloading Full Otzaria Library")
    print("=" * 60)
    print("\nThis will download a large library (~500MB).")
    print("Options:")
    print("1. Download from GitHub releases (recommended)")
    print("2. Clone from GitHub repository")
    print("\nFor option 1, visit:")
    print("https://github.com/zevisvei/otzaria-library/releases")
    print("\nFor option 2, run:")
    print("git clone --depth 1 https://github.com/zevisvei/otzaria-library.git temp_library")
    print("cp -r temp_library/* library/")
    print("rm -rf temp_library")
    print("\nAfter downloading, run: npm run dev")
    print("=" * 60)

if __name__ == "__main__":
    print("Otzaria Library Downloader")
    print("=" * 40)
    print("1. Download essential library (Torah + Mishna + Pirkei Avot)")
    print("2. Download full library (instructions)")
    
    choice = input("\nEnter your choice (1 or 2): ").strip()
    
    if choice == "1":
        download_essential_library()
    else:
        download_full_library()
