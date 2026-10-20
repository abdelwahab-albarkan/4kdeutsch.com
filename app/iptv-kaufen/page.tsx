import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ShieldCheck, Zap, CreditCard, Globe, Clock } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { productSchema, breadcrumbSchema } from '@/lib/structured-data';
import { Reveal, Stagger, HoverCard } from '@/components/ui/motion';
import PricingSection from '@/components/sections/PricingSection';
import CompareSection from '@/components/sections/CompareSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV kaufen 2026: IPTV-Abo sicher bestellen, ohne Vertrag | 4kdeutsch',
  description:
    'IPTV kaufen in Deutschland: So bestellen Sie ein IPTV-Abo (Abonnement) mit Live-TV, Sport und VOD – ohne Vertrag, monatlich kündbar, ab 5,92 €/Monat. Automatische Freischaltung nach der Zahlung.',
  alternates: { canonical: '/iptv-kaufen' },
  keywords: [
    'IPTV kaufen',
    'IPTV Abo kaufen',
    'Premium IPTV kaufen',
    'IPTV kaufen legal',
    'IPTV kaufen ohne Vertrag',
    'IPTV Deutschland kaufen',
    'Günstiges IPTV Abo',
    'IPTV bestellen',
    'IPTV Abonnement kaufen',
    'IPTV sicher kaufen',
  ],
  openGraph: {
    title: 'IPTV kaufen 2026: IPTV-Abo sicher bestellen, ohne Vertrag | 4kdeutsch',
    description:
      'Premium IPTV in Deutschland kaufen – Live-TV, Sport & VOD in 4K, ohne Vertrag, ab 5,92 €/Monat. Automatische Freischaltung.',
    url: 'https://4kdeutsch.com/iptv-kaufen',
  },
});

const REASONS = [
  {
    icon: Zap,
    title: 'Automatische Freischaltung',
    text: 'Direkt nach dem Kauf erhalten Sie Ihre Xtream-Codes-API und M3U-Wiedergabeliste automatisch per E-Mail – kein Warten, sofort streamen.',
  },
  {
    icon: ShieldCheck,
    title: 'Ohne Vertrag & jederzeit kündbar',
    text: 'Sie kaufen ein Guthaben nach Laufzeit, keine Abo-Falle. Keine Kündigungsfrist, keine versteckten Kosten – transparente Preise.',
  },
  {
    icon: CreditCard,
    title: 'Sichere Zahlung',
    text: 'Bezahlen Sie bequem mit PayPal, Visa, Mastercard, Apple Pay, Google Pay oder Krypto (Bitcoin, USDT, Ethereum).',
  },
  {
    icon: Globe,
    title: 'Viele Geräte',
    text: 'Ein Zugang für kompatible Apps und Geräte. Wie viele Verbindungen gleichzeitig möglich sind, richtet sich nach Ihrem Tarif.',
  },
];

const STEPS = [
  'Wählen Sie die passende Laufzeit (3, 6 oder 12 Monate) – je länger, desto günstiger.',
  'Bezahlen Sie sicher per PayPal, Kreditkarte, Apple/Google Pay oder Kryptowährung.',
  'Erhalten Sie Ihre Zugangsdaten automatisch per E-Mail.',
  'App installieren (TiviMate, IPTV Smarters Pro), Daten eingeben und in 4K streamen.',
];

