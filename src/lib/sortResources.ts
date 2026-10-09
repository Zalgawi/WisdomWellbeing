import type { Resource } from '../types';

export type SortOrder = 'default' | 'newest' | 'oldest';

export function sortResources(
  resources: Resource[],
  order: SortOrder,
): Resource[] {
  if (order === 'newest') {
    return [...resources].sort((a, b) =>
      b.date_uploaded.localeCompare(a.date_uploaded),
    );
  }

  if (order === 'oldest') {
    return [...resources].sort((a, b) =>
      a.date_uploaded.localeCompare(b.date_uploaded),
    );
  }

  return resources;
}