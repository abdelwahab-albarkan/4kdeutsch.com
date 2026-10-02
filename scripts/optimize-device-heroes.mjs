/**
 * Neutral, brand-free device illustrations (flat vector, transparent 1200x900 WebP) used as hero images on the
 * device pages. They deliberately show NO manufacturer logos, UI, app icons or film artwork.
 * Replace a file with a real, logo-free product photo of the same name at any time.
 *
 * Usage: node scripts/optimize-device-heroes.mjs
 */
import fs from 'fs';
import sharp from 'sharp';

const OUT = 'public/images/iptv/devices';
fs.mkdirSync(OUT, { recursive: true });
const G = '#10D96F';

const defs = `<defs>
  <linearGradient id="scr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d2a1b"/><stop offset="1" stop-color="#06100b"/></linearGradient>
  <linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2f2d"/><stop offset="1" stop-color="#151716"/></linearGradient>
  <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${G}" stop-opacity=".35"/><stop offset="1" stop-color="${G}" stop-opacity="0"/></radialGradient>
</defs>`;

// abstract "streaming interface": tile rows, no text/icons
const tiles = (x, y, w, h) => {
  const gap = w * 0.03, tw = (w - gap * 4) / 3.4, th = h * 0.26;
  let s = `<rect x="${x + w * 0.05}" y="${y + h * 0.1}" width="${w * 0.34}" height="${h * 0.07}" rx="${h * 0.035}" fill="${G}" opacity=".9"/>`;
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) {
    s += `<rect x="${x + gap + c * (tw + gap) + w * 0.01}" y="${y + h * 0.28 + r * (th + gap * 1.2)}" width="${tw}" height="${th}" rx="${h * 0.03}" fill="${r === 0 && c === 1 ? G : '#ffffff'}" opacity="${r === 0 && c === 1 ? 0.55 : 0.1}"/>`;
  }
  return s;
};

const tv = (cx, y, w, legs) => {
  const h = w * 0.56, x = cx - w / 2, b = w * 0.012;
  const stand = legs === 'wide'
    ? `<path d="M${cx - w * 0.36} ${y + h + 70} L${cx - w * 0.2} ${y + h} L${cx - w * 0.16} ${y + h} L${cx - w * 0.3} ${y + h + 70} Z" fill="#1c1e1d"/><path d="M${cx + w * 0.36} ${y + h + 70} L${cx + w * 0.2} ${y + h} L${cx + w * 0.16} ${y + h} L${cx + w * 0.3} ${y + h + 70} Z" fill="#1c1e1d"/>`
    : `<rect x="${cx - w * 0.04}" y="${y + h}" width="${w * 0.08}" height="48" fill="#1c1e1d"/><rect x="${cx - w * 0.2}" y="${y + h + 44}" width="${w * 0.4}" height="18" rx="9" fill="#232625"/>`;
  return `<ellipse cx="${cx}" cy="${y + h * 0.5}" rx="${w * 0.62}" ry="${h * 0.7}" fill="url(#glow)"/>
  ${stand}
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.02}" fill="url(#body)"/>
  <rect x="${x + b}" y="${y + b}" width="${w - 2 * b}" height="${h - 2 * b}" rx="${w * 0.015}" fill="url(#scr)"/>
  ${tiles(x + b, y + b, w - 2 * b, h - 2 * b)}`;
};

const remote = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect width="74" height="250" rx="37" fill="url(#body)" stroke="#3a3f3c" stroke-width="2"/>
  <circle cx="37" cy="62" r="22" fill="#0e100f" stroke="#3a3f3c" stroke-width="2"/><circle cx="37" cy="62" r="8" fill="${G}"/>
  <circle cx="22" cy="135" r="9" fill="#0e100f"/><circle cx="52" cy="135" r="9" fill="#0e100f"/>
  <rect x="17" y="170" width="40" height="12" rx="6" fill="#0e100f"/><rect x="17" y="196" width="40" height="12" rx="6" fill="#0e100f"/>
