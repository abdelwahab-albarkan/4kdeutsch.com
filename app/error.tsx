'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

/**
 * Page-level error boundary. Keeps the global layout (Navbar/Footer) and shows a
 * recovery UI instead of a blank screen when a page/section throws at runtime.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface for production monitoring without breaking the page.
    console.error('Page error boundary:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
        Etwas ist <span className="text-primary-500">schiefgelaufen</span>
      </h1>
      <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed mb-8">
        Diese Seite konnte nicht vollständig geladen werden. Bitte versuchen Sie es erneut – oder
        kontaktieren Sie uns direkt per WhatsApp.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary-500 px-6 text-sm font-semibold text-black hover:bg-primary-600 transition-colors"
        >
          Erneut versuchen
        </button>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md border border-border-subtle bg-surface px-6 text-sm font-semibold text-white hover:bg-surface-hover transition-colors"
        >
          Zur Startseite
        </Link>
        <a
          href="https://wa.me/212625218443?text=Hallo%2C%20ich%20habe%20eine%20Frage."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-md border border-primary-500/40 px-6 text-sm font-semibold text-primary-500 hover:bg-primary-500/5 transition-colors"
        >
          WhatsApp-Support
        </a>
      </div>
    </div>
  );
}
