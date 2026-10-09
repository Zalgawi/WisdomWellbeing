import type { Category, Resource } from '../types';

interface CategorySectionProps {
  category: Category;
  resources: Resource[];
}

export function CategorySection({ category }: CategorySectionProps) {
  return (
    <section>
      <h2>{category}</h2>
    </section>
  );
}