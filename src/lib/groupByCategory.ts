import type { Category, Resource } from '../types';

export type GroupedResources = Partial<Record<Category, Resource[]>>;

export function groupByCategory(resources: Resource[]): GroupedResources {
  const groups: GroupedResources = {};

  for (const resource of resources) {
    const group = groups[resource.category] ?? [];
    group.push(resource);
    groups[resource.category] = group;
  }

  return groups;
}