import { CategorySection } from './components/CategorySection';
import { groupByCategory } from './lib/groupByCategory';
import { CATEGORIES, type Resource } from './types';

interface AppProps {
  resources: Resource[];
}

export default function App({ resources }: AppProps) {
  const groups = groupByCategory(resources);

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
          />
        ) : null;
      })}
    </main>
  );
}