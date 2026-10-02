const BASE = process.argv[2] || 'http://localhost:3001';
const sm = await (await fetch(BASE + '/sitemap.xml')).text();
const inSitemap = new Set([...sm.matchAll(/<loc>[^<]*\/blog\/([^<\/]+)<\/loc>/g)].map((m) => m[1]));
const idx = await (await fetch(BASE + '/blog')).text();
const linked = new Set([...idx.matchAll(/href="\/blog\/([a-z0-9-]+)"/g)].map((m) => m[1]));
const slugs = [...new Set([...inSitemap, ...linked])].sort();
const rows = [];
for (const s of slugs) {
  const r = await fetch(`${BASE}/blog/${s}`, { redirect: 'manual' });
  const h = await r.text();
  const main = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<nav[\s\S]*?<\/nav>|<footer[\s\S]*?<\/footer>|<header[\s\S]*?<\/header>/g, '');
  const art = (main.match(/<h1[\s\S]*$/) || [main])[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const words = art.split(' ').filter(Boolean).length;
  rows.push({
    slug: s,
    status: r.status,
    words,
    h2: (h.match(/<h2/g) || []).length,
    noindex: /<meta name="robots" content="[^"]*noindex/.test(h),
    canon: (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1]?.replace(/^https?:\/\/[^/]+/, '') ?? null,
    sitemap: inSitemap.has(s),
    linked: linked.has(s),
  });
}
console.table(rows);
console.log('total', rows.length, 'sitemap', inSitemap.size, 'linked from /blog', linked.size);
const bad = rows.filter((r) => r.status !== 200 || r.words < 600 || r.canon !== `/blog/${r.slug}`);
console.log('flagged:', bad);
const bogus = await fetch(`${BASE}/blog/this-does-not-exist-xyz`);
const bt = await bogus.text();
console.log('unknown slug ->', bogus.status, 'noindex:', /noindex/.test(bt), 'notfound-text:', /404|nicht gefunden|Not Found/i.test(bt));
