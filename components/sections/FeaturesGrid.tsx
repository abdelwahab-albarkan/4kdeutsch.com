import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { FEATURES } from '@/lib/constants';
import { Reveal, Stagger, HoverCard } from '@/components/ui/motion';

type IconComponent = React.ComponentType<LucideProps>;
const Icons = LucideIcons as unknown as Record<string, IconComponent>;

export default function FeaturesGrid({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      {showHeader && (
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
            Fernsehen, wie es <span className="text-gradient">2026 sein sollte</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Transparente Preise, viele Geräte und ein deutschsprachiger Support – dafür steht 4kdeutsch.
          </p>
        </Reveal>
      )}

      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => {
          const Icon = Icons[feature.icon] ?? LucideIcons.Tv;

          return (
            <HoverCard
              key={index}
              className="group h-full p-8 rounded-xl border border-border-subtle bg-surface-card/60 shadow-card transition-colors duration-300 hover:border-primary-500/40 hover:shadow-glow"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-black transition-colors duration-300">
                <Icon className="h-6 w-6 icon-hover" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </HoverCard>
          );
        })}
      </Stagger>
    </section>
  );
}
