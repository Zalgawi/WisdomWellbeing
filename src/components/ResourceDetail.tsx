import type { Resource } from '../types';

interface ResourceDetailProps {
  resource: Resource;
  onClose: () => void;
}

export function ResourceDetail({ resource }: ResourceDetailProps) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="resource-detail-title">
      <h2 id="resource-detail-title">{resource.title}</h2>
      <p>{resource.description}</p>
    </div>
  );
}