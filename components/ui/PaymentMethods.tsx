'use client';

import React, { useRef } from 'react';
import { m, useMotionValue, useMotionTemplate, useReducedMotion } from 'framer-motion';

/**
 * Enterprise payment wall — official-style brand marks as inline SVG.
 * Each mark is monochrome light-gray by default (to match the dark UI) and
 * transitions to its official brand colour on hover. Cards are identical size,
 * glassmorphic, with a mouse-follow reflection and a soft brand-green glow.
 *
 * All marks use `currentColor` (single-tone) or per-path group-hover fills
 * (multi-tone) so the monochrome→brand transition is pure CSS — crisp on
 * Retina, no image requests, no layout shift.
 */

const EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

function Visa() {
  return (
    <svg viewBox="0 0 48 16" className="h-3.5 w-auto" aria-hidden focusable="false">
      <text
        x="0" y="13" fontFamily="Arial, Helvetica, sans-serif" fontSize="15" fontWeight="800" fontStyle="italic" letterSpacing="0.5"
        className="fill-[#1A5CE0]"
      >
        VISA
      </text>
    </svg>
  );
}

function Mastercard() {
  return (
    <svg viewBox="0 0 44 26" className="h-6 w-auto" aria-hidden focusable="false">
      <circle cx="17" cy="13" r="12" className="fill-[#EB001B]" />
      <circle cx="29" cy="13" r="12" className="fill-[#F79E1B]" />
      {/* overlap blend */}
      <path d="M23 4.2a12 12 0 0 0 0 17.6 12 12 0 0 0 0-17.6Z" className="fill-[#FF5F00]" />
    </svg>
  );
}

function PayPal() {
  return (
    <svg viewBox="0 0 66 18" className="h-4 w-auto" aria-hidden focusable="false">
      <text x="0" y="14" fontFamily="Arial, Helvetica, sans-serif" fontSize="15" fontWeight="800" fontStyle="italic"
        className="fill-[#0079C1]">Pay</text>
      <text x="30" y="14" fontFamily="Arial, Helvetica, sans-serif" fontSize="15" fontWeight="800" fontStyle="italic"
        className="fill-[#00A5E0]">Pal</text>
    </svg>
  );
}

function ApplePay() {
  return (
    <svg viewBox="0 0 62 22" className="h-5 w-auto fill-current text-white" aria-hidden focusable="false">
      {/* Apple glyph */}
      <path d="M12.1 6.3c.68-.82 1.14-1.96 1.02-3.1-.98.04-2.17.65-2.87 1.47-.63.72-1.18 1.88-1.03 2.99 1.09.08 2.2-.55 2.88-1.36Zm1.0 1.6c-1.59-.09-2.94.9-3.7.9-.76 0-1.93-.86-3.18-.84-1.63.02-3.15.95-3.99 2.42-1.7 2.95-.44 7.32 1.21 9.72.8 1.18 1.76 2.5 3.02 2.45 1.21-.05 1.67-.78 3.13-.78 1.46 0 1.87.78 3.15.76 1.3-.02 2.12-1.19 2.92-2.38.92-1.36 1.3-2.68 1.32-2.75-.03-.01-2.53-.98-2.56-3.87-.02-2.42 1.97-3.58 2.06-3.64-1.13-1.66-2.88-1.84-3.5-1.88Z" />
      {/* "Pay" */}
      <text x="24" y="17" fontFamily="Arial, Helvetica, sans-serif" fontSize="15" fontWeight="600">Pay</text>
    </svg>
  );
}

function GooglePay() {
  return (
    <svg viewBox="0 0 66 22" className="h-5 w-auto" aria-hidden focusable="false">
      <text x="0" y="17" fontFamily="Arial, Helvetica, sans-serif" fontSize="17" fontWeight="500"
        className="fill-[#4285F4]">G</text>
      <text x="15" y="17" fontFamily="Arial, Helvetica, sans-serif" fontSize="17" fontWeight="500"
        className="fill-[#E8EAED]">Pay</text>
    </svg>
  );
}

