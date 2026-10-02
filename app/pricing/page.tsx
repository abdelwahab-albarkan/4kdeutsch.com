import React from 'react';
import type { Metadata } from 'next';
import PricingSection from '@/components/sections/PricingSection';
import CompareSection from '@/components/sections/CompareSection';
import FAQSection from '@/components/sections/FAQSection';
import ResellerPricing from '@/components/sections/ResellerPricing';
import CustomerReviews from '@/components/sections/CustomerReviews';
import TrialButton from '@/components/ui/TrialButton';
import PageFigure from '@/components/ui/PageFigure';
import JsonLd from '@/components/common/JsonLd';
import { productSchema, faqSchema, breadcrumbSchema } from '@/lib/structured-data';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Abo Preise 2026: Kosten & Laufzeiten ohne Vertrag | 4kdeutsch',
  description: 'IPTV Abonnement im Überblick: Was kostet IPTV? 3, 6 oder 12 Monate ab 5,92 €/Monat – ohne Vertrag und ohne automatische Verlängerung. Tarife, Laufzeiten und Preise im Vergleich.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'IPTV Abo Preise 2026: Kosten & Laufzeiten ohne Vertrag | 4kdeutsch',
    description: 'IPTV Abonnement im Überblick: Was kostet IPTV? 3, 6 oder 12 Monate ab 5,92 €/Monat – ohne Vertrag und ohne automatische Verlängerung. Tarife, Laufzeiten und Preise im Vergleich.',
    url: 'https://4kdeutsch.com/pricing',
  },
  keywords: [
    'IPTV kaufen',
    'IPTV Abo kaufen',
    'IPTV Abonnement',
    'IPTV Kosten',
    'IPTV Angebote',
    'IPTV Preise',
    'IPTV Preisvergleich',
    'Günstiges IPTV',
    'IPTV ohne Vertrag',
    'IPTV monatlich kündbar',
    'Premium IPTV kaufen',
  ],
});

export default function PricingPage() {
  return (
    <div className="py-12 md:py-20">
      <JsonLd
        data={[
          productSchema(),
          faqSchema(),
          breadcrumbSchema([
            { name: 'Startseite', path: '/' },
            { name: 'Tarife & Preise', path: '/pricing' },
          ]),
        ]}
      />
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">
          IPTV Abo – <span className="text-gradient">Tarife & Preise</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Wählen Sie Ihren flexiblen Premium-Tarif für Live-TV, Sport und VOD. Kein Abonnement-Zwang, keine automatische Verlängerung. Sie erhalten Ihre Xtream-API-Zugangsdaten und M3U-Playlists sofort nach dem Kauf vollautomatisch per E-Mail.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-gray-300">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
            24h kostenloser Testzugang
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary-500" />
            Keine automatische Verlängerung
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <TrialButton variant="primary" size="lg" label="Jetzt 24h kostenlos testen" />
          <a href="#reseller" className="inline-flex h-12 items-center justify-center rounded-md border border-border-subtle bg-surface px-6 text-base font-semibold text-white transition-colors hover:bg-surface-hover">Für Reseller</a>
        </div>
      </div>

      <PricingSection showHeader={false} />
      <CustomerReviews id="kundenbewertungen" />
      <ResellerPricing id="reseller" headingLevel="h2" />
      <PageFigure id="iptv-preise" />
      <CompareSection />
      <FAQSection />
    </div>
  );
}
