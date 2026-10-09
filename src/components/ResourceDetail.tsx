import { useEffect } from 'react';
import type { Resource } from '../types';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

interface ResourceDetailProps {
  resource: Resource;
  onClose: () => void;
}

export function ResourceDetail({ resource, onClose }: ResourceDetailProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="resource-detail-title">
      <button type="button" onClick={onClose}>
        Close
      </button>
      <img src={resource.thumbnail} alt={resource.title} />
      <p>{resource.category}</p>
      <h2 id="resource-detail-title">{resource.title}</h2>
      <p>{resource.duration} min</p>
      <p>{resource.description}</p>
      <ul>
        {resource.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <p>
        Uploaded{' '}
        <time dateTime={resource.date_uploaded}>
          {dateFormatter.format(new Date(resource.date_uploaded))}
        </time>
      </p>
    </div>
  );
}