import { getCollection } from 'astro:content';
import { writeFile } from 'fs/promises';
import path from 'path';
import FlexSearch from 'flexsearch';

console.log('Generating resources.json and search-index.json...');

try {
  // Get all content
  const collections = await Promise.all([
    getCollection('lessons'),
    getCollection('handouts'),
    getCollection('pbl'),
    getCollection('unitPlans'),
  ]);
  const allContent = collections.flat();

  // Map to a simpler format for the main resources file
  const allResources = allContent.map((resource, index) => ({
    id: index, // Assign a simple numeric ID
    collection: resource.collection,
    slug: resource.slug,
    data: {
      title: resource.data.title,
      description: resource.data.description,
      tags: resource.data.tags || [],
      learningArea: resource.data.learningArea || '',
      level: resource.data.level || null,
    },
  }));

  // Create the search index
  const index = new FlexSearch.Document({
    document: {
      id: "id",
      index: ["data:title", "data:description", "data:tags", "data:learningArea"],
      store: ["collection", "slug", "data:title", "data:description"]
    },
    tokenize: "forward"
  });

  allResources.forEach(resource => {
    index.add(resource);
  });

  // Export the index
  const exportedIndex = {};
  index.export((key, data) => {
    exportedIndex[key] = data;
  });

  // Define output paths
  const resourcePath = path.join(process.cwd(), 'public', 'resources.json');
  const indexPath = path.join(process.cwd(), 'public', 'search-index.json');

  // Write both files
  await Promise.all([
    writeFile(resourcePath, JSON.stringify(allResources, null, 2)),
    writeFile(indexPath, JSON.stringify(exportedIndex)),
  ]);

  console.log(`Successfully generated resources.json (${allResources.length} items) and search-index.json.`);

} catch (error) {
  console.error('Failed to generate files:', error);
  process.exit(1);
}
