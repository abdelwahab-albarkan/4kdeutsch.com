import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { faqSchema } from '@/lib/structured-data';
import InfoArticle from '@/components/sections/InfoArticle';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Champions League: Champions League live streamen 2026 | 4kdeutsch',
  description:
    'IPTV Champions League: So streamen Sie die UEFA-Königsklasse live per IPTV-App – Voraussetzungen, Internetgeschwindigkeit und beste Player-Einstellungen. Welche Übertragungen enthalten sind, klärt der Support vorab.',
  alternates: { canonical: '/champions-league-live-stream' },
  keywords: [
    'Champions League live stream',
    'Champions League IPTV',
    'Champions League streamen',
    'CL live schauen',
    'UEFA Champions League stream',
    'IPTV Fußball',
  ],
  openGraph: {
    title: 'IPTV Champions League: Champions League live streamen 2026 | 4kdeutsch',
    description:
      'Die UEFA Champions League live über IPTV streamen – in guter Qualität. Voraussetzungen & beste Einstellungen.',
    url: 'https://4kdeutsch.com/champions-league-live-stream',
  },
});

export default function ChampionsLeaguePage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Sport IPTV', path: '/iptv-sport' },
          { name: 'Champions League live streamen', path: '/champions-league-live-stream' },
        ]}
      />

      <InfoArticle
        tagline="Fußball · UEFA Champions League"
        h1={
          <>
            Champions League <span className="text-gradient">live streamen</span>
          </>
        }
        intro={
          <>
            <p>
              Die <strong>UEFA Champions League</strong> ist der Höhepunkt des europäischen Vereinsfußballs. Mit IPTV
              erleben Sie die Königsklasse live in HD- oder 4K-Qualität (je nach Sender) – auf dem Fernseher, Tablet
              oder Smartphone. So verpassen Sie keinen großen Champions-League-Abend.
            </p>
          </>
        }
        sections={[
          {
            heading: 'Champions League über IPTV: die Voraussetzungen',
            body: (
              <>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Ein Premium-IPTV-Abo mit umfangreichem <strong>Sport- und UHD-Paket</strong></li>
                  <li>Internetgeschwindigkeit von <strong>25–50 MBit/s</strong> für flüssiges 4K-Streaming</li>
                  <li>Ein leistungsfähiger Player mit <strong>H.265-Unterstützung</strong> (z.&nbsp;B. TiviMate)</li>
                  <li>Mindestens <strong>2 Verbindungen</strong> für parallele Spiele am selben Abend</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'So holen Sie die beste Bildqualität heraus',
            body: (
              <>
                <p>
                  Aktivieren Sie in Ihrem Player die <strong>Hardware-Dekodierung</strong> und stellen Sie die
                  Puffergröße auf „Groß“. Für die stabilste Verbindung an großen Spieltagen empfiehlt sich ein
                  LAN-Kabel. Weitere Optimierungstipps finden Sie in unserem Ratgeber{' '}
                  <a href="/iptv-sport">Sport IPTV</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Alle Top-Wettbewerbe in einem Abo',
            body: (
              <>
                <p>
                  Neben der Champions League streamen Sie mit 4kdeutsch auch{' '}
                  <a href="/bundesliga-live-stream">Bundesliga</a>, Premier League, La Liga, Serie A, Europa League und
                  viele weitere Sport-Highlights – Sportkanäle in HD, Full HD und 4K (je nach Sender).
                </p>
              </>
            ),
          },
        ]}
        related={[
          { href: '/bundesliga-live-stream', title: 'Bundesliga live', desc: 'Die 1. & 2. Bundesliga live über IPTV streamen.' },
          { href: '/iptv-sport', title: 'Sport IPTV', desc: 'Alle Sportarten & Voraussetzungen im Überblick.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-Sport-IPTV ohne Vertrag sichern.' },
          { href: '/bestes-iptv', title: 'Bestes IPTV', desc: 'Worauf es beim besten Sport-IPTV ankommt.' },
        ]}
      />

      <PageFigure id="iptv-fussball" />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
