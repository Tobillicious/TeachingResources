import type { CollectionEntry } from 'astro:content';

type Resource = CollectionEntry<'lessons'> | CollectionEntry<'handouts'> | CollectionEntry<'pbl'> | CollectionEntry<'unitPlans'>;

// Simple keyword extraction from description
const getKeywords = (text: string): Set<string> => {
  return new Set(text.toLowerCase().match(/\b(\w{4,})\b/g) || []); // Words with 4+ letters
};

export const getRelatedContent = (
  currentResource: Resource,
  allResources: Resource[],
  maxResults: number = 3
): Resource[] => {
  const currentTags = new Set(currentResource.data.tags || []);
  const currentKeywords = getKeywords(currentResource.data.description);

  const scoredResources = allResources
    .map(resource => {
      if (resource.id === currentResource.id && resource.collection === currentResource.collection) {
        return { resource, score: -1 }; // Exclude self
      }

      let score = 0;
      const { data } = resource;

      // 1. Shared Learning Area (High weight)
      if (data.learningArea && data.learningArea === currentResource.data.learningArea) {
        score += 50;
      }

      // 2. Shared Tags (Medium weight)
      if (data.tags) {
        const commonTags = data.tags.filter(tag => currentTags.has(tag));
        score += commonTags.length * 20;
      }

      // 3. Content Keywords (Lower weight)
      const resourceKeywords = getKeywords(data.description);
      const commonKeywords = [...resourceKeywords].filter(keyword => currentKeywords.has(keyword));
      score += commonKeywords.length * 2;

      // 4. Proximity of Level (Small weight)
      if ('level' in data && 'level' in currentResource.data) {
        const levelDifference = Math.abs((data.level || 0) - (currentResource.data.level || 0));
        score += Math.max(0, 5 - levelDifference); // Closer levels get more points
      }

      return { resource, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredResources.slice(0, maxResults).map(item => item.resource);
};
