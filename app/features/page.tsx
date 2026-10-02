import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import Link from 'next/link';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import CompareSection from '@/components/sections/CompareSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata = withSocial({
  title: 'IPTV 4K & Funktionen: EPG, Catch-Up, Mehrfachnutzung | 4kdeutsch',
  description: 'Funktionen des IPTV-Abos im Überblick: IPTV in 4K (je nach Gerät und Sender), EPG-Programmführer, Catch-Up TV, Aufnahmefunktion und Mehrfachnutzung.',
  keywords: [
    'IPTV Features',
    'iptv funktionen',
    'iptv vorteile',
    'iptv alle sender',
    'Premium IPTV',
    '4K IPTV Deutschland',
  ],
  alternates: { canonical: '/features' },
  openGraph: {
    title: 'IPTV 4K & Funktionen: EPG, Catch-Up, Mehrfachnutzung | 4kdeutsch',
    description: '4K Ultra HD (je nach Gerät und Sender), EPG-Programmführer, Catch-Up TV und Mehrfachnutzung – alle Premium-Funktionen von 4kdeutsch.',
    url: 'https://4kdeutsch.com/features',
  },
});

export default function FeaturesPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">
          Premium <span className="text-gradient">IPTV-Funktionen</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Erleben Sie zukunftsweisendes Streaming mit modernem H.265-Codec und Zugriff auf das interaktive EPG-Programmführer- und Aufnahme-Archiv. Alle diese Leistungen sind vollständig in all unseren{' '}
          <Link href="/pricing" className="text-primary-500 hover:underline font-semibold">
            Tarifen & Preisen
          </Link>{' '}
          inbegriffen. In unserem{' '}
          <Link href="/install" className="text-primary-500 hover:underline font-semibold">
            Installations-Bereich
          </Link>{' '}
          erfahren Sie, wie einfach die Einrichtung auf Ihrem Streaming-Gerät ist.
        </p>
      </div>

      <FeaturesGrid showHeader={false} />
      <CompareSection />
      <PageFigure id="iptv-4k" />
      <CTASection />
    </div>
  );
}
