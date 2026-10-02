import React from 'react';
import Link from 'next/link';
import StatsBar from '@/components/sections/StatsBar';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata = withSocial({
  title: 'Über 4kdeutsch: Ihr Premium IPTV Anbieter',
  description: 'Erfahren Sie mehr über 4kdeutsch: IPTV-Abonnements ohne Vertrag, verständliche Einrichtungsanleitungen für viele Geräte und deutschsprachiger Support.',
  alternates: { canonical: '/about' },
  keywords: [
    '4kdeutsch',
    'über 4kdeutsch',
    'IPTV Anbieter',
    'IPTV Anbieter seriös',
    'IPTV Deutschland',
  ],
});

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">
          Über <span className="text-primary-500">4kdeutsch</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          IPTV-Abonnements für den deutschsprachigen Raum – mit transparenten Preisen, klaren Anleitungen und deutschsprachigem Support.
        </p>
      </div>

      {/* Core values content split */}
      <section className="py-16 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-6">
            Unsere Mission: IPTV verständlich und transparent
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
            4kdeutsch bietet IPTV-Abonnements für Nutzer in Deutschland an. Uns ist wichtig, dass Preise, Laufzeiten und Bedingungen nachvollziehbar sind und dass die Einrichtung auf gängigen Geräten wie Fire Stick, Android TV, Samsung, LG und Apple TV gut erklärt wird.
          </p>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Die Wiedergabequalität hängt von Ihrer Internetverbindung, Ihrem Gerät und dem jeweiligen Sender ab. Bei Fragen erreichen Sie unseren deutschsprachigen Support per WhatsApp oder E-Mail. Erfahren Sie mehr über unsere <Link href="/pricing" className="text-primary-500 hover:underline font-semibold">Tarife</Link> oder lesen Sie unsere <Link href="/faq" className="text-primary-500 hover:underline font-semibold">Hilfethemen</Link>.
          </p>
        </div>

        <div className="p-8 rounded-xl border border-border-subtle bg-surface-card flex flex-col gap-6">
          <div>
            <h4 className="text-base font-bold text-white mb-2">Transparente Bedingungen</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ohne Vertrag und ohne automatische Verlängerung. Die Bedingungen finden Sie in unseren AGB und der Rückerstattungsrichtlinie.
            </p>
          </div>
          <div className="border-t border-border-subtle/50 pt-6">
            <h4 className="text-base font-bold text-white mb-2">Deutscher Premium-Support</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Wir lassen Sie nicht alleine. Unser deutschsprachiger Support hilft Ihnen per WhatsApp oder E-Mail bei der Einrichtung auf kompatiblen Geräten.
            </p>
          </div>
        </div>
      </section>

      <StatsBar />
      <CTASection />
    </div>
  );
}
