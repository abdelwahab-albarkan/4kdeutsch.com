import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, ShieldCheck, MessageCircle } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { productSchema, faqSchema } from '@/lib/structured-data';
import { Reveal, Stagger, HoverCard } from '@/components/ui/motion';
import ReviewsSection from '@/components/sections/ReviewsSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Erfahrungen 2026: Worauf Sie bei Bewertungen achten | 4kdeutsch',
  description:
    'IPTV Erfahrungen & Bewertungen 2026: Woran Sie seriöse Erfahrungsberichte zu Stabilität, Bildqualität und Support erkennen und worauf Sie vor dem Kauf achten sollten.',
  alternates: { canonical: '/iptv-erfahrungen' },
  keywords: [
    'IPTV Erfahrungen',
    'IPTV Bewertungen',
    'IPTV Erfahrungsberichte',
    'IPTV Test Erfahrungen',
    'IPTV Kundenmeinungen',
    '4kdeutsch Erfahrungen',
  ],
  openGraph: {
    title: 'IPTV Erfahrungen 2026: Worauf Sie bei Bewertungen achten | 4kdeutsch',
    description:
      'Woran Sie seriöse IPTV-Erfahrungsberichte zu Stabilität, Bildqualität und Support erkennen.',
    url: 'https://4kdeutsch.com/iptv-erfahrungen',
  },
});

const SIGNALS = [
  { icon: ShieldCheck, title: 'Verifizierte Käufe', text: 'Achten Sie auf Bewertungen von echten, verifizierten Kunden statt anonymer Einträge.' },
  { icon: MessageCircle, title: 'Konkrete Details', text: 'Seriöse Erfahrungsberichte nennen konkrete Punkte wie Sender, Stabilität bei Sport oder Support-Reaktion.' },
  { icon: Star, title: 'Ausgewogenes Bild', text: 'Ausschließlich 5-Sterne ohne jede Kritik? Ein gesunder Mix wirkt glaubwürdiger als reine Werbung.' },
];

export default function IptvErfahrungenPage() {
  return (
    <>
      <JsonLd data={[productSchema(), faqSchema()]} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Erfahrungen', path: '/iptv-erfahrungen' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-6 pt-10 pb-8 md:pt-14">
        <Reveal className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-500">
            <Star className="h-3.5 w-3.5 fill-current" strokeWidth={2} />
            Ratgeber zu Erfahrungsberichten
          </p>
          <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6">
            IPTV <span className="text-gradient">Erfahrungen</span> &amp; Bewertungen
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Vor dem Kauf eines IPTV-Abos lohnt sich der Blick auf echte <strong className="text-gray-200">Erfahrungen</strong>.
            Sie zeigen, wie stabil ein Dienst läuft, wie gut die Bildqualität ist und wie schnell der Support
            reagiert. Hier lesen Sie, wie Sie seriöse Erfahrungsberichte erkennen und einordnen.
          </p>
        </Reveal>
      </section>

      {/* How to read reviews */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <Reveal className="max-w-3xl mb-10">
          <h2 className="font-spartan text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
            Woran Sie <span className="text-gradient">echte Erfahrungen</span> erkennen
          </h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SIGNALS.map((s) => (
            <HoverCard key={s.title} className="group h-full p-8 rounded-xl border border-border-subtle bg-surface-card/60 shadow-card hover:border-primary-500/40 transition-colors">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-black transition-colors duration-300">
                <s.icon className="h-6 w-6 icon-hover" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{s.text}</p>
            </HoverCard>
          ))}
        </Stagger>
      </section>

      {/* Reviews (reused) */}
      <ReviewsSection />

      {/* Internal links */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal className="mb-8">
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Mehr <span className="text-gradient">entdecken</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/bestes-iptv', title: 'Bestes IPTV', desc: 'Testsieger-Kriterien & Checkliste im Detail.' },
            { href: '/iptv-vergleich', title: 'IPTV Vergleich', desc: 'Anbieter anhand objektiver Kriterien vergleichen.' },
            { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag sichern.' },
            { href: '/iptv-legal-deutschland', title: 'Ist IPTV legal?', desc: 'Die Rechtslage in Deutschland erklärt.' },
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

      <PageFigure id="iptv-support" />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
