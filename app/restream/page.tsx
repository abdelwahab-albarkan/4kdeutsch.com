import React from 'react';
import { WhatsAppCta } from '@/components/common/ContactBlock';
import { SITE_CONFIG } from '@/lib/constants';
import { Activity, ShieldAlert, Cpu, Heart } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata = withSocial({
  title: 'IPTV-Restream-Anfrage | 4kdeutsch',
  description: 'Anfrage zu IPTV-Restream-Angeboten für eigene Server oder Panels. Umfang und Konditionen nach individueller Absprache.',
  alternates: { canonical: '/restream' },
});

export default function RestreamPage() {
  const highlights = [
    { icon: Activity, title: "Technische Formate", desc: "Gängige Video-Codecs wie H.264/H.265; Details klären wir im Gespräch." },
    { icon: ShieldAlert, title: "Individuelle Absprache", desc: "Ob und in welchem Umfang ein Angebot möglich ist, wird im Vorfeld gemeinsam besprochen." },
    { icon: Cpu, title: "Technische Voraussetzungen", desc: "Für den Empfang großer Stream-Datenmengen ist eine ausreichend dimensionierte Anbindung Ihres Servers erforderlich." },
    { icon: Heart, title: "Support per E-Mail", desc: "Bei technischen Fragen erreichen Sie uns über die unten genannte E-Mail-Adresse." }
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-500 mb-6">
          ANFRAGE
        </div>
        <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">
          IPTV <span className="text-primary-500">Restream-Anfrage</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Sie betreiben eigene Server oder Panels und möchten sich zu Restream-Angeboten informieren? Senden Sie uns Ihre Anfrage – ob, in welchem Umfang und zu welchen Konditionen ein Angebot möglich ist, klären wir individuell.
        </p>
      </div>

      {/* Grid Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {highlights.map((item, index) => {
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

      {/* Contact box */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <div className="p-8 md:p-12 rounded-xl border border-border-subtle bg-surface-card/60">
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-6">
            Individuelle Restream-Pakete
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
            Umfang und Konditionen richten sich nach Ihrem Bedarf und werden nach Ihrer Anfrage individuell besprochen.
          </p>
          <a
            href={`mailto:${SITE_CONFIG.supportEmail}?subject=IPTV%20Restream%20Anfrage`}
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary-500 px-8 text-base font-bold text-black hover:bg-primary-600 transition-all"
          >
            Restream-Angebot anfragen
          </a>
          <WhatsAppCta variant="outline" message="Hallo, ich interessiere mich für Restream-Pakete." className="ml-0 mt-3 sm:ml-3 sm:mt-0" />
        </div>
      </section>

      <CTASection />
    </div>
  );
}
