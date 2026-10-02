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
    question: 'Welche IPTV App eignet sich für das Android-Handy?',
    answer:
      'Geeignet sind Player, die Xtream Codes oder M3U unterstützen, zum Beispiel IPTV Smarters Pro, VLC oder OTT Navigator. Installieren Sie Apps bevorzugt aus dem Google Play Store.',
  },
  {
    question: 'Ist eine IPTV APK sicher?',
    answer:
      'APK-Dateien aus unbekannten Quellen können Schadsoftware enthalten. Nutzen Sie den Play Store oder die offizielle Herstellerseite und deaktivieren Sie „Unbekannte Quellen“ nach der Installation wieder.',
  },
  {
    question: 'Verbraucht IPTV auf dem Handy viel mobiles Datenvolumen?',
    answer:
      'Live-TV verbraucht je nach Qualität viele Daten. Nutzen Sie nach Möglichkeit WLAN oder senken Sie die Qualität in der App.',
  },
  {
    question: 'Kann ich IPTV auch auf dem Tablet nutzen?',
    answer: 'Ja, die Einrichtung ist identisch zum Smartphone. Der größere Bildschirm eignet sich gut für Sport und Serien.',
  },
];

export const metadata: Metadata = withSocial({
  title: 'IPTV auf Android-Handy & Tablet: App, APK & Einrichtung | 4kdeutsch',
  description:
    'IPTV auf Android-Smartphone und Tablet einrichten: Play Store oder APK sicher installieren, Xtream Codes und M3U verwenden, mobile Daten sparen. Anleitung auf Deutsch.',
  alternates: { canonical: '/iptv-android-handy' },
  keywords: ['IPTV Android Handy', 'IPTV App Android', 'IPTV Player Android', 'IPTV APK', 'IPTV Tablet', 'IPTV Smartphone'],
  openGraph: {
    title: 'IPTV auf Android-Handy & Tablet: App, APK & Einrichtung | 4kdeutsch',
    description: 'IPTV App für Android: sicher installieren, einrichten und unterwegs schauen.',
    url: 'https://4kdeutsch.com/iptv-android-handy',
  },
});

export default function IptvAndroidHandyPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Kompatible Geräte', path: '/devices' },
          { name: 'IPTV auf Android-Handy', path: '/iptv-android-handy' },
        ]}
      />

      <DeviceGuide
        tagline="Android Smartphone · Tablet"
        h1={
          <>
            IPTV auf dem <span className="text-gradient">Android-Handy &amp; Tablet</span>
          </>
        }
        image={{ src: '/images/iptv/devices/hero-android-handy.webp', alt: 'Illustration: Smartphone und Tablet mit Streaming-Oberfläche' }}
        intro={
          <>
            <p>
              Mit einer <strong className="text-gray-200">IPTV App für Android</strong> schauen Sie Live-TV und Filme auf dem Smartphone oder
              Tablet – zu Hause im WLAN oder unterwegs. Die Einrichtung dauert nur wenige Minuten.
            </p>
            <p>
              Sie brauchen die <strong className="text-gray-200">Zugangsdaten</strong> (Xtream Codes oder M3U-Link) aus Ihrer Aktivierungs-E-Mail.{' '}
              {AVAILABILITY_NOTE} Anders als bei Android TV ist hier besonders wichtig, woher die App stammt – mehr dazu unten.
            </p>
          </>
        }
        steps={[
          'Öffnen Sie den Google Play Store und installieren Sie einen IPTV-Player (z. B. IPTV Smarters Pro, VLC oder OTT Navigator).',
          'Starten Sie die App und erlauben Sie die angefragten Berechtigungen.',
          'Wählen Sie „Xtream Codes“ oder „Playlist hinzufügen“ (M3U) und tragen Sie Ihre Zugangsdaten ein.',
          'Warten Sie, bis Senderliste und Programmführer geladen sind.',
          'Wählen Sie einen Sender – drehen Sie das Gerät für das Vollbild.',
        ]}
        apps={[
          { name: 'IPTV Smarters Pro', note: 'Xtream-Codes-Anmeldung, Programmführer und VOD-Bereich in einer App.' },
          { name: 'VLC', note: 'Universeller Player: M3U-Link als Netzwerkstream öffnen.' },
          { name: 'OTT Navigator', note: 'Viele Anpassungen und Favoritenverwaltung – auch für mehrere Playlists.' },
        ]}
        benefits={[
          'Für Android-Smartphones und -Tablets',
          'Xtream Codes oder M3U',
          'Zu Hause im WLAN und unterwegs',
          'Zugangsdaten sofort per E-Mail',
          'Ohne Vertrag – monatlich kündbar',
          'Deutschsprachiger Support',
        ]}
        related={[
          { href: '/iptv-android-tv', title: 'IPTV auf Android TV', desc: 'Die Anleitung für Android-TV-Boxen und Google TV.' },
          { href: '/iptv-app/iptv-smarters-pro/android-handy', title: 'Smarters Pro auf Android', desc: 'App-spezifische Anleitung.' },
          { href: '/iptv-app/televizo', title: 'Televizo', desc: 'Android-Player im Überblick.' },
          { href: '/einrichtung/app-installieren/android-handy', title: 'App installieren (Android)', desc: 'Installation Schritt für Schritt.' },
          { href: '/iptv-hilfe/ruckeln-und-puffern/android-handy', title: 'Ruckeln auf dem Handy', desc: 'Lösungen bei Puffern.' },
          { href: '/devices', title: 'Alle Geräte', desc: 'Übersicht aller unterstützten Geräte.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Abo ohne Vertrag.' },
        ]}
      />

      <PageFigure id="iptv-android-handy" />
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">Play Store oder APK?</h2>
        <p className="text-gray-400 leading-relaxed mb-3">
          Installieren Sie Apps bevorzugt aus dem <strong className="text-gray-200">Google Play Store</strong>. Wer eine APK-Datei nutzt, sollte sie
          nur von der offiziellen Herstellerseite laden: Dateien aus unbekannten Quellen können Schadsoftware enthalten. Die Option „Unbekannte
          Quellen“ gehört nach der Installation wieder abgeschaltet. {' '}
          <Link href="/iptv-sicherheit" className="text-primary-500 underline">Mehr zur Sicherheit</Link>.
        </p>

        <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4 mt-8">Mobile Daten und Akku</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-300 leading-relaxed mb-8">
          <li>Live-TV verbraucht viele Daten: Nutzen Sie WLAN oder senken Sie die Qualität in den App-Einstellungen.</li>
          <li>Hohe Helligkeit und Dauerwiedergabe belasten den Akku – ein Ladekabel bei langen Spielen spart Nerven.</li>
          <li>Bei Ruckeln: andere Apps schließen, Gerät neu starten, näher an den Router gehen.</li>
        </ul>

        <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">Tablet oder Handy?</h2>
        <p className="text-gray-400 leading-relaxed">
          Das Tablet bietet mehr Bildfläche für Sport und Serien, die Einrichtung ist identisch. Für das Wohnzimmer ist ein Fernseher mit App oder eine
          TV-Box meist die stabilere Lösung – Anleitungen finden Sie unter{' '}
          <Link href="/iptv-android-tv" className="text-primary-500 underline">IPTV auf Android TV</Link> und{' '}
          <Link href="/iptv-fire-stick" className="text-primary-500 underline">Fire Stick</Link>.
        </p>
      </section>

      <PricingSection />
      <CTASection />
    </>
  );
}
