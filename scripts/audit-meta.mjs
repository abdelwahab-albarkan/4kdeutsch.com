// Metadata audit of every sitemap URL (production server). Usage: node scripts/audit-meta.mjs [base] > out
import fs from 'fs';
const BASE = process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://localhost:3001';
const SITE = 'https://4kdeutsch.com';
const sm = await (await fetch(BASE + '/sitemap.xml')).text();
const urls = [...new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, '') || '/'))];
const dec = (s = '') => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const meta = (h, attr, name) => { const m = h.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`)); return m ? dec(m[1]) : null; };
const OLD = /germanystreamtv|ipgermany|streamb4(?!\.com\b)|ukstream4k/i;
const rows = [];
let i = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (i < urls.length) {
    const p = urls[i++];
    const r = await fetch(BASE + p, { redirect: 'manual' });
    const h = await r.text();
    const ld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return null; } });
    const ents = ld.flat().flatMap((b) => (b?.['@graph'] ? b['@graph'] : [b])).filter(Boolean);
    rows.push({
      path: p,
      status: r.status,
      title: dec((h.match(/<title>([^<]*)<\/title>/) || [])[1] || ''),
      description: meta(h, 'name', 'description'),
      canonical: dec((h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '') || null,
      robots: meta(h, 'name', 'robots'),
      h1: dec((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
      ogTitle: meta(h, 'property', 'og:title'),
      ogDesc: meta(h, 'property', 'og:description'),
      ogUrl: meta(h, 'property', 'og:url'),
      ogType: meta(h, 'property', 'og:type'),
      ogImage: meta(h, 'property', 'og:image'),
      twCard: meta(h, 'name', 'twitter:card'),
      twTitle: meta(h, 'name', 'twitter:title'),
      twDesc: meta(h, 'name', 'twitter:description'),
      twImage: meta(h, 'name', 'twitter:image'),
      keywords: meta(h, 'name', 'keywords'),
      ld: ents.map((e) => [].concat(e['@type']).join('/')),
      ldHeadline: ents.find((e) => e['@type'] === 'Article')?.headline ?? null,
      oldBrand: OLD.test(h.replace(/support@streamb4\.com/g, '')),
    });
  }
}));
rows.sort((a, b) => a.path.localeCompare(b.path));
fs.writeFileSync(process.env.TEMP + '/meta-audit.json', JSON.stringify(rows, null, 1));
const dup = (k) => { const m = {}; rows.forEach((r) => r[k] && (m[r[k]] = [...(m[r[k]] || []), r.path])); return Object.entries(m).filter(([, v]) => v.length > 1); };
const c = (f) => rows.filter(f).map((r) => r.path);
console.log('routes', rows.length);
console.log('non200', c((r) => r.status !== 200));
console.log('noindex', c((r) => /noindex/.test(r.robots || '')));
console.log('dup titles', dup('title'));
console.log('dup desc', dup('description'));
console.log('no desc', c((r) => !r.description));
console.log('no canonical', c((r) => !r.canonical));
console.log('canonical != self', rows.filter((r) => r.canonical && r.canonical.replace(/\/$/, '') !== (SITE + (r.path === '/' ? '' : r.path)).replace(/\/$/, '')).map((r) => [r.path, r.canonical]));
console.log('no og:image', c((r) => !r.ogImage));
console.log('no og:title/desc/url/type', c((r) => !r.ogTitle || !r.ogDesc || !r.ogUrl || !r.ogType));
console.log('og:url != canonical', rows.filter((r) => r.ogUrl && r.canonical && r.ogUrl.replace(/\/$/, '') !== r.canonical.replace(/\/$/, '')).map((r) => [r.path, r.ogUrl]));
console.log('no twitter', c((r) => r.twCard !== 'summary_large_image' || !r.twTitle || !r.twDesc || !r.twImage));
console.log('og:type', Object.entries(rows.reduce((a, r) => ((a[r.ogType] = (a[r.ogType] || 0) + 1), a), {})));
console.log('meta keywords', c((r) => r.keywords));
console.log('old brand', c((r) => r.oldBrand));
console.log('no h1/!=1', c((r) => !r.h1));
console.log('title len >65', rows.filter((r) => r.title.length > 65).length, 'desc len >165', rows.filter((r) => (r.description || '').length > 165).length, 'desc <70', rows.filter((r) => (r.description || '').length < 70).map((r) => r.path));
