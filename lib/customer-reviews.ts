/**
 * Customer reviews (reusable section: components/sections/CustomerReviews.tsx).
 *
 * RULES
 *  - Only add REAL, attributable customer reviews to CUSTOMER_REVIEWS / RESELLER_REVIEWS (with the customer's consent).
 *  - Set `rating` only if the customer actually gave that rating AND you can prove it; also set `ratingVerified: true`.
 *  - Never add a "verified customer" claim unless it is true.
 *  - The review section renders NOTHING while both lists are empty. Placeholders are only shown when the env flag
 *    NEXT_PUBLIC_SHOW_REVIEW_PLACEHOLDERS=1 is set (local design preview only – never set it in production).
 *  - No Review / AggregateRating structured data is generated from this file.
 */

export interface ReviewAvatar {
  src: string;
  /** Neutral description – replace with a real description when you use real customer photos. */
  alt: string;
}

/**
 * Avatar images from public/images/revriw/ (small 192×192 WebP copies in public/images/revriw/avatars/).
 * NOTE: the originals are stock photos (pexels). Do not present stock photos as real, named customers.
 * Use them only for people who agreed to it – otherwise use real customer photos or no avatar (initials are shown).
 */
export const REVIEW_AVATARS: ReviewAvatar[] = [
  { src: '/images/revriw/avatars/avatar-1.webp', alt: 'Profilbild: Mann im grünen Poloshirt' },
  { src: '/images/revriw/avatars/avatar-2.webp', alt: 'Profilbild: Mann im Anzug mit roter Krawatte' },
  { src: '/images/revriw/avatars/avatar-3.webp', alt: 'Profilbild: Frau mit dunklem Haar im Freien' },
  { src: '/images/revriw/avatars/avatar-4.webp', alt: 'Profilbild: Mann mit Brille im weißen Pullover' },
  { src: '/images/revriw/avatars/avatar-5.webp', alt: 'Profilbild: Frau mit rötlich blondem Haar' },
  { src: '/images/revriw/avatars/avatar-6.webp', alt: 'Profilbild: Mann mit Brille vor hellem Hintergrund' },
  { src: '/images/revriw/avatars/avatar-7.webp', alt: 'Profilbild: Frau in weißer Bluse' },
  { src: '/images/revriw/avatars/avatar-8.webp', alt: 'Profilbild: Mann mit Brille und Bart' },
  { src: '/images/revriw/avatars/avatar-9.webp', alt: 'Profilbild: Mann mit Brille im dunklen Oberteil' },
];

export interface CustomerReview {
  /** Real name as the customer wants it displayed (e.g. "Markus S."). */
  name: string;
  /** Only if actually known, e.g. "München". */
  location?: string;
  /** Index into REVIEW_AVATARS; omit to show initials. */
  avatar?: number;
  text: string;
  /** Only with a genuine rating. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Must be true for the rating to be displayed. */
  ratingVerified?: boolean;
  /** Free text such as "Juli 2026" – only if known. */
  date?: string;
}

/** REAL customer reviews. Empty on purpose – fill with genuine reviews only. */
export const CUSTOMER_REVIEWS: CustomerReview[] = [];

/** REAL reseller reviews. Empty on purpose – fill with genuine reviews only. */
export const RESELLER_REVIEWS: CustomerReview[] = [];

/** Clearly marked placeholders for the design preview only (NEXT_PUBLIC_SHOW_REVIEW_PLACEHOLDERS=1). */
export const PLACEHOLDER_REVIEWS: CustomerReview[] = [
  { name: 'Kundenname (Platzhalter)', location: 'Ort (Platzhalter)', avatar: 0, text: '[PLATZHALTER – hier steht später die echte Bewertung eines Kunden.]' },
  { name: 'Kundenname (Platzhalter)', location: 'Ort (Platzhalter)', avatar: 4, text: '[PLATZHALTER – hier steht später die echte Bewertung eines Kunden.]' },
  { name: 'Kundenname (Platzhalter)', location: 'Ort (Platzhalter)', avatar: 7, text: '[PLATZHALTER – hier steht später die echte Bewertung eines Kunden.]' },
];

export const SHOW_REVIEW_PLACEHOLDERS = process.env.NEXT_PUBLIC_SHOW_REVIEW_PLACEHOLDERS === '1';