</g>`;

const phone = (x, y, w, h) => `<g>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.14}" fill="url(#body)" stroke="#3a3f3c" stroke-width="3"/>
  <rect x="${x + w * 0.05}" y="${y + w * 0.05}" width="${w * 0.9}" height="${h - w * 0.1}" rx="${w * 0.1}" fill="url(#scr)"/>
  <rect x="${x + w * 0.38}" y="${y + w * 0.09}" width="${w * 0.24}" height="${w * 0.04}" rx="${w * 0.02}" fill="#000"/>
  ${tiles(x + w * 0.05, y + w * 0.1, w * 0.9, h * 0.8)}
</g>`;

const art = {
  'hero-samsung-tv': () => tv(600, 130, 920, 'center'),
  'hero-lg-tv': () => tv(600, 130, 920, 'wide'),
  'hero-android-tv': () => `${tv(600, 90, 800, 'center')}
    <rect x="520" y="700" width="260" height="62" rx="18" fill="url(#body)" stroke="#3a3f3c" stroke-width="2"/><circle cx="548" cy="731" r="5" fill="${G}"/>`,
  'hero-apple-tv': () => `<ellipse cx="560" cy="500" rx="480" ry="300" fill="url(#glow)"/>
    <rect x="300" y="400" width="400" height="170" rx="44" fill="url(#body)" stroke="#3a3f3c" stroke-width="2"/>
    <rect x="300" y="520" width="400" height="50" rx="25" fill="#0e100f" opacity=".5"/><circle cx="350" cy="476" r="7" fill="${G}"/>
    ${remote(790, 330, 1.3)}`,
  'hero-fire-stick': () => `<ellipse cx="600" cy="470" rx="500" ry="280" fill="url(#glow)"/>
    <rect x="200" y="400" width="130" height="70" rx="14" fill="#0e100f" stroke="#3a3f3c" stroke-width="2"/>
    <rect x="320" y="330" width="560" height="170" rx="40" fill="url(#body)" stroke="#3a3f3c" stroke-width="2"/>
    <circle cx="395" cy="415" r="9" fill="${G}"/>
    <rect x="440" y="402" width="330" height="26" rx="13" fill="#0e100f" opacity=".55"/>
    ${remote(930, 270, 1.3)}`,
  'hero-mag-box': () => `<ellipse cx="560" cy="500" rx="500" ry="290" fill="url(#glow)"/>
    <rect x="190" y="380" width="620" height="210" rx="22" fill="url(#body)" stroke="#3a3f3c" stroke-width="2"/>
    <rect x="215" y="405" width="570" height="14" rx="7" fill="#0e100f" opacity=".6"/>
    <circle cx="240" cy="540" r="8" fill="${G}"/><rect x="290" y="534" width="160" height="12" rx="6" fill="#0e100f" opacity=".6"/>
    ${remote(880, 320, 1.3)}`,
  'hero-android-handy': () => `<ellipse cx="600" cy="460" rx="540" ry="340" fill="url(#glow)"/>
    <g transform="rotate(-6 440 450)">${phone(310, 180, 280, 560)}</g>
    <g transform="rotate(5 800 450)"><rect x="620" y="260" width="380" height="520" rx="34" fill="url(#body)" stroke="#3a3f3c" stroke-width="3"/><rect x="644" y="284" width="332" height="472" rx="20" fill="url(#scr)"/>${tiles(644, 290, 332, 460)}</g>`,
  'hero-windows-mac': () => `<ellipse cx="600" cy="470" rx="540" ry="320" fill="url(#glow)"/>
    <rect x="215" y="210" width="770" height="460" rx="26" fill="url(#body)" stroke="#3a3f3c" stroke-width="3"/>
    <rect x="240" y="235" width="720" height="410" rx="14" fill="url(#scr)"/>${tiles(240, 240, 720, 400)}
    <path d="M110 690 H1090 L1030 748 H170 Z" fill="#232625" stroke="#3a3f3c" stroke-width="2"/>
    <rect x="500" y="690" width="200" height="16" rx="8" fill="#0e100f"/>`,
};

for (const [name, draw] of Object.entries(art)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">${defs}${draw()}</svg>`;
  const buf = await sharp(Buffer.from(svg), { density: 96 }).resize(1200, 900).webp({ quality: 88, alphaQuality: 95, effort: 5 }).toBuffer();
  fs.writeFileSync(`${OUT}/${name}.webp`, buf);
  console.log(name.padEnd(22), '1200x900', Math.round(buf.length / 1024) + ' KB');
}
