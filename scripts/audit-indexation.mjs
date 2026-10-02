// Classifies every known route as INDEXABLE / NOINDEX / REDIRECT / 404 and cross-checks the sitemap. Usage: node scripts/audit-indexation.mjs
import fs from 'fs';
import path from 'path';
const BASE = 'http://localhost:3001';
const sm = await (await fetch(BASE + '/sitemap.xml')).text();
const inSitemap = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, '') || '/'));
// static routes from the file system
const routes = new Set(['/']);
(function walk(d, rel = '') {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (e.name.startsWith('[') || e.name.startsWith('_') || e.name.startsWith('(')) continue;
      walk(path.join(d, e.name), rel + '/' + e.name);
    } else if (/^page\.tsx$/.test(e.name) && rel) routes.add(rel);
  }
})('app');
const extra = ['/best-iptv', '/blog/best-iptv-players-smart-tv', '/blog/how-to-install-iptv-on-firestick', '/blog/watch-champions-league-iptv', '/blog/m3u-vs-xstream-codes', '/legal/impressum', '/legal/privacy', '/legal/terms', '/legal/refunds', '/legal/cookies', '/blog/dazn-iptv-roadmap-2026', '/blog/iptv-vpn-deutschland-2026', '/blog/iptv-legal-deutschland-2026', '/does-not-exist'];
extra.forEach((r) => routes.add(r));
inSitemap.forEach((r) => routes.add(r));
const rows = { INDEXABLE: [], NOINDEX: [], REDIRECT: [], '404': [], OTHER: [] };
for (const r of [...routes].sort()) {
  const res = await fetch(BASE + r, { redirect: 'manual' });
  if (res.status >= 300 && res.status < 400) { rows.REDIRECT.push(`${r} -> ${res.headers.get('location')?.replace(BASE, '')}`); continue; }
  if (res.status === 404) { rows['404'].push(r); continue; }
  if (res.status !== 200) { rows.OTHER.push(`${r} ${res.status}`); continue; }
  const h = await res.text();
  const robots = (h.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  (/noindex/.test(robots) ? rows.NOINDEX : rows.INDEXABLE).push(r);
}
const issues = [];
rows.INDEXABLE.forEach((r) => { if (!inSitemap.has(r)) issues.push('indexable but NOT in sitemap: ' + r); });
[...rows.NOINDEX, ...rows['404'], ...rows.REDIRECT.map((x) => x.split(' ->')[0])].forEach((r) => { if (inSitemap.has(r)) issues.push('in sitemap but not indexable: ' + r); });
// canonicals of indexable pages must not point to noindex/redirect/404 URLs
const bad = new Set([...rows.NOINDEX, ...rows['404'], ...rows.REDIRECT.map((x) => x.split(' ->')[0])]);
for (const r of rows.INDEXABLE) {
  const h = await (await fetch(BASE + r)).text();
  const c = ((h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '').replace(/^https?:\/\/[^/]+/, '') || '/';
  if (bad.has(c)) issues.push(`canonical of ${r} points to non-indexable ${c}`);
}
console.log('sitemap URLs', inSitemap.size);
for (const [k, v] of Object.entries(rows)) { console.log(`\n${k} (${v.length})`); if (k !== 'INDEXABLE') v.forEach((x) => console.log('  ' + x)); }
console.log('\nISSUES', issues.length); issues.forEach((i) => console.log('  ' + i));
