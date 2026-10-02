/**
 * Derives the web logo and app icons from the OFFICIAL 4KDEUTSCH logo supplied by the owner:
 *   public/images/Logo 3D 4KDEUTSCH au néon vert.png  (source, untouched)
 *   -> public/images/branding/4kdeutsch-logo.png      (trimmed, 1200 px wide, transparent)
 *   -> app/icon.png, app/apple-icon.png, public/icon-192.png, public/icon-512.png  ("4K" part of the logo on #070707)
 *
 * Usage: node scripts/build-brand-assets.mjs
 */
import fs from 'fs';
import sharp from 'sharp';

const SRC = 'public/images/Logo 3D 4KDEUTSCH au néon vert.png';
fs.mkdirSync('public/images/branding', { recursive: true });

const trimmed = await sharp(SRC).trim().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = trimmed.info;

const logo = await sharp(trimmed.data).resize({ width: 1200, withoutEnlargement: true }).png({ palette: true, quality: 90, effort: 8 }).toBuffer();
fs.writeFileSync('public/images/branding/4kdeutsch-logo.png', logo);
const lm = await sharp(logo).metadata();
console.log('logo', lm.width + 'x' + lm.height, Math.round(logo.length / 1024) + ' KB');

// "4K" = left ~40 % of the wordmark
const cropped = await sharp(trimmed.data).extract({ left: 0, top: 0, width: Math.round(W * 0.382), height: H }).toBuffer();
const mark = await sharp(cropped).trim().toBuffer();
const icon = async (size) => {
  const inner = Math.round(size * 0.78);
  const m = await sharp(mark).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#070707' } })
    .composite([{ input: m, gravity: 'center' }])
    .png()
    .toBuffer();
};
const out = { 'public/icon-512.png': 512, 'public/icon-192.png': 192, 'app/icon.png': 512, 'app/apple-icon.png': 180 };
for (const [f, s] of Object.entries(out)) fs.writeFileSync(f, await icon(s));
console.log('icons written');
