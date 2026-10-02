import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { faqSchema } from '@/lib/structured-data';
import DeviceGuide from '@/components/sections/DeviceGuide';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';
import { AVAILABILITY_NOTE } from '@/lib/apps';
import { withSocial } from '@/lib/seo';

const FAQ = [
  {
    question: 'Welcher IPTV Player ist für Windows geeignet?',
    answer:
      'Für den PC eignen sich universelle Player wie der VLC Media Player (M3U-Link über „Netzwerkstream“) sowie Desktop-Apps, die Xtream Codes unterstützen. Welche Desktop-Apps verfügbar sind, kann variieren – nutzen Sie nur die Downloads der jeweiligen Hersteller.',
  },
  {
    question: 'Wie schaue ich IPTV am PC mit VLC?',
    answer:
      'Öffnen Sie VLC, wählen Sie „Medien → Netzwerkstream öffnen“ (Strg+N), fügen Sie Ihren M3U-Link ein und bestätigen Sie. Die Senderliste erscheint in der Wiedergabeliste (Strg+L).',
  },
  {
    question: 'Funktioniert IPTV auch am Mac?',
    answer:
      'Ja, der Ablauf ist ähnlich: VLC oder ein Player mit Xtream-Codes-Anmeldung. Unter macOS öffnen Sie den Netzwerkstream mit Cmd+N.',
  },
  {
    question: 'Warum ruckelt IPTV am PC?',
    answer:
      'Häufige Ursachen sind WLAN-Schwankungen, eine ausgelastete Internetleitung, veraltete Grafiktreiber oder zu viele laufende Programme. Ein LAN-Kabel und aktuelle Treiber helfen oft.',
  },
];

export const metadata: Metadata = withSocial({
  title: 'IPTV am PC: Windows IPTV Player einrichten (10/11 & Mac) | 4kdeutsch',
  description:
    'IPTV auf dem PC einrichten: VLC und Desktop-Player unter Windows 10/11 mit M3U oder Xtream Codes, dazu Tipps für den Mac. Schritt-für-Schritt-Anleitung auf Deutsch.',
  alternates: { canonical: '/iptv-windows' },
  keywords: ['IPTV Windows', 'IPTV Player Windows', 'IPTV am PC', 'IPTV PC Player', 'IPTV Windows 11', 'IPTV Mac'],
  openGraph: {
    title: 'IPTV am PC: Windows IPTV Player einrichten | 4kdeutsch',
    description: 'IPTV Player für Windows 10/11 und Mac einrichten – mit M3U oder Xtream Codes.',
    url: 'https://4kdeutsch.com/iptv-windows',
  },
});

