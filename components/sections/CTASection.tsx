import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/motion';
import TrialButton from '@/components/ui/TrialButton';
import { WhatsAppCta } from '@/components/common/ContactBlock';

export default function CTASection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <Reveal className="relative overflow-hidden rounded-2xl border border-primary-500/30 bg-[#0d0d0d] p-8 md:p-16 text-center shadow-premium">
        <Image src="/images/iptv-tech-hintergrund.jpg" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" loading="lazy" aria-hidden="true" className="-z-10 object-cover opacity-25" />
        {/* Ambient backing: grid + radial glow */}
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.4]" />
        <div className="absolute inset-0 -z-10 bg-radial from-primary-500/12 via-transparent to-transparent opacity-50" />

        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
            Bereit für die <span className="text-gradient">Zukunft des Fernsehens?</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10">
            Wechseln Sie jetzt zu 4kdeutsch und erhalten Sie Zugriff auf Live-TV, Sport und VOD-Inhalte – mit automatischer Freischaltung nach der Zahlung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary-500 px-8 text-base font-bold text-black shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:-translate-y-0.5 active:scale-95"
            >
              Jetzt sicher abonnieren
            </Link>
            <TrialButton variant="outline" size="lg" label="Jetzt 24h kostenlos testen" />
            <WhatsAppCta variant="outline" label="Über WhatsApp kontaktieren" className="h-12 px-8 text-base" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
