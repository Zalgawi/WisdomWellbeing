import type { Resource } from '../types';

const MAX_VISIBLE_TAGS = 3;

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <img
        className="block aspect-video w-full bg-cyan-50 object-cover"
        src={resource.thumbnail}
        alt={resource.title}
        loading="lazy"
      />
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold">{resource.title}</h3>
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