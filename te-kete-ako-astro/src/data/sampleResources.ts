// SimplificationAgent: The Resource interface is now decoupled from Firebase.
// The `createdAt` field is a standard ISO string, making it serializable and independent.
export interface Resource {
  id: string;
  title: string;
  description: string;
  learningArea: string;
  level: number;
  authorId: string;
  authorName: string;
  createdAt: string; // Changed from Timestamp to string
  fileUrl?: string;
  fileName?: string;
  learningIntentions?: string;
  successCriteria?: string;
  requiredMaterials?: string;
}

// DeveloperAgent: This file is now only for type definitions.
// The sample data has been moved to /public/resources.json to decouple data from the application code.
export const sampleResources: Resource[] = [];