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
  title: 'IPTV LG TV: IPTV App auf LG Smart TV (webOS) installieren 2026 | 4kdeutsch',
  description:
    'IPTV auf LG Smart TV mit webOS einrichten ✓ Smart IPTV, IBO Player & IPTV Smarters Pro Anleitung. Ohne Zusatzgeräte direkt am LG TV streamen.',
  alternates: { canonical: '/iptv-lg-tv' },
  keywords: [
    'IPTV LG TV',
    'lg smart tv iptv',
    'iptv lg smart tv',
    'IPTV auf LG Smart TV installieren',
    'LG TV IPTV App',
  ],
  openGraph: {
    title: 'IPTV LG TV: IPTV App auf LG Smart TV (webOS) installieren 2026 | 4kdeutsch',
    description:
      'IPTV auf LG Smart TV mit webOS einrichten: Smart IPTV, IBO Player & IPTV Smarters Pro Anleitung.',
    url: 'https://4kdeutsch.com/iptv-lg-tv',
  },
});

export default function IptvLgTvPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Startseite', path: '/' },
          { name: 'Kompatible Geräte', path: '/devices' },
          { name: 'IPTV auf LG TV', path: '/iptv-lg-tv' },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Kompatible Geräte', path: '/devices' },
          { name: 'IPTV auf LG TV', path: '/iptv-lg-tv' },
        ]}
      />

      <DeviceGuide
        tagline="LG Smart TV · webOS"
        image={{ src: '/images/iptv/devices/hero-lg-tv.webp', alt: 'Illustration: Smart-TV mit Streaming-Oberfläche' }}
        h1={
          <>
            IPTV auf <span className="text-gradient">LG Smart TV</span> einrichten
          </>
        }
        intro={
          <>
            <p>
              Ihr <strong className="text-gray-200">LG Smart TV</strong> mit webOS bietet eine schnelle, flüssige
              Oberfläche – ideal für IPTV in bester Qualität. Diese Anleitung zeigt, wie Sie IPTV direkt auf Ihrem
              LG-Fernseher einrichten, ganz ohne zusätzliche Set-Top-Box.
            </p>
            <p>
              Alles, was Sie brauchen, sind Ihre <strong className="text-gray-200">4kdeutsch-Zugangsdaten</strong>
              (M3U-Wiedergabeliste oder Xtream Codes API), die Sie sofort nach dem Kauf per E-Mail bekommen.
            </p>
          </>
        }
        steps={[
          'Öffnen Sie den LG Content Store auf Ihrem webOS-Fernseher.',
          'Suchen Sie nach „Smart IPTV“, „IBO Player“ oder „IPTV Smarters Pro“ und installieren Sie die App.',
          'Starten Sie die App – notieren Sie sich die angezeigte MAC-Adresse Ihres LG TVs.',
          'Laden Sie am Computer oder Smartphone im Web-Portal der App Ihren 4kdeutsch M3U-Link hoch.',
          'Alternativ melden Sie sich in IPTV Smarters Pro direkt mit Portal-URL, Benutzername und Passwort an.',
          'Fertig: Die Senderliste erscheint automatisch auf dem LG TV – jetzt in 4K streamen.',
        ]}
        apps={[
          { name: 'Smart IPTV (SIPTV)', note: 'Bewährte App für LG webOS. Einmalige Aktivierung und komfortable Verwaltung über das Web-Portal.' },
          { name: 'IBO Player', note: 'Schnelle, aufgeräumte Oberfläche mit stabilem 4K-Playback – perfekt für LG-Fernseher.' },
          { name: 'IPTV Smarters Pro', note: 'Xtream-Codes-Login direkt am TV, mit integriertem EPG und VOD-Bereich.' },
        ]}
        benefits={[
          'Kompatibel mit LG webOS (2018 und neuer)',
          '4K Ultra HD (je nach Gerät und Sender)',
          'EPG-Programmführer & Catch-Up TV',
          'Einrichtung direkt am TV – ohne PC',
          'Ohne Vertrag – monatlich kündbar',
          'Deutschsprachiger Support',
        ]}
        related={[
          { href: '/iptv-samsung-tv', title: 'IPTV auf Samsung TV', desc: 'Anleitung für Samsung Smart TVs mit Tizen.' },
          { href: '/iptv-fire-stick', title: 'IPTV auf Fire Stick', desc: 'Die schnelle Alternative per Amazon Fire TV.' },
          { href: '/devices', title: 'Alle Geräte', desc: 'Übersicht aller unterstützten Geräte & Apps.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag – ab 5,92 €/Monat.' },
          { href: '/bestes-iptv', title: 'Bestes IPTV', desc: 'Vergleich & Kriterien für den besten Anbieter.' },
          { href: '/iptv-app/smart-iptv/lg-tv', title: 'Smart IPTV auf LG TV', desc: 'IPTV App Smart IPTV (SIPTV) auf LG webOS.' },
          { href: '/iptv-app/ibo-player/lg-tv', title: 'IBO Player auf LG TV', desc: 'IPTV App IBO Player auf LG einrichten.' },
          { href: '/faq', title: 'Häufige Fragen', desc: 'Ist IPTV legal? Warum ruckelt IPTV? Antworten.' },
        ]}
      />

      <PageFigure id="iptv-lg-tv-einrichtung" />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
