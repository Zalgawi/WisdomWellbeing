import { categoryStyles } from '../lib/categoryStyles';
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
  const styles = categoryStyles[category];

  return (
    <section className="mb-14">
      <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold tracking-tight text-white">
        <span
          aria-hidden="true"
          className={`h-7 w-1.5 rounded-full bg-linear-to-b ${styles.gradient}`}
        />
        {category}
      </h2>
      <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pt-2 pb-5 [scrollbar-color:#475569_transparent] [scrollbar-width:thin] sm:-mx-6 sm:scroll-px-6 sm:px-6">
        {resources.map((resource) => (
          <div key={resource.id} className="w-72 shrink-0 snap-start sm:w-80">
            <ResourceCard resource={resource} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </section>
  );
}