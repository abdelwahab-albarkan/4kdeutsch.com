import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { breadcrumbSchema } from '@/lib/structured-data';
import DeviceGuide from '@/components/sections/DeviceGuide';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Samsung TV: App auf Smart TV (Tizen) installieren 2026 | 4kdeutsch',
  description:
    'IPTV auf Samsung Smart TV mit Tizen OS installieren ✓ Smart IPTV & IBO Player Schritt-für-Schritt-Anleitung. Live-TV direkt am Samsung TV.',
  alternates: { canonical: '/iptv-samsung-tv' },
  keywords: [
    'IPTV samsung tv',
    'samsung smart tv iptv',
    'iptv samsung',
    'IPTV auf Samsung Smart TV installieren',
    'Samsung TV IPTV App',
  ],
  openGraph: {
    title: 'IPTV Samsung TV: App auf Smart TV (Tizen) installieren 2026 | 4kdeutsch',
    description:
      'IPTV auf Samsung Smart TV mit Tizen OS installieren: Smart IPTV & IBO Player Schritt-für-Schritt-Anleitung.',
    url: 'https://4kdeutsch.com/iptv-samsung-tv',
  },
});

export default function IptvSamsungTvPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Startseite', path: '/' },
          { name: 'Kompatible Geräte', path: '/devices' },
          { name: 'IPTV auf Samsung TV', path: '/iptv-samsung-tv' },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Kompatible Geräte', path: '/devices' },
          { name: 'IPTV auf Samsung TV', path: '/iptv-samsung-tv' },
        ]}
      />

      <DeviceGuide
        tagline="Samsung Smart TV · Tizen OS"
        image={{ src: '/images/iptv/devices/hero-samsung-tv.webp', alt: 'Illustration: Smart-TV mit Streaming-Oberfläche' }}
        h1={
          <>
            IPTV auf <span className="text-gradient">Samsung Smart TV</span> einrichten
          </>
        }
        intro={
          <>
            <p>
              Ihr <strong className="text-gray-200">Samsung Smart TV</strong> mit Tizen-Betriebssystem ist perfekt für
              IPTV geeignet – der große Bildschirm liefert das beste Streaming-Erlebnis. Mit dieser Anleitung richten Sie
              IPTV direkt am Fernseher ein, ganz ohne zusätzliche Hardware.
            </p>
            <p>
              Sie benötigen nur Ihre <strong className="text-gray-200">4kdeutsch-Zugangsdaten</strong> (M3U-Wiedergabeliste
              oder Xtream Codes API), die Sie sofort nach dem Kauf per E-Mail erhalten.
            </p>
          </>
        }
        steps={[
          'Öffnen Sie den Samsung Smart Hub (App Store) auf Ihrem Fernseher.',
          'Suchen Sie nach „Smart IPTV“, „IBO Player“ oder „IPTV Smarters Pro“ und installieren Sie die App.',
          'Starten Sie die App – auf dem Bildschirm wird die MAC-Adresse Ihres Geräts angezeigt. Notieren Sie sie.',
          'Öffnen Sie am Computer oder Smartphone das Portal der App und laden Sie Ihren 4kdeutsch M3U-Link (oder die Xtream-Daten) hoch.',
          'Alternativ geben Sie in IPTV Smarters Pro direkt Portal-URL, Benutzername und Passwort ein.',
          'Fertig: Ihre Senderliste erscheint automatisch auf dem Samsung TV – jetzt in 4K streamen.',
        ]}
        apps={[
          { name: 'Smart IPTV (SIPTV)', note: 'Der Klassiker für Samsung Tizen. Einmalige Aktivierung, sehr stabil und einfach über das Web-Portal zu befüllen.' },
          { name: 'IBO Player', note: 'Moderne Oberfläche, meistert hochbitratiges 4K-Streaming mühelos und ist schnell eingerichtet.' },
          { name: 'IPTV Smarters Pro', note: 'Unterstützt die Xtream Codes API direkt am TV – kein PC nötig, ideal für Einsteiger.' },
        ]}
        benefits={[
          'Kompatibel mit Samsung Tizen (2018 und neuer)',
          '4K Ultra HD (je nach Gerät und Sender)',
          'EPG-Programmführer & Catch-Up TV',
          'Einrichtung direkt am TV – ohne PC',
          'Ohne Vertrag – monatlich kündbar',
          'Deutschsprachiger Support',
        ]}
        related={[
          { href: '/iptv-lg-tv', title: 'IPTV auf LG TV', desc: 'Einrichtung auf LG Smart TVs mit webOS.' },
          { href: '/iptv-fire-stick', title: 'IPTV auf Fire Stick', desc: 'Die schnelle Alternative per Amazon Fire TV.' },
          { href: '/devices', title: 'Alle Geräte', desc: 'Übersicht aller unterstützten Geräte & Apps.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag – ab 5,92 €/Monat.' },
          { href: '/bestes-iptv', title: 'Bestes IPTV', desc: 'Vergleich & Kriterien für den besten Anbieter.' },
          { href: '/iptv-app/smart-iptv/samsung-tv', title: 'Smart IPTV auf Samsung TV', desc: 'IPTV App Smart IPTV (SIPTV) auf Samsung Smart TV.' },
          { href: '/iptv-app/ibo-player/samsung-tv', title: 'IBO Player auf Samsung TV', desc: 'IPTV App IBO Player auf Samsung einrichten.' },
          { href: '/faq', title: 'Häufige Fragen', desc: 'Ist IPTV legal? Welche App ist die beste? Antworten.' },
        ]}
      />

      <PageFigure id="iptv-samsung-tv-einrichtung" />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
