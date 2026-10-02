import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Gauge, Wifi, Layers, Trophy } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { productSchema, faqSchema } from '@/lib/structured-data';
import { Reveal, Stagger, HoverCard } from '@/components/ui/motion';
import SportsSection from '@/components/sections/SportsSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Sport & IPTV Fußball: Live-Sport streamen 2026 | 4kdeutsch',
  description:
    'IPTV Sport in Deutschland: Fußball, Bundesliga, Champions League, Formel 1 und mehr live in HD/4K (je nach Sender) – Anforderungen und Tipps für stabiles Sport-Streaming.',
  alternates: { canonical: '/iptv-sport' },
  keywords: [
    'Sport IPTV',
    'IPTV für Sport',
    'beste IPTV für Sport',
    'Fußball IPTV',
    'Sport IPTV Deutschland',
    'IPTV für Sportfans',
  ],
  openGraph: {
    title: 'IPTV Sport & IPTV Fußball: Live-Sport streamen 2026 | 4kdeutsch',
    description:
      'Fußball, Bundesliga, Champions League, Formel 1 & mehr live in HD/4K (je nach Sender) – Tipps für stabiles Sport-Streaming.',
    url: 'https://4kdeutsch.com/iptv-sport',
  },
});

const REQUIREMENTS = [
  { icon: Gauge, title: 'Bildrate', text: 'Bei schnellem Sport wie Fußball und Motorsport ist eine hohe Bildrate von Vorteil; ob sie verfügbar ist, hängt vom jeweiligen Sender ab.' },
  { icon: Wifi, title: 'Stabile Internetverbindung', text: 'Wir empfehlen 25–50 MBit/s für Sport-Streaming in 4K/UHD. Ein LAN-Kabel verbessert in der Regel die Stabilität.' },
  { icon: Layers, title: 'Mehrere Verbindungen', text: 'Wenn Sie parallel auf Fernseher und Smartphone schauen möchten, klären Sie vorab, wie viele Verbindungen Ihr Tarif erlaubt.' },
  { icon: Trophy, title: 'Netzwerk-Tipps', text: 'Bei großen Live-Events sind viele Nutzer gleichzeitig online. Eine kabelgebundene Verbindung und ausreichend Bandbreite helfen, Aussetzer zu vermeiden.' },
];

export default function IptvSportPage() {
  return (
    <>
      <JsonLd data={[productSchema(), faqSchema()]} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Sport IPTV', path: '/iptv-sport' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-6 pt-10 pb-8 md:pt-14">
        <Reveal className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-500">
            <Trophy className="h-3.5 w-3.5" strokeWidth={2} />
            Sportkanäle
          </p>
          <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6">
            Sport <span className="text-gradient">IPTV</span> in Deutschland
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Als Sportfan wollen Sie kein Spiel verpassen. Mit <strong className="text-gray-200">Sport-IPTV</strong> von
            4kdeutsch streamen Sie Fußball, Champions League, Bundesliga, Formel 1, US-Sport, Kampfsport und mehr live
            in HD, Full HD und 4K (je nach Sender). Sportkanäle in einem
            einzigen Abonnement. Ausführliche Ratgeber: <a href="/bundesliga-live-stream">IPTV Bundesliga</a> und{' '}
            <a href="/champions-league-live-stream">IPTV Champions League</a>.
          </p>
        </Reveal>
      </section>

      {/* Requirements for sport streaming */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <Reveal className="max-w-3xl mb-12">
          <h2 className="font-spartan text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
            Was Sie für <span className="text-gradient">Sport-Streaming</span> brauchen
          </h2>
          <p className="text-gray-400 leading-relaxed">Für das beste Live-Sport-Erlebnis kommt es auf diese Punkte an:</p>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REQUIREMENTS.map((r) => (
            <HoverCard key={r.title} className="group h-full p-8 rounded-xl border border-border-subtle bg-surface-card/60 shadow-card hover:border-primary-500/40 transition-colors flex gap-5 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-black transition-colors duration-300">
                <r.icon className="h-6 w-6 icon-hover" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{r.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{r.text}</p>
              </div>
            </HoverCard>
          ))}
        </Stagger>
      </section>

      {/* Sport categories (reused) */}
      <SportsSection />

      {/* Internal links */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal className="mb-8">
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Live-Sport <span className="text-gradient">Ratgeber</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/bundesliga-live-stream', title: 'Bundesliga live streamen', desc: 'So sehen Sie die Bundesliga live über IPTV.' },
            { href: '/champions-league-live-stream', title: 'Champions League live', desc: 'UEFA Champions League live streamen – Anleitung & Tipps.' },
            { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-Sport-IPTV ohne Vertrag – ab 5,92 €/Monat.' },
            { href: '/iptv-fire-stick', title: 'IPTV auf Fire Stick', desc: 'Sport auf dem Fernseher: Fire TV Stick einrichten.' },
            { href: '/bestes-iptv', title: 'Bestes IPTV', desc: 'Worauf es beim besten Sport-IPTV ankommt.' },
            { href: '/faq', title: 'Häufige Fragen', desc: 'Warum ruckelt IPTV? Welche App ist die beste?' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="group rounded-xl border border-border-subtle bg-surface-card/50 p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary-500/40">
              <div className="text-base font-bold text-white group-hover:text-primary-500 transition-colors mb-2">{link.title}</div>
              <p className="text-sm text-gray-400 leading-relaxed">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <PageFigure id="iptv-sport" />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
