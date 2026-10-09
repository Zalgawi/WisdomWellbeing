import { useState, type ChangeEvent } from 'react';
import { CategorySection } from './components/CategorySection';
import { ResourceDetail } from './components/ResourceDetail';
import { filterResources } from './lib/filterResources';
import { groupByCategory } from './lib/groupByCategory';
import { sortResources, type SortOrder } from './lib/sortResources';
import { CATEGORIES, type Resource } from './types';

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'default', label: 'Default order' },
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
];

interface AppProps {
  resources: Resource[];
}

export default function App({ resources }: AppProps) {
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');
  const [selected, setSelected] = useState<Resource | null>(null);
  const filteredResources = filterResources(resources, query);
  const visibleResources = sortResources(filteredResources, sortOrder);
  const groups = groupByCategory(visibleResources);
  const hasNoMatches = query.trim() !== '' && visibleResources.length === 0;

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const option = SORT_OPTIONS.find(({ value }) => value === event.target.value);

    if (option) {
      setSortOrder(option.value);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 size-[32rem] rounded-full bg-violet-600/30 blur-3xl" />
        <div className="absolute top-24 -right-48 size-[30rem] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-[70rem] -left-48 size-[30rem] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute top-[110rem] -right-48 size-[30rem] rounded-full bg-rose-500/15 blur-3xl" />
      </div>
      <main className="relative mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6">
        <header className="mb-10">
          <p className="mb-2 text-sm font-medium tracking-widest text-cyan-300 uppercase">
            HA | Wisdom Wellbeing
          </p>
          <h1 className="bg-linear-to-r from-white via-cyan-100 to-violet-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            Resource Centre
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-300">
            Podcasts, recipes, workouts and more to support your physical and
            mental wellbeing.
          </p>
        </header>
        <div className="mb-12 flex flex-wrap items-end gap-4">
          <div className="w-full max-w-md">
            <label
              htmlFor="resource-search"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Search resources
            </label>
            <div className="relative">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id="resource-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title or tag"
                className="w-full rounded-xl border border-white/15 bg-white/10 py-2.5 pr-3 pl-10 text-white backdrop-blur placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="resource-sort"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Sort by date
            </label>
            <select
              id="resource-sort"
              value={sortOrder}
              onChange={handleSortChange}
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-white backdrop-blur focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 focus:outline-none [&>option]:bg-slate-900"
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {hasNoMatches && (
          <p role="status" className="text-slate-300">
            No resources match your search.
          </p>
        )}
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
    </div>
  );
}