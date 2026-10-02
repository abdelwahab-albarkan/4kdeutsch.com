import React from 'react';
import { ShoppingCart, MessageCircle, PlayCircle } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';

export default function HowItWorks() {
  const steps = [
    {
      icon: ShoppingCart,
      title: "1. Tarif auswählen",
      description: "Wählen Sie die passende Laufzeit (3, 6 oder 12 Monate). Alle Funktionen sind in jedem Paket enthalten."
    },
    {
      icon: MessageCircle,
      title: "2. Per WhatsApp bestätigen",
      description: "Unser Team bestätigt Ihre Bestellung schnell und unkompliziert per WhatsApp und beantwortet alle Ihre Fragen."
    },
    {
      icon: PlayCircle,
      title: "3. Sofort streamen",
      description: "Sie erhalten Ihre Zugangsdaten unmittelbar nach der Zahlung – automatische Freischaltung, nutzbar auf kompatiblen Geräten."
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <Reveal className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
          So <span className="text-gradient">funktioniert's</span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
          In drei einfachen Schritten startklar – ohne Vertrag, ohne Vorkenntnisse und in wenigen Minuten.
        </p>
      </Reveal>

      <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <StaggerItem key={index} className="group flex flex-col items-center text-center relative">
              {/* Step number connector line on desktop */}
              {index < 2 && (
                <div className="hidden md:block absolute top-10 start-1/2 w-full h-[1px] bg-border-subtle z-0" />
              )}

              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-border-subtle bg-[#101010] text-primary-500 shadow-premium mb-8 transition-colors group-hover:border-primary-500/50">
                <Icon className="h-8 w-8 icon-hover" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{step.description}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
