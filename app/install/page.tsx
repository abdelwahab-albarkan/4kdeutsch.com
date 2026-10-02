import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata = withSocial({
  title: 'IPTV installieren & einrichten: Schritt-für-Schritt Anleitung 2026 | 4kdeutsch',
  description: 'IPTV in wenigen Minuten einrichten ✓ Schritt-für-Schritt-Anleitung auf Deutsch für Fire TV Stick, Samsung & LG Smart TV, Android TV, Apple TV, MAG-Boxen, Windows, macOS, Android & iOS. Jetzt starten!',
  alternates: { canonical: '/install' },
  keywords: [
    'IPTV installieren',
    'IPTV einrichten deutsch',
    'IPTV auf Fire Stick installieren',
    'IPTV auf Samsung TV installieren',
    'IPTV auf LG TV installieren',
    'IPTV Apple TV einrichten',
    'IPTV Xtream Codes einrichten',
    'IPTV M3U Playlist einrichten',
    'IPTV auf PC installieren',
  ],
});

interface Guide {
  name: string;
  image?: string;
  steps: string[];
  reverse?: boolean;
}

const GUIDES: Guide[] = [
  {
    name: 'Amazon Fire TV Stick & Fire TV',
    image: '/images/iptv/devices/hero-fire-stick.webp',
    steps: [
      'Suchen Sie auf der Startseite Ihres Fire Sticks nach der App „Downloader“ (verfügbar im offiziellen Amazon Appstore) und installieren Sie diese.',
      'Öffnen Sie Downloader und geben Sie den Direkt-Download-Code für „TiviMate Premium“ oder „IPTV Smarters Pro“ ein, um die APK-Datei herunterzuladen.',
      'Installieren und starten Sie die App. Wählen Sie anschließend die Option „Mit Xtream Codes API anmelden“ aus.',
      'Geben Sie die Server-URL (Portal-Link), Ihren Benutzernamen und das Passwort ein, die Sie direkt nach Ihrer Bestellung vollautomatisch per E-Mail erhalten haben.',
    ],
  },
  {
    name: 'Samsung & LG Smart-TVs (Tizen & webOS)',
    image: '/images/iptv/devices/hero-samsung-tv.webp',
    steps: [
      'Öffnen Sie den App-Store auf Ihrem Fernseher (Samsung App Store bzw. LG Content Store) und suchen Sie nach der App „IPTV Smarters Pro“, „IBO Player“ oder „Smart IPTV“.',
      'Installieren Sie die Anwendung auf Ihrem Smart-TV und notieren Sie sich die auf dem Bildschirm angezeigte MAC-Adresse des Geräts.',
      'Für IBO Player / Smart IPTV: Besuchen Sie das offizielle Upload-Portal der Player-App auf Ihrem Smartphone oder PC und laden Sie dort Ihren M3U-Playlist-Link hoch.',
      'Für IPTV Smarters Pro: Wählen Sie direkt in der Fernseh-App „Mit Xtream Codes API anmelden“ und tragen Sie Ihre Zugangsdaten ein, um das Streaming zu starten.',
    ],
  },
  {
    name: 'Android TV & Google TV (Sony, Philips, Xiaomi)',
    image: '/images/iptv/devices/hero-android-tv.webp',
    reverse: true,
    steps: [
      'Öffnen Sie den Google Play Store auf Ihrem Android-TV-Gerät oder Ihrer Google TV-Box.',
      'Suchen Sie nach der App „TiviMate IPTV Player“ (empfohlen für das beste IPTV-Erlebnis) oder „IPTV Smarters Pro“ und installieren Sie diese.',
      'Öffnen Sie die App und wählen Sie den Menüpunkt „Xtream Codes API“ oder „M3U-Wiedergabeliste hinzufügen“.',
      'Tragen Sie Ihre personalisierten 4kdeutsch-Zugangsdaten ein. Die Senderliste und der EPG-Programmführer werden anschließend vollautomatisch geladen.',
    ],
  },
  {
    name: 'Apple TV (tvOS)',
    image: '/images/iptv/devices/hero-apple-tv.webp',
    reverse: true,
    steps: [
      'Öffnen Sie den App Store auf Ihrem Apple TV.',
      'Suchen Sie nach einer Premium-Player-App wie „IPTVX“, „TiviMax“ oder „Smarters Player Lite“ und laden Sie diese herunter.',
      'Wählen Sie in den Einstellungen der installierten App die Option „Xtream Codes API hinzufügen“ oder importieren Sie die M3U-Playlist.',
      'Geben Sie die 4kdeutsch-Zugangsdaten aus Ihrer E-Mail ein. Die App sortiert alle deutschen und internationalen UHD-Kanäle automatisch.',
    ],
  },
  {
    name: 'Smartphones & Tablets (Android & iOS)',
    image: '/images/iptv/devices/hero-android-handy.webp',
    steps: [
      'Öffnen Sie den Apple App Store auf Ihrem iPhone/iPad oder den Google Play Store auf Ihrem Android-Smartphone bzw. Tablet.',
      'Laden Sie die kostenlose App „Smarters Player Lite“ oder „GSE Smart IPTV“ herunter und öffnen Sie diese.',
      'Wählen Sie die Anmeldeoption „Login with Xtream Codes API“ aus.',
      'Tragen Sie Ihre Zugangsdaten ein, um Ihre Lieblingssender und Filme auch unterwegs im 5G-Netz oder über WLAN in brillanter HD/UHD-Auflösung zu streamen.',
    ],
  },
  {
    name: 'PC & Notebook (Windows & macOS)',
    image: '/images/iptv/devices/hero-windows-mac.webp',
    steps: [
      'Laden Sie die kostenlose Multimedia-Software „VLC Media Player“ herunter oder installieren Sie die offizielle Desktop-App von „IPTV Smarters Pro“.',
      'Für IPTV Smarters: Starten Sie das Programm und melden Sie sich einfach und komfortabel über Ihre Xtream Codes API an.',
      'Für VLC Player: Starten Sie das Programm, drücken Sie Strg+N (Windows) bzw. Cmd+N (Mac), um das Fenster „Netzwerkstream öffnen“ aufzurufen.',
      'Fügen Sie Ihren M3U-Wiedergabelisten-Link in das Adressfeld ein und bestätigen Sie mit Enter, um die Senderliste zu laden.',
    ],
  },
  {
    name: 'MAG-Boxen & Enigma2 (Linux-Receiver)',
    image: '/images/iptv/devices/hero-mag-box.webp',
    reverse: true,
    steps: [
      'MAG-Box: Schalten Sie das Gerät ein, navigieren Sie zu Settings > System Settings > Servers > Portals.',
      'Tragen Sie als Portal-Name „4kdeutsch“ und im Feld Portal-URL den Server-Link aus Ihrer Freischaltungs-E-Mail ein. Speichern Sie und starten Sie die Box neu.',
      'Enigma2: Verbinden Sie sich über das DCC (Dreambox Control Center) oder Putty per SSH mit Ihrem Linux-Receiver.',
      'Führen Sie den Autoinstallation-Skriptbefehl aus, den Sie von unserem Support erhalten haben, um die Kanäle direkt in Ihre Bouquets (Favoritenlisten) einzuspielen.',
    ],
  },
];

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-4">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-xs font-bold text-primary-500">
            {i + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  );
}

