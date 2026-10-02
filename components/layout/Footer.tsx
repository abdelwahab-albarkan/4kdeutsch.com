import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import CookieSettingsButton from '@/components/common/CookieSettingsButton';
import { ContactDetails, WhatsAppCta } from '@/components/common/ContactBlock';
import { SITE_CONFIG, SOCIAL_LINKS, TRIAL } from '@/lib/constants';
import {
  Tv,
  BookOpen,
  Mail,
  Send,
  ChevronRight,
  Zap,
  Headphones,
  ShieldCheck,
  MonitorPlay,
} from 'lucide-react';

/* ── Reusable footer link (arrow reveal + slide on hover) ─────────────────── */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 py-2 text-gray-400 hover:text-white transition-colors duration-200"
      >
        <ChevronRight className="w-3.5 h-3.5 text-primary-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        <span className="group-hover:translate-x-0.5 transition-transform duration-200">{children}</span>
      </Link>
    </li>
  );
}

/* ── Trust badges shown above the copyright row ──────────────────────────── */
const TRUST = [
  { icon: MonitorPlay, label: '4K Ultra HD' },
  { icon: Zap, label: 'Sofortige Aktivierung' },
  { icon: Headphones, label: 'Support' },
  { icon: ShieldCheck, label: 'Sichere Zahlung' },
];

