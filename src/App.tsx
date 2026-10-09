import { useState } from 'react';
import { CategorySection } from './components/CategorySection';
import { ResourceDetail } from './components/ResourceDetail';
import { filterResources } from './lib/filterResources';
import { groupByCategory } from './lib/groupByCategory';
import { CATEGORIES, type Resource } from './types';

interface AppProps {
  resources: Resource[];
}

export default function App({ resources }: AppProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Resource | null>(null);
  const groups = groupByCategory(filterResources(resources, query));

  return (
    <main className="mx-auto max-w-6xl px-4 pt-8 pb-16">
      <h1 className="mb-6 text-3xl font-bold sm:text-4xl">Resource Centre</h1>
      <div className="mb-8">
        <label
          htmlFor="resource-search"
          className="mb-1 block text-sm font-medium"
        >
          Search resources
        </label>
        <input
          id="resource-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title or tag"
          className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-3 py-2"
        />
      </div>
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
        <ResourceDetail
          resource={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}