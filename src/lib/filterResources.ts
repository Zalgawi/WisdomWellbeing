import type { Resource } from '../types';

export function filterResources(
  resources: Resource[],
  query: string,
): Resource[] {
  return resources.filter((resource) => resource.title.includes(query));
}