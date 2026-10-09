import type { Resource } from '../types';

const MAX_VISIBLE_TAGS = 3;

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="card">
      <img
        className="card-image"
        src={resource.thumbnail}
        alt={resource.title}
        loading="lazy"
      />
      <div className="card-body">
        <h3 className="card-title">{resource.title}</h3>
        <p className="card-duration">{resource.duration} min</p>
        <ul className="tag-list">
          {resource.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
            <li className="tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}