export default function InstallPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">
          Installations- <span className="text-gradient">Anleitungen</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Egal welches Gerät Sie nutzen: Die Einrichtung unseres IPTV-Dienstes ist in der Regel in wenigen Minuten abgeschlossen. Wählen Sie einfach Ihre Plattform aus und folgen Sie den Schritten. Bei Fragen hilft Ihnen unser deutscher{' '}
          <Link href="/contact" className="text-primary-500 hover:underline font-semibold">
            Support
          </Link>{' '}
          gerne weiter.
        </p>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-4">
          Diese Seite ist der Überblick für alle Plattformen. Detailanleitungen finden Sie hier: Installation einer App Schritt für Schritt unter{' '}
          <Link href="/einrichtung/app-installieren" className="text-primary-500 hover:underline font-semibold">App installieren</Link>, Anleitungen je App und Gerät unter{' '}
          <Link href="/iptv-app" className="text-primary-500 hover:underline font-semibold">Apps &amp; Geräte</Link>, außerdem für den{' '}
          <Link href="/iptv-windows" className="text-primary-500 hover:underline font-semibold">PC (Windows &amp; Mac)</Link> und das{' '}
          <Link href="/iptv-android-handy" className="text-primary-500 hover:underline font-semibold">Android-Handy</Link>.
        </p>
      </div>

      <HowItWorks />
      <PageFigure id="iptv-installieren" />

      {/* Per-device installation guides */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <div className="flex flex-col gap-8">
          {GUIDES.map((guide) => (
            <div
              key={guide.name}
              className="rounded-2xl border border-border-subtle bg-surface-card/40 shadow-card p-6 md:p-8"
            >
              {guide.image ? (
                <div className={`grid md:grid-cols-5 gap-6 md:gap-10 items-center ${guide.reverse ? 'md:[direction:rtl]' : ''}`}>
                  {/* Device render on a soft radial spotlight */}
                  <div className="md:col-span-2 [direction:ltr]">
                    <div className="relative aspect-[4/3] w-full">
                      <div className="absolute inset-4 -z-10 rounded-full bg-primary-500/15 blur-2xl" />
                      <Image
                        src={guide.image}
                        alt={guide.name}
                        fill
                        sizes="(max-width: 768px) 90vw, 40vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3 [direction:ltr]">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-bold text-primary-500">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      Kompatibel
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-6">{guide.name}</h3>
                    <Steps steps={guide.steps} />
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-bold text-primary-500">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Kompatibel
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-6">{guide.name}</h3>
                  <Steps steps={guide.steps} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </div>
  );
}
