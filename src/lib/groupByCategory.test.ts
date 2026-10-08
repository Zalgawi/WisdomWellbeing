import { describe, expect, it } from 'vitest';
import type { Resource } from '../types';
import { groupByCategory } from './groupByCategory';

const buildResource = (overrides: Partial<Resource> = {}): Resource => ({
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

describe('groupByCategory', () => {
  it('returns an empty object when there are no resources', () => {
    expect(groupByCategory([])).toEqual({});
  });

  it('places a single resource under its category', () => {
    const resource = buildResource();

    expect(groupByCategory([resource])).toEqual({ Podcasts: [resource] });
  });
});