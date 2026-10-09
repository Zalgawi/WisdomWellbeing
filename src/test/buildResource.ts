import type { Resource } from '../types';

export const buildResource = (overrides: Partial<Resource> = {}): Resource => ({
  id: '001',
  category: 'Podcasts',
  title: 'Mindful Moments',
  thumbnail: 'https://example.com/photo.jpg',
  tags: ['wellbeing'],
  duration: 25,
  description: 'A calming podcast.',
  date_uploaded: '2025-07-10',
  ...overrides,
});