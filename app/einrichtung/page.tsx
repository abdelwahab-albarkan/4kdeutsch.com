import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { SETUP_TOPICS } from '@/lib/help';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Einrichtung – Anleitungen für App, M3U, Xtream & EPG | 4kdeutsch',
  description:
    'IPTV einrichten: App installieren, Zugangsdaten eingeben, M3U und Xtream Codes konfigurieren, EPG aktivieren und Netzwerk optimieren – Schritt für Schritt für jedes Gerät.',
  alternates: { canonical: '/einrichtung' },
  openGraph: {
    title: 'IPTV Einrichtung – Anleitungen | 4kdeutsch',
    description: 'Schritt-für-Schritt-Anleitungen zur Einrichtung von IPTV-Apps.',
    url: 'https://4kdeutsch.com/einrichtung',
  },
});

export default function SetupHubPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Einrichtung', path: '/einrichtung' },
        ]}
      />
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="font-spartan text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
          IPTV <span className="text-gradient">Einrichtung</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-10">
          Von der Vorbereitung des Geräts bis zum fertigen Programmführer: Diese Anleitungen führen Sie durch die Einrichtung. Tritt ein Problem auf, hilft der Bereich{' '}
          <Link href="/iptv-hilfe" className="text-primary-500 underline">IPTV Hilfe</Link>.
        </p>
        <p className="text-gray-400 leading-relaxed max-w-3xl mb-10">
          Empfohlene Reihenfolge: zuerst das Gerät vorbereiten und die Netzwerkverbindung prüfen, dann die App installieren, die Zugangsdaten per Xtream Codes oder M3U eintragen und zuletzt den Programmführer (EPG) und den Player konfigurieren. Für Fire TV, Android TV, Samsung, LG, Apple TV und Mobilgeräte gibt es jeweils eigene Schritte.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SETUP_TOPICS.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/einrichtung/${t.slug}`}
                className="block h-full rounded-xl border border-border-subtle bg-surface-card/60 p-5 hover:border-primary-500/40 transition-colors"
              >
                <span className="block text-lg font-bold text-white">{t.title}</span>
                <span className="block text-sm text-gray-400 mt-1">{t.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <PageFigure id="iptv-anleitung" />
    </>
  );
}
