import React from 'react';
import Link from 'next/link';
import LibImage from '@/components/ui/LibImage';

export interface GuideSection {
  title: string;
  paragraphs?: string[];
  /** Rendered as a numbered list. */
  steps?: string[];
  /** Rendered as a bullet list. */
  bullets?: string[];
}

export interface GuideLink {
  href: string;
  title: string;
  desc?: string;
}

export interface GuideArticleProps {
  tagline: string;
  h1: React.ReactNode;
  intro: string[];
  sections: GuideSection[];
  related: GuideLink[];
  /** Optional library image id shown below the intro (see lib/image-library.ts). */
  imageId?: string;
}

/** Lightweight server-rendered article layout for help and setup guides. */
export default function GuideArticle({ tagline, h1, intro, sections, related, imageId }: GuideArticleProps) {
  return (
    <article className="max-w-4xl mx-auto px-6 pt-10 pb-16 md:pt-14">
      <p className="mb-4 inline-flex rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-500">
        {tagline}
      </p>
      <h1 className="font-spartan text-4xl sm:text-5xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6">{h1}</h1>
      <div className="text-gray-400 text-base md:text-lg leading-relaxed space-y-4 mb-10">
        {intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {imageId && (
        <div className="mb-10 overflow-hidden rounded-2xl border border-border-subtle">
          <LibImage id={imageId} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px" className="h-auto w-full object-cover" />
        </div>
      )}

      {sections.map((s) => (
        <section key={s.title} className="mb-10">
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">{s.title}</h2>
          {s.paragraphs?.map((p, i) => (
            <p key={i} className="text-gray-400 leading-relaxed mb-3">
              {p}
            </p>
          ))}
          {s.steps && (
            <ol className="space-y-3">
              {s.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4 rounded-xl border border-border-subtle bg-surface-card/50 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-black text-black">
                    {i + 1}
                  </span>
                  <span className="text-sm md:text-base text-gray-300 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          )}
          {s.bullets && (
            <ul className="list-disc pl-5 space-y-2 text-gray-300 leading-relaxed">
              {s.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section aria-labelledby="weiterfuehrend">
        <h2 id="weiterfuehrend" className="font-spartan text-2xl font-black text-white uppercase tracking-tight mb-4">
          Weiterführende Anleitungen
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {related.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block h-full rounded-xl border border-border-subtle bg-surface-card/60 p-4 hover:border-primary-500/40 transition-colors"
              >
                <span className="block font-bold text-white">{l.title}</span>
                {l.desc && <span className="block text-sm text-gray-400">{l.desc}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
