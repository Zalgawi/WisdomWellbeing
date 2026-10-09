import type { Category, Resource } from '../types';
import { ResourceCard } from './ResourceCard';

interface CategorySectionProps {
  category: Category;
  resources: Resource[];
}

export function CategorySection({
  category,
  resources,
}: CategorySectionProps) {
  return (
    <section>
      <h2>{category}</h2>
      <div>
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}