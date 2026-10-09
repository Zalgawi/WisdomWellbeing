import type { Resource } from '../types';
import { Thumbnail } from './Thumbnail';

const MAX_VISIBLE_TAGS = 3;

interface ResourceCardProps {
  resource: Resource;
  onSelect: (resource: Resource) => void;
}

export function ResourceCard({ resource, onSelect }: ResourceCardProps) {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cyan-600">
      <Thumbnail
        className="aspect-video w-full bg-cyan-50 object-cover"
        src={resource.thumbnail}
        alt={resource.title}
      />
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold">
          <button
            type="button"
            onClick={() => onSelect(resource)}
            className="cursor-pointer text-left after:absolute after:inset-0 focus:outline-none"
          >
            {resource.title}
          </button>
        </h3>
        <p className="text-sm text-slate-500">{resource.duration} min</p>
        <ul className="flex flex-wrap gap-2">
          {resource.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
            <li
              className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs"
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