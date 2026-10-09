interface ThumbnailProps {
  src: string;
  alt: string;
  className?: string;
}

export function Thumbnail({ src, alt, className }: ThumbnailProps) {
  return <img className={className} src={src} alt={alt} loading="lazy" />;
}