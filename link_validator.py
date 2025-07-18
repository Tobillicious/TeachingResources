import os
from pathlib import Path
import re

# This script is run from the project root.
project_root = Path(os.getcwd())

# List of all HTML files gathered from the previous 'glob' command.
html_files = [
    "index.html", "y8-systems-unit.html", "lesson-plans/lesson-3.html",
    "lesson-plans/lesson-2.html", "lesson-plans/lesson-1.html",
    "handouts/te-reo-maori-greetings-handout.html",
    "handouts/dawn-raids-comprehension-handout.html",
    "handouts/haka-comprehension-handout.html",
    "handouts/writers-toolkit-hook-handout.html",
    "handouts/scientific-method-handout.html",
    "handouts/media-literacy-comprehension-handout.html",
    "handouts/treaty-of-waitangi-handout.html",
    "handouts/authors-purpose-handout.html",
    "handouts/writers-toolkit-peel-argument-handout.html",
    "handouts/writers-toolkit-rhetorical-devices-handout.html",
    "handouts/writers-toolkit-conclusion-handout.html",
    "lesson-plans/lessons.html", "toolkit.html",
    "handouts/cognitive-biases-comprehension-handout.html", "handouts.html",
    "video-integration-test.html", "handouts/probability-handout.html",
    "handouts/plate-tectonics-comprehension-handout.html",
    "handouts/ai-impact-comprehension-handout.html",
    "handouts/bar-graph-handout.html",
    "handouts/science-of-sleep-comprehension-handout.html",
    "writers-toolkit-tone-handout.html", "project/project-brief.html",
    "lesson-plans/lesson-9.html", "lesson-plans/lesson-8.html",
    "lesson-plans/lesson-7.html", "lesson-plans/lesson-6.html",
    "lesson-plans/lesson-5.html", "lesson-plans/lesson-4.html",
    "lesson-plans/lesson-10.html",
    "handouts/writers-toolkit-revision-handout.html",
    "handouts/writers-toolkit-fluency-handout.html",
    "handouts/writers-toolkit-diction-handout.html",
    "handouts/speech-analysis-handout.html",
    "handouts/political-cartoon-analysis-handout.html",
    "handouts/financial-literacy-comprehension-handout.html",
    "handouts/film-scene-analysis-handout.html",
    "ai-art-ethics-comprehension-handout.html",
    "handouts/authors-purpose-entertain-handout.html",
    "handouts/authors-purpose-inform-handout.html",
    "handouts/authors-purpose-persuade-handout.html",
    "handouts/design-thinking-process-handout.html",
    "handouts/digital-citizenship-handout.html",
    "handouts/elements-of-art-handout.html",
    "handouts/figurative-language-handout.html",
    "handouts/future-of-tourism-comprehension-handout.html",
    "handouts/genetic-modification-comprehension-handout.html",
    "handouts/gig-economy-comprehension-handout.html",
    "handouts/housing-affordability-comprehension-handout.html",
    "handouts/microplastics-comprehension-handout.html",
    "handouts/misleading-graphs-comprehension-handout.html",
    "handouts/shakespeare-soliloquy-handout.html",
    "handouts/statistical-investigation-handout.html",
    "handouts/writers-toolkit-analogy-handout.html",
    "handouts/writers-toolkit-inform-structure-handout.html",
    "handouts/writers-toolkit-show-dont-tell-handout.html",
    "handouts/writers-toolkit-suspense-handout.html",
    "handouts/youth-vaping-comprehension-handout.html",
    "project/assessment-rubric.html"
]

# Regex to find href and src attributes.
link_pattern = re.compile(r'(?:href|src)=[""](?!https?://)([^"]+)[""]')

broken_links = {}

for html_file in html_files:
    try:
        file_path = project_root / html_file
        content = file_path.read_text()
        
        # Find all local links in the file.
        links = link_pattern.findall(content)
        
        if not links:
            continue

        for link in links:
            # Ignore anchor links
            if link.startswith('#'):
                continue

            # Construct the absolute path for the linked file.
            base_dir = file_path.parent
            linked_file_path = (base_dir / link).resolve()

            # Check if the file exists.
            if not linked_file_path.exists():
                if html_file not in broken_links:
                    broken_links[html_file] = []
                broken_links[html_file].append(link)

    except FileNotFoundError:
        # This case should ideally not happen if the glob is correct.
        print(f"Warning: HTML file not found: {html_file}")
    except Exception as e:
        print(f"An error occurred while processing {html_file}: {e}")

# Print the report.
if not broken_links:
    print("QA Audit Complete: No broken local links found.")
else:
    print("QA Audit Complete: Found broken links in the following files:")
    for file, links in broken_links.items():
        print(f"\nFile: {file}")
        for link in links:
            print(f"  -> Missing: {link}")

