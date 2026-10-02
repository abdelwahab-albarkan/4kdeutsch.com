import React from 'react';
import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'Urheberrecht & DMCA-Richtlinie | 4kdeutsch',
  description: 'Unsere Richtlinie zum Schutz des geistigen Eigentums (DMCA- & Urheberrechtshinweise). Erfahren Sie, wie Sie Urheberrechtsverletzungen melden können.',
  alternates: { canonical: '/legal/dmca' },
});

export default function DMCAUsagePage() {
  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-6">
      <h1 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-8">
        Urheberrecht & <span className="text-primary-500">DMCA</span>
      </h1>

      <div className="prose prose-invert flex flex-col gap-6 text-sm sm:text-base text-gray-400 leading-relaxed">
        <p className="font-semibold text-white">
          Stand: August 2026
        </p>
        <p>
          4kdeutsch respektiert das geistige Eigentum Dritter. Wir verlangen von unseren Nutzern und Partnern, dies ebenfalls zu tun. Nachfolgend finden Sie unsere Richtlinien zur Meldung von Urheberrechtsverletzungen.
        </p>

        <h3 className="text-xl font-bold text-white mt-6">1. Meldung von Urheberrechtsverletzungen (Notice)</h3>
        <p>
          Wenn Sie Inhaber von Urheberrechten sind oder bevollmächtigt sind, im Namen eines Rechteinhabers zu handeln, und glauben, dass über unsere Server-Infrastruktur geschützte Inhalte in einer Weise verbreitet werden, die Ihre Rechte verletzt, können Sie uns eine Mitteilung senden.
        </p>
        <p>
          Ihre schriftliche Mitteilung muss folgende Angaben enthalten:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li>Eine physische oder elektronische Unterschrift des Rechteinhabers oder seines Vertreters.</li>
          <li>Eine genaue Beschreibung des urheberrechtlich geschützten Werks, dessen Verletzung gemeldet wird.</li>
          <li>Die genaue URL oder den spezifischen Pfad (z. B. Stream-Parameter), unter dem das verletzende Material erreichbar ist.</li>
          <li>Ihre Kontaktdaten (Name, Adresse, Telefonnummer, E-Mail-Adresse).</li>
          <li>Eine Erklärung, dass Sie in gutem Glauben davon ausgehen, dass die Nutzung des Materials in der beanstandeten Weise nicht vom Rechteinhaber autorisiert wurde.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6">2. Einreichen von Meldungen</h3>
        <p>
          Senden Sie Ihre Mitteilung bitte per E-Mail an unseren benannten Urheberrechtsbeauftragten unter <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-primary-500 hover:underline">{SITE_CONFIG.supportEmail}</a>.
        </p>
        <p>
          Wir prüfen eingehende Meldungen zeitnah und entfernen oder sperren den Zugriff auf das betroffene Material, sofern die Rechtsverletzung hinreichend belegt ist bzw. sich bestätigt (Notice-and-Take-down-Verfahren nach dem Digital Services Act).
        </p>

        <h3 className="text-xl font-bold text-white mt-6">3. Missbrauch von Meldungen</h3>
        <p>
          Bitte beachten Sie, dass Sie für Schäden und Anwaltskosten haftbar gemacht werden können, wenn Sie wissentlich fälschlicherweise behaupten, dass Inhalte Urheberrechte verletzen.
        </p>
      </div>
    </div>
  );
}
