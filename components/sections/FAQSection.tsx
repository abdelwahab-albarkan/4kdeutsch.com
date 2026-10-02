'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/constants';
import TrialButton from '@/components/ui/TrialButton';
import { WhatsAppCta } from '@/components/common/ContactBlock';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection({
  showHeader = true,
  items = FAQ_ITEMS
}: {
  showHeader?: boolean;
  items?: FAQItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 max-w-4xl mx-auto px-6">
      {showHeader && (
        <div className="text-center mb-16">
          <h2 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
            Häufig gestellte <span className="text-gradient">Fragen</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Finden Sie Antworten auf die häufigsten Fragen zu unserem Service, Zahlungen und der Einrichtung.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-lg border border-border-subtle bg-surface-card/60 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-start rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
              >
                <span className="text-base sm:text-lg font-bold text-white pe-4">
                  {item.question}
                </span>
                <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-border-subtle text-primary-500">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>

              <div
                id={`faq-panel-${index}`}
                role="region"
                style={{ maxHeight: isOpen ? '80vh' : 0, opacity: isOpen ? 1 : 0 }}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? '' : 'pointer-events-none'
                }`}
              >
                <div className="p-6 pt-0 border-t border-border-subtle/50 text-sm sm:text-base text-gray-400 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-gray-400">Noch Fragen? Fordern Sie Ihren 24h kostenlosen Testzugang an oder schreiben Sie uns.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <TrialButton variant="primary" size="lg" label="Jetzt 24h kostenlos testen" />
          <WhatsAppCta variant="outline" label="Über WhatsApp kontaktieren" />
        </div>
      </div>
    </section>
  );
}
