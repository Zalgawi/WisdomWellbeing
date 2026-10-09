import type { Resource } from '../types';

export type SortOrder = 'default' | 'newest' | 'oldest';

const byDateAscending = (a: Resource, b: Resource) =>
  a.date_uploaded.localeCompare(b.date_uploaded);

export function sortResources(
  resources: Resource[],
  order: SortOrder,
): Resource[] {
  switch (order) {
    case 'newest':
      return [...resources].sort((a, b) => byDateAscending(b, a));
    case 'oldest':
      return [...resources].sort(byDateAscending);
    default:
      return resources;
  }
}