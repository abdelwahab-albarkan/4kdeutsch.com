'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import TrialButton from '@/components/ui/TrialButton';
import { NAV_MAIN, NAV_MORE } from '@/lib/nav';

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]';

const isActivePath = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route changes (covers back/forward navigation too).
  useEffect(() => {
    setIsOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // "Mehr" dropdown: close on outside click and Escape.
  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [moreOpen]);

  // While the mobile menu is open: lock body scroll and close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const moreActive = NAV_MORE.some((i) => isActivePath(pathname, i.href));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#070707]/90 border-b border-border-subtle backdrop-blur-md py-2.5' : 'bg-transparent py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          <Logo />

          {/* Desktop nav (xl and up) */}
          <nav aria-label="Hauptnavigation" className="hidden xl:flex items-center gap-1">
            {NAV_MAIN.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-white ${FOCUS} ${
                    active ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                  {active && <span aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary-500" />}
                </Link>
              );
            })}

            <div ref={moreRef} className="relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((v) => !v)}
                className={`relative inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-white ${FOCUS} ${
                  moreActive || moreOpen ? 'text-white' : 'text-gray-400'
                }`}
              >
                Mehr
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                {moreActive && <span aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary-500" />}
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full z-50 w-[34rem] pt-3" role="menu">
                  <ul className="grid grid-cols-2 gap-1 rounded-2xl border border-border-subtle bg-[#0d0d0d]/95 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl">
                    {NAV_MORE.map((item) => {
                      const active = isActivePath(pathname, item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            role="menuitem"
                            aria-current={active ? 'page' : undefined}
                            className={`group block rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5 ${FOCUS}`}
                          >
                            <span className={`block text-sm font-semibold group-hover:text-primary-500 ${active ? 'text-primary-500' : 'text-white'}`}>
                              {item.label}
                            </span>
                            {item.desc && <span className="block text-xs text-gray-500 leading-snug">{item.desc}</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </nav>

          {/* Action buttons */}
          <div className="hidden xl:flex items-center gap-3">
            <TrialButton variant="outline" size="md" />
            <Link
              href="/pricing"
              className={`inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary-500 px-5 text-sm font-semibold text-black shadow-lg shadow-primary-500/10 transition-all hover:bg-primary-600 hover:shadow-primary-600/20 active:scale-95 ${FOCUS}`}
            >
              Jetzt abonnieren
            </Link>
          </div>

          {/* Mobile / tablet hamburger — 44px touch target */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className={`xl:hidden -mr-2.5 inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-300 hover:text-white ${FOCUS}`}
            aria-label={isOpen ? 'Navigationsmenü schließen' : 'Navigationsmenü öffnen'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer — rendered OUTSIDE <header> so the header's backdrop-blur never becomes its
          containing block. z-[45] sits above floating buttons (z-40) but below the header (z-50). */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="xl:hidden fixed inset-0 z-[45] flex flex-col overflow-y-auto overscroll-contain bg-[#070707]/98 backdrop-blur-lg px-6 pt-24 pb-10 animate-fade-in"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col">
            {NAV_MAIN.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-md border-b border-border-subtle py-3.5 text-lg font-medium transition-colors ${FOCUS} ${
                    active ? 'text-primary-500' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary-500" />}
                </Link>
              );
            })}
            <p className="mt-8 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Mehr</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              {NAV_MORE.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? 'page' : undefined}
                      className={`block rounded-md py-2.5 text-base transition-colors ${FOCUS} ${active ? 'text-primary-500' : 'text-gray-300 hover:text-white'}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <TrialButton variant="outline" size="lg" className="w-full" onClick={closeMenu} />
            <Link
              href="/pricing"
              onClick={closeMenu}
              className={`flex h-12 w-full items-center justify-center rounded-md bg-primary-500 text-base font-semibold text-black shadow-lg shadow-primary-500/15 active:scale-[0.98] transition-transform ${FOCUS}`}
            >
              Jetzt abonnieren
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
