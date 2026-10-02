'use client';

import React from 'react';

/**
 * Re-opens the cookie consent banner so a visitor can change/withdraw their
 * choice at any time (GDPR: withdrawal must be as easy as giving consent).
 */
export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.removeItem('gsttv-consent');
        } catch {
          /* ignore */
        }
        window.dispatchEvent(new Event('open-cookie-consent'));
      }}
      className={className ?? 'py-2 hover:text-white transition-colors'}
    >
      Cookie-Einstellungen
    </button>
  );
}
