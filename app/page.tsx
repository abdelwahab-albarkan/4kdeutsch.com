import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/common/JsonLd';
import { productSchema, faqSchema, homeWebPageSchema } from '@/lib/structured-data';
import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import VODSection from '@/components/sections/VODSection';
import SportsSection from '@/components/sections/SportsSection';
import PricingSection from '@/components/sections/PricingSection';
import CustomerReviews from '@/components/sections/CustomerReviews';
import DevicesSection from '@/components/sections/DevicesSection';
import HowItWorks from '@/components/sections/HowItWorks';
import CompareSection from '@/components/sections/CompareSection';
import WhatToExpect from '@/components/sections/WhatToExpect';
import FAQSection from '@/components/sections/FAQSection';
import LatestBlogPosts from '@/components/sections/LatestBlogPosts';
import CTASection from '@/components/sections/CTASection';
import { HomeIntroSection, HomeGuideSection, HomeTrustSection, HomeLinkHub, HomeTrialSection } from '@/components/sections/HomeSeoContent';
import { getPopularMovies, getPopularSeries } from '@/lib/tmdb';
import { getBlogPosts } from '@/lib/mongodb';
import { publicPosts } from '@/lib/blog-visibility';
import { HOME_FAQ_ITEMS } from '@/lib/constants';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'IPTV Anbieter Deutschland 2026: IPTV-Abo ab 5,92 € ohne Vertrag | 4kdeutsch',
  description:
    'IPTV Anbieter für Deutschland: Live-TV, Sport und VOD per IPTV-Abo ohne Vertrag ab 5,92 €/Monat. IPTV 24 Stunden kostenlos testen, Einrichtung auf Fire Stick, Smart TV und Apple TV – mit deutschsprachigem Support.',
  alternates: { canonical: '/' },
  keywords: [
    'IPTV Anbieter',
    'IPTV Deutschland',
    'IPTV Anbieter Deutschland',
    'IPTV Abo',
    'IPTV Abonnement',
    'IPTV ohne Vertrag',
    'Premium IPTV',
  ],
  openGraph: {
    title: 'IPTV Anbieter Deutschland 2026: IPTV-Abo ab 5,92 € ohne Vertrag | 4kdeutsch',
    description:
      'IPTV Anbieter für Deutschland: Live-TV, Sport und VOD per IPTV-Abo ohne Vertrag ab 5,92 €/Monat, mit deutschsprachigem Support.',
    url: 'https://4kdeutsch.com',
  },
});

// Enable ISR caching at 3600s (1h)
export const revalidate = 3600;

export default async function HomePage() {
  // Fetch external TMDB and local MongoDB database payloads server-side
  const [movies, series, blogPosts] = await Promise.all([
    getPopularMovies(),
    getPopularSeries(),
    getBlogPosts().then(publicPosts)
  ]);

  return (
    <>
      <JsonLd data={[homeWebPageSchema(metadata.title as string), productSchema(), faqSchema(HOME_FAQ_ITEMS)]} />
      <HeroSection movies={movies} />
      <StatsBar />
      <FeaturesGrid />
      <HomeIntroSection />
      <VODSection movies={movies} series={series} />
      <SportsSection />
      <PricingSection />
      <HomeTrialSection />
      <CustomerReviews id="kundenbewertungen" />
      <DevicesSection />
      <HomeGuideSection />
      <HowItWorks />
      <CompareSection />
      <HomeTrustSection />
      <WhatToExpect />
      <FAQSection items={HOME_FAQ_ITEMS} />
      <LatestBlogPosts posts={blogPosts} />
      <HomeLinkHub />
      <CTASection />
    </>
  );
}
