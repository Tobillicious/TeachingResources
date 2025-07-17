import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

const turndownService = new TurndownService();

const sourceDir = path.join(process.cwd(), '..', 'handouts');
const targetDir = path.join(process.cwd(), 'src', 'content', 'handouts');

async function migrateHandouts() {
  try {
    await fs.mkdir(targetDir, { recursive: true });
    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      if (path.extname(file) === '.html') {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file.replace('.html', '.md'));

        const htmlContent = await fs.readFile(sourcePath, 'utf-8');
        const $ = cheerio.load(htmlContent);

        const title = $('title').text() || $('h1').first().text();
        const bodyHtml = $('body').html();
        
        if (!title || !bodyHtml) {
          console.warn(`Could not extract title or body from ${file}. Skipping.`);
          continue;
        }

        // Generate a simple description from the first paragraph
        const firstParagraph = $('p').first().text().trim();
        const description = firstParagraph.length > 150 ? firstParagraph.substring(0, 147) + '...' : firstParagraph;

        // Generate tags from h2 headings
        const tags = $('h2').map((i, el) => $(el).text().trim()).get();

        const markdownBody = turndownService.turndown(bodyHtml);

        const frontmatter = `---
title: "${title.replace(/"/g, '\"')}"
description: "${description.replace(/"/g, '\"')}"
tags: ${JSON.stringify(tags)}
---

${markdownBody}
`;

        await fs.writeFile(targetPath, frontmatter);
        console.log(`Migrated ${file} to ${path.basename(targetPath)}`);
      }
    }
    console.log('Migration complete!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

migrateHandouts();