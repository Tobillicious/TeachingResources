import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'handouts');
const targetDir = path.join(__dirname, 'te-kete-ako-astro', 'src', 'content', 'handouts');

async function migrate() {
  try {
    await fs.mkdir(targetDir, { recursive: true });
    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      if (path.extname(file) === '.html') {
        const sourcePath = path.join(sourceDir, file);
        const content = await fs.readFile(sourcePath, 'utf-8');

        const titleMatch = content.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : 'Untitled';

        const newFileName = path.basename(file, '.html') + '.md';
        const targetPath = path.join(targetDir, newFileName);

        const frontmatter = `---\ntitle: "${title.replace(/"/g, '\"')}"\ndescription: "A handout on the topic of ${title}."\ntags: []\nlevel: 0\nlearningArea: "Uncategorized"\n---\n\nThis handout was automatically migrated from an HTML file. Please review and update the content and frontmatter.\n`;

        await fs.writeFile(targetPath, frontmatter);
        console.log(`Migrated ${file} to ${newFileName}`);
      }
    }
    console.log('Migration complete!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

migrate();
