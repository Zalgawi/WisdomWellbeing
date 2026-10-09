import { useState } from 'react';
import { CategorySection } from './components/CategorySection';
import { ResourceDetail } from './components/ResourceDetail';
import { groupByCategory } from './lib/groupByCategory';
import { CATEGORIES, type Resource } from './types';

interface AppProps {
  resources: Resource[];
}

export default function App({ resources }: AppProps) {
  const groups = groupByCategory(resources);
  const [selected, setSelected] = useState<Resource | null>(null);

  return (
    <main className="mx-auto max-w-6xl px-4 pt-8 pb-16">
      <h1 className="mb-8 text-3xl font-bold sm:text-4xl">Resource Centre</h1>
      {CATEGORIES.map((category) => {
        const group = groups[category];

        return group ? (
          <CategorySection
            key={category}
            category={category}
            resources={group}
            onSelect={setSelected}
          />
        ) : null;
      })}
      {selected && (
        <ResourceDetail resource={selected} onClose={() => undefined} />
      )}
    </main>
  );
}