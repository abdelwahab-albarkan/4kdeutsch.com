import React from 'react';
import { BookOpenCheck, MonitorSmartphone, Search, Layers, LifeBuoy, Headset } from 'lucide-react';
import { Reveal, Stagger, HoverCard } from '@/components/ui/motion';

const ITEMS = [
  { icon: BookOpenCheck, title: 'Übersichtliche Einrichtungsanleitungen', text: 'Klare Schritt-für-Schritt-Anleitungen für unterstützte Geräte und Apps.' },
  { icon: MonitorSmartphone, title: 'Klare Geräteübersicht', text: 'Finden Sie schnell Informationen zu unterstützten Geräten und Einrichtungsmöglichkeiten.' },
  { icon: Search, title: 'Schnell zu findende Informationen', text: 'Die wichtigsten Informationen sind übersichtlich strukturiert und leicht erreichbar.' },
  { icon: Layers, title: 'Verschiedene Einrichtungsmöglichkeiten', text: 'Anleitungen für unterschiedliche Geräte, Apps und Nutzungsszenarien.' },
  { icon: LifeBuoy, title: 'Verständliche Hilfestellungen', text: 'Praktische Hinweise helfen bei der Einrichtung und bei typischen Fragen.' },
  { icon: Headset, title: 'Persönlicher Support', text: 'Bei Fragen können Sie unser Support-Team über die verfügbaren Kontaktmöglichkeiten erreichen.' },
];

/** "Das erwartet Sie" – factual benefit cards (icons only; no testimonials, ratings or customer names). */
export default function WhatToExpect() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6" aria-labelledby="what-to-expect-heading">
      <Reveal className="text-center max-w-3xl mx-auto mb-16">
        <h2 id="what-to-expect-heading" className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
          Das <span className="text-gradient">erwartet Sie</span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
          Übersichtliche Informationen und praktische Hilfestellungen rund um die Einrichtung.
        </p>
      </Reveal>

      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <HoverCard
            key={title}
            className="group h-full rounded-2xl border border-border-subtle bg-surface-card/60 p-8 shadow-card transition-colors duration-300 hover:border-primary-500/40 hover:shadow-glow"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-black">
              <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
            </div>
            <h3 className="mb-3 text-lg font-bold text-white transition-colors group-hover:text-primary-500">{title}</h3>
            <p className="text-sm leading-relaxed text-gray-400">{text}</p>
          </HoverCard>
        ))}
      </Stagger>
    </section>
  );
}
