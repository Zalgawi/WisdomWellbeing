export const CATEGORIES = [
  'Podcasts',
  'Articles',
  'Newsletters',
  'Recipes',
  'Fitness',
  'Meditation',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Resource {
  id: string;
  category: Category;
  title: string;
  thumbnail: string;
  tags: string[];
  duration: number;
  description: string;
  date_uploaded: string;
}