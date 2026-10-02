import React from 'react';
import Link from 'next/link';
import { Check, Mail, MessageCircle } from 'lucide-react';
import { RESELLER_PLANS, SITE_CONFIG } from '@/lib/constants';

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

const waUrl = (connections: number, price: number) =>
  `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
    `Hallo, ich interessiere mich für das Reseller-Paket:\n\nPaket: ${connections} Connections\nPreis: ${usd(price)}\n\nBitte senden Sie mir weitere Informationen.`
  )}`;

/**
 * Reseller packages (connection-based). Visually distinct from the customer pricing.
 * All values come from RESELLER_PLANS in lib/constants.
 */
export default function ResellerPricing({ id = 'reseller-pakete', headingLevel = 'h2' }: { id?: string; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <section id={id} className="relative overflow-hidden border-y border-primary-500/20 bg-[#08100b] py-20 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-500 mb-5">
            Partnerprogramm · nur für Reseller
          </span>
          <Heading className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-5">
            Reseller <span className="text-gradient">Connection-Pakete</span>
          </Heading>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Reseller-Pakete nach Anzahl der Connections – getrennt von den Endkunden-Tarifen. Wählen Sie das Paket, das zu Ihrem Geschäft passt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {RESELLER_PLANS.map((p) => (
            <article
              key={p.id}
              className={`relative flex flex-col rounded-2xl border p-7 md:p-8 transition-transform duration-300 ${
                p.popular
                  ? 'border-primary-500 bg-[#0c1a12] shadow-xl shadow-primary-500/15 xl:-translate-y-2'
                  : 'border-primary-500/20 bg-[#0b140e] hover:border-primary-500/40'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-7 rounded-full bg-primary-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-black">
                  Beliebteste Wahl
                </span>
              )}
              <span className={`text-xs font-bold uppercase tracking-[0.18em] ${p.popular ? 'text-primary-500' : 'text-gray-500'}`}>{p.tier}</span>
              <h3 className="mt-2 text-2xl font-black text-white">{p.connections} Connections</h3>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">{usd(p.price)}</span>
              </div>

              <ul className="mt-6 mb-8 flex flex-col gap-3 border-t border-primary-500/15 pt-6">
                <li className="flex items-start gap-3 text-sm text-gray-300 leading-snug">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" strokeWidth={2.5} aria-hidden="true" />
                  {p.connections} Connections im Paket
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300 leading-snug">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" strokeWidth={2.5} aria-hidden="true" />
                  Verwaltung im Reseller-Dashboard
                </li>
              </ul>

              <div className="mt-auto flex flex-col gap-2.5">
                <a
                  href={waUrl(p.connections, p.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-md text-sm font-bold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08100b] ${
                    p.popular ? 'bg-primary-500 text-black hover:bg-primary-600' : 'border border-primary-500/50 text-primary-500 hover:bg-primary-500/10'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Per WhatsApp anfragen
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.supportEmail}?subject=${encodeURIComponent(p.mailSubject)}`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  oder per E-Mail
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Sie suchen ein Abo für sich selbst? Zu den{' '}
          <Link href="/pricing" className="text-primary-500 hover:underline">
            Endkunden-Tarifen
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
