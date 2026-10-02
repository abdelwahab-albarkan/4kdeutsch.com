/**
 * Legal / business data for Impressum, Datenschutz, Widerruf.
 *
 * LEGAL_REAL is intentionally EMPTY (null) until the owner supplies the real, verified data – the legal pages then show
 * their [REQUIRED BUSINESS INFORMATION] markers and stay noindex.
 *
 * LEGAL_TEST holds fictional sample values ("Musterstraße", "Max Mustermann", fake register numbers). They are ONLY ever
 * rendered in local development when LEGAL_TEST_DATA=1 is set in .env.local (with a visible banner). They are disabled in
 * every production build (NODE_ENV === 'production'), are never used in structured data and must never be published.
 */
export interface LegalData {
  company: string | null;
  legalForm: string | null;
  street: string | null;
  zipCity: string | null;
  country: string | null;
  representative: string | null;
  registerNumber: string | null;
  registerCourt: string | null;
  vatId: string | null;
  hosting: string | null;
  paymentProvider: string | null;
  checkoutSystem: string | null;
  /** true = participates in consumer dispute resolution, false = does not, null = unknown */
  consumerArbitration: boolean | null;
  supportPhone: string | null;
}

export const LEGAL_REAL: LegalData = {
  company: null,
  legalForm: null,
  street: null,
  zipCity: null,
  country: null,
  representative: null,
  registerNumber: null,
  registerCourt: null,
  vatId: null,
  hosting: null,
  paymentProvider: null,
  checkoutSystem: null,
  consumerArbitration: null,
  supportPhone: null,
};

/** FICTIONAL sample data for layout preview only – do not publish. */
export const LEGAL_TEST: LegalData = {
  company: '4KDEUTSCH Media GmbH',
  legalForm: 'GmbH',
  street: 'Musterstraße 25',
  zipCity: '10115 Berlin',
  country: 'Deutschland',
  representative: 'Max Mustermann',
  registerNumber: 'HRB 123456',
  registerCourt: 'Amtsgericht Berlin (Charlottenburg)',
  vatId: 'DE123456789',
  hosting: 'Vercel',
  paymentProvider: 'PayPal',
  checkoutSystem: 'PayPal Checkout',
  consumerArbitration: false,
  supportPhone: '+212 625 218 443',
};

export const isLegalTestMode = process.env.NODE_ENV !== 'production' && process.env.LEGAL_TEST_DATA === '1';

export function getLegal(): LegalData {
  return isLegalTestMode ? LEGAL_TEST : LEGAL_REAL;
}
