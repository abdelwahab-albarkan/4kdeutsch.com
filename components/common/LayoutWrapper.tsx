'use client';

import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import PageTransition from '../ui/PageTransition';
import WhatsAppButton from './WhatsAppButton';
import MouseGlow from '../ui/MouseGlow';
import CookieConsent from './CookieConsent';
import SafeBoundary from './SafeBoundary';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const mainContent = (
    <main id="main-content" tabIndex={-1} className="flex-grow pt-20 outline-none">
      {children}
    </main>
  );

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* WCAG 2.2 — bypass block: visible only on keyboard focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Zum Inhalt springen
      </a>
      <Navbar />
      {/* If the animation wrapper fails to hydrate, still render the content. */}
      <SafeBoundary fallback={mainContent}>
        <PageTransition>{mainContent}</PageTransition>
      </SafeBoundary>
      <Footer />
      {/* Non-critical widgets — isolated so a failure can never blank the page. */}
      <SafeBoundary>
        <WhatsAppButton />
      </SafeBoundary>
      <SafeBoundary>
        <MouseGlow />
      </SafeBoundary>
      <SafeBoundary>
        <CookieConsent />
      </SafeBoundary>
    </div>
  );
}
