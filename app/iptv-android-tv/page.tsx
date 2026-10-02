import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { productSchema, faqSchema } from '@/lib/structured-data';
import DeviceGuide from '@/components/sections/DeviceGuide';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV App für Android TV & Android Box einrichten 2026 | 4kdeutsch',
  description:
    'IPTV auf Android TV & Smart TV Boxen einrichten – mit Android-IPTV-Apps wie TiviMate und IPTV Smarters Pro, M3U- und Xtream-Setup. 4K je nach Sender und Gerät.',
  alternates: { canonical: '/iptv-android-tv' },
  keywords: [
    'IPTV Android TV',
    'android tv iptv',
    'iptv android box',
    'android tv iptv app',
    'IPTV auf Android TV installieren',
    'Android TV Box IPTV',
  ],
  openGraph: {
    title: 'IPTV App für Android TV & Android Box einrichten 2026 | 4kdeutsch',
    description:
      'IPTV auf Android TV & Smart TV Boxen einrichten mit TiviMate & IPTV Smarters Pro. Live-TV in 4K (je nach Sender).',
    url: 'https://4kdeutsch.com/iptv-android-tv',
  },
});

export default function IptvAndroidTvPage() {
  return (
    <>
      <JsonLd data={[productSchema(), faqSchema()]} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Kompatible Geräte', path: '/devices' },
          { name: 'IPTV auf Android TV', path: '/iptv-android-tv' },
        ]}
      />

      <DeviceGuide
        tagline="Android TV · Google TV · Android-Boxen"
        h1={
          <>
            IPTV auf <span className="text-gradient">Android TV &amp; Android Box</span> installieren
          </>
        }
        image={{ src: '/images/iptv/devices/hero-android-tv.webp', alt: 'Illustration: Smart-TV mit Streaming-Box und Fernbedienung' }}
        intro={
          <>
            <p>
              <strong className="text-gray-200">Android TV</strong> und <strong className="text-gray-200">Google TV</strong>{' '}
              bieten den größten App-Komfort für IPTV: Sie installieren Ihren Lieblings-Player einfach direkt aus dem
              Google Play Store – ganz ohne Umwege. Diese Anleitung funktioniert für Android-TV-Boxen, Google TV,
              Chromecast mit Google TV, Sony, Philips, TCL und NVIDIA Shield.
            </p>
            <p>
              Alles, was Sie brauchen, sind Ihre <strong className="text-gray-200">4kdeutsch-Zugangsdaten</strong>{' '}
              (Xtream Codes API), die Sie sofort nach dem Kauf per E-Mail erhalten.
            </p>
          </>
        }
        steps={[
          'Öffnen Sie den Google Play Store auf Ihrem Android-TV oder Google TV.',
          'Suchen Sie nach „TiviMate“, „IPTV Smarters Pro“ oder „OTT Navigator“ und installieren Sie die App.',
          'Starten Sie die App und wählen Sie „Xtream Codes API“ (bzw. „Playlist hinzufügen“).',
          'Geben Sie Portal-URL, Benutzername und Passwort aus Ihrer 4kdeutsch-Aktivierungs-E-Mail ein.',
          'Die Senderliste und der EPG-Programmführer laden automatisch.',
          'Fertig: Streamen Sie Live-TV und VOD in 4K (je nach Gerät und Sender).',
        ]}
        apps={[
          { name: 'TiviMate', note: 'Der Premium-Standard auf Android TV: bestes EPG-Layout, Aufnahmefunktion und blitzschnelle Navigation.' },
          { name: 'IPTV Smarters Pro', note: 'Kostenlos, unterstützt Xtream Codes API & M3U und läuft auf jeder Android-TV-Box zuverlässig.' },
          { name: 'OTT Navigator', note: 'Extrem anpassbar mit Multi-Playlist-Support – ideal für Power-User und große Senderlisten.' },
        ]}
        benefits={[
          'Für Android TV, Google TV, Chromecast, Sony, TCL, Philips & NVIDIA Shield',
          '4K Ultra HD (je nach Gerät und Sender)',
          'EPG-Programmführer & Catch-Up TV',
          'Direkt-Installation aus dem Play Store',
          'Ohne Vertrag – monatlich kündbar',
          'Deutschsprachiger Support',
        ]}
        related={[
          { href: '/iptv-fire-stick', title: 'IPTV auf Fire Stick', desc: 'Anleitung für Amazon Fire TV Stick.' },
          { href: '/iptv-apple-tv', title: 'IPTV auf Apple TV', desc: 'Einrichtung auf Apple TV mit tvOS.' },
          { href: '/devices', title: 'Alle Geräte', desc: 'Übersicht aller unterstützten Geräte & Apps.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag – ab 5,92 €/Monat.' },
          { href: '/bestes-iptv', title: 'Bestes IPTV', desc: 'Vergleich & Kriterien für den besten Anbieter.' },
          { href: '/iptv-app/tivimate/android-tv', title: 'TiviMate auf Android TV', desc: 'IPTV App TiviMate auf Android TV einrichten.' },
          { href: '/iptv-app/ibo-player/android-tv', title: 'IBO Player auf Android TV', desc: 'IPTV App mit Web-Portal-Anmeldung einrichten.' },
          { href: '/faq', title: 'Häufige Fragen', desc: 'Ist IPTV legal? Warum ruckelt IPTV? Antworten.' },
        ]}
      />

      <PageFigure id="iptv-android-tv" />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
