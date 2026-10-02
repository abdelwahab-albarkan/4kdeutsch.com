import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { APPS, getDevice } from '@/lib/apps';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Apps und Geräte – Kompatibilität im Überblick | 4kdeutsch',
  description:
    'Welche IPTV-App läuft auf welchem Gerät? Übersicht zu IPTV Smarters Pro, TiviMate, IBO Player und mehr für Fire Stick, Smart TV, Apple TV und Handy.',
  alternates: { canonical: '/iptv-app' },
  openGraph: {
    title: 'IPTV Apps und Geräte – Kompatibilität | 4kdeutsch',
    description: 'Welche IPTV-App läuft auf welchem Gerät?',
    url: 'https://4kdeutsch.com/iptv-app',
  },
});

export default function AppsHubPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Apps', path: '/iptv-apps' },
          { name: 'Apps und Geräte', path: '/iptv-app' },
        ]}
      />
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="font-spartan text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
          IPTV Apps <span className="text-gradient">und Geräte</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-10">
          Nicht jede App ist auf jedem Gerät verfügbar. Diese Übersicht zeigt, welche IPTV-Player Sie auf welcher Plattform einrichten können. Grundlagen finden Sie außerdem in der{' '}
          <Link href="/einrichtung" className="text-primary-500 underline">Einrichtungs-Übersicht</Link>.
        </p>
        <p className="text-gray-400 leading-relaxed max-w-3xl mb-8">
          Die Verfügbarkeit kann je nach Gerät, Modell und Region variieren, und manche Apps (etwa TiviMate oder OTT Navigator auf dem Fire Stick) sind nicht im offiziellen Store erhältlich. Prüfen Sie daher vor der Installation die Store-Seite Ihres Geräts. Einen Vergleich der Apps finden Sie unter{' '}
          <Link href="/iptv-apps" className="text-primary-500 underline">Beste IPTV Apps</Link>.
        </p>
        <div className="space-y-6">
          {APPS.map((a) => (
            <section key={a.slug} className="rounded-xl border border-border-subtle bg-surface-card/50 p-5">
              <h2 className="text-xl font-bold text-white mb-1">
                <Link href={a.existingPage ?? `/iptv-app/${a.slug}`} className="hover:text-primary-500 transition-colors">
                  {a.name}
                </Link>
              </h2>
              <p className="text-sm text-gray-400 mb-3">Stärke: {a.strength}.</p>
              {a.devices.length === 0 && (
                <p className="text-sm text-gray-500">
                  <Link href={`/iptv-app/${a.slug}`} className="text-primary-500 underline">
                    Installation und Playlist hinzufügen
                  </Link>
                </p>
              )}
              <ul className="flex flex-wrap gap-2">
                {a.devices.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/iptv-app/${a.slug}/${s}`}
                      className="inline-block rounded-full border border-border-subtle px-3 py-1 text-sm text-gray-300 hover:border-primary-500/40 transition-colors"
                    >
                      {getDevice(s)?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
