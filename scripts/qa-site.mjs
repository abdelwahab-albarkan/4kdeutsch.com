const BASE = 'http://localhost:3001';
const sm = await (await fetch(BASE + '/sitemap.xml')).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, '') || '/');
const uniq = [...new Set(urls)];
console.log('sitemap urls', urls.length, 'unique', uniq.length);
const bad = { status: [], canon: [], noindex: [], dupTitle: [], h1: [] };
const links = new Map();
const titles = new Map();
const pool = async (items, n, fn) => { let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) await fn(items[i++]); })); };
await pool(uniq, 6, async (p) => {
  const r = await fetch(BASE + p, { redirect: 'manual' });
  const h = await r.text();
  if (r.status !== 200) { bad.status.push([p, r.status]); return; }
  const c = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1]?.replace(/^https?:\/\/[^/]+/, '') || null;
  if ((c || '/') !== p && !(p === '/' && c === '')) bad.canon.push([p, c]);
  if (/<meta name="robots" content="[^"]*noindex/.test(h)) bad.noindex.push(p);
  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
  titles.set(t, [...(titles.get(t) || []), p]);
  if ((h.match(/<h1[\s>]/g) || []).length !== 1) bad.h1.push([p, (h.match(/<h1[\s>]/g) || []).length]);
  for (const m of h.matchAll(/<a [^>]*href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) { const l = m[1]; if (!links.has(l)) links.set(l, p); }
});
for (const [t, ps] of titles) if (ps.length > 1) bad.dupTitle.push([t, ps]);
const targets = [...links.keys()].filter((l) => !l.startsWith('/_next') && !/\.(png|jpe?g|webp|svg|ico|xml|txt|json|css|js)$/.test(l));
const broken = [];
const redirected = [];
await pool(targets, 8, async (l) => {
  const r = await fetch(BASE + l, { redirect: 'manual' });
  if (r.status >= 300 && r.status < 400) redirected.push([l, r.status, r.headers.get('location'), links.get(l)]);
  else if (r.status !== 200) broken.push([l, r.status, 'from', links.get(l)]);
});
console.log({ internalLinkTargets: targets.length, broken: broken.length, redirectedLinks: redirected.length });
console.log('BROKEN', broken);
console.log('REDIRECTED', redirected);
console.log('sitemap non-200', bad.status);
console.log('canonical mismatch', bad.canon);
console.log('noindex in sitemap', bad.noindex);
console.log('h1 != 1', bad.h1);
console.log('duplicate titles', bad.dupTitle.length, bad.dupTitle.slice(0, 5));
for (const p of ['/does-not-exist-xyz', '/blog/does-not-exist-xyz', '/iptv-hilfe/does-not-exist', '/einrichtung/nope', '/live/nope', '/ratgeber/nope']) {
  const r = await fetch(BASE + p); const h = await r.text();
  console.log('unknown', p, r.status, 'noindex', /noindex/.test(h));
}
for (const s of ['dazn-iptv-roadmap-2026', 'iptv-vpn-deutschland-2026']) { const h = await (await fetch(BASE + '/blog/' + s)).text(); console.log('draft', s, 'noindex', /<meta name="robots" content="[^"]*noindex/.test(h)); }