function Bitcoin() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-auto" aria-hidden focusable="false">
      <circle cx="14" cy="14" r="13" className="fill-[#F7931A]" />
      {/* stylised ₿ */}
      <path
        d="M18.4 12.3c.2-1.5-.9-2.3-2.5-2.8l.5-2.1-1.3-.3-.5 2c-.3-.08-.7-.16-1-.24l.5-2.05-1.3-.32-.5 2.1c-.28-.06-.55-.13-.8-.2v-.01l-1.8-.45-.35 1.4s.97.22.95.24c.53.13.63.48.61.76l-.6 2.4c.04.01.08.02.13.04l-.13-.03-.83 3.35c-.06.16-.22.39-.57.3.01.02-.95-.24-.95-.24l-.65 1.5 1.7.42c.32.08.63.16.93.24l-.51 2.08 1.3.32.52-2.1c.35.1.7.18 1.03.27l-.52 2.08 1.3.32.51-2.07c2.22.42 3.9.25 4.6-1.76.57-1.62-.03-2.55-1.2-3.16.85-.2 1.5-.76 1.67-1.92Zm-2.98 4.18c-.4 1.62-3.14.75-4.02.53l.7-2.8c.88.22 3.75.65 3.32 2.27Zm.4-4.2c-.37 1.48-2.64.73-3.38.54l.64-2.55c.74.19 3.13.53 2.74 2.01Z"
        className="fill-white"
      />
    </svg>
  );
}

function Tether() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-auto" aria-hidden focusable="false">
      <circle cx="14" cy="14" r="13" className="fill-[#26A17B]" />
      {/* ₮ mark */}
      <path
        d="M15.6 13.9v0c-.1.01-.6.04-1.6.04-.83 0-1.4-.02-1.6-.04v0c-3.1-.14-5.4-.68-5.4-1.32s2.3-1.18 5.4-1.32v2.1c.21.02.8.05 1.62.05.98 0 1.5-.04 1.58-.05v-2.1c3.09.14 5.39.68 5.39 1.32s-2.3 1.18-5.39 1.32Zm0-2.86V9.16h4.3V6.3H7.8v2.86h4.3v1.88c-3.5.16-6.13.85-6.13 1.68s2.63 1.52 6.13 1.68v6.02h3.5v-6.02c3.49-.16 6.11-.85 6.11-1.68s-2.62-1.52-6.11-1.68Z"
        className="fill-white"
      />
    </svg>
  );
}

function Ethereum() {
  return (
    <svg viewBox="0 0 24 28" className="h-7 w-auto" aria-hidden focusable="false">
      <g className="fill-[#627EEA]">
        <path d="M12 1 4.5 13.6 12 18l7.5-4.4L12 1Z" fillOpacity="0.9" />
        <path d="M12 1 4.5 13.6 12 10.3V1Z" fillOpacity="0.6" />
        <path d="M12 19.4 4.5 15l7.5 12 7.5-12-7.5 4.4Z" fillOpacity="0.9" />
        <path d="M12 27V19.4L4.5 15 12 27Z" fillOpacity="0.6" />
      </g>
    </svg>
  );
}

interface Method {
  name: string;
  Logo: React.ComponentType;
}

const METHODS: Method[] = [
  { name: 'PayPal', Logo: PayPal },
  { name: 'Visa', Logo: Visa },
  { name: 'Mastercard', Logo: Mastercard },
  { name: 'Apple Pay', Logo: ApplePay },
  { name: 'Google Pay', Logo: GooglePay },
  { name: 'Bitcoin', Logo: Bitcoin },
  { name: 'USDT (Tether)', Logo: Tether },
  { name: 'Ethereum', Logo: Ethereum },
];

function PaymentCard({ name, Logo }: Method) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const reflection = useMotionTemplate`radial-gradient(120px circle at ${mx}px ${my}px, rgba(255,255,255,0.10), transparent 65%)`;

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={handleMove}
      whileHover={reduce ? undefined : { y: -2, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      role="img"
      aria-label={`Bezahlen mit ${name}`}
      className="group relative flex h-20 items-center justify-center overflow-hidden rounded-xl glass border border-white/10 shadow-card [transition:background-color_300ms,border-color_300ms,box-shadow_300ms] hover:border-primary-500/50 hover:bg-white/[0.06] hover:shadow-[0_0_26px_-6px_rgba(16,217,111,0.45)]"
      style={{ transitionTimingFunction: EASE }}
    >
      {/* Mouse-follow light reflection */}
      <m.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: reflection }}
      />
      <span className="relative flex items-center justify-center">
        <Logo />
      </span>
    </m.div>
  );
}

export default function PaymentMethods({ className = '' }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 ${className}`}
      role="list"
      aria-label="Akzeptierte Zahlungsmethoden"
    >
      {METHODS.map((m) => (
        <div role="listitem" key={m.name}>
          <PaymentCard {...m} />
        </div>
      ))}
    </div>
  );
}
