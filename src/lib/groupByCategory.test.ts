import { describe, expect, it } from 'vitest';
import { buildResource } from '../test/buildResource';
import { groupByCategory } from './groupByCategory';

describe('groupByCategory', () => {
  it('returns an empty object when there are no resources', () => {
    expect(groupByCategory([])).toEqual({});
  });

  it('places a single resource under its category', () => {
    const resource = buildResource();

    expect(groupByCategory([resource])).toEqual({ Podcasts: [resource] });
  });

  it('keeps resources in the same category together, in their original order', () => {
    const first = buildResource({ id: '001', title: 'Mindful Moments' });
    const second = buildResource({ id: '007', title: 'Sleep Stories' });

    expect(groupByCategory([first, second])).toEqual({
      Podcasts: [first, second],
    });
  });

  it('separates resources that belong to different categories', () => {
    const podcast = buildResource({ id: '001', category: 'Podcasts' });
    const article = buildResource({ id: '002', category: 'Articles' });

    expect(groupByCategory([podcast, article])).toEqual({
      Podcasts: [podcast],
      Articles: [article],
    });
  });
});