import React from 'react';
import Image from 'next/image';
import { getLibraryImage } from '@/lib/image-library';

/**
 * Library image for layouts that provide their own box. Use `fill` inside a relatively positioned, sized container,
 * otherwise the intrinsic 16:9 dimensions are used. Renders nothing while the library image is missing.
 */
export default function LibImage({
  id,
  sizes,
  className = '',
  fill = false,
  priority = false,
  decorative = false,
}: {
  id: string;
  sizes: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  decorative?: boolean;
}) {
  const lib = getLibraryImage(id);
  if (!lib) return null;
  const alt = decorative ? '' : lib.alt ?? '';
  return fill ? (
    <Image src={lib.src} alt={alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : 'lazy'} className={className} />
  ) : (
    <Image src={lib.src} alt={alt} width={lib.width} height={lib.height} sizes={sizes} priority={priority} loading={priority ? undefined : 'lazy'} className={className} />
  );
}
