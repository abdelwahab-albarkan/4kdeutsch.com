import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Server, Tv, Euro, Headphones, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { breadcrumbSchema } from '@/lib/structured-data';
import { Reveal, Stagger, HoverCard } from '@/components/ui/motion';
import CompareSection from '@/components/sections/CompareSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Anbieter Vergleich 2026: Kriterien, Test & Erfahrungen | 4kdeutsch',
  description:
    'IPTV Anbieter vergleichen: 6 Kriterien für Stabilität, Bildqualität, Preis und Support – dazu Hinweise zu IPTV Test, Erfahrungen und Tarifen. Allgemeine Orientierung, kein Anbieter-Ranking.',
  alternates: { canonical: '/iptv-vergleich' },
  keywords: [
    'IPTV Anbieter',
    'IPTV Anbieter Vergleich',
    'IPTV Vergleich',
    'IPTV Test',
    'beste IPTV Anbieter',
    'beste IPTV',
  ],
  openGraph: {
    title: 'IPTV Anbieter Vergleich 2026: Kriterien, Test & Erfahrungen | 4kdeutsch',
    description:
      'IPTV Anbieter vergleichen: 6 Kriterien für Stabilität, Qualität, Preis und Support sowie Hinweise zu IPTV Test und Erfahrungen.',
    url: 'https://4kdeutsch.com/iptv-vergleich',
  },
});

const CRITERIA = [
  { icon: Server, title: 'Server-Stabilität', text: 'Wie zuverlässig läuft der Stream bei Live-Sport? Achten Sie auf transparente Angaben zur Verfügbarkeit.' },
  { icon: Tv, title: 'Bild- & Senderqualität', text: '4K-Qualität, soweit vom Sender bereitgestellt – und eine große, gepflegte Senderliste mit VOD-Archiv.' },
  { icon: Euro, title: 'Preis & Laufzeit', text: 'Transparente Preise, faire Laufzeiten und keine Vertragsbindung. Vergleichen Sie den Preis pro Monat.' },
  { icon: ShieldCheck, title: 'Seriosität & Sicherheit', text: 'Sichere Zahlung, klare Bedingungen und Datenschutz. Unrealistisch günstige „Alles-Pakete“ sind ein Warnsignal.' },
  { icon: Headphones, title: 'Support', text: 'Ein erreichbarer, deutschsprachiger Support – idealerweise per WhatsApp und E-Mail.' },
  { icon: Check, title: 'Gerätekompatibilität', text: 'Läuft der Dienst auf Fire Stick, Samsung, LG, Android & Apple TV? Je flexibler, desto besser.' },
];

export default function IptvVergleichPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Vergleich', path: '/iptv-vergleich' },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Vergleich', path: '/iptv-vergleich' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-6 pt-10 pb-8 md:pt-14">
        <Reveal className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-500">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            Objektive Vergleichskriterien
          </p>
          <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6">
            IPTV <span className="text-gradient">Anbieter &amp; Tarife</span> im Vergleich 2026
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Ein guter <strong className="text-gray-200">IPTV Anbieter Vergleich</strong> hört nicht beim Preis auf. Damit Sie das
            beste IPTV für Ihre Bedürfnisse finden, sollten Sie Anbieter im <strong className="text-gray-200">IPTV Test</strong> anhand klarer Kriterien vergleichen – von der
            Server-Stabilität über die Bildqualität bis zum Support. Hier sind die 6 Punkte, die für beste IPTV Anbieter wirklich zählen.
          </p>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <Reveal className="mb-8">
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Die 6 wichtigsten Kriterien im <span className="text-gradient">IPTV Anbieter Test</span>
          </h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CRITERIA.map((c) => (
            <HoverCard key={c.title} className="group h-full p-8 rounded-xl border border-border-subtle bg-surface-card/60 shadow-card hover:border-primary-500/40 transition-colors">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-black transition-colors duration-300">
                <c.icon className="h-6 w-6 icon-hover" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">{c.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{c.text}</p>
            </HoverCard>
          ))}
        </Stagger>
      </section>

      {/* IPTV vs Kabel (reused) */}
      <CompareSection />

      {/* Pricing */}
      <PageFigure id="iptv-vergleich" caption="IPTV-Anbieter und Geräte vergleichen" />
      <PricingSection />

      {/* Internal links */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal className="mb-8">
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Beste IPTV Anbieter in Deutschland: <span className="text-gradient">Was zeichnet einen guten IPTV Anbieter aus?</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/bestes-iptv', title: 'Bestes IPTV Deutschland', desc: 'Kriterien & Checkliste im Detail.' },
            { href: '/iptv-erfahrungen', title: 'IPTV Erfahrungen', desc: 'Echte Bewertungen unserer Kunden lesen.' },
            { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag sichern.' },
            { href: '/pricing', title: 'Preise & Tarife', desc: 'Alle Laufzeiten transparent im Überblick.' },
            { href: '/was-ist-iptv', title: 'Was ist IPTV?', desc: 'IPTV-Grundlagen einfach erklärt.' },
            { href: '/faq', title: 'Häufige Fragen', desc: 'Alle wichtigen Antworten auf einen Blick.' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="group rounded-xl border border-border-subtle bg-surface-card/50 p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary-500/40">
              <div className="text-base font-bold text-white group-hover:text-primary-500 transition-colors mb-2">{link.title}</div>
              <p className="text-sm text-gray-400 leading-relaxed">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </>
  );
}
