/**
 * Single source of truth for the 4kdeutsch logo.
 *
 * The official logo was supplied by the owner (source file: public/images/Logo 3D 4KDEUTSCH au néon vert.png).
 * The web version public/images/branding/4kdeutsch-logo.png and the favicons/app icons are generated from it by
 * scripts/build-brand-assets.mjs. Navbar, footer and schema.org data (Organization/Article publisher) read this value.
 * Set BRAND_LOGO to null to fall back to a plain text site name.
 */
export interface BrandLogo {
  src: string;
  width: number;
  height: number;
}

export const BRAND_LOGO: BrandLogo | null = { src: '/images/branding/4kdeutsch-logo.png', width: 1200, height: 369 };

/** Social/share image used where schema.org needs an image (1200×630). */
export const BRAND_SHARE_IMAGE = '/images/iptv/social/4kdeutsch-streaming.jpg';
