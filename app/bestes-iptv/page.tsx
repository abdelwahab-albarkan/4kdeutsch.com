import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Star, ShieldCheck, Server, Headphones, Tv } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { productSchema, faqSchema } from '@/lib/structured-data';
import { Reveal, Stagger, HoverCard } from '@/components/ui/motion';
import ReviewsSection from '@/components/sections/ReviewsSection';
import CompareSection from '@/components/sections/CompareSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'Bestes IPTV 2026: Kriterien für die Wahl eines IPTV-Anbieters | 4kdeutsch',
  description:
    'Bestes IPTV in Deutschland 2026: Woran Sie ein gutes IPTV-Abo erkennen – Senderauswahl, EPG, Stabilität, transparente Bedingungen und fairer Preis. Vergleich und Testkriterien.',
  alternates: { canonical: '/bestes-iptv' },
  keywords: [
    'Bestes IPTV',
    'IPTV Test 2026',
    'bestes IPTV Deutschland',
    'bester IPTV Anbieter',
    'IPTV Empfehlung',
  ],
  openGraph: {
    title: 'Bestes IPTV 2026: Kriterien für die Wahl eines IPTV-Anbieters | 4kdeutsch',
    description:
      'Woran Sie ein gutes IPTV-Abo erkennen: Stabilität, Bildqualität, EPG, transparente Bedingungen & fairer Preis.',
    url: 'https://4kdeutsch.com/bestes-iptv',
  },
});

const CRITERIA = [
  {
    icon: Server,
    title: 'Stabile Wiedergabe',
    text: 'Ob Live-Sport ruckelfrei läuft, hängt von Anbieter, Internetverbindung und Gerät ab. Achten Sie auf transparente Angaben zur Verfügbarkeit und auf einen erreichbaren Support.',
  },
  {
    icon: Tv,
    title: '4K & große Senderauswahl',
    text: 'Ein guter Anbieter nennt transparent, welche Qualität die Sender bieten – plus eine große Auswahl an Sendern und VODs. Bei uns: Live-TV, Filme und Serien in einem Abo.',
  },
  {
    icon: ShieldCheck,
    title: 'Seriös, ohne Vertrag & sicher',
    text: 'Seriöse Anbieter setzen auf transparente Preise, keine Abo-Falle und verschlüsselte Zahlung. Monatlich kündbar und ohne versteckte Kosten.',
  },
  {
    icon: Headphones,
    title: 'Support auf Deutsch',
    text: 'Schnelle Hilfe bei Einrichtung und Fragen ist entscheidend. Unser Support ist per WhatsApp und E-Mail erreichbar.',
  },
];

const CHECKLIST = [
  'Große Auswahl an Live-TV-Sendern & VODs',
  '4K Ultra HD (je nach Gerät und Sender)',
  'Stabile Wiedergabe bei ausreichender Internetverbindung',
  'EPG-Programmführer & Catch-Up TV',
  'Kompatibel mit Fire Stick, Samsung, LG, Android & Apple TV',
  'Ohne Vertrag – monatlich kündbar',
  'Sichere Zahlung inkl. PayPal & Krypto',
  'Automatische Freischaltung',
  'Deutschsprachiger Support',
  'Kompatibel mit vielen Geräten',
];

export default function BestesIptvPage() {
  return (
    <>
      <JsonLd data={[productSchema(), faqSchema()]} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Bestes IPTV', path: '/bestes-iptv' },
        ]}
      />

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-8 md:pt-14">
        <Reveal className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-500">
            <Star className="h-3.5 w-3.5 fill-current" strokeWidth={2} />
            Kriterien für die Anbieterwahl
          </p>
          <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6">
            Bestes IPTV in <span className="text-gradient">Deutschland 2026</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Auf der Suche nach dem <strong className="text-gray-200">besten IPTV</strong> in Deutschland? Der Markt ist
            groß – umso wichtiger sind klare Kriterien. In diesem Ratgeber zeigen wir, woran Sie einen
            <strong className="text-gray-200"> seriösen IPTV-Anbieter</strong> erkennen, worauf es bei Stabilität,
            Bildqualität und Preis wirklich ankommt und warum 4kdeutsch mit großer Senderauswahl in 4K (je nach Sender), ohne Vertrag
            und mit deutschsprachigem Support überzeugt.
          </p>
        </Reveal>
      </section>

      {/* Criteria */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <Reveal className="max-w-3xl mb-12">
          <h2 className="font-spartan text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
            Woran erkennt man das <span className="text-gradient">beste IPTV?</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Diese vier Kriterien trennen ein Premium-IPTV von unseriösen Angeboten – nutzen Sie sie als Checkliste für
            Ihren IPTV-Vergleich.
          </p>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CRITERIA.map((c) => (
            <HoverCard key={c.title} className="group h-full p-8 rounded-xl border border-border-subtle bg-surface-card/60 shadow-card hover:border-primary-500/40 transition-colors flex gap-5 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-black transition-colors duration-300">
                <c.icon className="h-6 w-6 icon-hover" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{c.text}</p>
              </div>
            </HoverCard>
          ))}
        </Stagger>
      </section>

      {/* Checklist */}
      <section className="bg-surface/30 border-y border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Reveal className="mb-8">
            <h2 className="font-spartan text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
              Checkliste: <span className="text-gradient">Bester IPTV Anbieter &amp; beste IPTV App</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Ein wirklich gutes IPTV-Abo erfüllt alle diese Punkte – 4kdeutsch hakt jeden davon ab:
            </p>
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHECKLIST.map((item) => (
              <HoverCard key={item} lift={2} className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface-card/50 px-4 py-3 shadow-card">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-500">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <span className="text-sm text-gray-200">{item}</span>
              </HoverCard>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Social proof (reused) */}
      <PageFigure id="iptv-deutschland" />
      <ReviewsSection />

      {/* Comparison + Pricing (reused) */}
      <CompareSection />
      <PricingSection />

      {/* Internal links */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal className="mb-8">
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Passende <span className="text-gradient">Ratgeber</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/iptv-vergleich', title: 'IPTV Vergleich', desc: 'Anbieter & Tarife anhand objektiver Kriterien direkt vergleichen.' },
            { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'So kaufen Sie Ihr Premium-IPTV in 4 Schritten – ohne Vertrag.' },
            { href: '/pricing', title: 'Preise & Tarife', desc: 'Alle Laufzeiten und Preise transparent im Überblick.' },
            { href: '/features', title: 'Premium-Funktionen', desc: '4K, EPG, Catch-Up und Mehrfachnutzung.' },
            { href: '/devices', title: 'Kompatible Geräte', desc: 'Welche Geräte & Apps für IPTV unterstützt werden.' },
            { href: '/install', title: 'IPTV einrichten', desc: 'Installationsanleitung für Fire Stick, Samsung & Co.' },
            { href: '/faq', title: 'Häufige Fragen', desc: 'Ist IPTV legal? Wie funktioniert es? Alle Antworten.' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-border-subtle bg-surface-card/50 p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary-500/40"
            >
              <div className="flex items-center gap-2 text-base font-bold text-white group-hover:text-primary-500 transition-colors mb-2">
                {link.title}
              </div>
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
