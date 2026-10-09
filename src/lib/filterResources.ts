import type { Resource } from '../types';

export function filterResources(
  resources: Resource[],
  query: string,
): Resource[] {
  const term = query.toLowerCase();

  return resources.filter((resource) =>
    resource.title.toLowerCase().includes(term),
  );
}