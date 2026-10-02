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
  title: 'IPTV Fire TV Stick einrichten 2026: IPTV App installieren | 4kdeutsch',
  description:
    'IPTV auf dem Fire TV Stick (Amazon Fire Stick) einrichten: Schritt-für-Schritt-Anleitung mit Downloader, TiviMate und IPTV Smarters Pro – inklusive Hinweisen zur Installation aus unbekannten Quellen.',
  alternates: { canonical: '/iptv-fire-stick' },
  keywords: [
    'IPTV Fire Stick',
    'IPTV auf Fire Stick installieren',
    'beste IPTV App für Fire Stick',
    'Fire TV Stick IPTV einrichten',
    'IPTV Fire TV',
    'IPTV Smarters Pro Fire Stick',
  ],
  openGraph: {
    title: 'IPTV Fire TV Stick einrichten 2026: IPTV App installieren | 4kdeutsch',
    description:
      'Fire TV Stick IPTV einrichten in wenigen Minuten – mit Downloader, TiviMate & IPTV Smarters Pro. Streamen Sie Live-TV in 4K (je nach Sender).',
    url: 'https://4kdeutsch.com/iptv-fire-stick',
  },
});

export default function IptvFireStickPage() {
  return (
    <>
      <JsonLd data={[productSchema(), faqSchema()]} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Kompatible Geräte', path: '/devices' },
          { name: 'IPTV auf Fire Stick', path: '/iptv-fire-stick' },
        ]}
      />

      <DeviceGuide
        tagline="Amazon Fire TV Stick · In 5 Minuten startklar"
        h1={
          <>
            IPTV auf <span className="text-gradient">Fire Stick</span> installieren
          </>
        }
        image={{ src: '/images/iptv/devices/hero-fire-stick.webp', alt: 'Illustration: HDMI-Streaming-Stick mit Fernbedienung' }}
        intro={
          <>
            <p>
              Der <strong className="text-gray-200">Amazon Fire TV Stick</strong> ist das beliebteste Gerät für IPTV in
              Deutschland – günstig, klein und blitzschnell eingerichtet. Mit dieser Anleitung installieren Sie IPTV auf
              Ihrem Fire Stick in wenigen Minuten und streamen Live-TV in 4K (je nach Gerät und Sender).
            </p>
            <p>
              Sie brauchen lediglich Ihre <strong className="text-gray-200">4kdeutsch-Zugangsdaten</strong> (Xtream Codes
              API oder M3U-Wiedergabeliste), die Sie nach dem Kauf sofort per E-Mail erhalten.
            </p>
          </>
        }
        steps={[
          'Öffnen Sie auf dem Fire TV Stick „Einstellungen“ → „Mein Fire TV“ → „Entwickleroptionen“ und aktivieren Sie „Apps aus unbekannten Quellen“.',
          'Suchen Sie im Amazon Appstore nach der App „Downloader“ und installieren Sie sie.',
          'Öffnen Sie Downloader und geben Sie den App-Code für TiviMate oder IPTV Smarters Pro ein, um die APK herunterzuladen.',
          'Installieren Sie die App, öffnen Sie sie und wählen Sie „Mit Xtream Codes API anmelden“.',
          'Geben Sie Portal-URL, Benutzername und Passwort aus Ihrer 4kdeutsch-Aktivierungs-E-Mail ein – die Senderliste lädt automatisch.',
          'Fertig: Streamen Sie Live-TV, Sport sowie Filme & Serien in 4K (je nach Sender).',
        ]}
        apps={[
          { name: 'TiviMate', note: 'Beste Benutzeroberfläche, automatisches EPG-Layout und sehr reaktionsschnell – der Favorit auf dem Fire Stick.' },
          { name: 'IPTV Smarters Pro', note: 'Kostenlos, unterstützt Xtream Codes API & M3U und läuft stabil auf jedem Fire TV Modell.' },
          { name: 'XCIPTV', note: 'Leistungsstarker Player mit Multi-Screen-Ansicht und flexiblen Einstellungen für Power-User.' },
        ]}
        benefits={[
          'Läuft auf Fire TV Stick, Stick 4K, 4K Max & Fire TV Cube',
          '4K Ultra HD (je nach Gerät und Sender)',
          'EPG-Programmführer & Catch-Up TV',
          'Automatische Freischaltung',
          'Ohne Vertrag – monatlich kündbar',
          'Deutschsprachiger Support',
        ]}
        related={[
          { href: '/iptv-samsung-tv', title: 'IPTV auf Samsung TV', desc: 'Anleitung für Samsung Smart TVs mit Tizen.' },
          { href: '/iptv-lg-tv', title: 'IPTV auf LG TV', desc: 'Einrichtung auf LG Smart TVs mit webOS.' },
          { href: '/devices', title: 'Alle Geräte', desc: 'Übersicht aller unterstützten Geräte & Apps.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag – ab 5,92 €/Monat.' },
          { href: '/bestes-iptv', title: 'Bestes IPTV', desc: 'Vergleich & Kriterien für den besten Anbieter.' },
          { href: '/iptv-app/tivimate/fire-stick', title: 'TiviMate auf Fire Stick', desc: 'IPTV Player TiviMate auf dem Fire TV Stick einrichten.' },
          { href: '/iptv-app/iptv-smarters-pro/fire-stick', title: 'IPTV Smarters Pro auf Fire Stick', desc: 'Anmeldung per Xtream Codes Schritt für Schritt.' },
          { href: '/faq', title: 'Häufige Fragen', desc: 'Ist IPTV legal? Warum ruckelt IPTV? Antworten.' },
        ]}
      />

      <PageFigure id="iptv-fire-stick" />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