export default function IptvWindowsPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Kompatible Geräte', path: '/devices' },
          { name: 'IPTV am PC', path: '/iptv-windows' },
        ]}
      />

      <DeviceGuide
        tagline="Windows 10 · Windows 11 · macOS"
        h1={
          <>
            IPTV am <span className="text-gradient">PC &amp; Laptop</span> mit dem richtigen Player
          </>
        }
        image={{ src: '/images/iptv/devices/hero-windows-mac.webp', alt: 'Illustration: Laptop mit Streaming-Oberfläche' }}
        intro={
          <>
            <p>
              Am Computer schauen Sie IPTV mit einem <strong className="text-gray-200">Desktop-Player</strong>: entweder mit dem
              universellen <strong className="text-gray-200">VLC Media Player</strong> (M3U-Link) oder mit einer App, die sich per
              Xtream Codes anmelden lässt. Diese Anleitung gilt für Windows 10 und 11; Hinweise für den Mac finden Sie weiter unten.
            </p>
            <p>
              Sie benötigen lediglich die <strong className="text-gray-200">Zugangsdaten</strong> (M3U-Link oder Xtream Codes) aus Ihrer
              Aktivierungs-E-Mail. {AVAILABILITY_NOTE}
            </p>
          </>
        }
        steps={[
          'Laden Sie den Player ausschließlich von der offiziellen Website des Herstellers herunter und installieren Sie ihn.',
          'VLC: Öffnen Sie „Medien → Netzwerkstream öffnen“ (Strg+N), fügen Sie den M3U-Link ein und bestätigen Sie mit „Wiedergabe“.',
          'Desktop-App mit Xtream Codes: Wählen Sie die Anmeldung per Xtream Codes und tragen Sie Server-URL, Benutzername und Passwort ein.',
          'Warten Sie, bis die Senderliste geladen ist. In VLC öffnen Sie sie mit Strg+L.',
          'Wählen Sie einen Sender und testen Sie die Wiedergabe im Vollbildmodus.',
        ]}
        apps={[
          { name: 'VLC Media Player', note: 'Kostenloser Allround-Player: M3U-Link als Netzwerkstream öffnen – ideal für den schnellen Start.' },
          { name: 'IPTV Smarters Pro (Desktop)', note: 'Wenn für Ihr System angeboten: komfortable Xtream-Codes-Anmeldung mit Programmführer.' },
          { name: 'IPTVnator', note: 'Kostenloser Open-Source-Player für Windows, macOS und Linux mit M3U-Import und optionalem Programmführer.' },
        ]}
        benefits={[
          'Für Windows 10, Windows 11 und macOS',
          'M3U oder Xtream Codes',
          'Bequem am Arbeitsplatz oder unterwegs',
          'Zugangsdaten sofort per E-Mail',
          'Ohne Vertrag – monatlich kündbar',
          'Deutschsprachiger Support',
        ]}
        related={[
          { href: '/iptv-smarters-pro', title: 'IPTV Smarters Pro', desc: 'Die App im Detail – Funktionen und Anmeldung.' },
          { href: '/iptv-app/iptvnator', title: 'IPTVnator', desc: 'Open-Source-Player für den Computer.' },
          { href: '/iptv-app/kodi', title: 'Kodi mit IPTV', desc: 'PVR IPTV Simple Client mit M3U.' },
          { href: '/einrichtung/m3u-einrichten', title: 'M3U-Link einrichten', desc: 'So fügen Sie Ihre Playlist hinzu.' },
          { href: '/einrichtung/xtream-codes-einrichten', title: 'Xtream Codes einrichten', desc: 'Anmeldung mit Server-URL, Benutzer und Passwort.' },
          { href: '/iptv-hilfe/ruckeln-und-puffern', title: 'IPTV ruckelt?', desc: 'Ursachen und Lösungen bei Puffern und Ruckeln.' },
          { href: '/devices', title: 'Alle Geräte', desc: 'Übersicht aller unterstützten Geräte.' },
          { href: '/iptv-apps', title: 'Beste IPTV Apps', desc: 'Player im Überblick.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Abo ohne Vertrag.' },
        ]}
      />

      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">Tipps für Windows 10 und 11</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-300 leading-relaxed mb-8">
          <li>Laden Sie Software nur von Herstellerseiten herunter; vermeiden Sie „Cracks“ und Download-Portale mit Zusatzsoftware.</li>
          <li>Blockiert die Windows-Firewall oder ein Virenscanner die Wiedergabe, prüfen Sie die App-Freigaben in den Einstellungen.</li>
          <li>Aktualisieren Sie den Grafikkartentreiber – das verbessert die Wiedergabe bei hohen Auflösungen.</li>
          <li>Ein LAN-Kabel ist stabiler als WLAN. Schließen Sie Downloads und Cloud-Synchronisation während des Schauens.</li>
          <li>Für das große Bild: PC per HDMI an den Fernseher anschließen. Für den Dauereinsatz ist ein Smart-TV oder eine TV-Box meist bequemer.</li>
        </ul>

        <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">IPTV am Mac (macOS)</h2>
        <p className="text-gray-400 leading-relaxed mb-3">
          Auch unter macOS funktioniert der Ablauf mit VLC: Netzwerkstream mit <strong className="text-gray-200">Cmd+N</strong> öffnen, M3U-Link einfügen,
          bestätigen. Alternativ nutzen Sie einen Player mit Xtream-Codes-Anmeldung. Beim ersten Start blockiert macOS Apps aus unbekannten Quellen –
          installieren Sie daher nur Software aus dem App Store oder von der offiziellen Herstellerseite.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Mehr zu App-spezifischen Anleitungen finden Sie unter <Link href="/iptv-app" className="text-primary-500 underline">Apps &amp; Geräte</Link>.
        </p>
      </section>

      <PageFigure id="iptv-windows-mac" />
      <PricingSection />
      <CTASection />
    </>
  );
}
