import React from 'react';
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
  title: 'IPTV Smarters Pro: Einrichtung, Download & Xtream-Login 2026 | 4kdeutsch',
  description:
    'IPTV Smarters Pro herunterladen, einrichten und anmelden: Anleitung für Fire Stick, Android, iOS, Samsung & LG – mit Xtream Codes oder M3U, EPG und VOD. Verfügbarkeit je nach Gerät, Modell und Region.',
  alternates: { canonical: '/iptv-smarters-pro' },
  keywords: [
    'IPTV Smarters Pro',
    'IPTV Smarters Pro einrichten',
    'IPTV Smarters App',
    'Smarters IPTV',
    'IPTV Smarters Fire Stick',
    'IPTV Smarters Pro Download',
    'Smarters Pro',
    'IPTV Smarters Pro Kosten',
    'IPTV Smarters Player',
  ],
  openGraph: {
    title: 'IPTV Smarters Pro: Einrichtung, Download & Xtream-Login 2026 | 4kdeutsch',
    description:
      'IPTV Smarters Pro installieren & einrichten für Fire Stick, Android, iOS, Samsung & LG – mit Xtream Codes, EPG und VOD.',
    url: 'https://4kdeutsch.com/iptv-smarters-pro',
  },
});

export default function IptvSmartersProPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Apps', path: '/iptv-apps' },
          { name: 'IPTV Smarters Pro', path: '/iptv-smarters-pro' },
        ]}
      />

      <InfoArticle
        tagline="IPTV Player · Für alle Plattformen"
        h1={
          <>
            <span className="text-gradient">IPTV Smarters Pro</span> einrichten
          </>
        }
        intro={
          <>
            <p>
              <strong>IPTV Smarters Pro</strong> ist einer der beliebtesten IPTV-Player – und das aus gutem Grund: Die
              App ist in den Stores in der Regel kostenlos erhältlich, unterstützt sowohl die Xtream Codes API als auch M3U-Wiedergabelisten und läuft auf
              nahezu jeder Plattform: Fire TV Stick, Android, iOS, Samsung und LG. In dieser Anleitung richten Sie
              IPTV Smarters Pro mit Ihren 4kdeutsch-Zugangsdaten ein.
            </p>
          </>
        }
        sections={[
          {
            heading: 'IPTV Smarters Pro installieren',
            body: (
              <>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Laden Sie IPTV Smarters Pro aus dem App Store, Google Play oder per Downloader auf dem <a href="/iptv-fire-stick">Fire Stick</a>.</li>
                  <li>Öffnen Sie die App und wählen Sie „Mit Xtream Codes API anmelden“.</li>
                  <li>Vergeben Sie einen beliebigen Namen und geben Sie Portal-URL, Benutzername und Passwort aus Ihrer 4kdeutsch-E-Mail ein.</li>
                  <li>Tippen Sie auf „Hinzufügen“ – Senderliste, EPG und VOD werden automatisch geladen.</li>
                </ol>
              </>
            ),
          },
          {
            heading: 'IPTV Smarters Pro herunterladen – und was kostet die App?',
            body: (
              <>
                <p>
                  Laden Sie IPTV Smarters Pro nur aus dem offiziellen Store Ihres Geräts (App Store, Google Play, Samsung- bzw. LG-Store)
                  oder – falls die App dort nicht verfügbar ist – über die Installationsquelle des Herstellers. Die Verfügbarkeit kann je nach
                  Gerät, Modell und Region variieren.
                </p>
                <p>
                  Der Download ist in den Stores in der Regel kostenlos; aktuelle Preise der App prüfen Sie im jeweiligen Store. Für den
                  Empfang von Sendern benötigen Sie zusätzlich ein IPTV-Abo – die Kosten finden Sie unter{' '}
                  <a href="/pricing">IPTV Abo &amp; Preise</a>. Die Einrichtung auf Ihrem Gerät erklären diese Anleitungen:{' '}
                  <a href="/iptv-app/iptv-smarters-pro/fire-stick">Fire Stick</a>,{' '}
                  <a href="/iptv-app/iptv-smarters-pro/samsung-tv">Samsung TV</a>,{' '}
                  <a href="/iptv-app/iptv-smarters-pro/lg-tv">LG TV</a> und{' '}
                  <a href="/iptv-app/iptv-smarters-pro/apple-tv">Apple TV</a>. Für iPhone und iPad gibt es außerdem <a href="/iptv-app/smarters-player-lite">Smarters Player Lite</a>. Auf dem Computer und dem Handy helfen <a href="/iptv-windows">IPTV am PC</a> und <a href="/iptv-android-handy">IPTV auf Android</a> weiter.
                </p>
              </>
            ),
          },
          {
            heading: 'Die wichtigsten Funktionen',
            body: (
              <>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Live-TV, Filme &amp; Serien</strong> in einer übersichtlichen Oberfläche</li>
                  <li><strong>EPG-Programmführer</strong> für die komplette TV-Vorschau</li>
                  <li><strong>Favoriten</strong> für schnellen Zugriff auf Lieblingssender</li>
                  <li><strong>Externe Player</strong> (z.&nbsp;B. VLC) für maximale Kompatibilität</li>
                  <li><strong>Kindersicherung</strong> für ausgewählte Inhalte</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'IPTV Smarters Pro oder TiviMate?',
            body: (
              <>
                <p>
                  <strong>IPTV Smarters Pro</strong> ist kostenlos, plattformübergreifend und ideal für Einsteiger.{' '}
                  <a href="/tivimate-iptv">TiviMate</a> bietet die ausgefeiltere Oberfläche und mehr Komfort auf Android
                  TV. Beide funktionieren einwandfrei mit 4kdeutsch – probieren Sie einfach aus, welche App Ihnen besser
                  gefällt. Ein Überblick über alle Player: <a href="/iptv-apps">Beste IPTV Apps</a>.
                </p>
              </>
            ),
          },
        ]}
        related={[
          { href: '/tivimate-iptv', title: 'TiviMate einrichten', desc: 'Die Premium-App für Android TV & Fire Stick.' },
          { href: '/iptv-apps', title: 'Alle IPTV Apps', desc: 'Player-Vergleich für jedes Gerät.' },
          { href: '/iptv-fire-stick', title: 'IPTV auf Fire Stick', desc: 'IPTV Smarters Pro auf dem Fire TV installieren.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag sichern.' },
        ]}
      />

      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
