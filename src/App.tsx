import { CategorySection } from './components/CategorySection';
import { groupByCategory } from './lib/groupByCategory';
import { CATEGORIES, type Resource } from './types';

interface AppProps {
  resources: Resource[];
}

export default function App({ resources }: AppProps) {
  const groups = groupByCategory(resources);

  return (
    <main className="page">
      <h1 className="page-title">Resource Centre</h1>
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