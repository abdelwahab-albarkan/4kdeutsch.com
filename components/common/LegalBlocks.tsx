import React from 'react';
import { getLegal, isLegalTestMode } from '@/lib/legal';

/** Visible warning while fictional sample data is shown (local development only). */
export function LegalTestBanner() {
  if (!isLegalTestMode) return null;
  return (
    <div className="mb-8 rounded-xl border border-red-500/60 bg-red-500/10 p-4 text-sm font-semibold text-red-300">
      TESTDATEN – fiktive Beispielangaben nur zur Layout-Vorschau (LEGAL_TEST_DATA=1, nur lokal). Nicht veröffentlichen.
    </div>
  );
}

type Slot = 'provider' | 'representative' | 'register' | 'arbitration' | 'hosting' | 'payment' | 'address';

/**
 * Renders the real/test data for a slot when it is complete, otherwise the given fallback
 * (the [REQUIRED BUSINESS INFORMATION] marker). Nothing is ever invented.
 */
export function LegalSlot({ slot, children }: { slot: Slot; children: React.ReactNode }) {
  const d = getLegal();
  switch (slot) {
    case 'provider':
    case 'address':
      if (d.company && d.street && d.zipCity && d.country) {
        return (
          <address className="not-italic text-gray-300">
            <strong className="text-white">{d.company}</strong>
            <br />
            {d.street}
            <br />
            {d.zipCity}
            <br />
            {d.country}
            {slot === 'provider' && d.legalForm ? (
              <>
                <br />
                Rechtsform: {d.legalForm}
              </>
            ) : null}
          </address>
        );
      }
      break;
    case 'representative':
      if (d.representative) return <p className="text-gray-300">Vertreten durch: {d.representative}</p>;
      break;
    case 'register':
      if (d.registerNumber && d.registerCourt && d.vatId) {
        return (
          <p className="text-gray-300">
            Registergericht: {d.registerCourt}
            <br />
            Registernummer: {d.registerNumber}
            <br />
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {d.vatId}
          </p>
        );
      }
      break;
    case 'arbitration':
      if (d.consumerArbitration === false) {
        return <p className="text-gray-300">Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>;
      }
      if (d.consumerArbitration === true) {
        return <p className="text-gray-300">Wir sind bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>;
      }
      break;
    case 'hosting':
      if (d.hosting) {
        return (
          <p className="text-gray-300">
            Hosting-Anbieter: {d.hosting}. Ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO) und die konkrete Speicherdauer der Logfiles sind vom Betreiber noch zu bestätigen.
          </p>
        );
      }
      break;
    case 'payment':
      if (d.checkoutSystem && d.paymentProvider) {
        return (
          <p className="text-gray-300">
            Bestell-/Checkout-System: {d.checkoutSystem}. Zahlungsdienstleister: {d.paymentProvider}. Es gelten die Datenschutzhinweise des jeweiligen Anbieters.
          </p>
        );
      }
      break;
  }
  return <>{children}</>;
}
