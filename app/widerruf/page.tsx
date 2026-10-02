import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { ContactDetails, RequiredInfo } from '@/components/common/ContactBlock';
import { LegalSlot, LegalTestBanner } from '@/components/common/LegalBlocks';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'Widerrufsbelehrung | 4kdeutsch',
  description: 'Informationen zum gesetzlichen Widerrufsrecht bei digitalen Inhalten.',
  alternates: { canonical: '/widerruf' },
});

export default function WiderrufPage() {
  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-6">
      <h1 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-8">
        Widerrufs<span className="text-primary-500">belehrung</span>
      </h1>

      <LegalTestBanner />

      <div className="prose prose-invert flex flex-col gap-6 text-sm sm:text-base text-gray-400 leading-relaxed">
        <p>
          Diese Widerrufsbelehrung gilt für Verbraucher, die einen Vertrag über digitale Inhalte bzw.
          digitale Dienstleistungen abschließen. Verbraucher ist jede natürliche Person, die ein
          Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer
          selbständigen beruflichen Tätigkeit zugerechnet werden können.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">Widerrufsrecht</h2>
        <p>
          Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
          widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
        </p>
        <p>
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung (z. B. per
          E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Zur Wahrung der
          Widerrufsfrist genügt die rechtzeitige Absendung der Mitteilung.
        </p>
        <p>
          E-Mail:{' '}
          <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-primary-500 hover:underline">
            {SITE_CONFIG.supportEmail}
          </a>
        </p>
        <LegalSlot slot="address">
          <RequiredInfo>
          <p>
            Für eine rechtskonforme Widerrufsbelehrung sind die vollständige Anbieteranschrift (Name,
            Adresse) sowie – sofern vorhanden – Telefon-/Faxnummer einzutragen. Empfohlen wird zudem die
            Beifügung des amtlichen Muster-Widerrufsformulars.
          </p>
        </RequiredInfo>
        </LegalSlot>

        <h2 className="text-xl font-bold text-white mt-6">Vorzeitiges Erlöschen des Widerrufsrechts</h2>
        <p>
          Bei einem Vertrag über die Bereitstellung digitaler Inhalte, die nicht auf einem körperlichen
          Datenträger geliefert werden, erlischt das Widerrufsrecht vorzeitig, wenn
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li>Sie ausdrücklich zugestimmt haben, dass mit der Ausführung vor Ablauf der Widerrufsfrist begonnen wird, und</li>
          <li>
            Sie Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung mit Beginn der
            Ausführung Ihr Widerrufsrecht verlieren, und
          </li>
          <li>der Betreiber Ihnen hierüber eine Bestätigung zur Verfügung gestellt hat.</li>
        </ul>
        <p>
          Da der Zugang unmittelbar nach der Bestellung bereitgestellt wird, ist das Einholen dieser
          ausdrücklichen Zustimmung im Bestellprozess erforderlich.
        </p>
        <RequiredInfo>
          <p>
            Der Betreiber muss sicherstellen, dass die vorstehende ausdrückliche Zustimmung und
            Kenntnisbestätigung im externen Bestellsystem tatsächlich eingeholt und dokumentiert wird.
          </p>
        </RequiredInfo>

        <h2 className="text-xl font-bold text-white mt-6">Folgen des Widerrufs</h2>
        <p>
          Wenn Sie diesen Vertrag wirksam widerrufen, erstatten wir Ihnen alle Zahlungen, die wir von
          Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab Zugang Ihrer
          Widerrufsmitteilung. Für die Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
          ursprünglichen Transaktion eingesetzt haben, sofern nichts anderes vereinbart wurde.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">Kontakt</h2>
        <ContactDetails />
      </div>
    </div>
  );
}
