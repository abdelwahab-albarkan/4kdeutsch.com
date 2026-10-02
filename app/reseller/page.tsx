import React from 'react';
import Image from 'next/image';
import { Layers, Users, TrendingUp, Landmark } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';
import ResellerPricing from '@/components/sections/ResellerPricing';
import CustomerReviews from '@/components/sections/CustomerReviews';
import { WhatsAppCta } from '@/components/common/ContactBlock';
import { withSocial } from '@/lib/seo';

export const metadata = withSocial({
  title: 'IPTV Reseller werden 2026: Connection-Pakete | 4kdeutsch',
  description: 'IPTV-Reseller-Pakete mit 10, 20, 50 oder 100 Connections. Verwaltung im Reseller-Dashboard. Anfrage per WhatsApp oder E-Mail.',
  alternates: { canonical: '/reseller' },
  keywords: [
    'iptv reseller',
    'iptv reseller werden',
    'iptv panel',
    'iptv reseller programm',
  ],
});

export default function ResellerPage() {
  const features = [
    { icon: Layers, title: "Reseller-Dashboard", desc: "Verwalten Sie Ihre Connections im Reseller-Dashboard: Wiedergabelisten-Links erstellen und Zugänge anlegen." },
    { icon: Users, title: "Sub-Reseller", desc: "Unter Ihrem Panel können Sie Sub-Reseller anlegen." },
    { icon: TrendingUp, title: "Eigene Preisgestaltung", desc: "Die Endkundenpreise bestimmen Sie selbst." },
    { icon: Landmark, title: "Klare Paketstruktur", desc: "Vier Pakete nach Anzahl der Connections: 10, 20, 50 oder 100." }
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="relative max-w-7xl mx-auto px-6 text-center mb-16">
        <div aria-hidden="true" className="absolute inset-x-6 inset-y-0 -z-10 overflow-hidden rounded-3xl">
          <Image src="/images/iptv-hintergrund-abstrakt.jpg" alt="" fill sizes="(max-width: 1280px) 100vw, 1232px" className="object-cover opacity-40" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-500 mb-6">
          PARTNERPROGRAMM
        </div>
        <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">
          IPTV <span className="text-primary-500">Reseller-Panel</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Wählen Sie ein Connection-Paket und verwalten Sie Ihre Kunden im Reseller-Dashboard. Fragen beantworten wir per WhatsApp oder E-Mail.
        </p>
        <div className="mt-8 flex justify-center">
          <WhatsAppCta message="Hallo, ich interessiere mich für das Reseller-Programm." />
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="p-8 rounded-xl border border-border-subtle bg-surface-card/40 flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white mt-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </section>

      <ResellerPricing />
      <CustomerReviews audience="reseller" id="reseller-stimmen" />

      <CTASection />
    </div>
  );
}
