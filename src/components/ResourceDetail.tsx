import { useEffect, useRef } from 'react';
import { categoryStyles } from '../lib/categoryStyles';
import type { Resource } from '../types';
import { Thumbnail } from './Thumbnail';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

interface ResourceDetailProps {
  resource: Resource;
  onClose: () => void;
}

export function ResourceDetail({ resource, onClose }: ResourceDetailProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const styles = categoryStyles[resource.category];

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, []);

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
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resource-detail-title"
        className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white text-slate-900 shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-3 z-10 cursor-pointer rounded-full bg-slate-950/70 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm hover:bg-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Close
        </button>
        <div className={`h-1.5 bg-linear-to-r ${styles.gradient}`} />
        <Thumbnail
          className="aspect-video w-full bg-slate-200 object-cover"
          src={resource.thumbnail}
          alt={resource.title}
        />
        <div className="flex flex-col gap-3 p-6">
          <p className={`text-sm font-semibold ${styles.label}`}>
            {resource.category}
          </p>
          <h2
            id="resource-detail-title"
            className="text-2xl font-semibold text-slate-900"
          >
            {resource.title}
          </h2>
          <p className="text-sm text-slate-600">{resource.duration} min</p>
          <p className="leading-relaxed text-slate-700">{resource.description}</p>
          <ul className="flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <li
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles.tag}`}
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600">
            Uploaded{' '}
            <time dateTime={resource.date_uploaded}>
              {dateFormatter.format(new Date(resource.date_uploaded))}
            </time>
          </p>
        </div>
      </div>
    </div>
  );
}