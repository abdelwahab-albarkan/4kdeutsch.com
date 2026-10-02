import React from 'react';
import Image from 'next/image';
import { getLibraryImage } from '@/lib/image-library';

/**
 * Responsive content image. Pass `id` to use an image from the library (lib/image-library.ts); the figure renders
 * nothing while the library image is still missing. All library images are 16:9 (1344×768) -> no layout shift.
 * `decorative` renders an empty alt text (purely atmospheric images).
 */
export default function PageFigure({
  id,
  src,
  alt,
  caption,
  priority = false,
  decorative = false,
  className = '',
}: {
  id?: string;
  src?: string;
  alt?: string;
  caption?: string;
  priority?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  const lib = id ? getLibraryImage(id) : null;
  if (id && !lib) return null;
  const finalSrc = lib ? lib.src : src;
  if (!finalSrc) return null;
  const width = lib ? lib.width : 1344;
  const height = lib ? lib.height : 768;
  const text = decorative ? '' : alt ?? lib?.alt ?? '';
  return (
    <figure className={`max-w-5xl mx-auto px-6 py-10 ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-card">
        <Image
          src={finalSrc}
          alt={text}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="h-auto w-full object-cover"
        />
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm text-gray-500">{caption}</figcaption>}
    </figure>
  );
}
