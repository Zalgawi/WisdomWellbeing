import { useEffect, useRef } from 'react';
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resource-detail-title"
        className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow hover:bg-white focus-visible:outline-2 focus-visible:outline-cyan-600"
        >
          Close
        </button>
        <img
          className="block aspect-video w-full bg-cyan-50 object-cover"
          src={resource.thumbnail}
          alt={resource.title}
        />
        <div className="flex flex-col gap-3 p-6">
          <p className="text-sm font-medium text-cyan-700">{resource.category}</p>
          <h2 id="resource-detail-title" className="text-2xl font-semibold">
            {resource.title}
          </h2>
          <p className="text-sm text-slate-500">{resource.duration} min</p>
          <p>{resource.description}</p>
          <ul className="flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <li
                className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-500">
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