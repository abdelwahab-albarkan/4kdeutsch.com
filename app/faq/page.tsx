import React from 'react';
import type { Metadata } from 'next';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import JsonLd from '@/components/common/JsonLd';
import { faqSchema, breadcrumbSchema } from '@/lib/structured-data';
import { FAQ_PAGE_ITEMS } from '@/lib/constants';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV FAQ: Ist IPTV legal? Was ist IPTV? | 4kdeutsch',
  description: 'Alle Antworten rund um IPTV in Deutschland ✓ Was ist IPTV & wie funktioniert es? ✓ Ist IPTV legal? ✓ Welche Geräte & Apps? ✓ Freischaltung, Zahlung & Nutzung im Ausland.',
  alternates: { canonical: '/faq' },
  keywords: [
    'Was ist IPTV',
    'Ist IPTV legal in Deutschland',
    'Wie funktioniert IPTV',
    'IPTV Erfahrungen',
    'IPTV sicher',
    'IPTV FAQ',
  ],
});

export default function FAQPage() {
  return (
    <div className="py-12 md:py-20">
      <JsonLd
        data={[
          faqSchema(FAQ_PAGE_ITEMS),
          breadcrumbSchema([
            { name: 'Startseite', path: '/' },
            { name: 'FAQ & Hilfe', path: '/faq' },
          ]),
        ]}
      />
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">
          Support & <span className="text-primary-500">FAQ</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Sie brauchen schnelle Antworten? Lesen Sie unsere ausführlichen Erklärungen zu Abrechnung, Einrichtung, Senderlisten und Verbindungsparametern.
        </p>
      </div>

      <FAQSection showHeader={false} items={FAQ_PAGE_ITEMS} />

      <CTASection />
    </div>
  );
}
