'use client';

import React from 'react';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Root-level error boundary. Replaces the entire document (incl. <html>/<body>)
 * if the root layout itself throws — the last line of defence against a blank
 * white screen. Styles are inline so it renders even if the stylesheet failed
 * to load (e.g. flaky in-app browsers).
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    // Never hide root errors silently — surface for production monitoring.
    console.error('Global error boundary:', error);
  }, [error]);

  const wa =
    `${SITE_CONFIG.whatsappUrl}?text=Hallo%2C%20die%20Website%20l%C3%A4dt%20bei%20mir%20nicht%20richtig.`;
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070707',
          color: '#f4f4f5',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 440, textAlign: 'center' }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: '#10D96F', letterSpacing: '-1px' }}>
            4kdeutsch
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: '20px 0 8px' }}>
            Es ist ein Fehler aufgetreten
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: '#a1a1aa', margin: '0 0 24px' }}>
            Die Seite konnte nicht vollständig geladen werden. Bitte laden Sie die Seite neu.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => reset()}
              style={{
                height: 48,
                padding: '0 24px',
                borderRadius: 8,
                border: 'none',
                background: '#10D96F',
                color: '#000',
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              Seite neu laden
            </button>
            <a
              href="/"
              style={{
                height: 48,
                padding: '0 24px',
                borderRadius: 8,
                border: '1px solid #222',
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              Zur Startseite
            </a>
            <a
              href={wa}
              style={{
                height: 48,
                padding: '0 24px',
                borderRadius: 8,
                border: '1px solid #10D96F',
                color: '#10D96F',
                fontWeight: 600,
                fontSize: 15,
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              WhatsApp-Support
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
