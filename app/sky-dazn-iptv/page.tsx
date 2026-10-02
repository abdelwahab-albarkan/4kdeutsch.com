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
    question: 'Kann ich Sky oder DAZN über IPTV schauen?',
    answer:
      'Sky- und DAZN-Inhalte sind an deren Lizenzen gebunden. Legal sehen Sie sie über die Angebote von Sky bzw. DAZN selbst. Ein IPTV-Anbieter benötigt für solche Inhalte eine Lizenz des Rechteinhabers – fragen Sie den Anbieter konkret danach.',
  },
  {
    question: 'Woran erkenne ich unseriöse „Sky und DAZN inklusive“-Angebote?',
    answer:
      'Warnzeichen sind extrem niedrige Preise, fehlendes Impressum, Zahlung nur per Kryptowährung und Versprechen aller Sportrechte ohne nachvollziehbare Lizenzen.',
  },
  {
    question: 'Ist IPTV-Technik dasselbe wie ein Sky- oder DAZN-Abo?',
    answer:
      'Nein. IPTV ist eine Übertragungstechnik. Sky und DAZN sind Anbieter mit eigenen Lizenzen und Apps, die Sie auf vielen Geräten direkt nutzen können.',
  },
  {
    question: 'Wo läuft die Bundesliga legal?',
    answer:
      'Die Rechte werden je Saison an verschiedene Anbieter vergeben und können sich ändern. Prüfen Sie die aktuelle Übersicht bei der Deutschen Fußball Liga (DFL) oder direkt bei den Anbietern.',
  },
];

export const metadata: Metadata = withSocial({
  title: 'Sky & DAZN über IPTV? Was legal ist und welche Wege es gibt | 4kdeutsch',
  description:
    'Sky und DAZN über IPTV – geht das? Unterschied zwischen IPTV-Technik und Lizenzen, Warnzeichen und legale Wege. Allgemeine Information, keine Rechtsberatung.',
  alternates: { canonical: '/sky-dazn-iptv' },
  keywords: ['Sky IPTV', 'DAZN IPTV', 'Sky DAZN IPTV legal', 'IPTV Sport legal', 'Sky über IPTV', 'DAZN über IPTV'],
  openGraph: {
    title: 'Sky & DAZN über IPTV? Was legal ist | 4kdeutsch',
    description: 'Der Unterschied zwischen IPTV-Technik und Lizenzen – und wie Sie Sport legal schauen.',
    url: 'https://4kdeutsch.com/sky-dazn-iptv',
  },
});

export default function SkyDaznIptvPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV legal in Deutschland', path: '/iptv-legal-deutschland' },
          { name: 'Sky & DAZN über IPTV', path: '/sky-dazn-iptv' },
        ]}
      />

      <InfoArticle
        tagline="Ratgeber · Allgemeine Information, keine Rechtsberatung"
        h1={
          <>
            Sky &amp; DAZN <span className="text-gradient">über IPTV?</span>
          </>
        }
        intro={
          <>
            <p>
              Viele suchen nach „Sky IPTV“ oder „DAZN IPTV“ – in der Hoffnung, Bundesliga, Champions League und Co. günstig über ein IPTV-Angebot zu
              sehen. Ob das möglich und legal ist, hängt an einer Frage: <strong>Wer besitzt die Rechte an den Inhalten?</strong>
            </p>
            <p>
              Dieser Ratgeber trennt Technik und Lizenzen, nennt Warnzeichen und zeigt legale Wege. Zu Inhalten von Sky, DAZN oder anderen
              Rechteinhabern machen wir hier keine Zusagen.
            </p>
          </>
        }
        sections={[
          {
            heading: 'Technik ist nicht Lizenz',
            body: (
              <>
                <p>
                  IPTV bedeutet Fernsehen über das Internet-Protokoll – die <strong>Übertragungstechnik</strong> ist neutral und legal. Sky und DAZN sind
                  dagegen Unternehmen, die Übertragungsrechte erwerben und ihre Inhalte über eigene Abos und Apps anbieten.
                </p>
                <p>
                  Ein IPTV-Anbieter darf solche Inhalte nur verbreiten, wenn er dafür eine Lizenz des jeweiligen Rechteinhabers hat. Grundlagen dazu
                  finden Sie in unserem <Link href="/iptv-legal-deutschland">Rechtsratgeber</Link>.
                </p>
              </>
            ),
          },
          {
            heading: 'Warnzeichen bei „Sky und DAZN inklusive“',
            body: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Auffällig niedrige Preise für „alle Sportrechte“ ohne Nennung von Lizenzgebern.</li>
                <li>Kein vollständiges Impressum, keine nachvollziehbare Firma, nur Messenger-Kontakt.</li>
                <li>Zahlung ausschließlich per Kryptowährung oder anonymen Diensten.</li>
                <li>Aufforderung, Apps aus unbekannten Quellen zu installieren.</li>
              </ul>
            ),
          },
          {
            heading: 'Legale Wege, Sport zu schauen',
            body: (
              <>
                <p>
                  Der sichere Weg sind die <strong>Angebote der Rechteinhaber selbst</strong>: Sky und DAZN bieten eigene Apps für viele Smart-TVs,
                  Streaming-Sticks, Smartphones und Tablets. Frei empfangbare Spiele laufen teils im Free-TV und in den Mediatheken der Sender.
                </p>
                <p>
                  Die Verteilung der Rechte ändert sich von Saison zu Saison. Die aktuelle Übersicht finden Sie bei der Deutschen Fußball Liga (DFL)
                  und direkt bei den Anbietern. Unsere Sportseiten erklären die Zusammenhänge:{' '}
                  <Link href="/bundesliga-live-stream">Bundesliga</Link>, <Link href="/champions-league-live-stream">Champions League</Link> und{' '}
                  <Link href="/iptv-sport">IPTV Sport</Link>.
                </p>
              </>
            ),
          },
          {
            heading: 'Was Sie bei einem IPTV-Anbieter konkret fragen sollten',
            body: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Welche Inhalte sind lizenziert, und von wem?</li>
                <li>Gibt es ein vollständiges Impressum und einen erreichbaren Support?</li>
                <li>Welche Zahlungsmethoden und Kündigungsbedingungen gelten?</li>
                <li>Welche Geräte und Apps werden unterstützt?</li>
              </ul>
            ),
          },
          {
            heading: 'Kostenlos schauen?',
            body: (
              <p>
                Gratis-Streams für Bezahlinhalte sind in aller Regel nicht lizenziert. Was dahintersteckt, erklärt unser Beitrag{' '}
                <Link href="/kostenloses-iptv">Kostenloses IPTV: Risiken und Alternativen</Link>.
              </p>
            ),
          },
        ]}
        related={[
          { href: '/iptv-legal-deutschland', title: 'Ist IPTV legal?', desc: 'Rechtslage und seriöse Anbieter erkennen.' },
          { href: '/kostenloses-iptv', title: 'Kostenloses IPTV', desc: 'Risiken von Gratis-Listen und legale Alternativen.' },
          { href: '/iptv-sport', title: 'IPTV Sport', desc: 'Sport und IPTV im Überblick.' },
          { href: '/bundesliga-live-stream', title: 'Bundesliga', desc: 'Wie Sie die Bundesliga verfolgen.' },
          { href: '/iptv-sicherheit', title: 'IPTV Sicherheit', desc: 'So streamen Sie sicher.' },
          { href: '/iptv-vergleich', title: 'Anbieter vergleichen', desc: 'Kriterien für die Auswahl.' },
        ]}
      />
      <PageFigure id="iptv-sport" />
      <PricingSection />
      <CTASection />
    </>
  );
}
