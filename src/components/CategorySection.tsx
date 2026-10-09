import type { Category, Resource } from '../types';
import { ResourceCard } from './ResourceCard';

interface CategorySectionProps {
  category: Category;
  resources: Resource[];
  onSelect: (resource: Resource) => void;
}

export function CategorySection({
  category,
  resources,
  onSelect,
}: CategorySectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 border-b-2 border-cyan-600 pb-2 text-2xl font-semibold">
        {category}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-5">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}