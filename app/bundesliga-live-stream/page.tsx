import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { breadcrumbSchema } from '@/lib/structured-data';
import InfoArticle from '@/components/sections/InfoArticle';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Bundesliga: Bundesliga live streamen 2026 – So geht’s | 4kdeutsch',
  description:
    'IPTV Bundesliga: So streamen Sie die 1. und 2. Bundesliga live per IPTV-App – Voraussetzungen, Internetgeschwindigkeit und beste Player-Einstellungen. Welche Übertragungen enthalten sind, klärt der Support vorab.',
  alternates: { canonical: '/bundesliga-live-stream' },
  keywords: [
    'Bundesliga live stream',
    'Bundesliga IPTV',
    'Bundesliga streamen',
    'Fußball live stream',
    'Bundesliga live schauen',
    'IPTV Fußball',
  ],
  openGraph: {
    title: 'IPTV Bundesliga: Bundesliga live streamen 2026 – So geht’s | 4kdeutsch',
    description:
      'Die Bundesliga live über IPTV streamen – Voraussetzungen & beste Einstellungen.',
    url: 'https://4kdeutsch.com/bundesliga-live-stream',
  },
});

export default function BundesligaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Startseite', path: '/' },
          { name: 'Sport IPTV', path: '/iptv-sport' },
          { name: 'Bundesliga live streamen', path: '/bundesliga-live-stream' },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Sport IPTV', path: '/iptv-sport' },
          { name: 'Bundesliga live streamen', path: '/bundesliga-live-stream' },
        ]}
      />

      <InfoArticle
        tagline="Fußball · Live-Sport-Ratgeber"
        h1={
          <>
            Bundesliga <span className="text-gradient">live streamen</span>
          </>
        }
        intro={
          <>
            <p>
              Die <strong>Bundesliga</strong> ist das Herzstück des deutschen Fußballs. Mit IPTV verfolgen Sie die 1.
              und 2. Bundesliga bequem live auf jedem Gerät – in HD- oder 4K-Qualität (je nach Sender). In diesem Ratgeber erfahren Sie, worauf es beim Bundesliga-Streaming ankommt.
            </p>
          </>
        }
        sections={[
          {
            heading: 'Bundesliga über IPTV: das brauchen Sie',
            body: (
              <>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Ein Premium-IPTV-Abo mit umfangreichem <strong>Sportkanal-Paket</strong></li>
                  <li>Eine stabile Internetverbindung von mindestens <strong>25 MBit/s</strong> für 4K</li>
                  <li>Einen zuverlässigen Player wie <a href="/iptv-fire-stick">TiviMate oder IPTV Smarters Pro</a></li>
                  <li>Idealerweise <strong>2 Verbindungen</strong>, um parallel weitere Partien zu verfolgen</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Beste Einstellungen für flüssiges Fußball-Streaming',
            body: (
              <>
                <p>
                  Für eine möglichst stabile Wiedergabe empfehlen wir: Player-Puffer auf „Groß“ stellen, den H.265-Codec
                  aktivieren und – wenn möglich – den Fernseher per <strong>LAN-Kabel</strong> statt WLAN verbinden. So
                  bleibt der Stream auch bei Topspielen mit hoher Zuschauerzahl stabil.
                </p>
                <p>
                  Bei Problemen hilft unser Ratgeber <a href="/iptv-sport">Sport IPTV</a> mit weiteren Tipps zu
                  Bildrate, Bandbreite und Server-Stabilität.
                </p>
              </>
            ),
          },
          {
            heading: 'Mehr als nur Bundesliga',
            body: (
              <>
                <p>
                  Mit dem Sport-Paket von 4kdeutsch streamen Sie neben der Bundesliga auch{' '}
                  <a href="/champions-league-live-stream">Champions League</a>, Premier League, La Liga, Serie A,
                  Formel 1, US-Sport und Kampfsport – alles in einem Abonnement. Sportkanäle warten auf Sie.
                </p>
              </>
            ),
          },
        ]}
        related={[
          { href: '/champions-league-live-stream', title: 'Champions League live', desc: 'Die Königsklasse live über IPTV streamen.' },
          { href: '/iptv-sport', title: 'Sport IPTV', desc: 'Alle Sportarten & Voraussetzungen im Überblick.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-Sport-IPTV ohne Vertrag sichern.' },
          { href: '/iptv-fire-stick', title: 'IPTV auf Fire Stick', desc: 'Sport auf dem TV: Fire TV Stick einrichten.' },
        ]}
      />

      <PageFigure id="iptv-bundesliga" />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
