import { describe, expect, it } from 'vitest';
import { buildResource } from '../test/buildResource';
import { sortResources } from './sortResources';

describe('sortResources', () => {
  it('puts the most recently uploaded resource first when sorting newest first', () => {
    const older = buildResource({ id: '001', date_uploaded: '2025-06-22' });
    const newer = buildResource({ id: '002', date_uploaded: '2025-08-01' });

    expect(sortResources([older, newer], 'newest')).toEqual([newer, older]);
  });

  it('puts the earliest uploaded resource first when sorting oldest first', () => {
    const older = buildResource({ id: '001', date_uploaded: '2025-06-22' });
    const newer = buildResource({ id: '002', date_uploaded: '2025-08-01' });

    expect(sortResources([newer, older], 'oldest')).toEqual([older, newer]);
  });
});