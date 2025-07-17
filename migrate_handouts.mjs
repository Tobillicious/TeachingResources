import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handoutsDir = path.join(__dirname, 'handouts');
const markdownDir = path.join(__dirname, 'te-kete-ako-astro', 'src', 'content', 'handouts');

async function createMarkdownFromHtml(htmlFilePath, markdownDirPath) {
  try {
    const htmlContent = await fs.readFile(htmlFilePath, 'utf-8');

    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'Untitled';

    const bodyMatch = htmlContent.match(/<body>([\s\S]*)<\/body>/);
    const bodyContent = bodyMatch ? bodyMatch[1].trim() : '';

    const fileName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.md';
    const markdownFilePath = path.join(markdownDirPath, fileName);

    const frontmatter = `---
title: "${title}"
description: "A handout on ${title}."
tags: []
level: 1
learningArea: "Uncategorized"
---

${bodyContent}
`;

    await fs.writeFile(markdownFilePath, frontmatter, 'utf-8');
    console.log(`Migrated ${path.basename(htmlFilePath)}`);
  } catch (error) {
    console.error(`Error migrating ${htmlFilePath}:`, error);
  }
}

async function main() {
  try {
    await fs.mkdir(markdownDir, { recursive: true });
    const files = await fs.readdir(handoutsDir);

    for (const file of files) {
      if (file.endsWith('.html')) {
        const htmlFilePath = path.join(handoutsDir, file);
        await createMarkdownFromHtml(htmlFilePath, markdownDir);
      }
    }
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

main();
