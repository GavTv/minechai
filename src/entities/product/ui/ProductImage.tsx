import { useState } from 'react';
import { fallbackPhoto } from '@/shared/lib';
import './product-image.css';

interface Props {
  src: string | null;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/** Product photo; if the original file is missing, a simple stand-in is shown. */
export function ProductImage({ src, alt, className = '', loading = 'lazy' }: Props) {
  const [broken, setBroken] = useState<string | null>(null);
  const placeholder = fallbackPhoto(alt || src || '');
  const url = !src || broken === src ? placeholder : src;

  return (
    <img
      className={`product-image ${className}`}
      src={url}
      alt={alt}
      width={400}
      height={400}
      loading={loading}
      onError={() => {
        if (src && broken !== src) setBroken(src);
      }}
    />
  );
}
