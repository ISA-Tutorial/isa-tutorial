#!/usr/bin/env python3
"""
Simple script to read bio text files and update the HTML file.
Run this script whenever you update the bio text files.
"""

import re
import os

def read_bio_file(filepath):
    """Read a bio text file and return its content."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read().strip()
        return content
    except FileNotFoundError:
        print(f"Warning: {filepath} not found")
        return None

def update_html_bio(html_content, bio_id, bio_text):
    """Update the bio content in HTML."""
    # Pattern to match the bio paragraph with the specific ID
    pattern = rf'(<p id="{bio_id}" class="bio-content">)(.*?)(</p>)'
    
    if bio_text:
        replacement = f'\\1{bio_text}\\3'
        html_content = re.sub(pattern, replacement, html_content, flags=re.DOTALL)
        print(f"✓ Updated {bio_id}")
    else:
        print(f"⚠ Skipped {bio_id} (no content)")
    
    return html_content

def main():
    # Read bio files
    preetam_bio = read_bio_file('bios/preetam-dammu.txt')
    tanya_bio = read_bio_file('bios/tanya-roosta.txt')
    
    # Read HTML file
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Update bios in HTML
    if preetam_bio:
        html_content = update_html_bio(html_content, 'preetam-bio', preetam_bio)
    if tanya_bio:
        html_content = update_html_bio(html_content, 'tanya-bio', tanya_bio)
    
    # Write updated HTML
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("✓ HTML updated successfully!")

if __name__ == '__main__':
    main()

