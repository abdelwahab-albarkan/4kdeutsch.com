import React from 'react';
import { Check, X } from 'lucide-react';
import { Reveal } from '@/components/ui/motion';

export default function CompareSection() {
  const comparisons = [
    { feature: "Große Auswahl an Live-Sendern & VODs", iptv: true, cable: false },
    { feature: "4K/UHD-Streaming (je nach Sender und Gerät)", iptv: true, cable: "Sehr eingeschränkt" },
    { feature: "Kein Abonnement-Zwang & keine Laufzeitfalle", iptv: true, cable: false },
    { feature: "Nutzung auf mehreren Geräten", iptv: true, cable: false },
    { feature: "Automatische Freischaltung", iptv: true, cable: false },
    { feature: "Zusatzfunktionen (Catch-Up TV, EPG & Pause)", iptv: true, cable: "Zusatzgebühr" },
    { feature: "Monatliche Kosten", iptv: "ab 5,92 € / Monat", cable: "30 € - 80 €+ zzgl. Miete" }
  ];

  return (
    <section className="py-24 bg-surface/30 border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
            4kdeutsch vs. <span className="text-gradient">Kabel- & Sat-TV</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Große Senderauswahl, Nutzung auf vielen kompatiblen Geräten und transparente Preise.
          </p>
        </Reveal>

        <Reveal className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-border-subtle bg-surface-card shadow-card" y={32}>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-surface/80">
                  <th className="p-6 text-sm font-bold text-white uppercase tracking-wider text-start">Funktion</th>
                  <th className="p-6 text-sm font-bold text-primary-500 uppercase tracking-wider text-center">4kdeutsch IPTV</th>
                  <th className="p-6 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">Klassisches Kabel-TV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {comparisons.map((row, index) => (
                  <tr key={index} className="hover:bg-surface/30 transition-colors">
                    <td className="p-6 text-sm font-semibold text-gray-300">{row.feature}</td>
                    
                    {/* IPTV Column */}
                    <td className="p-6 text-center text-sm font-medium">
                      {typeof row.iptv === 'boolean' ? (
                        row.iptv ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                            <Check className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                            <X className="h-4 w-4" />
                          </span>
                        )
                      ) : (
                        <span className="text-primary-500 font-bold">{row.iptv}</span>
                      )}
                    </td>

                    {/* Cable Column */}
                    <td className="p-6 text-center text-sm font-medium">
                      {typeof row.cable === 'boolean' ? (
                        row.cable ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                            <Check className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                            <X className="h-4 w-4" />
                          </span>
                        )
                      ) : (
                        <span className="text-gray-400 font-bold">{row.cable}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
