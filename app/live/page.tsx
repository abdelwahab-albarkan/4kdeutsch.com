import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { SPORTS, isLinkableSport, sportHref } from '@/lib/sports';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'Live-Sport per IPTV – Wettbewerbe im Überblick | 4kdeutsch',
  description: 'Bundesliga, DFB-Pokal, Champions League, Premier League, Formel 1 und mehr: Übersicht der Wettbewerbe, die Sie per IPTV verfolgen können.',
  alternates: { canonical: '/live' },
  openGraph: {
    title: 'Live-Sport per IPTV – Wettbewerbe | 4kdeutsch',
    description: 'Übersicht der Sport-Wettbewerbe.',
    url: 'https://4kdeutsch.com/live',
  },
});

export default function LiveHubPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Sport', path: '/iptv-sport' },
          { name: 'Live-Wettbewerbe', path: '/live' },
        ]}
      />
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="font-spartan text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
          Live-Sport <span className="text-gradient">per IPTV</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-10">
          Die wichtigsten Wettbewerbe im Überblick. Welche Übertragungen aktuell enthalten sind, klären Sie bitte vor der Bestellung mit dem Support.
        </p>
        <p className="text-gray-400 leading-relaxed max-w-3xl mb-10">
          Jede Wettbewerbsseite nennt Format und Rahmendaten (etwa Anzahl der Vereine oder Spieltage) und erklärt, wie Sie Live-Sport mit einer IPTV-App verfolgen. Für stabile HD-Übertragungen empfehlen wir mindestens etwa 15 Mbit/s. Zur Bundesliga und zur Champions League gibt es zusätzlich ausführliche Ratgeber unter{' '}
          <Link href="/bundesliga-live-stream" className="text-primary-500 underline">Bundesliga live</Link> und{' '}
          <Link href="/champions-league-live-stream" className="text-primary-500 underline">Champions League live</Link>.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPORTS.filter((s) => isLinkableSport(s.slug)).map((s) => (
            <li key={s.slug}>
              <Link
                href={sportHref(s.slug)}
                className="block h-full rounded-xl border border-border-subtle bg-surface-card/60 p-5 hover:border-primary-500/40 transition-colors"
              >
                <span className="block text-lg font-bold text-white">{s.name}</span>
                <span className="block text-sm text-gray-400">{s.sport}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <PageFigure id="iptv-fussball" />
    </>
  );
}
