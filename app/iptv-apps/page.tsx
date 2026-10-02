import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Star } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { productSchema, faqSchema } from '@/lib/structured-data';
import { Reveal, Stagger, HoverCard } from '@/components/ui/motion';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Apps & Player 2026: Überblick für Fire Stick, Smart TV & Android | 4kdeutsch',
  description:
    'IPTV App oder IPTV Player gesucht? Überblick über TiviMate, IPTV Smarters Pro, Smart IPTV, IBO Player und OTT Navigator für Fire Stick, Samsung, LG, Android und Apple TV – mit Kompatibilitäts-Übersicht.',
  alternates: { canonical: '/iptv-apps' },
  keywords: [
    'IPTV Apps',
    'beste IPTV App',
    'IPTV Player',
    'IPTV App Android',
    'IPTV Player Windows',
    'IPTV Smarters Pro',
    'TiviMate',
  ],
  openGraph: {
    title: 'IPTV Apps & Player 2026: Überblick für Fire Stick, Smart TV & Android | 4kdeutsch',
    description:
      'TiviMate, IPTV Smarters Pro, Smart IPTV, IBO Player & OTT Navigator im Vergleich – die beste IPTV-App für jedes Gerät.',
    url: 'https://4kdeutsch.com/iptv-apps',
  },
});

const APPS = [
  { name: 'TiviMate', best: 'Android TV & Fire Stick', note: 'Premium-Player mit bestem EPG-Layout, Aufnahmefunktion und blitzschneller Navigation. Der Favorit für große Bildschirme.', href: '/tivimate-iptv' },
  { name: 'IPTV Smarters Pro', best: 'Alle Plattformen', note: 'Kostenlos, unterstützt Xtream Codes API & M3U und läuft auf Fire Stick, Android, iOS, Samsung & LG.', href: '/iptv-smarters-pro' },
  { name: 'Smart IPTV (SIPTV)', best: 'Samsung & LG', note: 'Der Klassiker für Smart-TVs. Einmalige Aktivierung, sehr stabil, einfach über das Web-Portal zu befüllen.', href: '/iptv-samsung-tv' },
  { name: 'IBO Player', best: 'Samsung, LG & Android', note: 'Moderne Oberfläche, meistert hochbitratiges 4K-Streaming mühelos und ist schnell eingerichtet.', href: '/iptv-lg-tv' },
  { name: 'OTT Navigator', best: 'Android TV', note: 'Extrem anpassbar mit Multi-Playlist-Support – ideal für Power-User mit großen Senderlisten.', href: '/iptv-android-tv' },
  { name: 'GSE Smart IPTV', best: 'Apple TV & iOS', note: 'Umfangreicher Player für tvOS/iOS mit M3U-, Xtream- und EPG-Unterstützung.', href: '/iptv-apple-tv' },
];

export default function IptvAppsPage() {
  return (
    <>
      <JsonLd data={[productSchema(), faqSchema()]} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Beste IPTV Apps', path: '/iptv-apps' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-6 pt-10 pb-8 md:pt-14">
        <Reveal className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-500">
            <Star className="h-3.5 w-3.5 fill-current" strokeWidth={2} />
            Player-Vergleich 2026
          </p>
          <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6">
            Die besten <span className="text-gradient">IPTV Apps</span> 2026
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Die richtige App macht den Unterschied. Ob <strong className="text-gray-200">TiviMate</strong>,{' '}
            <strong className="text-gray-200">IPTV Smarters Pro</strong> oder <strong className="text-gray-200">Smart IPTV</strong>{' '}
            – hier finden Sie den besten IPTV-Player für Ihr Gerät. Alle funktionieren mit Ihren 4kdeutsch-Zugangsdaten
            (Xtream Codes API oder M3U).
          </p>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPS.map((app) => (
            <HoverCard key={app.name} className="group h-full flex flex-col p-6 rounded-xl border border-border-subtle bg-surface-card/60 shadow-card hover:border-primary-500/40 transition-colors">
              <div className="mb-3 inline-flex self-start items-center gap-1.5 rounded-full bg-primary-500/10 px-3 py-1 text-[11px] font-bold text-primary-500">
                Ideal für {app.best}
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">{app.name}</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">{app.note}</p>
              <Link href={app.href} className="text-sm font-bold text-primary-500 hover:underline">
                Einrichtungsanleitung →
              </Link>
            </HoverCard>
          ))}
        </Stagger>
      </section>

      {/* Internal links */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <Reveal className="mb-8">
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Beliebte <span className="text-gradient">Anleitungen</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/tivimate-iptv', title: 'TiviMate einrichten', desc: 'Die Premium-App für Android TV & Fire Stick.' },
            { href: '/iptv-smarters-pro', title: 'IPTV Smarters Pro', desc: 'Der kostenlose Allrounder für jede Plattform.' },
            { href: '/iptv-fire-stick', title: 'IPTV auf Fire Stick', desc: 'App-Installation auf Amazon Fire TV.' },
            { href: '/devices', title: 'Alle Geräte', desc: 'Welche App für welches Gerät am besten passt.' },
            { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag sichern.' },
            { href: '/iptv-app/net-iptv', title: 'Net IPTV', desc: 'Playlist per MAC-Adresse und Upload hinzufügen.' },
            { href: '/iptv-app/ss-iptv', title: 'SS IPTV', desc: 'Player für LG- und Samsung-Smart-TVs.' },
            { href: '/iptv-app/televizo', title: 'Televizo', desc: 'Player für Android, Android TV und Fire OS.' },
            { href: '/iptv-windows', title: 'IPTV am PC', desc: 'Windows- und Mac-Player einrichten.' },
            { href: '/iptv-app/kodi', title: 'Kodi mit IPTV', desc: 'PVR IPTV Simple Client mit M3U einrichten.' },
            { href: '/iptv-app/smarters-player-lite', title: 'Smarters Player Lite', desc: 'Der schlanke Player für iPhone und iPad.' },
            { href: '/iptv-app/iptvnator', title: 'IPTVnator', desc: 'Open-Source-Player für den Computer.' },
            { href: '/faq', title: 'Häufige Fragen', desc: 'Welche IPTV App ist die beste? Antworten.' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="group rounded-xl border border-border-subtle bg-surface-card/50 p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary-500/40">
              <div className="text-base font-bold text-white group-hover:text-primary-500 transition-colors mb-2">{link.title}</div>
              <p className="text-sm text-gray-400 leading-relaxed">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <PageFigure id="iptv-apps" />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
