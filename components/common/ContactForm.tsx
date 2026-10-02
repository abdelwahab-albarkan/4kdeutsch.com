'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

const FIELD =
  'bg-surface border border-border-subtle hover:border-gray-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-md px-3 py-2.5 text-sm text-white transition-all outline-none';
const LABEL = 'text-xs font-bold text-gray-400 uppercase tracking-wider';

/**
 * Contact form without a backend: it prepares an e-mail in the visitor's own mail program (mailto).
 * No data is sent to our servers by this form.
 */
export default function ContactForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') ?? '');
    const email = String(f.get('email') ?? '');
    const msg = String(f.get('msg') ?? '');
    const subject = `Anfrage über 4kdeutsch.com von ${name}`;
    const body = `${msg}\n\n—\nName: ${name}\nE-Mail: ${email}`;
    window.location.href = `mailto:${SITE_CONFIG.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDone(true);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={LABEL}>
          Name
        </label>
        <input type="text" id="name" name="name" autoComplete="name" className={FIELD} required />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={LABEL}>
          E-Mail-Adresse
        </label>
        <input type="email" id="email" name="email" autoComplete="email" className={FIELD} required />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="msg" className={LABEL}>
          Ihre Nachricht
        </label>
        <textarea id="msg" name="msg" rows={5} className={`${FIELD} resize-none`} required />
      </div>

      <button
        type="submit"
        className="flex h-11 items-center justify-center gap-2 rounded-md bg-primary-500 text-sm font-semibold text-black hover:bg-primary-600 active:scale-95 transition-all"
      >
        E-Mail vorbereiten
      </button>
      <p className="text-xs text-gray-500 leading-relaxed" role="status">
        {done
          ? 'Ihr E-Mail-Programm sollte sich geöffnet haben. Falls nicht, schreiben Sie uns direkt an '
          : 'Das Formular öffnet Ihr E-Mail-Programm mit einer vorbereiteten Nachricht; es werden keine Daten an unseren Server übertragen. Oder schreiben Sie direkt an '}
        <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-primary-500 hover:underline">
          {SITE_CONFIG.supportEmail}
        </a>
        .
      </p>
    </form>
  );
}
