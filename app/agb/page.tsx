import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { ContactDetails, RequiredInfo } from '@/components/common/ContactBlock';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'Allgemeine Geschäftsbedingungen (AGB) | 4kdeutsch',
  description: 'Allgemeine Geschäftsbedingungen für die Nutzung des Dienstes.',
  alternates: { canonical: '/agb' },
});

export default function AGBPage() {
  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-6">
      <h1 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-8">
        Allgemeine Geschäfts<span className="text-primary-500">bedingungen</span>
      </h1>

      <div className="prose prose-invert flex flex-col gap-6 text-sm sm:text-base text-gray-400 leading-relaxed">
        <p>
          Diese Bedingungen regeln das Vertragsverhältnis zwischen dem Nutzer und dem Betreiber dieser
          Website ({SITE_CONFIG.domain}, Marke „{SITE_CONFIG.name}“) für die Nutzung des angebotenen
          Dienstes. Die Identität und Anschrift des Vertragspartners ergeben sich aus dem{' '}
          <a href="/impressum" className="text-primary-500 hover:underline">Impressum</a>.
        </p>
        <RequiredInfo>
          <p>
            AGB sind rechtsverbindliche Vertragsbedingungen. Der nachfolgende Text ist ein an den
            tatsächlichen Dienst angelehnter Entwurf und ersetzt keine anwaltliche Prüfung. Vor der
            Veröffentlichung sind insbesondere Vertragspartner, anwendbares Recht, Gerichtsstand und
            Preise durch die Geschäftsleitung zu bestätigen.
          </p>
        </RequiredInfo>

        <h2 className="text-xl font-bold text-white mt-6">1. Vertragsgegenstand & Leistungsumfang</h2>
        <p>
          Gegenstand des Vertrags ist die Bereitstellung eines technischen Zugangs zu einem
          IPTV-Dienst, der die Wiedergabe von Inhalten über gängige IPTV-Player-Anwendungen mittels
          M3U-Datei oder Xtream-Codes-API ermöglicht. Der konkrete Leistungsumfang ergibt sich aus der
          zum Zeitpunkt der Bestellung gewählten Paket- und Laufzeitbeschreibung.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">2. Zustandekommen des Vertrages</h2>
        <p>
          Durch Auswahl eines Pakets und Abschluss des Bezahlvorgangs (Vorkasse/Prepaid) gibt der Nutzer
          ein Angebot ab. Der Vertrag kommt mit der Bereitstellung der Zugangsdaten zustande. Alle Pakete
          sind Prepaid-Laufzeiten; es erfolgt <strong>keine automatische Verlängerung</strong>.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">3. Nutzungsrechte & Pflichten des Nutzers</h2>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li>Der Nutzer erhält ein einfaches, nicht übertragbares Nutzungsrecht für die erworbene Laufzeit.</li>
          <li>Die gleichzeitige Nutzung auf mehr Geräten als im gebuchten Paket vorgesehen ist unzulässig.</li>
          <li>Das Aufzeichnen, Re-Streamen oder die gewerbliche Weiterverbreitung der Inhalte ist untersagt.</li>
          <li>Der Nutzer ist für die Rechtmäßigkeit der von ihm abgerufenen Inhalte selbst verantwortlich.</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-6">4. Preise & Zahlung</h2>
        <p>
          Es gelten die zum Zeitpunkt der Bestellung ausgewiesenen Preise. Die Zahlung erfolgt per
          Vorkasse über die im externen Bestellsystem angebotenen Zahlungsmethoden. Nach Ablauf der
          gebuchten Laufzeit endet der Zugang, sofern keine erneute Bestellung erfolgt.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">5. Widerruf & Rückerstattung</h2>
        <p>
          Informationen zum Widerrufsrecht finden Sie in der{' '}
          <a href="/widerruf" className="text-primary-500 hover:underline">Widerrufsbelehrung</a>,
          Informationen zur Erstattung in der{' '}
          <a href="/refund" className="text-primary-500 hover:underline">Rückerstattungsrichtlinie</a>.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">6. Verfügbarkeit & Haftung</h2>
        <p>
          Der Betreiber bemüht sich um eine hohe Verfügbarkeit des Dienstes. Kurzzeitige Unterbrechungen
          durch Wartung oder quellenbedingte Ausfälle einzelner Inhalte begründen keinen Mangel. Die
          tatsächliche Wiedergabequalität hängt maßgeblich von der Internetverbindung des Nutzers ab.
          Die Haftung richtet sich nach den gesetzlichen Bestimmungen; zwingende
          Verbraucherschutzvorschriften bleiben unberührt.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">7. Anwendbares Recht & Schlussbestimmungen</h2>
        <RequiredInfo>
          <p>
            Anwendbares Recht und Gerichtsstand sind vom Betreiber festzulegen. Gegenüber Verbrauchern
            gelten stets die zwingenden Schutzvorschriften des Staates ihres gewöhnlichen Aufenthalts.
          </p>
        </RequiredInfo>
        <p>
          Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen
          unberührt.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">Kontakt</h2>
        <ContactDetails />
      </div>
    </div>
  );
}
