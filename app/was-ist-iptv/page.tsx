import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { breadcrumbSchema } from '@/lib/structured-data';
import InfoArticle from '@/components/sections/InfoArticle';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV erklärt: Was ist IPTV? Funktionsweise & Vorteile 2026 | 4kdeutsch',
  description:
    'IPTV (IP TV) einfach erklärt: Was ist IPTV, wie funktioniert IPTV-Streaming über das Internet, was brauchen Sie dafür und welche Vorteile bietet Internet Protocol Television gegenüber Kabel und Satellit?',
  alternates: { canonical: '/was-ist-iptv' },
  keywords: [
    'Was ist IPTV',
    'IPTV erklärt',
    'wie funktioniert IPTV',
    'IPTV Bedeutung',
    'Internetfernsehen',
    'IPTV Definition',
  ],
  openGraph: {
    title: 'IPTV erklärt: Was ist IPTV? Funktionsweise & Vorteile 2026 | 4kdeutsch',
    description:
      'IPTV einfach erklärt: Fernsehen über das Internet. Wie es funktioniert, was Sie brauchen und welche Vorteile IPTV bietet.',
    url: 'https://4kdeutsch.com/was-ist-iptv',
  },
});

export default function WasIstIptvPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Startseite', path: '/' },
          { name: 'Was ist IPTV?', path: '/was-ist-iptv' },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Was ist IPTV?', path: '/was-ist-iptv' },
        ]}
      />

      <InfoArticle
        tagline="IPTV-Grundlagen · Einfach erklärt"
        h1={
          <>
            Was ist <span className="text-gradient">IPTV?</span>
          </>
        }
        intro={
          <>
            <p>
              <strong>IPTV</strong> steht für <strong>Internet Protocol Television</strong> – zu Deutsch:
              Internetfernsehen. Statt über Kabel, Satellit oder Antenne werden die Fernsehsignale über eine
              Highspeed-Internetverbindung übertragen. Das bedeutet: Sie schauen Live-TV, Filme und Serien einfach über
              Ihr Internet – auf dem Fernseher, Smartphone, Tablet oder PC.
            </p>
            <p>
              Schreibweisen wie „IP TV“ oder „IPTV Streaming“ meinen dasselbe: TV-Inhalte, die als IP-Datenstrom über das
              Internet geliefert werden – live oder als Video on Demand. Unterschiede zwischen Anbietern betreffen vor
              allem Sender, Bedingungen und Support; wie Sie einen IPTV Anbieter einordnen, zeigt der{' '}
              <a href="/iptv-vergleich">IPTV Anbieter Vergleich</a>.
            </p>
          </>
        }
        sections={[
          {
            heading: 'Wie funktioniert IPTV?',
            body: (
              <>
                <p>
                  Bei IPTV werden TV-Inhalte als Datenpakete über das Internet-Protokoll (IP) an Ihr Gerät gesendet –
                  ganz ähnlich wie beim Laden einer Webseite. Ein IPTV-Player (App) empfängt diese Datenströme und gibt
                  sie als Fernsehbild wieder. So erhalten Sie Zugriff auf tausende Sender und ein riesiges Archiv an
                  Video-on-Demand-Inhalten (VOD).
                </p>
                <p>
                  Die Zugangsdaten erhalten Sie meist als <strong>M3U-Wiedergabeliste</strong> oder über die{' '}
                  <strong>Xtream Codes API</strong>, die Sie in Ihrer <a href="/iptv-apps">IPTV-App</a> eingeben.
                </p>
              </>
            ),
          },
          {
            heading: 'Was brauche ich für IPTV?',
            body: (
              <>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Eine stabile <strong>Internetverbindung</strong> (mind. 15 MBit/s für HD, 25–50 MBit/s für 4K)</li>
                  <li>Ein <strong>kompatibles Gerät</strong>: <a href="/iptv-fire-stick">Fire TV Stick</a>, <a href="/iptv-samsung-tv">Samsung</a>, <a href="/iptv-lg-tv">LG</a>, <a href="/iptv-android-tv">Android TV</a>, <a href="/iptv-apple-tv">Apple TV</a>, Smartphone oder PC</li>
                  <li>Eine <strong>IPTV-App</strong> wie <a href="/tivimate-iptv">TiviMate</a> oder <a href="/iptv-smarters-pro">IPTV Smarters Pro</a></li>
                  <li>Ein <a href="/iptv-kaufen">IPTV-Abo</a> von einem seriösen Anbieter</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Die Vorteile von IPTV',
            body: (
              <>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Riesige Auswahl:</strong> tausende Live-Sender und VOD-Inhalte weltweit</li>
                  <li><strong>Beste Qualität:</strong> 4K Ultra HD (je nach Gerät und Sender)</li>
                  <li><strong>Flexibel:</strong> auf jedem Gerät und überall nutzbar</li>
                  <li><strong>Zusatzfunktionen:</strong> EPG-Programmführer, Catch-Up TV und Aufnahme</li>
                  <li><strong>Günstig &amp; ohne Vertrag:</strong> deutlich preiswerter als klassisches Kabel-TV</li>
                </ul>
                <p>
                  Wie sich IPTV gegenüber Kabel schlägt, zeigt unser Vergleich{' '}
                  <a href="/bestes-iptv">Bestes IPTV</a>. Und ob IPTV legal ist, erklären wir unter{' '}
                  <a href="/iptv-legal-deutschland">Ist IPTV legal in Deutschland?</a>
                </p>
              </>
            ),
          },
        ]}
        related={[
          { href: '/iptv-legal-deutschland', title: 'Ist IPTV legal?', desc: 'Die Rechtslage in Deutschland verständlich erklärt.' },
          { href: '/bestes-iptv', title: 'Bestes IPTV', desc: 'Woran Sie den besten Anbieter erkennen.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag sichern.' },
          { href: '/devices', title: 'Kompatible Geräte', desc: 'Auf welchen Geräten IPTV funktioniert.' },
        ]}
      />

      <PageFigure id="iptv-ratgeber" caption="Bei IPTV kommen die Sender über das Internet statt über Kabel oder Satellit." />
      <FAQSection />
      <CTASection />
    </>
  );
}
