'use client';

import React from 'react';
import { Check, Info } from 'lucide-react';
import { PRICING_PLANS, PLAN_FEATURES, SITE_CONFIG } from '@/lib/constants';
import { Reveal } from '@/components/ui/motion';
import PaymentMethods from '@/components/ui/PaymentMethods';
import TrialButton from '@/components/ui/TrialButton';
import LibImage from '@/components/ui/LibImage';

export default function PricingSection({ showHeader = true }: { showHeader?: boolean }) {
  // Build a plain wa.me link per plan. Rendering an <a href> (instead of
  // window.open) keeps the CTA working without JS and inside Facebook/Instagram
  // in-app browsers, where window.open('_blank') is frequently blocked.
  const waUrl = (packageName: string, price: number) => {
    const message = `Hallo 👋\n\nIch interessiere mich für das IPTV-Paket:\n\n📦 Paket: ${packageName}\n💶 Preis: €${price.toFixed(2).replace('.', ',')}\n\nBitte senden Sie mir weitere Informationen und die Zahlungsmöglichkeiten.\n\nVielen Dank!`;
    return `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-24 bg-surface/30 border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-6">
        {showHeader && (
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
              Ein Preis – <span className="text-gradient">alle Funktionen</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4">
              Je länger die Laufzeit, desto günstiger der Monat. Keine Aktivierungsgebühr, keine Vertragsbindung – jederzeit kündbar.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-[#101010] px-4 py-1.5 text-xs font-semibold text-gray-300">
              <span className="h-2 w-2 rounded-full bg-primary-500" />
              SOLO-Paket · 1 Bildschirm · Alle Funktionen inklusive
            </div>
          </Reveal>
        )}

        {/* Pricing Cards Grid */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" y={32}>
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 ${
                plan.popular
                  ? 'border-primary-500 bg-surface-card shadow-premium lg:scale-105 z-10'
                  : 'border-border-subtle bg-surface-card/50 shadow-card hover:border-primary-500/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary-500 px-4 py-1 text-xs font-bold text-black uppercase tracking-wider">
                  Beliebteste
                </div>
              )}

              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                     <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <span className="rounded-full bg-primary-500/10 px-2.5 py-1 text-[11px] font-bold text-primary-500">
                      {plan.discount}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white tracking-tight">
                      {plan.price.toFixed(2).replace('.', ',')} €
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    entspricht{' '}
                    <span className="font-semibold text-gray-300">
                      {plan.perMonth.toFixed(2).replace('.', ',')} € / Monat
                    </span>{' '}
                    · einmalig für {plan.months} Monate
                  </div>
                </div>

                <ul className="flex flex-col gap-4 border-t border-border-subtle pt-6 mb-8">
                  {PLAN_FEATURES.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-300 leading-tight">
                      <Check className="h-5 w-5 text-primary-500 shrink-0" strokeWidth={2.25} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={waUrl(plan.name, plan.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-12 items-center justify-center rounded-md text-base font-bold transition-all hover:scale-102 cursor-pointer ${
                    plan.popular
                      ? 'bg-primary-500 text-black shadow-lg shadow-primary-500/20 hover:bg-primary-600'
                      : 'border border-border-subtle bg-surface hover:bg-surface-hover text-white'
                  }`}
                >
                  Jetzt abonnieren
                </a>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                  <Info className="h-3 w-3" strokeWidth={2} />
                  Sofortige Freischaltung nach Zahlung
                </div>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Free trial */}
        <Reveal className="mt-12 flex flex-col items-center gap-3 text-center">
          <div className="relative mb-2 h-28 w-48 overflow-hidden rounded-xl border border-border-subtle">
            <LibImage id="iptv-kostenlos-testen" fill sizes="192px" className="object-cover" />
          </div>
          <p className="text-sm text-gray-400">24h kostenloser Testzugang – erst ausprobieren, dann entscheiden.</p>
          <TrialButton variant="outline" size="lg" label="Jetzt 24h kostenlos testen" />
        </Reveal>

        {/* Payment methods */}
        <Reveal className="mt-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">
            Sichere Zahlung mit
          </p>
          <PaymentMethods className="max-w-2xl mx-auto" />
        </Reveal>
      </div>
    </section>
  );
}
