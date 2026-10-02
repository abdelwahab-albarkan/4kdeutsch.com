import React from 'react';
import { WhatsAppCta } from '@/components/common/ContactBlock';
import { SITE_CONFIG } from '@/lib/constants';
import { DollarSign, ShieldCheck, Share2, Award } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata = withSocial({
  title: 'IPTV Affiliate-Programm: Partner werden | 4kdeutsch',
  description: 'Informationen zum Partnerprogramm von 4kdeutsch: So empfehlen Sie 4kdeutsch IPTV-Abonnements weiter.',
  alternates: { canonical: '/affiliate' },
  keywords: [
    'iptv affiliate',
    'iptv affiliate programm',
    'iptv reseller programm',
  ],
});

export default function AffiliatePage() {
  const steps = [
    { icon: Share2, title: "1. Programm beitreten", desc: "Registrieren Sie sich als Affiliate-Partner. Erhalten Sie sofort Ihren persönlichen Empfehlungslink." },
    { icon: DollarSign, title: "2. Links bewerben", desc: "Teilen Sie Ihren Affiliate-Link auf Blogs, in sozialen Medien oder in Foren." },
    { icon: ShieldCheck, title: "3. Verkäufe verfolgen", desc: "Verfolgen Sie Conversions und offene Provisionen in Ihrem Dashboard." },
    { icon: Award, title: "4. Ausgezahlt werden", desc: "Erhalten Sie monatliche Auszahlungen sicher über Ihre bevorzugte Zahlungsmethode." }
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-500 mb-6">
          PARTNERPROGRAMM
        </div>
        <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">
          4kdeutsch <span className="text-primary-500">Affiliate-Programm</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Verdienen Sie wiederkehrende monatliche Provisionen, indem Sie den stabilsten IPTV-Dienst bewerben. Wir zahlen bis zu 30 % auf jeden verifizierten Kundenkauf.
        </p>
      </div>

      {/* Steps Row */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((item, index) => {
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

      {/* Commissions breakdown */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <div className="p-8 md:p-12 rounded-xl border border-border-subtle bg-surface-card/60">
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-6">
            Bis zu 30 % wiederkehrende Provision
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
            Anders als andere Programme zahlen wir wiederkehrende Provisionen über die gesamte Laufzeit des Kundenabonnements. Verlängert Ihr vermittelter Kunde seinen Tarif, werden Sie erneut bezahlt.
          </p>
          <a
            href={`mailto:${SITE_CONFIG.supportEmail}?subject=IPTV%20Affiliate%20Registrierung`}
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary-500 px-8 text-base font-bold text-black hover:bg-primary-600 transition-all"
          >
            Als Affiliate-Partner bewerben
          </a>
          <WhatsAppCta variant="outline" message="Hallo, ich interessiere mich für das Affiliate-Programm." className="ml-0 mt-3 sm:ml-3 sm:mt-0" />
        </div>
      </section>

      <CTASection />
    </div>
  );
}
