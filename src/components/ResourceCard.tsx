import type { Resource } from '../types';

const MAX_VISIBLE_TAGS = 3;

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article>
      <img src={resource.thumbnail} alt={resource.title} />
      <h3>{resource.title}</h3>
      <p>{resource.duration} min</p>
      <ul>
        {resource.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}