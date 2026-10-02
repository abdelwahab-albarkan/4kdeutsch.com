import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { ContactDetails, RequiredInfo } from '@/components/common/ContactBlock';
import { LegalSlot, LegalTestBanner } from '@/components/common/LegalBlocks';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'Datenschutzerklärung | 4kdeutsch',
  description: 'Informationen zur Verarbeitung personenbezogener Daten auf dieser Website gemäß DSGVO.',
  alternates: { canonical: '/datenschutz' },
});

export default function DatenschutzPage() {
  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-6">
      <h1 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-8">
        Datenschutz<span className="text-primary-500">erklärung</span>
      </h1>

      <LegalTestBanner />

      <div className="prose prose-invert flex flex-col gap-6 text-sm sm:text-base text-gray-400 leading-relaxed">
        <p>
          Diese Datenschutzerklärung informiert über die Verarbeitung personenbezogener Daten beim
          Besuch dieser Website gemäß der Datenschutz-Grundverordnung (DSGVO). Sie beschreibt
          ausschließlich die tatsächlich auf dieser Website eingesetzten Technologien. Die
          Abwicklung von Bestellungen und Zahlungen findet auf einem separaten Bestellsystem statt
          (siehe Abschnitt 6).
        </p>

        <h2 className="text-xl font-bold text-white mt-6">1. Verantwortlicher</h2>
        <p>Verantwortlicher im Sinne der DSGVO ist der Betreiber dieser Website.</p>
        <LegalSlot slot="provider">
          <RequiredInfo>
          <p>
            Name/Firma und ladungsfähige Anschrift des Verantwortlichen (identisch mit dem Impressum).
            Falls eine Bestellung zur Benennung eines Datenschutzbeauftragten besteht, sind dessen
            Kontaktdaten hier zu ergänzen – andernfalls ist keine Angabe erforderlich.
          </p>
        </RequiredInfo>
        </LegalSlot>
        <p>
          Kontakt in Datenschutzfragen:{' '}
          <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-primary-500 hover:underline">
            {SITE_CONFIG.supportEmail}
          </a>
        </p>

        <h2 className="text-xl font-bold text-white mt-6">2. Server-Logdaten (Hosting)</h2>
        <p>
          Beim Aufruf dieser Website werden durch den Hosting-Anbieter automatisch Informationen in
          Server-Logfiles erfasst, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit des
          Zugriffs, aufgerufene Seite, verwendeter Browsertyp und Betriebssystem. Diese Verarbeitung
          erfolgt zur Bereitstellung und technischen Sicherheit der Website auf Grundlage unseres
          berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        <LegalSlot slot="hosting">
          <RequiredInfo>
          <p>
            Name und Anschrift des Hosting-Anbieters sowie ggf. Bestehen eines
            Auftragsverarbeitungsvertrags (Art. 28 DSGVO) und die konkrete Speicherdauer der Logfiles
            sind vom Betreiber zu ergänzen. Es wird bewusst keine Speicherdauer erfunden.
          </p>
        </RequiredInfo>
        </LegalSlot>

        <h2 className="text-xl font-bold text-white mt-6">3. Webanalyse mit Google Analytics (Google Consent Mode v2)</h2>
        <p>
          Diese Website nutzt <strong>Google Analytics 4</strong>, einen Webanalysedienst der Google Ireland
          Limited (Gordon House, Barrow Street, Dublin 4, Irland). Wir binden Google Analytics mit{' '}
          <strong>Google Consent Mode v2</strong> ein: Der Analyse-Tag wird zwar auf jeder Seite geladen,
          steht aber <strong>standardmäßig auf „denied“</strong>. Das bedeutet: <strong>Ohne Ihre
          Einwilligung werden keine Analyse- oder Werbe-Cookies gesetzt und keine personenbezogenen Kennungen
          gespeichert.</strong> Vor der Einwilligung können lediglich cookielose, aggregierte Signale
          (Consent Mode) übertragen werden, die keine Identifizierung ermöglichen. Erst nach Ihrer
          Einwilligung („Akzeptieren“) wird der Status auf „granted“ gesetzt und die vollständige Messung mit
          Cookies aktiviert.
        </p>
        <p>
          Bei erteilter Einwilligung verarbeitet Google Analytics pseudonyme Nutzungsdaten, um die Nutzung
          unserer Website auszuwerten, u. a.: eine pseudonyme Kennung (Client-ID über die Cookies{' '}
          <code>_ga</code> / <code>_ga_&lt;ID&gt;</code>), aufgerufene Seiten, Verweisquelle, ungefähre
          Region, Gerätetyp und Browser. Die IP-Adresse wird von Google Analytics 4 gekürzt/anonymisiert
          verarbeitet.
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li><strong>Rechtsgrundlage:</strong> Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG).</li>
          <li><strong>Widerruf:</strong> jederzeit mit Wirkung für die Zukunft über „Cookie-Einstellungen“ im Seitenfuß oder durch Löschen der Cookies.</li>
          <li><strong>Empfänger / Auftragsverarbeiter:</strong> Google Ireland Limited bzw. Google LLC (USA).</li>
        </ul>
        <RequiredInfo>
          <p>
            Vom Betreiber zu bestätigen bzw. zu ergänzen: Abschluss eines Auftragsverarbeitungsvertrags mit
            Google (Art. 28 DSGVO), Grundlage der Datenübermittlung in die USA (EU-US Data Privacy Framework
            und/oder EU-Standardvertragsklauseln gem. Art. 46 DSGVO) sowie die in Ihrem Google-Analytics-Konto
            konfigurierte Aufbewahrungsdauer der Nutzungsdaten.
          </p>
        </RequiredInfo>
        <p>
          Weitere Informationen bietet die Datenschutzerklärung von Google:{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
            policies.google.com/privacy
          </a>
          . Details zu den eingesetzten Cookies finden Sie in unserer{' '}
          <a href="/cookies" className="text-primary-500 hover:underline">Cookie-Information</a>.
        </p>

        <h3 className="text-lg font-bold text-white mt-4">Vercel Web Analytics (cookielos)</h3>
        <p>
          Zusätzlich nutzen wir <strong>Vercel Web Analytics</strong> unseres Hosting-Anbieters Vercel Inc.
          (USA) zur aggregierten Reichweitenmessung. Dieser Dienst arbeitet <strong>ohne Cookies</strong> und
          <strong> ohne dauerhafte Kennungen</strong>; es werden keine Profile über verschiedene Websites
          hinweg gebildet. Erfasst werden lediglich anonymisierte, aggregierte Kennzahlen (z. B. Seitenaufrufe,
          Referrer, ungefähre Region, Gerätekategorie). Rechtsgrundlage ist unser berechtigtes Interesse an
          einer reichweiten- und leistungsbezogenen Auswertung (Art. 6 Abs. 1 lit. f DSGVO). Da keine
          Informationen in Ihrem Endgerät gespeichert oder ausgelesen werden, ist hierfür keine Einwilligung
          nach § 25 TDDDG erforderlich.
        </p>
        <RequiredInfo>
          <p>
            Vom Betreiber zu bestätigen: Auftragsverarbeitungsvertrag mit Vercel Inc. (Art. 28 DSGVO) und die
            Grundlage der Datenübermittlung in die USA (EU-US Data Privacy Framework / Standardvertragsklauseln).
          </p>
        </RequiredInfo>

        <h2 className="text-xl font-bold text-white mt-6">4. Schriftarten (lokal gehostet)</h2>
        <p>
          Die verwendeten Schriftarten werden lokal von unserem eigenen Server ausgeliefert. Es besteht
          <strong> keine</strong> Verbindung zu Google Fonts oder anderen externen Schrift-Servern; es
          werden hierbei keine Daten an Dritte übertragen.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">5. Eingebundene Medien von Drittanbietern</h2>
        <p>
          Auf einzelnen Seiten (z. B. der Startseite) werden Vorschaubilder zu Filmen und Serien
          angezeigt, die technisch von externen Bild-Servern geladen werden. Dabei wird Ihre IP-Adresse
          an den jeweiligen Anbieter übertragen, was technisch erforderlich ist, damit die Bilder in
          Ihrem Browser dargestellt werden können (Art. 6 Abs. 1 lit. f DSGVO). Betroffene Anbieter sind:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li>
            <strong>TMDB</strong> (The Movie Database, Betrieb in den USA) – Auslieferung von Film- und
            Serien-Postern über <code>image.tmdb.org</code>.
          </li>
          <li>
            <strong>Unsplash</strong> (Betrieb in den USA) – vereinzelt als Ersatz-Vorschaubilder über{' '}
            <code>images.unsplash.com</code>.
          </li>
        </ul>
        <p>
          Diese Anbieter können bei der Auslieferung Ihre IP-Adresse verarbeiten. Es findet eine
          Übermittlung in ein Drittland (USA) statt. Details zur Ausgestaltung geeigneter Garantien
          gemäß Art. 44 ff. DSGVO sind vom Betreiber zu prüfen.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">6. Bestellung & Zahlung (externes System)</h2>
        <p>
          Der Bestell- und Bezahlvorgang findet nicht auf dieser Website statt, sondern auf einem
          separaten Bestellsystem, zu dem die Schaltflächen „Jetzt abonnieren“ / „Kaufen“ verlinken.
          Die dort erhobenen Daten (z. B. E-Mail-Adresse, Zahlungsdaten) unterliegen der
          Datenschutzerklärung des jeweiligen Bestell- und Zahlungsdienstleisters.
        </p>
        <LegalSlot slot="payment">
          <RequiredInfo>
          <p>
            Bezeichnung und Datenschutzhinweise des eingesetzten Bestell-/Checkout-Systems sowie der
            konkreten Zahlungsdienstleister (z. B. PayPal, Kreditkarten-Acquirer, Krypto-Gateway) sind
            vom Betreiber zu ergänzen.
          </p>
        </RequiredInfo>
        </LegalSlot>

        <h2 className="text-xl font-bold text-white mt-6">7. Kontaktaufnahme (E-Mail & WhatsApp)</h2>
        <p>
          Wenn Sie uns per E-Mail oder über WhatsApp kontaktieren, verarbeiten wir die von Ihnen
          mitgeteilten Angaben zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO).
          Bei Nutzung von WhatsApp erfolgt die Verarbeitung zusätzlich durch die WhatsApp Ireland Ltd. /
          Meta gemäß deren Datenschutzbestimmungen. Das Kontaktformular auf der Website bereitet lediglich
          eine E-Mail in Ihrem eigenen E-Mail-Programm vor (mailto); die Eingaben werden dabei nicht an
          unseren Server übertragen. Die Kontaktaufnahme erfolgt über die genannten Kanäle.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">8. Ihre Rechte</h2>
        <p>Sie haben nach der DSGVO das Recht auf:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li>Auskunft (Art. 15), Berichtigung (Art. 16) und Löschung (Art. 17),</li>
          <li>Einschränkung der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20),</li>
          <li>Widerspruch gegen die Verarbeitung auf Grundlage berechtigter Interessen (Art. 21),</li>
          <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3).</li>
        </ul>
        <p>
          Ihnen steht zudem ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO).
          Zur Ausübung Ihrer Rechte genügt eine Nachricht an die oben genannte E-Mail-Adresse.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">Kontakt</h2>
        <ContactDetails />
      </div>
    </div>
  );
}
