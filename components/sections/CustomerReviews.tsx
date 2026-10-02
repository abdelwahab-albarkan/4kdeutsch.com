import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import {
  CUSTOMER_REVIEWS,
  RESELLER_REVIEWS,
  PLACEHOLDER_REVIEWS,
  REVIEW_AVATARS,
  SHOW_REVIEW_PLACEHOLDERS,
  type CustomerReview,
} from '@/lib/customer-reviews';

const initials = (name: string) =>
  name
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || '?';

/**
 * Reusable review section. Renders nothing until real reviews exist in lib/customer-reviews.ts.
 * No structured data (Review / AggregateRating) is emitted here.
 */
export default function CustomerReviews({
  audience = 'kunden',
  id,
}: {
  audience?: 'kunden' | 'reseller';
  id?: string;
}) {
  const real = audience === 'reseller' ? RESELLER_REVIEWS : CUSTOMER_REVIEWS;
  const reviews: CustomerReview[] = real.length > 0 ? real : SHOW_REVIEW_PLACEHOLDERS ? PLACEHOLDER_REVIEWS : [];
  if (reviews.length === 0) return null;
  const isPlaceholder = real.length === 0;
  const title = audience === 'reseller' ? 'Reseller-Stimmen' : 'Das sagen unsere Kunden';

  return (
    <section id={id} aria-labelledby={`${id ?? 'reviews'}-title`} className="max-w-7xl mx-auto px-6 py-20 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-500 mb-5">
          Kundenbewertungen
        </span>
        <h2 id={`${id ?? 'reviews'}-title`} className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          {title}
        </h2>
        {isPlaceholder && (
          <p className="mt-4 text-sm font-semibold text-amber-400">Design-Vorschau mit Platzhaltern – nicht veröffentlichen.</p>
        )}
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => {
          const av = r.avatar != null ? REVIEW_AVATARS[r.avatar] : undefined;
          const showRating = r.rating && r.ratingVerified;
          return (
            <li key={`${r.name}-${i}`} className="flex">
              <figure className="flex w-full flex-col justify-between rounded-2xl border border-border-subtle bg-surface-card/50 p-7 shadow-card transition-colors hover:border-primary-500/30">
                <div>
                  {showRating && (
                    <div className="mb-4 flex items-center gap-1 text-amber-400" role="img" aria-label={`${r.rating} von 5 Sternen`}>
                      {Array.from({ length: r.rating! }).map((_, k) => (
                        <Star key={k} className="h-4 w-4 fill-current" strokeWidth={2} aria-hidden="true" />
                      ))}
                    </div>
                  )}
                  <blockquote className="text-base leading-relaxed text-gray-300">&bdquo;{r.text}&ldquo;</blockquote>
                </div>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-border-subtle pt-5">
                  {av ? (
                    <Image
                      src={av.src}
                      alt={av.alt}
                      width={48}
                      height={48}
                      loading="lazy"
                      className="h-12 w-12 shrink-0 rounded-full border border-border-subtle object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface text-sm font-bold text-primary-500"
                    >
                      {initials(r.name)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-white">{r.name}</div>
                    {(r.location || r.date) && (
                      <div className="truncate text-xs text-gray-500">{[r.location, r.date].filter(Boolean).join(' · ')}</div>
                    )}
                  </div>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
