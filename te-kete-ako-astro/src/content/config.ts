// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// Define a reusable schema for the interactive game
const interactiveGameSchema = z.object({
  type: z.enum(['quiz', 'word-find', 'crossword', 'matching-pairs', 'flashcards', 'fill-in-the-blanks', 'drag-and-drop', 'sequencing']),
  title: z.string(),
  data: z.any(), // Allows for flexible data structures for each game type
}).optional();

// 2. Define a `type` and `schema` for each collection
const lessonsCollection = defineCollection({
  type: 'content', // v2.5.0 and newer
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Te Kete Ako'),
    publishDate: z.date().optional(),
    tags: z.array(z.string()).optional(),
    level: z.number().optional(),
    learningArea: z.string().optional(),
    interactiveGame: interactiveGameSchema,
  }),
});

const handoutsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    level: z.number().optional(),
    learningArea: z.string().optional(),
    interactiveGame: interactiveGameSchema,
  }),
});

const unitPlansCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    duration: z.string().optional(),
    tags: z.array(z.string()).optional(),
    learningArea: z.string().optional(),
    cover: image().optional(),
    lessons: z.array(z.string()).optional(), // Will reference lesson slugs
    handouts: z.array(z.string()).optional(), // Will reference handout slugs
    interactiveGame: interactiveGameSchema,
  }),
});

const pblCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    drivingQuestion: z.string(),
    duration: z.string().optional(),
    tags: z.array(z.string()).optional(),
    learningArea: z.string().optional(),
    interactiveGame: interactiveGameSchema,
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'lessons': lessonsCollection,
  'handouts': handoutsCollection,
  'unitPlans': unitPlansCollection,
  'pbl': pblCollection,
};
