import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'Rückerstattungsrichtlinie | 4kdeutsch',
  description: 'Informationen zu Widerruf, Gewährleistung und Erstattungen.',
  alternates: { canonical: '/refund' },
});

export default function RefundPage() {
  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-6">
      <h1 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-8">
        Rückerstattungs<span className="text-primary-500">richtlinie</span>
      </h1>

      <div className="prose prose-invert flex flex-col gap-6 text-sm sm:text-base text-gray-400 leading-relaxed">
        <h2 className="text-xl font-bold text-white mt-6">1. Gesetzliches Widerrufsrecht</h2>
        <p>
          Unabhängig von den nachfolgenden freiwilligen Regelungen gilt das gesetzliche Widerrufsrecht
          für Verbraucher. Die Einzelheiten – insbesondere zum vorzeitigen Erlöschen bei digitalen
          Inhalten – finden Sie in unserer{' '}
          <a href="/widerruf" className="text-primary-500 hover:underline">Widerrufsbelehrung</a>.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">2. Technische Probleme</h2>
        <p>
          Bei technischen Problemen wenden Sie sich bitte zuerst an unseren Support. Gesetzliche
          Gewährleistungsrechte bleiben unberührt.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">3. Ablauf</h2>
        <p>
          Um eine Erstattung zu beantragen, kontaktieren Sie uns bitte per E-Mail unter{' '}
          <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-primary-500 hover:underline">
            {SITE_CONFIG.supportEmail}
          </a>{' '}
          oder über WhatsApp ({SITE_CONFIG.whatsappDisplay}). Bitte nennen Sie die beim Kauf verwendete E-Mail-Adresse bzw. Ihre
          Bestellnummer sowie den Grund der Reklamation. Eine etwaige Erstattung erfolgt in der Regel auf dem
          Zahlungsweg, den Sie beim Kauf verwendet haben.
        </p>
      </div>
    </div>
  );
}
