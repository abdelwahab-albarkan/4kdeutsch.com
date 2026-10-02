import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck } from 'lucide-react';
import { REVIEWS, SHOW_REVIEWS } from '@/lib/constants';
import { Reveal, Stagger, HoverCard } from '@/components/ui/motion';

export default function ReviewsSection() {
  if (!SHOW_REVIEWS) return null;
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <Reveal className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
          Das sagen <span className="text-gradient">unsere Nutzer</span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
          Auswahl an Rückmeldungen zu Einrichtung, Sendervielfalt und Support.
        </p>
      </Reveal>

      <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {REVIEWS.map((review, index) => (
          <HoverCard
            key={index}
            lift={4}
            className="h-full p-8 rounded-xl border border-border-subtle bg-surface-card/40 shadow-card hover:border-primary-500/30 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" strokeWidth={2} />
                ))}
              </div>
              <p className="text-gray-300 text-base leading-relaxed italic mb-8">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border-subtle pt-6">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border-subtle bg-surface">
                  <Image src={review.avatar} alt={review.name} fill sizes="44px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">{review.name}</div>
                  {review.verified && (
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary-500/10 px-2 py-0.5 text-[10px] font-bold text-primary-500">
                      <ShieldCheck className="h-3 w-3" strokeWidth={2} />
                      Verifizierter Käufer
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-500 shrink-0">{review.date}</span>
            </div>
          </HoverCard>
        ))}
      </Stagger>
    </section>
  );
}