export default function IptvKaufenPage() {
  return (
    <>
      <JsonLd
        data={[
          productSchema(),
          breadcrumbSchema([
            { name: 'Startseite', path: '/' },
            { name: 'IPTV kaufen', path: '/iptv-kaufen' },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV kaufen', path: '/iptv-kaufen' },
        ]}
      />

      {/* Hero / intro */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-8 md:pt-14">
        <Reveal className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-500">
            <Zap className="h-3.5 w-3.5" strokeWidth={2} />
            Sofortige Freischaltung · Ohne Vertrag
          </p>
          <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6">
            IPTV kaufen – <span className="text-gradient">Premium IPTV-Abo</span> in Deutschland
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Sie möchten <strong className="text-gray-200">IPTV kaufen</strong>? Bei 4kdeutsch erhalten Sie ein
            Premium-IPTV-Abo mit <strong className="text-gray-200">Live-TV</strong>, Filmen &amp; Serien auf Abruf
            und Sportkanälen in 4K (je nach Gerät und Sender). Ganz ohne Vertrag, monatlich
            kündbar und schon ab <strong className="text-gray-200">5,92 €/Monat</strong>. Die Freischaltung erfolgt
            vollautomatisch – kompatibel mit Fire TV Stick, Samsung, LG, Android TV und Apple TV. Wer mehrere IPTV-Anbieter vergleicht, findet Kriterien im{' '}
            <Link href="/iptv-vergleich" className="text-primary-500 hover:underline">IPTV Anbieter Vergleich</Link> und im Ratgeber{' '}
            <Link href="/bestes-iptv" className="text-primary-500 hover:underline">Bestes IPTV</Link>; die Preise aller Laufzeiten stehen unter{' '}
            <Link href="/pricing" className="text-primary-500 hover:underline">IPTV Abo &amp; Preise</Link>.
          </p>
        </Reveal>

        {/* Trust badges */}
        <Stagger className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: ShieldCheck, label: 'Ohne Vertrag' },
            { icon: Zap, label: 'Automatische Freischaltung' },
            { icon: Clock, label: 'Support' },
            { icon: Globe, label: 'Viele Geräte' },
          ].map((b) => (
            <HoverCard key={b.label} lift={3} className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-card/50 px-4 py-3 shadow-card">
              <b.icon className="h-5 w-5 text-primary-500 shrink-0" strokeWidth={2} />
              <span className="text-sm font-semibold text-gray-200">{b.label}</span>
            </HoverCard>
          ))}
        </Stagger>
      </section>

      {/* Why buy from 4kdeutsch */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal className="max-w-3xl mb-12">
          <h2 className="font-spartan text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
            Warum IPTV bei <span className="text-gradient">4kdeutsch kaufen?</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Nicht jeder IPTV-Anbieter ist gleich. Wir setzen auf transparente Preise, viele kompatible Geräte und einen
            deutschsprachigen Support – damit Ihr IPTV-Kauf sich wirklich lohnt.
          </p>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REASONS.map((r) => (
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

      {/* How to buy */}
      <section className="bg-surface/30 border-y border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Reveal className="mb-10">
            <h2 className="font-spartan text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
              IPTV kaufen in <span className="text-gradient">4 Schritten</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">So schnell haben Sie Ihr Premium-IPTV startklar:</p>
          </Reveal>
          <Stagger className="flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <HoverCard key={i} lift={3} className="flex items-start gap-4 rounded-xl border border-border-subtle bg-surface-card/50 p-5 shadow-card">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-black text-black">
                  {i + 1}
                </span>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed pt-0.5">{step}</p>
              </HoverCard>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Pricing (reused) */}
      <PageFigure id="iptv-anbieter" />
      <PricingSection />

      {/* Comparison (reused) */}
      <CompareSection />

      {/* Internal links / topical cluster */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal className="mb-8">
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Weiterführende <span className="text-gradient">IPTV-Ratgeber</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/bestes-iptv', title: 'Bestes IPTV in Deutschland', desc: 'Kriterien, Vergleich & worauf es beim IPTV-Kauf ankommt.' },
            { href: '/pricing', title: 'IPTV Preise & Tarife', desc: 'Alle Laufzeiten und Preise im Überblick – ohne Vertrag.' },
            { href: '/devices', title: 'Kompatible Geräte', desc: 'IPTV auf Fire Stick, Samsung, LG, Android & Apple TV.' },
            { href: '/install', title: 'IPTV installieren', desc: 'Schritt-für-Schritt-Anleitung für jedes Gerät.' },
            { href: '/features', title: 'Premium-Funktionen', desc: '4K, EPG, Catch-Up & Mehrfachnutzung.' },
            { href: '/faq', title: 'Häufige Fragen', desc: 'Ist IPTV legal? Welche App ist die beste? Alle Antworten.' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-border-subtle bg-surface-card/50 p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary-500/40"
            >
              <div className="flex items-center gap-2 text-base font-bold text-white group-hover:text-primary-500 transition-colors mb-2">
                {link.title}
                <Check className="h-4 w-4 text-primary-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" strokeWidth={2.5} />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ (reused) */}
      <FAQSection />

      {/* CTA (reused) */}
      <CTASection />
    </>
  );
}
