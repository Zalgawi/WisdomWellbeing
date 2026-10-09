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
    <section className="category">
      <h2 className="category-title">{category}</h2>
      <div className="card-grid">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}