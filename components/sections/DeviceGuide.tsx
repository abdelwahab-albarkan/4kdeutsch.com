import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Smartphone } from 'lucide-react';
import { Reveal, Stagger, HoverCard } from '@/components/ui/motion';

export interface DeviceApp {
  name: string;
  note: string;
}

export interface DeviceRelated {
  href: string;
  title: string;
  desc: string;
}

export interface DeviceGuideProps {
  /** Keyword-rich H1 (JSX to allow a gradient highlight). */
  h1: React.ReactNode;
  tagline: string;
  intro: React.ReactNode;
  image?: { src: string; alt: string };
  steps: string[];
  apps: DeviceApp[];
  benefits: string[];
  related: DeviceRelated[];
}

/**
 * Reusable device install-guide body (Fire Stick, Samsung, LG, …). Keeps the
 * device pages DRY: each page supplies its own keyword-targeted content and
 * this renders the premium, accessible layout (intro, steps, apps, benefits,
 * internal links). Section-level SEO (metadata, schema, breadcrumbs, reused
 * pricing/FAQ/CTA) stays on the page.
 */
export default function DeviceGuide({ h1, tagline, intro, image, steps, apps, benefits, related }: DeviceGuideProps) {
  return (
    <>
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-8 md:pt-14">
        <div className={`grid gap-10 items-center ${image ? 'lg:grid-cols-2' : ''}`}>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-500">
              <Smartphone className="h-3.5 w-3.5" strokeWidth={2} />
              {tagline}
            </p>
            <h1 className="font-spartan text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6">
              {h1}
            </h1>
            <div className="text-gray-400 text-base md:text-lg leading-relaxed space-y-4">{intro}</div>
          </Reveal>

          {image && (
            <Reveal delay={0.1} className="relative">
              <div className="relative aspect-[4/3] w-full">
                <div className="absolute inset-6 -z-10 rounded-full bg-primary-500/15 blur-3xl" />
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-contain" priority />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Step-by-step */}
      <section className="bg-surface/30 border-y border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Reveal className="mb-10">
            <h2 className="font-spartan text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
              Schritt-für-Schritt <span className="text-gradient">Anleitung</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">In wenigen Minuten eingerichtet – so einfach geht&rsquo;s:</p>
          </Reveal>
          <Stagger className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <HoverCard key={i} lift={3} className="flex items-start gap-4 rounded-xl border border-border-subtle bg-surface-card/50 p-5 shadow-card">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-black text-black">
                  {i + 1}
                </span>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed pt-0.5">{step}</p>
              </HoverCard>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Recommended apps */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal className="mb-10 max-w-3xl">
          <h2 className="font-spartan text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
            Beste <span className="text-gradient">IPTV-Apps</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Diese Player funktionieren zuverlässig mit Ihren 4kdeutsch-Zugangsdaten (Xtream Codes API oder M3U):
          </p>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apps.map((app) => (
            <HoverCard key={app.name} className="group h-full p-6 rounded-xl border border-border-subtle bg-surface-card/60 shadow-card hover:border-primary-500/40 transition-colors">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">{app.name}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{app.note}</p>
            </HoverCard>
          ))}
        </Stagger>

        {/* Benefits checklist */}
        <Stagger className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benefits.map((b) => (
            <HoverCard key={b} lift={2} className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface-card/50 px-4 py-3 shadow-card">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-500">
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="text-sm text-gray-200">{b}</span>
            </HoverCard>
          ))}
        </Stagger>
      </section>

      {/* Internal links */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <Reveal className="mb-8">
          <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Weitere <span className="text-gradient">Anleitungen &amp; Ratgeber</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-border-subtle bg-surface-card/50 p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary-500/40"
            >
              <div className="text-base font-bold text-white group-hover:text-primary-500 transition-colors mb-2">{link.title}</div>
              <p className="text-sm text-gray-400 leading-relaxed">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
