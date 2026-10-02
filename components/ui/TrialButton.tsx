import React from 'react';
import { TRIAL } from '@/lib/constants';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg' | 'sm';

const VARIANT: Record<Variant, string> = {
  primary: 'bg-primary-500 text-black shadow-lg shadow-primary-500/25 hover:bg-primary-600',
  outline: 'border border-primary-500/60 text-primary-500 hover:bg-primary-500/10',
  ghost: 'text-primary-500 hover:underline',
};
const SIZE: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-8 text-base',
};

/**
 * Free-trial CTA. Always uses the single trial action defined in lib/constants (TRIAL).
 * Plain <a> so it works without JS and in in-app browsers.
 */
export default function TrialButton({
  variant = 'outline',
  size = 'md',
  className = '',
  label = TRIAL.label,
  onClick,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={TRIAL.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707] active:scale-95 ${SIZE[size]} ${VARIANT[variant]} ${className}`}
    >
      {label}
    </a>
  );
}
