import type { Resource } from '../types';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

interface ResourceDetailProps {
  resource: Resource;
  onClose: () => void;
}

export function ResourceDetail({ resource }: ResourceDetailProps) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="resource-detail-title">
      <img src={resource.thumbnail} alt={resource.title} />
      <p>{resource.category}</p>
      <h2 id="resource-detail-title">{resource.title}</h2>
      <p>{resource.duration} min</p>
      <p>{resource.description}</p>
      <p>
        Uploaded{' '}
        <time dateTime={resource.date_uploaded}>
          {dateFormatter.format(new Date(resource.date_uploaded))}
        </time>
      </p>
    </div>
  );
}