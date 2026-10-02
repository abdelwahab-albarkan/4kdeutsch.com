import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { PROBLEMS } from '@/lib/help';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Probleme lösen – Hilfe & Fehlerbehebung | 4kdeutsch',
  description:
    'IPTV Probleme selbst beheben: App lädt nicht, Login klappt nicht, EPG fehlt, Bild schwarz oder Ruckeln. Schritt-für-Schritt-Anleitungen für Fire TV, Smart TV und mehr.',
  alternates: { canonical: '/iptv-hilfe' },
  openGraph: {
    title: 'IPTV Probleme lösen – Hilfe & Fehlerbehebung | 4kdeutsch',
    description: 'Schritt-für-Schritt-Anleitungen bei typischen IPTV-Problemen.',
    url: 'https://4kdeutsch.com/iptv-hilfe',
  },
});

export default function HelpHubPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Hilfe', path: '/iptv-hilfe' },
        ]}
      />
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="font-spartan text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
          IPTV <span className="text-gradient">Probleme lösen</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-10">
          Hier finden Sie Anleitungen zu den häufigsten Problemen bei der Nutzung von IPTV-Apps. Wählen Sie Ihr Problem und anschließend Ihr Gerät, um passende Schritte zu erhalten.
          Für die erste Einrichtung hilft unser <Link href="/einrichtung" className="text-primary-500 underline">Einrichtungs-Bereich</Link>.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROBLEMS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/iptv-hilfe/${p.slug}`}
                className="block h-full rounded-xl border border-border-subtle bg-surface-card/60 p-5 hover:border-primary-500/40 transition-colors"
              >
                <span className="block text-lg font-bold text-white">{p.title}</span>
                <span className="block text-sm text-gray-400 mt-1">{p.symptom}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <PageFigure id="iptv-probleme" decorative />
    </>
  );
}
