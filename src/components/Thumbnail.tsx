import { useState } from 'react';

interface ThumbnailProps {
  src: string;
  alt: string;
  className?: string;
}

export function Thumbnail({ src, alt, className = '' }: ThumbnailProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div
        className={`${className} flex items-center justify-center text-sm text-slate-600`}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailedSrc(src)}
    />
  );
}