import { SITE_CONFIG, SOCIAL_LINKS, PRICING_PLANS, FAQ_ITEMS } from '@/lib/constants';
import { BRAND_LOGO, BRAND_SHARE_IMAGE } from '@/lib/brand';
import type { BlogPost } from '@/lib/mongodb';

const BASE_URL = SITE_CONFIG.domain;

/** Organization schema — establishes the brand entity for Google's Knowledge Graph. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: SITE_CONFIG.name,
    url: `${BASE_URL}/`,
    ...(BRAND_LOGO
      ? { logo: { '@type': 'ImageObject', url: `${BASE_URL}${BRAND_LOGO.src}`, width: BRAND_LOGO.width, height: BRAND_LOGO.height } }
      : {}),
    image: `${BASE_URL}${BRAND_LOGO ? BRAND_LOGO.src : BRAND_SHARE_IMAGE}`,
    email: SITE_CONFIG.supportEmail,
    telephone: SITE_CONFIG.whatsappNumber,
    description:
      '4kdeutsch ist ein Premium-IPTV-Anbieter mit Live-TV, Sportkanälen sowie Filmen & Serien auf Abruf – ohne Vertrag.',
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE_CONFIG.supportEmail,
      telephone: SITE_CONFIG.whatsappNumber,
      availableLanguage: ['German'],
      areaServed: 'DE',
    },
    // Only real, confirmed profiles (see SOCIAL_LINKS in lib/constants). Omitted while none are confirmed.
    ...(socialProfiles().length ? { sameAs: socialProfiles() } : {}),
    // Intentionally NOT set until the real data is provided: address, legalName, vatID, taxID, registration, logo
  };
}

function socialProfiles(): string[] {
  return Object.values(SOCIAL_LINKS).filter(Boolean);
}

/** WebSite schema — links the site entity to its publishing Organization. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: SITE_CONFIG.name,
    url: `${BASE_URL}/`,
    inLanguage: 'de-DE',
    publisher: { '@id': `${BASE_URL}/#organization` },
  };
}

/** Site-wide entity graph (rendered once in app/layout.tsx): Organization + WebSite, linked by stable @ids. */
export function siteGraphSchema() {
  const { '@context': _o, ...organization } = organizationSchema();
  const { '@context': _w, ...website } = websiteSchema();
  return { '@context': 'https://schema.org', '@graph': [organization, website] };
}

/** Homepage WebPage entity: part of the WebSite and about the Organization (no duplicate entity bodies). */
export function homeWebPageSchema(name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/#webpage`,
    url: `${BASE_URL}/`,
    name,
    inLanguage: 'de-DE',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#organization` },
  };
}

/** Product schema with tiered Offers — drives price-rich results and satisfies Google Merchant requirements. */
export function productSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${SITE_CONFIG.name} — Premium IPTV-Abonnement`,
    description:
      'Premium IPTV-Abonnement mit Live-TV, Sportkanälen sowie Filmen & Serien auf Abruf in HD und 4K – abhängig von Sender, Gerät und Internetverbindung.',
    image: [
      `${BASE_URL}${BRAND_SHARE_IMAGE}`,
      `${BASE_URL}/images/branding/4kdeutsch-logo.png`,
    ],
    sku: '4KDEUTSCH-IPTV-PREMIUM',
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    offers: PRICING_PLANS.map((plan) => ({
      '@type': 'Offer',
      name: `${SITE_CONFIG.name} — ${plan.name}`,
      price: plan.price.toFixed(2),
      priceCurrency: 'EUR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/pricing`,
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'DE',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: 'EUR',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'DE',
        },
      },
    })),
  };
}

/** FAQPage schema — eligible for the expandable FAQ rich result. */
export function faqSchema(items: { question: string; answer: string }[] = FAQ_ITEMS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** BreadcrumbList schema — renders the breadcrumb trail under the search result. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.path}`,
    })),
  };
}

/** Article schema for a blog post — powers article rich results & Discover eligibility. */
export function articleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seoTitle || post.title,
    description: post.description,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    // neutral editorial identity: the brand (no fictional persons)
    author: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: SITE_CONFIG.name },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: SITE_CONFIG.name,
      ...(BRAND_LOGO ? { logo: { '@type': 'ImageObject', url: `${BASE_URL}${BRAND_LOGO.src}` } } : {}),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
  };
}
