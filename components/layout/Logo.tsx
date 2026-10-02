import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_LOGO } from '@/lib/brand';

/**
 * Site logo. Uses the official asset from lib/brand.ts once it exists; until then only the plain site name is shown
 * (no invented logo mark).
 */
export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="4kdeutsch – Startseite"
      className="flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]"
    >
      {BRAND_LOGO ? (
        <Image
          src={BRAND_LOGO.src}
          alt="4kdeutsch"
          width={BRAND_LOGO.width}
          height={BRAND_LOGO.height}
          priority
          unoptimized={BRAND_LOGO.src.endsWith('.svg')}
          className="h-11 w-auto lg:h-14"
        />
      ) : (
        <span className="text-xl font-bold leading-none tracking-tight text-white lg:text-2xl">4kdeutsch</span>
      )}
    </Link>
  );
}
