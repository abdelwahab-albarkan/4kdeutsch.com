import React from 'react';

/**
 * Shown during route transitions / streaming so visitors see a branded loader
 * instead of a blank screen while the page is being prepared.
 */
export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4" aria-live="polite" aria-busy="true">
      <span
        className="h-10 w-10 rounded-full border-2 border-border-subtle border-t-primary-500 animate-spin"
        role="status"
        aria-label="Wird geladen"
      />
      <span className="text-sm text-gray-500">Wird geladen …</span>
    </div>
  );
}
