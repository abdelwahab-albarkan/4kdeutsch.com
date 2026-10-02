import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { faqSchema } from '@/lib/structured-data';
import InfoArticle from '@/components/sections/InfoArticle';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';
import { withSocial } from '@/lib/seo';

const FAQ = [
  {
    question: 'Gibt es kostenloses IPTV?',
    answer:
      'Es gibt legale kostenlose Fernsehangebote, etwa die Mediatheken und Livestreams der Sender. Frei im Netz kursierende „kostenlose IPTV-Listen“ enthalten dagegen häufig Inhalte ohne Lizenz, sind instabil und bergen Sicherheitsrisiken.',
  },
  {
    question: 'Sind kostenlose M3U-Playlists legal?',
    answer:
      'Das lässt sich nicht pauschal sagen. Eine M3U-Datei ist nur eine Liste von Adressen. Entscheidend ist, ob die dahinterliegenden Inhalte rechtmäßig angeboten werden. Bei öffentlich kursierenden Listen ist das oft nicht erkennbar. Dies ist keine Rechtsberatung.',
  },
  {
    question: 'Welche Risiken haben kostenlose IPTV-Listen?',
    answer:
      'Mögliche Risiken sind rechtliche Unsicherheit, häufige Ausfälle, schlechte Qualität, manipulierte Apps oder Links (Schadsoftware, Phishing) und der Verlust persönlicher Daten.',
  },
  {
    question: 'Was sind legale Alternativen?',
    answer:
      'Mediatheken und Livestreams der Sender, Free-TV-Apps sowie werbefinanzierte Angebote legaler Streaming-Anbieter. Wer ein breites Angebot auf einem Gerät möchte, findet bezahlte Angebote mit transparentem Anbieter.',
  },
];

export const metadata: Metadata = withSocial({
  title: 'Kostenloses IPTV & gratis M3U-Listen: Risiken & Alternativen | 4kdeutsch',
  description:
    'Kostenloses IPTV und gratis M3U-Listen: Risiken, Rechtslage und legale Alternativen. Keine Listen, keine Links. Allgemeine Information, keine Rechtsberatung.',
  alternates: { canonical: '/kostenloses-iptv' },
  keywords: ['kostenloses IPTV', 'IPTV kostenlos', 'IPTV gratis', 'M3U Playlist kostenlos', 'IPTV Liste kostenlos', 'IPTV Risiken'],
  openGraph: {
    title: 'Kostenloses IPTV & gratis M3U-Listen: Risiken und Alternativen | 4kdeutsch',
    description: 'Was hinter kostenlosem IPTV steckt, welche Risiken es gibt und welche legalen Alternativen Sie haben.',
    url: 'https://4kdeutsch.com/kostenloses-iptv',
  },
});

