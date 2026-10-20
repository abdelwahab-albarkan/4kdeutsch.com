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
  title: 'IPTV Apple TV: IPTV App auf Apple TV 4K einrichten 2026 | 4kdeutsch',
  description:
    'IPTV auf Apple TV 4K installieren – mit tvOS-IPTV-Apps wie iPlayTV und IPTVX. Schritt für Schritt erklärt, 4K je nach Sender und Gerät.',
  alternates: { canonical: '/iptv-apple-tv' },
  keywords: [
    'IPTV Apple TV',
    'apple tv iptv',
    'iptv apple tv 4k',
    'IPTV auf Apple TV installieren',
    'beste IPTV App für Apple TV',
  ],
  openGraph: {
    title: 'IPTV Apple TV: IPTV App auf Apple TV 4K einrichten 2026 | 4kdeutsch',
    description:
      'Apple TV 4K IPTV einrichten mit iPlayTV & IPTVX – direkt aus dem App Store, ohne Jailbreak. Live-TV in 4K (je nach Sender).',
    url: 'https://4kdeutsch.com/iptv-apple-tv',
  },
});

export default function IptvAppleTvPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Startseite', path: '/' },
          { name: 'Kompatible Geräte', path: '/devices' },
          { name: 'IPTV auf Apple TV', path: '/iptv-apple-tv' },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Kompatible Geräte', path: '/devices' },
          { name: 'IPTV auf Apple TV', path: '/iptv-apple-tv' },
        ]}
      />

      <DeviceGuide
        tagline="Apple TV HD & Apple TV 4K · tvOS"
        image={{ src: '/images/iptv/devices/hero-apple-tv.webp', alt: 'Illustration: Streaming-Box mit Fernbedienung' }}
        h1={
          <>
            IPTV auf <span className="text-gradient">Apple TV 4K</span> installieren &amp; streamen
          </>
        }
        intro={
          <>
            <p>
              Das <strong className="text-gray-200">Apple TV 4K</strong> liefert dank tvOS ein besonders flüssiges und
              hochwertiges Streaming-Erlebnis. IPTV lässt sich ganz ohne Jailbreak einrichten – Sie laden einfach einen
              kompatiblen Player aus dem App Store und melden sich mit Ihren Zugangsdaten an.
            </p>
            <p>
              Sie benötigen nur Ihre <strong className="text-gray-200">4kdeutsch-Zugangsdaten</strong> (Xtream Codes API
              oder M3U), die Sie sofort nach dem Kauf per E-Mail erhalten.
            </p>
          </>
        }
        steps={[
          'Öffnen Sie den App Store auf Ihrem Apple TV.',
          'Suchen Sie nach „IPTV Smarters“, „GSE Smart IPTV“ oder „iPlayTV“ und laden Sie die App.',
          'Öffnen Sie die App und wählen Sie „Mit Xtream Codes API anmelden“ (oder M3U-Playlist hinzufügen).',
          'Geben Sie Portal-URL, Benutzername und Passwort aus Ihrer 4kdeutsch-E-Mail ein.',
          'Die Senderliste und der EPG-Programmführer werden automatisch geladen.',
          'Fertig: Genießen Sie Live-TV und VOD in 4K (je nach Gerät und Sender).',
        ]}
        apps={[
          { name: 'IPTV Smarters', note: 'Beliebter Player für tvOS mit Xtream-Codes-Login, integriertem EPG und übersichtlichem VOD-Bereich.' },
          { name: 'GSE Smart IPTV', note: 'Umfangreicher Player mit Unterstützung für M3U, Xtream Codes und EPG – ideal für große Senderlisten.' },
          { name: 'iPlayTV', note: 'Schlanker, schneller Player speziell für Apple TV mit sauberer Oberfläche und stabiler Wiedergabe.' },
        ]}
        benefits={[
          'Für Apple TV HD & Apple TV 4K (tvOS 13+)',
          'Kein Jailbreak erforderlich',
          '4K Ultra HD (je nach Gerät und Sender)',
          'EPG-Programmführer & Catch-Up TV',
          'Ohne Vertrag – monatlich kündbar',
          'Deutschsprachiger Support',
        ]}
        related={[
          { href: '/iptv-fire-stick', title: 'IPTV auf Fire Stick', desc: 'Anleitung für Amazon Fire TV Stick.' },
          { href: '/iptv-android-tv', title: 'IPTV auf Android TV', desc: 'Einrichtung auf Android TV & Google TV.' },
          { href: '/devices', title: 'Alle Geräte', desc: 'Übersicht aller unterstützten Geräte & Apps.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag – ab 5,92 €/Monat.' },
          { href: '/bestes-iptv', title: 'Bestes IPTV', desc: 'Vergleich & Kriterien für den besten Anbieter.' },
          { href: '/iptv-app/iptv-smarters-pro/apple-tv', title: 'IPTV Smarters Pro auf Apple TV', desc: 'IPTV App für Apple TV einrichten.' },
          { href: '/iptv-app/gse-smart-iptv/apple-tv', title: 'GSE Smart IPTV auf Apple TV', desc: 'IPTV Player für tvOS einrichten.' },
          { href: '/faq', title: 'Häufige Fragen', desc: 'Ist IPTV legal? Welche App ist die beste? Antworten.' },
        ]}
      />

      <PageFigure id="iptv-apple-tv" />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
