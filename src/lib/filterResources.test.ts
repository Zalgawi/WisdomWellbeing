import { describe, expect, it } from 'vitest';
import { buildResource } from '../test/buildResource';
import { filterResources } from './filterResources';

describe('filterResources', () => {
  it('returns only the resources whose title contains the query', () => {
    const mindful = buildResource({ id: '001', title: 'Mindful Moments' });
    const sleep = buildResource({ id: '002', title: 'The Science of Sleep' });

    expect(filterResources([mindful, sleep], 'Sleep')).toEqual([sleep]);
  });

  it('ignores letter case when matching the title', () => {
    const mindful = buildResource({ id: '001', title: 'Mindful Moments' });
    const sleep = buildResource({ id: '002', title: 'The Science of Sleep' });

    expect(filterResources([mindful, sleep], 'sLeEp')).toEqual([sleep]);
  });
});