'use client';

import { m, useReducedMotion, useInView, type Variants } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Shared premium easing curve (matches the CSS slide-in used site-wide). */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-reveal trigger with a safety net: fires when the element enters view,
 * but if the document can't run IntersectionObserver (e.g. a background/hidden
 * tab that never becomes visible), it still reveals after a short grace period.
 * Content is therefore never left permanently invisible.
 */
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined' && document.hidden) {
      const t = setTimeout(() => setFallback(true), 200);
      return () => clearTimeout(t);
    }
  }, []);

  return { ref, show: inView || fallback };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
}

/**
 * Fade + rise on scroll into view. Runs once, below-the-fold friendly.
 * Uses transform + opacity only (GPU accelerated) and honours reduced-motion.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();
  const { ref, show } = useReveal();
  return (
    <m.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={reduce ? undefined : show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </m.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child animating in. */
  gap?: number;
}

/** Container that reveals its <StaggerItem>/<HoverCard> children one after another. */
export function Stagger({ children, className, gap = 0.09 }: StaggerProps) {
  const reduce = useReducedMotion();
  const { ref, show } = useReveal();
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : gap } },
  };
  return (
    <m.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={show ? 'show' : 'hidden'}
    >
      {children}
    </m.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** A single item inside a <Stagger>. */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
      {children}
    </m.div>
  );
}

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  /** Lift distance in px on hover. */
  lift?: number;
}

/**
 * A card that reveals inside a <Stagger> and lifts with a soft spring on hover.
 */
export function HoverCard({ children, className, lift = 6 }: HoverCardProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      variants={itemVariants}
      whileHover={reduce ? undefined : { y: -lift }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </m.div>
  );
}
