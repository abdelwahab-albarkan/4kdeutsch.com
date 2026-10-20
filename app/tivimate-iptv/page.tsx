import React from 'react';
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
  title: 'TiviMate einrichten 2026: IPTV Player Anleitung | 4kdeutsch',
  description:
    'TiviMate IPTV Player einrichten ✓ Installation & Setup mit Xtream Codes API auf Fire Stick & Android TV ✓ Funktionen, Premium-Version und empfohlene Einstellungen erklärt.',
  alternates: { canonical: '/tivimate-iptv' },
  keywords: [
    'TiviMate',
    'TiviMate IPTV',
    'TiviMate einrichten',
    'TiviMate Premium',
    'TiviMate Fire Stick',
    'beste IPTV App Android TV',
  ],
  openGraph: {
    title: 'TiviMate einrichten 2026: IPTV Player Anleitung | 4kdeutsch',
    description:
      'TiviMate IPTV Player installieren & einrichten – mit Xtream Codes API, EPG und Aufnahmefunktion. Für Fire Stick & Android TV.',
    url: 'https://4kdeutsch.com/tivimate-iptv',
  },
});

export default function TiviMatePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Apps', path: '/iptv-apps' },
          { name: 'TiviMate', path: '/tivimate-iptv' },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Apps', path: '/iptv-apps' },
          { name: 'TiviMate', path: '/tivimate-iptv' },
        ]}
      />

      <InfoArticle
        tagline="IPTV Player · Android TV & Fire Stick"
        h1={
          <>
            <span className="text-gradient">TiviMate</span> einrichten
          </>
        }
        intro={
          <>
            <p>
              <strong>TiviMate</strong> gilt als einer der besten IPTV-Player für Android TV und den Amazon Fire TV
              Stick. Die App überzeugt mit einer aufgeräumten Oberfläche, einem hervorragenden EPG-Programmführer und
              einer sehr schnellen Navigation. In dieser Anleitung richten Sie TiviMate mit Ihren 4kdeutsch-Zugangsdaten
              ein.
            </p>
          </>
        }
        sections={[
          {
            heading: 'TiviMate installieren',
            body: (
              <>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Installieren Sie TiviMate aus dem Google Play Store (Android TV) oder per Downloader auf dem <a href="/iptv-fire-stick">Fire Stick</a>.</li>
                  <li>Öffnen Sie die App und wählen Sie „Playlist hinzufügen“.</li>
                  <li>Wählen Sie „Xtream Codes API“ als Verbindungstyp.</li>
                  <li>Geben Sie Portal-URL, Benutzername und Passwort aus Ihrer 4kdeutsch-E-Mail ein.</li>
                  <li>TiviMate lädt Senderliste und EPG automatisch – fertig.</li>
                </ol>
              </>
            ),
          },
          {
            heading: 'Die wichtigsten Funktionen',
            body: (
              <>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>EPG-Programmführer:</strong> übersichtliche TV-Guide-Ansicht mit Vorschau</li>
                  <li><strong>Favoriten & Gruppen:</strong> Sender individuell sortieren und anlegen</li>
                  <li><strong>Catch-Up TV:</strong> verpasste Sendungen nachträglich ansehen</li>
                  <li><strong>Mehrere Playlists:</strong> mehrere Zugänge parallel verwalten</li>
                  <li><strong>Aufnahmefunktion</strong> (Premium): Sendungen mitschneiden</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'TiviMate Free vs. Premium',
            body: (
              <>
                <p>
                  Die kostenlose Version reicht für den Einstieg völlig aus. Die{' '}
                  <strong>Premium-Version</strong> schaltet zusätzlich Funktionen wie die Aufnahme, mehrere Playlists
                  gleichzeitig und geplante Aufnahmen frei. Für Power-User lohnt sich das Upgrade – für normales
                  Fernsehen genügt die Gratis-Variante.
                </p>
                <p>
                  Tipp: Kombinieren Sie TiviMate mit einem <a href="/iptv-kaufen">4kdeutsch-Abo</a> in 4K für das
                  beste Ergebnis.
                </p>
              </>
            ),
          },
        ]}
        related={[
          { href: '/iptv-smarters-pro', title: 'IPTV Smarters Pro', desc: 'Der kostenlose Allrounder für jede Plattform.' },
          { href: '/iptv-apps', title: 'Alle IPTV Apps', desc: 'Player-Vergleich für jedes Gerät.' },
          { href: '/iptv-fire-stick', title: 'IPTV auf Fire Stick', desc: 'TiviMate auf dem Fire TV installieren.' },
          { href: '/iptv-android-tv', title: 'IPTV auf Android TV', desc: 'TiviMate auf Android TV & Google TV.' },
        ]}
      />

      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