/* ── Social platforms (monochrome brand SVGs, inherit currentColor) ──────── */
const socialIconClass = 'w-4 h-4';
const SOCIALS: { key: keyof typeof SOCIAL_LINKS; label: string; icon: React.ReactNode }[] = [
  {
    key: 'instagram',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={socialIconClass}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    key: 'facebook',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={socialIconClass}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    key: 'youtube',
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={socialIconClass}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={socialIconClass}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    key: 'x',
    label: 'X',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={socialIconClass}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={socialIconClass}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

/* ── Official payment brand logos (SVG, original brand colors) ───────────── */
const PAYMENTS: { key: string; label: string; svg: React.ReactNode }[] = [
  {
    key: 'visa',
    label: 'Visa',
    svg: (
      <svg viewBox="0 0 48 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20.4 20.2l1.7-10.4h2.7l-1.7 10.4h-2.7z" fill="#1434CB" />
        <path d="M32.9 10c-.53-.2-1.37-.43-2.4-.43-2.64 0-4.5 1.36-4.52 3.3-.02 1.44 1.32 2.24 2.33 2.72 1.03.49 1.38.8 1.37 1.24-.01.67-.83.98-1.6.98-1.07 0-1.64-.15-2.52-.53l-.35-.16-.38 2.29c.63.28 1.79.52 3 .53 2.81 0 4.64-1.34 4.66-3.42.01-1.13-.7-2-2.25-2.72-.94-.46-1.51-.77-1.5-1.24 0-.42.49-.86 1.54-.86.88-.02 1.51.18 2 .38l.24.12.36-2.2z" fill="#1434CB" />
        <path d="M39.9 9.8h-2.09c-.65 0-1.13.18-1.42.84l-4.02 9.56h2.84s.46-1.26.57-1.53h3.47c.08.36.33 1.53.33 1.53h2.51L39.9 9.8zm-3.34 6.72c.22-.59 1.08-2.86 1.08-2.86-.02.03.22-.59.36-.98l.18.89s.52 2.44.63 2.95h-2.25z" fill="#1434CB" />
        <path d="M18.13 9.8l-2.64 7.09-.28-1.42c-.49-1.64-2.02-3.42-3.73-4.31l2.42 8.63 2.86-.01L23.02 9.8h-2.86z" fill="#1434CB" />
        <path d="M13.06 9.8H8.7l-.04.21c3.4.84 5.64 2.88 6.57 5.32l-.95-4.67c-.16-.64-.63-.84-1.22-.86z" fill="#EB9F0E" />
      </svg>
    ),
  },
  {
    key: 'mastercard',
    label: 'Mastercard',
    svg: (
      <svg viewBox="0 0 48 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="19" cy="15" r="9" fill="#EB001B" />
        <circle cx="29" cy="15" r="9" fill="#F79E1B" fillOpacity="0.9" />
        <path d="M24 8.2a9 9 0 010 13.6 9 9 0 010-13.6z" fill="#FF5F00" />
      </svg>
    ),
  },
  {
    key: 'paypal',
    label: 'PayPal',
    svg: (
      <svg viewBox="0 0 48 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M18.7 8.5c-1.2 0-2.2.87-2.4 2.05l-1.9 12.05c-.05.32.2.6.52.6h3.05c.3 0 .55-.22.6-.52l.5-3.18c.05-.3.3-.52.6-.52h1.72c3.4 0 5.36-1.65 5.87-4.93.23-1.44.01-2.57-.66-3.36-.73-.87-2.04-1.33-3.78-1.33H18.7z" fill="#27346A" />
        <path d="M21.8 12.1c-.06.4-.36.4-.65.4h-.5l.35-2.24h.46c.4 0 .78 0 .98.23.12.14.15.35.1.61-.28 1.78-1.68 1.78-3.03 1.78" fill="#27346A" />
        <path d="M27.3 12.3c-.5 3.28-2.47 4.93-5.87 4.93h-1.72c-.3 0-.55.22-.6.52l-.9 5.7c-.03.21.13.4.35.4h2.6c.26 0 .48-.19.52-.45l.02-.11.49-3.1.03-.17c.04-.26.26-.45.52-.45h.33c2.97 0 5.3-1.45 5.98-4.31.28-1.2.13-2.2-.43-2.9-.17-.22-.39-.4-.63-.55" fill="#2790C3" />
        <path d="M26.7 12.06c-.16-.05-.33-.09-.5-.12-.18-.03-.36-.05-.55-.07a10.8 10.8 0 00-1.06-.05h-3.22c-.13 0-.25.03-.36.08-.24.12-.42.34-.46.62l-.68 4.34-.02.13c.05-.3.3-.52.6-.52h1.72c3.4 0 5.37-1.65 5.87-4.93.02-.1.03-.19.05-.28a3.6 3.6 0 00-.9-.35l-.03.01" fill="#1F264F" />
      </svg>
    ),
  },
  {
    key: 'applepay',
    label: 'Apple Pay',
    svg: (
      <svg viewBox="0 0 48 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1" y="4" width="46" height="22" rx="4" fill="#000" />
        <path d="M14.9 11.1c.36-.45.6-1.06.53-1.68-.53.03-1.18.36-1.55.81-.33.39-.63 1.02-.55 1.62.6.05 1.2-.3 1.57-.75zm.52.83c-.86-.05-1.6.49-2 .49-.42 0-1.05-.46-1.73-.45-.89.01-1.71.52-2.17 1.32-.93 1.6-.24 3.98.66 5.28.44.64.97 1.36 1.66 1.33.66-.03.92-.43 1.72-.43.8 0 1.03.43 1.73.42.72-.01 1.17-.65 1.61-1.29.51-.74.72-1.45.73-1.49-.02-.01-1.4-.54-1.41-2.12-.01-1.32 1.08-1.95 1.13-1.98-.62-.91-1.58-1.01-1.92-1.03z" fill="#fff" />
        <path d="M25.6 10.5c1.87 0 3.17 1.29 3.17 3.16 0 1.88-1.33 3.18-3.22 3.18h-2.07v3.29h-1.5v-9.63h3.62zm-2.12 5.08h1.72c1.3 0 2.04-.7 2.04-1.91 0-1.22-.74-1.91-2.03-1.91h-1.73v3.82zm6.17 2.55c0-1.23.94-1.99 2.62-2.08l1.93-.11v-.55c0-.79-.53-1.26-1.42-1.26-.84 0-1.37.4-1.5 1.03h-1.36c.08-1.27 1.16-2.2 2.91-2.2 1.72 0 2.82.91 2.82 2.33v4.89h-1.39v-1.17h-.03c-.41.79-1.31 1.29-2.24 1.29-1.39 0-2.36-.86-2.36-2.17zm4.55-.63v-.56l-1.73.11c-.86.06-1.35.44-1.35 1.04 0 .61.51 1.01 1.29 1.01 1.01 0 1.79-.7 1.79-1.6zm2.6 5.11v-1.17c.11.03.35.03.46.03.66 0 1.02-.28 1.24-.99l.13-.41-2.55-7.06h1.57l1.78 5.72h.03l1.78-5.72h1.53l-2.64 7.42c-.6 1.71-1.3 2.26-2.76 2.26-.12 0-.49-.01-.59-.11z" fill="#fff" />
      </svg>
    ),
  },
  {
    key: 'googlepay',
    label: 'Google Pay',
    svg: (
      <svg viewBox="0 0 48 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1" y="4" width="46" height="22" rx="4" fill="#fff" stroke="#E0E0E0" strokeWidth="0.7" />
        <path d="M23.2 15.15v2.79h-.88V11.1h2.35c.6 0 1.1.2 1.51.6.42.4.63.89.63 1.47 0 .59-.21 1.08-.63 1.47-.4.4-.91.6-1.51.6h-1.47zm0-3.2v2.36h1.49c.35 0 .64-.12.87-.35.23-.24.35-.52.35-.83 0-.3-.12-.58-.35-.82a1.16 1.16 0 00-.87-.36h-1.49z" fill="#5F6368" />
        <path d="M29.62 13.15c.65 0 1.16.17 1.54.52.38.35.57.82.57 1.43v2.84h-.84v-.65h-.04c-.36.54-.85.8-1.46.8-.52 0-.95-.15-1.3-.46-.35-.3-.52-.69-.52-1.15 0-.48.18-.87.55-1.15.37-.29.86-.43 1.47-.43.53 0 .96.1 1.3.29v-.2c0-.31-.12-.57-.37-.79a1.28 1.28 0 00-.86-.32c-.5 0-.9.21-1.19.63l-.78-.49c.44-.63 1.08-.94 1.93-.94zm-1.13 3.37c0 .23.1.42.29.57.19.15.42.22.68.22.37 0 .7-.14.99-.41.29-.28.43-.6.43-.97-.28-.22-.66-.33-1.16-.33-.36 0-.66.09-.9.26-.22.18-.33.4-.33.66z" fill="#5F6368" />
        <path d="M36.6 13.3l-2.94 6.76h-.9l1.09-2.37-1.93-4.39h.95l1.4 3.37h.02l1.36-3.37h.95z" fill="#5F6368" />
        <path d="M19.03 14.6c0-.28-.02-.55-.07-.81h-3.7v1.54h2.12c-.09.5-.37.92-.79 1.2v.99h1.27c.75-.69 1.17-1.71 1.17-2.92z" fill="#4285F4" />
        <path d="M15.26 18.4c1.06 0 1.95-.35 2.6-.95l-1.27-.99c-.35.24-.81.38-1.33.38-1.02 0-1.89-.69-2.2-1.62h-1.31v1.02a3.93 3.93 0 003.51 2.16z" fill="#34A853" />
        <path d="M13.06 15.22a2.36 2.36 0 010-1.51v-1.02h-1.31a3.94 3.94 0 000 3.55l1.31-1.02z" fill="#FBBC04" />
        <path d="M15.26 12.09c.58 0 1.1.2 1.5.59l1.13-1.13a3.79 3.79 0 00-2.63-1.03 3.93 3.93 0 00-3.51 2.17l1.31 1.02c.31-.93 1.18-1.62 2.2-1.62z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    key: 'stripe',
    label: 'Stripe',
    svg: (
      <svg viewBox="0 0 48 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1" y="4" width="46" height="22" rx="4" fill="#635BFF" />
        <path d="M23.5 13.2c0-.5.42-.7.9-.7.72 0 1.63.22 2.35.6v-2.05a6.4 6.4 0 00-2.35-.42c-1.92 0-3.2 1-3.2 2.67 0 2.62 3.6 2.2 3.6 3.33 0 .58-.5.77-1 .77-.78 0-1.8-.32-2.6-.76v2.08c.88.38 1.77.54 2.6.54 1.97 0 3.32-.97 3.32-2.66 0-2.83-3.62-2.32-3.62-3.4z" fill="#fff" />
        <path d="M31.2 11.03l-1.98.42-.01 6.5c0 1.2.9 2.08 2.1 2.08.66 0 1.15-.12 1.42-.27v-1.65c-.26.1-1.54.48-1.54-.72v-2.65h1.54v-1.73h-1.54l.01-1.98z" fill="#fff" />
        <path d="M13.9 14.6c0-.35.29-.48.76-.48.68 0 1.54.2 2.22.57v-2.02a5.9 5.9 0 00-2.22-.4c-1.82 0-3.03.95-3.03 2.53 0 2.48 3.4 2.08 3.4 3.15 0 .41-.36.55-.86.55-.74 0-1.7-.3-2.45-.72v2.05c.83.36 1.67.51 2.45.51 1.87 0 3.15-.92 3.15-2.52-.01-2.68-3.42-2.2-3.42-3.22z" fill="#fff" transform="translate(21,0)" opacity="0" />
      </svg>
    ),
  },
  {
    key: 'bitcoin',
    label: 'Bitcoin',
    svg: (
      <svg viewBox="0 0 48 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="15" r="9" fill="#F7931A" />
        <path d="M27.6 13.6c.13-.9-.55-1.38-1.49-1.7l.3-1.22-.74-.19-.3 1.19c-.19-.05-.4-.09-.6-.14l.3-1.2-.74-.18-.3 1.22-.48-.11v-.01l-1.02-.25-.2.79s.55.13.54.14c.3.07.36.27.35.43l-.35 1.39c.02.01.05.02.08.03l-.08-.02-.49 1.95c-.04.09-.13.23-.34.18.01.01-.54-.14-.54-.14l-.37.85.96.24c.18.05.35.09.53.14l-.31 1.24.74.18.3-1.22c.2.06.4.1.59.15l-.3 1.21.74.19.31-1.24c1.27.24 2.22.14 2.62-1 .32-.92-.02-1.45-.68-1.8.48-.11.85-.43.95-1.08zm-1.7 2.38c-.23.92-1.78.42-2.28.3l.41-1.63c.5.12 2.11.37 1.87 1.33zm.23-2.39c-.21.84-1.5.41-1.92.31l.37-1.48c.42.1 1.76.3 1.55 1.17z" fill="#fff" />
      </svg>
    ),
  },
  {
    key: 'usdt',
    label: 'USDT',
    svg: (
      <svg viewBox="0 0 48 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="15" r="9" fill="#26A17B" />
        <path d="M25.03 15.6v-.01c-.06.01-.36.03-1.02.03-.53 0-.9-.02-1.03-.03v.01c-2.06-.09-3.6-.45-3.6-.88s1.54-.79 3.6-.88v1.4c.13.01.51.03 1.04.03.63 0 .95-.03 1.01-.03v-1.4c2.06.09 3.59.45 3.59.88s-1.53.79-3.59.88zm0-1.9v-1.25h2.86v-1.9h-7.79v1.9h2.86v1.25c-2.33.11-4.08.57-4.08 1.12s1.75 1.01 4.08 1.12v4.01h2.07v-4.01c2.32-.11 4.07-.57 4.07-1.12s-1.75-1.01-4.07-1.12z" fill="#fff" />
      </svg>
    ),
  },
  {
    key: 'sepa',
    label: 'SEPA',
    svg: (
      <svg viewBox="0 0 48 30" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1" y="4" width="46" height="22" rx="4" fill="#10298E" />
        <text x="24" y="18.3" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="8.5" fill="#fff" letterSpacing="0.5">SEPA</text>
        <path d="M9.5 12.2l1.4 1.4-1.4 1.4M38.5 15l-1.4 1.4 1.4 1.4" stroke="#FFCC02" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Footer() {
  // Only render platforms that have a real URL configured.
  const configuredSocials = SOCIALS.filter((s) => SOCIAL_LINKS[s.key].trim() !== '');

  return (
    <footer className="relative border-t border-border-subtle bg-[#101010]/30 pt-16 pb-12">
      {/* Subtle green glow along the top border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(16,217,111,0.10),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {/* Info Column */}
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="text-sm text-gray-400 leading-relaxed">
            Streamen Sie Live-Sport, Filme und Serien auf Ihren kompatiblen Geräten.
          </p>
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Kontakt</h4>
            <ContactDetails />
            <WhatsAppCta className="mt-4 h-11 w-full sm:w-auto" />
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-6">
            <Tv className="w-4 h-4 text-primary-500" />
            IPTV Abonnement
          </h4>
          <ul className="flex flex-col gap-0 text-sm">
            <li>
              <a
                href={TRIAL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-2 font-semibold text-primary-500 hover:text-white transition-colors duration-200"
              >
                {TRIAL.label}
              </a>
            </li>
            <FooterLink href="/iptv-kaufen">IPTV kaufen</FooterLink>
            <FooterLink href="/bestes-iptv">Bestes IPTV</FooterLink>
            <FooterLink href="/iptv-vergleich">IPTV Vergleich</FooterLink>
            <FooterLink href="/iptv-erfahrungen">IPTV Erfahrungen</FooterLink>
            <FooterLink href="/iptv-sport">Sport IPTV</FooterLink>
            <FooterLink href="/iptv-apps">Beste IPTV Apps</FooterLink>
            <FooterLink href="/pricing">Tarife &amp; Preise</FooterLink>
            <FooterLink href="/features">Funktionen</FooterLink>
            <FooterLink href="/devices">Kompatible Geräte</FooterLink>
            <FooterLink href="/faq">FAQ &amp; Hilfe</FooterLink>
            <FooterLink href="/einrichtung">IPTV Einrichtung</FooterLink>
            <FooterLink href="/iptv-hilfe">IPTV Probleme lösen</FooterLink>
            <FooterLink href="/iptv-app">Apps &amp; Geräte</FooterLink>
            <FooterLink href="/live">Live-Sport</FooterLink>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-6">
            <BookOpen className="w-4 h-4 text-primary-500" />
            Ratgeber &amp; Recht
          </h4>
          <ul className="flex flex-col gap-0 text-sm">
            <FooterLink href="/was-ist-iptv">Was ist IPTV?</FooterLink>
            <FooterLink href="/iptv-legal-deutschland">Ist IPTV legal?</FooterLink>
            <FooterLink href="/kostenloses-iptv">Kostenloses IPTV?</FooterLink>
            <FooterLink href="/sky-dazn-iptv">Sky &amp; DAZN über IPTV</FooterLink>
            <FooterLink href="/iptv-sicherheit">IPTV Sicherheit</FooterLink>
            <FooterLink href="/iptv-vpn">VPN für IPTV</FooterLink>
            <FooterLink href="/reseller">Reseller-Panel</FooterLink>
            <FooterLink href="/restream">Restream-Feeds</FooterLink>
            <FooterLink href="/about">Über uns</FooterLink>
            <FooterLink href="/affiliate">Affiliate-Programm</FooterLink>
            <FooterLink href="/impressum">Impressum</FooterLink>
            <FooterLink href="/datenschutz">Datenschutzerklärung</FooterLink>
            <FooterLink href="/agb">AGB</FooterLink>
            <FooterLink href="/widerruf">Widerrufsbelehrung</FooterLink>
            <FooterLink href="/refund">Rückerstattungsrichtlinie</FooterLink>
            <FooterLink href="/cookies">Cookie-Information</FooterLink>
            <FooterLink href="/legal/acceptable-use">Nutzungsrichtlinien</FooterLink>
            <FooterLink href="/legal/dmca">Urheberrecht &amp; DMCA</FooterLink>
          </ul>
        </div>

        {/* Newsletter Column — premium glass card */}
        <div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] relative overflow-hidden">
            <div className="pointer-events-none absolute -right-10 -top-10 w-32 h-32 rounded-full bg-primary-500/10 blur-2xl" />
            <div className="relative">
              <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-2">
                <Mail className="w-4 h-4 text-primary-500" />
                Newsletter
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-5">
                Bleiben Sie informiert über neue Sender, Spielpläne und exklusive Angebote.
              </p>
              <form className="flex flex-col gap-2.5" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Ihre E-Mail-Adresse"
                  className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-gray-500 transition-all outline-none"
                  required
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary-500 text-sm font-semibold text-black hover:bg-primary-600 hover:shadow-[0_0_20px_rgba(16,217,111,0.35)] active:scale-[0.98] transition-all"
                >
                  Abonnieren
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Social media — config-driven; hidden until a real profile URL is set */}
      {configuredSocials.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-14">
          <div className="border-t border-border-subtle pt-8">
            <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
              Social Media
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {configuredSocials.map((s) => (
                <a
                  key={s.key}
                  href={SOCIAL_LINKS[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Folgen Sie uns auf ${s.label}`}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-950 border border-zinc-900 text-gray-400 hover:text-[#10D96F] hover:border-[#10D96F]/30 hover:bg-[#10D96F]/5 hover:shadow-[0_0_15px_rgba(16,217,111,0.1)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10D96F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payment methods — official brand SVG logos in glass cards */}
      <div className="max-w-7xl mx-auto px-6 mt-14">
        <div className="border-t border-border-subtle pt-8">
          <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
            Sichere &amp; akzeptierte Zahlungsmethoden
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PAYMENTS.map((p) => (
              <div
                key={p.key}
                title={p.label}
                aria-label={p.label}
                className="flex items-center justify-center w-16 h-11 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_24px_-16px_rgba(0,0,0,0.9)] hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-[0_0_20px_rgba(16,217,111,0.18)] transition-all duration-300"
              >
                {p.svg}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust row */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRUST.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
            >
              <Icon className="w-4 h-4 text-primary-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-300">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 border-t border-border-subtle mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} 4kdeutsch &mdash; Alle Rechte vorbehalten.
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-2 gap-y-2">
          <Link href="/impressum" className="inline-block py-2 hover:text-white transition-colors">Impressum</Link>
          <span className="text-gray-700">&bull;</span>
          <Link href="/datenschutz" className="inline-block py-2 hover:text-white transition-colors">Datenschutz</Link>
          <span className="text-gray-700">&bull;</span>
          <Link href="/agb" className="inline-block py-2 hover:text-white transition-colors">AGB</Link>
          <span className="text-gray-700">&bull;</span>
          <Link href="/widerruf" className="inline-block py-2 hover:text-white transition-colors">Widerruf</Link>
          <span className="text-gray-700">&bull;</span>
          <Link href="/refund" className="inline-block py-2 hover:text-white transition-colors">Erstattung</Link>
          <span className="text-gray-700">&bull;</span>
          <Link href="/cookies" className="inline-block py-2 hover:text-white transition-colors">Cookies</Link>
          <span className="text-gray-700">&bull;</span>
          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  );
}
