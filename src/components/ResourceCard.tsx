import type { Resource } from '../types';

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
        {resource.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}