export default function KostenlosesIptvPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV legal in Deutschland', path: '/iptv-legal-deutschland' },
          { name: 'Kostenloses IPTV', path: '/kostenloses-iptv' },
        ]}
      />

      <InfoArticle
        tagline="Ratgeber · Allgemeine Information, keine Rechtsberatung"
        h1={
          <>
            Kostenloses IPTV &amp; <span className="text-gradient">gratis M3U-Listen</span>
          </>
        }
        intro={
          <>
            <p>
              Wer nach „IPTV kostenlos“ oder „M3U Playlist gratis“ sucht, findet schnell Listen und Apps mit hunderten Sendern – scheinbar ohne
              Kosten. Was steckt dahinter, worin liegen die Risiken, und was sind sinnvolle Alternativen?
            </p>
            <p>
              <strong>Wir stellen hier bewusst keine Listen bereit und verlinken keine.</strong> Dieser Ratgeber erklärt die Hintergründe, damit Sie
              eine informierte Entscheidung treffen. Er ersetzt keine Rechtsberatung.
            </p>
          </>
        }
        sections={[
          {
            heading: 'Was sind „kostenlose IPTV-Listen“ eigentlich?',
            body: (
              <>
                <p>
                  Eine M3U-Playlist ist eine einfache Textdatei mit Adressen von Streams. Die Datei selbst ist neutral – entscheidend ist, woher die
                  Streams stammen und ob der Betreiber die Rechte daran hält. Bei öffentlich kursierenden Listen ist die Herkunft meist unklar.
                </p>
                <p>
                  Manche Listen verweisen auf Sender, die ohnehin frei und legal im Netz laufen. Viele enthalten jedoch Inhalte, deren Verbreitung
                  erkennbar nicht lizenziert ist.
                </p>
              </>
            ),
          },
          {
            heading: 'Die wichtigsten Risiken',
            body: (
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Rechtliche Unsicherheit:</strong> Werden Inhalte ohne Lizenz verbreitet, kann auch die Nutzung problematisch sein. Die Bewertung hängt vom Einzelfall ab.</li>
                <li><strong>Instabilität:</strong> Kostenlose Streams fallen häufig aus, wechseln Adressen oder laufen nur in niedriger Qualität.</li>
                <li><strong>Sicherheit:</strong> Manipulierte Apps, Download-Seiten und Links können Schadsoftware oder Phishing enthalten.</li>
                <li><strong>Datenschutz:</strong> Unbekannte Betreiber erfassen teils Geräte- und Nutzungsdaten.</li>
                <li><strong>Kein Support:</strong> Bei Problemen gibt es keinen Ansprechpartner.</li>
              </ul>
            ),
          },
          {
            heading: 'Woran Sie unseriöse Angebote erkennen',
            body: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Versprechen wie „alle Sender, alle Sportrechte, gratis“ ohne Nennung eines Anbieters.</li>
                <li>Kein Impressum, keine nachvollziehbaren Kontaktdaten, nur Messenger-Kontakt.</li>
                <li>Bezahlung nur per Kryptowährung oder anonymen Zahlungsmethoden.</li>
                <li>Aufforderung, APK-Dateien aus unbekannten Quellen zu installieren.</li>
              </ul>
            ),
          },
          {
            heading: 'Legale kostenlose Alternativen',
            body: (
              <>
                <p>
                  Kostenlos und legal fernsehen Sie über die <strong>Mediatheken und Livestreams der Sender</strong>, über Free-TV-Apps und über
                  werbefinanzierte Angebote legaler Streaming-Anbieter. Das Angebot und die Verfügbarkeit ändern sich; prüfen Sie es direkt beim
                  jeweiligen Anbieter.
                </p>
                <p>
                  Wer Inhalte der öffentlich-rechtlichen Mediatheken komfortabel durchsuchen möchte, kann Programme wie <strong>MediathekView</strong> nutzen – ein Open-Source-Programm, das Mediatheken-Angebote auflistet. Nutzen Sie dafür die offizielle Projektseite.
                </p>
                <p>
                  Sportübertragungen sind dagegen meist an kostenpflichtige Rechteinhaber gebunden – mehr dazu in unserem Beitrag zu{' '}
                  <Link href="/sky-dazn-iptv">Sky, DAZN und IPTV</Link>.
                </p>
              </>
            ),
          },
          {
            heading: 'Wenn Sie ein IPTV-Abo möchten',
            body: (
              <>
                <p>
                  Ein bezahltes Abo bringt einen nachvollziehbaren Anbieter, Support und stabile Server. Worauf Sie achten sollten, steht in unserem{' '}
                  <Link href="/iptv-legal-deutschland">Rechtsratgeber</Link> und im <Link href="/iptv-vergleich">Anbietervergleich</Link>. Die Preise
                  finden Sie unter <Link href="/pricing">Abo &amp; Preise</Link>.
                </p>
                <p>
                  Ihre Playlist-URL enthält persönliche Zugangsdaten – geben Sie sie nicht weiter. So richten Sie sie ein:{' '}
                  <Link href="/einrichtung/m3u-einrichten">M3U-Link einrichten</Link>.
                </p>
              </>
            ),
          },
        ]}
        related={[
          { href: '/iptv-legal-deutschland', title: 'Ist IPTV legal?', desc: 'Rechtslage und Merkmale seriöser Anbieter.' },
          { href: '/iptv-sicherheit', title: 'IPTV Sicherheit', desc: 'So streamen Sie sicher.' },
          { href: '/sky-dazn-iptv', title: 'Sky, DAZN & IPTV', desc: 'Was legal ist und welche Wege es gibt.' },
          { href: '/einrichtung/m3u-einrichten', title: 'M3U-Link einrichten', desc: 'Playlist in der App hinzufügen.' },
          { href: '/iptv-vergleich', title: 'IPTV Anbieter vergleichen', desc: 'Kriterien für die Auswahl.' },
          { href: '/pricing', title: 'Abo & Preise', desc: 'Kosten im Überblick.' },
        ]}
      />
      <PageFigure id="iptv-datenschutz" />
      <PricingSection />
      <CTASection />
    </>
  );
}
