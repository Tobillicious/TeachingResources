import os
from bs4 import BeautifulSoup
import re

def create_markdown_from_html(html_file_path, markdown_dir):
    with open(html_file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    title = soup.title.string if soup.title else 'Untitled'
    body_content = soup.body.prettify() if soup.body else ''

    # Basic cleaning of the title for the filename
    file_name = re.sub(r'[^a-z0-9]+', '-', title.lower()) + '.md'
    markdown_file_path = os.path.join(markdown_dir, file_name)

    # Create frontmatter
    frontmatter = f"""---
title: "{title}"
description: "A handout on {title}."
tags: []
level: 1
learningArea: "Uncategorized"
---

{body_content}
"""

    with open(markdown_file_path, 'w', encoding='utf-8') as f:
        f.write(frontmatter)

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    handouts_dir = os.path.join(script_dir, 'handouts')
    markdown_dir = os.path.join(script_dir, 'te-kete-ako-astro', 'src', 'content', 'handouts')

    if not os.path.exists(markdown_dir):
        os.makedirs(markdown_dir)

    for filename in os.listdir(handouts_dir):
        if filename.endswith('.html'):
            html_file_path = os.path.join(handouts_dir, filename)
            create_markdown_from_html(html_file_path, markdown_dir)
            print(f"Migrated {filename}")

if __name__ == '__main__':
    main()
