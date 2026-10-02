import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import DeviceGallery from '@/components/sections/DeviceGallery';
import Link from 'next/link';
import DevicesSection from '@/components/sections/DevicesSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata = withSocial({
  title: 'Kompatible Geräte: IPTV auf Fire Stick, Smart TV & Android TV | 4kdeutsch',
  description: 'Auf welchen Geräten läuft IPTV? Fire TV Stick, Samsung, LG, Android TV, Apple TV, Smartphone und PC – mit passender App. Verfügbarkeit je nach Gerät, Modell und Region.',
  alternates: { canonical: '/devices' },
  keywords: [
    'IPTV Fire Stick',
    'IPTV Samsung TV',
    'IPTV LG TV',
    'IPTV Android TV',
    'IPTV Apple TV',
    'IPTV Google TV',
    'IPTV MAG Box',
    'IPTV App',
  ],
});

export default function DevicesPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">
          Kompatible <span className="text-primary-500">Geräte</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          IPTV läuft auf vielen gängigen Streaming-Playern und Smart TVs. Finden Sie unten Ihr Gerät und sehen Sie die passende Einrichtungsanleitung. Die Verfügbarkeit einer App kann je nach Gerät, Modell und Region variieren.
        </p>
      </div>

      <DevicesSection showHeader={false} />

      {/* Device-specific setup guides (cluster links) */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <h2 className="font-spartan text-2xl sm:text-4xl font-black text-white uppercase tracking-tight text-center mb-4">
          Geräte-<span className="text-primary-500">Einrichtungsanleitungen</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-sm sm:text-base leading-relaxed text-center">
          Wählen Sie Ihr Gerät für eine ausführliche Schritt-für-Schritt-Anleitung auf Deutsch:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/iptv-fire-stick', title: 'IPTV auf Fire Stick', desc: 'Amazon Fire TV Stick in wenigen Minuten einrichten – mit Downloader & TiviMate.' },
            { href: '/iptv-samsung-tv', title: 'IPTV auf Samsung TV', desc: 'Samsung Smart TV (Tizen) mit Smart IPTV & IBO Player – direkt am Fernseher.' },
            { href: '/iptv-lg-tv', title: 'IPTV auf LG TV', desc: 'LG Smart TV (webOS) einrichten – ohne PC, mit IPTV Smarters Pro.' },
            { href: '/iptv-android-tv', title: 'IPTV auf Android TV', desc: 'Android TV & Google TV mit TiviMate – direkt aus dem Play Store.' },
            { href: '/iptv-apple-tv', title: 'IPTV auf Apple TV', desc: 'Apple TV 4K (tvOS) mit IPTV Smarters – ganz ohne Jailbreak.' },
            { href: '/iptv-windows', title: 'IPTV am PC (Windows & Mac)', desc: 'VLC und Desktop-Player unter Windows 10/11 und macOS einrichten.' },
            { href: '/iptv-android-handy', title: 'IPTV auf Android-Handy & Tablet', desc: 'IPTV App aus dem Play Store – Hinweise zu APK und mobilen Daten.' },
          ].map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group rounded-xl border border-border-subtle bg-surface-card/50 p-6 text-left shadow-card transition-all hover:-translate-y-1 hover:border-primary-500/40"
            >
              <div className="text-base font-bold text-white group-hover:text-primary-500 transition-colors mb-2">{g.title}</div>
              <p className="text-sm text-gray-400 leading-relaxed">{g.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* IPTV Box / Stick / Receiver */}
      <section className="pb-16 max-w-4xl mx-auto px-6">
        <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">
          IPTV Box, IPTV Stick oder <span className="text-primary-500">Receiver?</span>
        </h2>
        <p className="text-gray-400 leading-relaxed mb-3">
          Für IPTV brauchen Sie kein spezielles Gerät: Eine IPTV-App auf einem Smart TV genügt. Viele Nutzer setzen zusätzlich auf einen IPTV-Stick
          wie den <Link href="/iptv-fire-stick" className="text-primary-500 hover:underline">Amazon Fire TV Stick</Link>, eine{' '}
          <Link href="/iptv-android-tv" className="text-primary-500 hover:underline">Android-TV-Box</Link> oder – je nach Einrichtung – eine MAG-Box
          als IPTV-Box.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Ein herkömmlicher Sat- oder Kabel-Receiver empfängt IPTV nicht, weil die Übertragung über das Internet erfolgt. Geeignet sind IPTV-fähige
          Geräte mit Netzwerkanschluss oder WLAN. Welche App auf welchem Gerät läuft, zeigt die Übersicht{' '}
          <Link href="/iptv-app" className="text-primary-500 hover:underline">IPTV Apps und Geräte</Link>.
        </p>
      </section>

      {/* Guide Links Grid */}
      <section className="pb-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-spartan text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-8">
          Bereit zur Installation?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
          Wir haben Schritt-für-Schritt-Anleitungen, mit denen Sie Apps wie TiviMate, Smart IPTV und IPTV Smarters Pro in wenigen Minuten einrichten.
        </p>
        <Link
          href="/install"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary-500 px-8 text-base font-bold text-black hover:bg-primary-600 transition-all"
        >
          Installationsanleitungen ansehen
        </Link>
      </section>

      <PageFigure id="iptv-mehrere-geraete" />
      <DeviceGallery />
      <CTASection />
    </div>
  );
}
