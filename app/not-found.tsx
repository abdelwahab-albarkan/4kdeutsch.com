import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden | 4kdeutsch',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="font-spartan text-6xl sm:text-8xl font-black text-primary-500 tracking-tight mb-2">404</div>
      <h1 className="font-spartan text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
        Seite nicht gefunden
      </h1>
      <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed mb-8">
        Die gewünschte Seite existiert nicht oder wurde verschoben. Kehren Sie zur Startseite zurück oder
        entdecken Sie unsere IPTV-Tarife.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary-500 px-6 text-sm font-semibold text-black hover:bg-primary-600 transition-colors"
        >
          Zur Startseite
        </Link>
        <Link
          href="/pricing"
          className="inline-flex h-11 items-center justify-center rounded-md border border-border-subtle bg-surface px-6 text-sm font-semibold text-white hover:bg-surface-hover transition-colors"
        >
          Tarife ansehen
        </Link>
      </div>
    </div>
  );
}
