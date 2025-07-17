import type { Resource } from '../data/sampleResources';
import resources from '../../public/resources.json';

export function getResources(): Resource[] {
  try {
    return resources.sort((a: Resource, b: Resource) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return [];
  }
}
