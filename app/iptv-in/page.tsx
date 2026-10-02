import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { CITIES, CITY_PAGES_INDEXABLE } from '@/lib/cities';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV nach Stadt – Premium IPTV in ganz Deutschland | 4kdeutsch',
  description: 'IPTV-Abo für Ihre Stadt: Berlin, Hamburg, München, Köln und mehr. Live-TV, Sport & VOD ohne Vertrag.',
  alternates: { canonical: '/iptv-in' },
  robots: CITY_PAGES_INDEXABLE ? undefined : { index: false, follow: true },
});

export default function CitiesHubPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV nach Stadt', path: '/iptv-in' },
        ]}
      />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="font-spartan text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
          IPTV in <span className="text-gradient">ganz Deutschland</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mb-10">Wählen Sie Ihre Stadt und starten Sie mit Premium-IPTV.</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CITIES.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/iptv-in/${c.slug}`}
                className="block rounded-xl border border-border-subtle bg-surface-card/60 p-5 hover:border-primary-500/40 transition-colors"
              >
                <span className="block text-lg font-bold text-white">IPTV {c.name}</span>
                <span className="block text-sm text-gray-400">{c.state}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
