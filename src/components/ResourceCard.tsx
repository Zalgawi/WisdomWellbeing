import { categoryStyles } from '../lib/categoryStyles';
import type { Resource } from '../types';
import { Thumbnail } from './Thumbnail';

const MAX_VISIBLE_TAGS = 3;

interface ResourceCardProps {
  resource: Resource;
  onSelect: (resource: Resource) => void;
}

export function ResourceCard({ resource, onSelect }: ResourceCardProps) {
  const styles = categoryStyles[resource.category];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white text-slate-900 shadow-lg shadow-black/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cyan-300">
      <div className={`h-1.5 bg-linear-to-r ${styles.gradient}`} />
      <div className="relative overflow-hidden">
        <Thumbnail
          className="aspect-video w-full bg-slate-200 object-cover transition-transform duration-500 group-hover:scale-105"
          src={resource.thumbnail}
          alt={resource.title}
        />
        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-slate-950/75 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          {resource.duration} min
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg leading-snug font-semibold">
          <button
            type="button"
            onClick={() => onSelect(resource)}
            className={`cursor-pointer text-left transition-colors ${styles.hoverTitle} after:absolute after:inset-0 focus:outline-none`}
          >
            {resource.title}
          </button>
        </h3>
        <ul className="mt-auto flex flex-wrap gap-2">
          {resource.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
            <li
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles.tag}`}
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}