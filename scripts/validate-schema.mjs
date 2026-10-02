// Local JSON-LD validation against the production server (no external validator, no network).
// Usage: node scripts/validate-schema.mjs [base] [--json]
const BASE = process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://localhost:3001';
const SITE = 'https://4kdeutsch.com';
const pages = ['/', '/pricing', '/contact', '/features', '/iptv-kaufen', '/blog/iptv-fire-tv-stick-2026'];
const FORBIDDEN_KEYS = ['Review', 'AggregateRating', 'aggregateRating', 'review', 'reviewCount', 'ratingValue', 'ratingCount', 'LocalBusiness', 'address', 'legalName', 'vatID', 'taxID', 'iso6523Code', 'award', 'awards', 'foundingDate', 'numberOfEmployees'];
const OLD = /germanystreamtv|ipgermany\.de|ukstream4k/i;
const CLAIMS = /garantie|testsieger|bestbewertet|nr\.? ?1|marktführer|millionen|ausgezeichnet|award|zertifiziert|99[,.]\d ?%|geld-zurück/i;
const fails = [], warns = [];
const results = [];
const walk = (v, fn, path = '') => { fn(v, path); if (Array.isArray(v)) v.forEach((x, i) => walk(x, fn, `${path}[${i}]`)); else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, fn, `${path}.${k}`); };
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

for (const p of pages) {
  const F = (m) => fails.push(`${p}: ${m}`), W = (m) => warns.push(`${p}: ${m}`);
  const html = await (await fetch(BASE + p)).text();
  const text = decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const raws = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const blocks = [];
  raws.forEach((r, i) => { try { blocks.push(JSON.parse(r)); } catch (e) { F(`block ${i} is not valid JSON (${e.message})`); } });
  // @context
  blocks.flatMap((b) => (Array.isArray(b) ? b : [b])).forEach((b, i) => {
    if (b['@context'] !== 'https://schema.org') F(`block entry ${i} has @context ${JSON.stringify(b['@context'])}`);
  });
  const entities = blocks.flatMap((b) => (Array.isArray(b) ? b : [b])).flatMap((b) => (b['@graph'] ? b['@graph'] : [b]));
  const types = entities.map((e) => [].concat(e['@type']).join('/'));
  const of = (t) => entities.filter((e) => [].concat(e['@type']).includes(t));
  // duplicates
  const orgs = of('Organization').filter((e) => e['@id']);
  if (orgs.length !== 1) F(`Organization count ${orgs.length}`);
  if (of('WebSite').length !== 1) F(`WebSite count ${of('WebSite').length}`);
  const ids = entities.map((e) => e['@id']).filter(Boolean);
  if (new Set(ids).size !== ids.length) F('duplicate @id ' + ids.filter((x, i) => ids.indexOf(x) !== i));
  const wp = of('WebPage').filter((e) => e['@id']?.endsWith('#webpage'));
  if (p === '/') { if (wp.length !== 1) F('homepage WebPage missing/duplicated'); }
  // @id references resolve (Article mainEntityOfPage is an inline entity, fine)
  const defined = new Set(ids);
  blocks.forEach((b) => walk(b, (v, path) => { if (v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 1 && v['@id'] && !defined.has(v['@id'])) F(`unresolved @id reference ${v['@id']} at ${path}`); }));
  // Organization / WebSite details
  const org = orgs[0], site = of('WebSite')[0];
  if (org) {
    if (org['@id'] !== `${SITE}/#organization`) F('Organization @id ' + org['@id']);
    if (org.name !== '4kdeutsch' || org.url !== `${SITE}/`) F('Organization name/url');
    if ('sameAs' in org && (!Array.isArray(org.sameAs) || org.sameAs.length === 0)) F('empty sameAs');
    if ('logo' in org) W('Organization has a logo – verify it is the OFFICIAL logo file');
    if (org.telephone && !/^\+\d{8,15}$/.test(org.telephone)) F('telephone format ' + org.telephone);
  }
  if (site) {
    if (site['@id'] !== `${SITE}/#website`) F('WebSite @id');
    if (site.publisher?.['@id'] !== `${SITE}/#organization`) F('WebSite.publisher');
  }
  // forbidden content
  blocks.forEach((b) => walk(b, (v, path) => {
    const last = path.split('.').pop()?.replace(/\[\d+\]/, '');
    if (last && FORBIDDEN_KEYS.includes(last)) F(`forbidden property ${path}`);
    if (v && typeof v === 'object' && !Array.isArray(v) && FORBIDDEN_KEYS.includes(v['@type'])) F(`forbidden @type ${v['@type']} at ${path}`);
    if (typeof v === 'string') {
      if (OLD.test(v)) F(`old domain in ${path}`);
      if (CLAIMS.test(v)) W(`possible claim in ${path}: "${v.slice(0, 80)}"`);
    }
  }));
  // canonical vs schema URLs
  if (!canon || !canon.startsWith(SITE)) F('canonical not on ' + SITE);
  const canonPath = (canon || '').replace(SITE, '') || '/';
  const norm = (u) => u.replace(/\/$/, '');
  entities.forEach((e) => {
    if (e['@type'] === 'WebPage' && e.url && norm(e.url) !== norm(SITE + canonPath)) F(`WebPage url ${e.url} != canonical ${canon}`);
    if (e['@type'] === 'Article' && e.mainEntityOfPage?.['@id'] && norm(e.mainEntityOfPage['@id']) !== norm(canon)) F('Article mainEntityOfPage != canonical');
  });
  // BreadcrumbList
  of('BreadcrumbList').forEach((b) => {
    const items = b.itemListElement || [];
    items.forEach((it, i) => { if (it.position !== i + 1) F('breadcrumb position'); if (!it.name || !it.item?.startsWith(SITE)) F('breadcrumb item ' + JSON.stringify(it)); });
    const last = items.at(-1)?.item;
    if (last && norm(last) !== norm(canon)) F(`breadcrumb last item ${last} != canonical ${canon}`);
    if (items[0]?.item !== `${SITE}/`) F('breadcrumb first item must be the home page');
  });
  // FAQPage – Q/A must be visible on the page
  of('FAQPage').forEach((f) => {
    const qs = f.mainEntity || [];
    if (!qs.length) F('FAQPage without questions');
    let missing = 0;
    qs.forEach((q) => {
      if (q['@type'] !== 'Question' || !q.name || q.acceptedAnswer?.['@type'] !== 'Answer' || !q.acceptedAnswer.text) F('malformed FAQ question');
      else if (!text.includes(q.name.slice(0, 50))) missing++;
    });
    if (missing) W(`${missing}/${qs.length} FAQ questions not found verbatim in visible page text`);
  });
  // Product / Offer
  of('Product').forEach((pr) => {
    if (!pr.name) F('Product without name');
    const o = pr.offers;
    if (!o) F('Product without offers');
    else {
      const list = o.offers || [o];
      if (!/^\d+(\.\d+)?$/.test(String(o.lowPrice ?? list[0].price))) F('offer price format');
      if (o.priceCurrency !== 'EUR') F('priceCurrency');
      if (o.offerCount !== undefined && o.offerCount !== list.length) F('offerCount != number of offers');
      list.forEach((of_) => { if (of_.url && !of_.url.startsWith(SITE)) F('offer url'); });
      if (p === '/pricing') {
        list.forEach((of_) => { const de = Number(of_.price).toFixed(2).replace('.', ','); if (!text.includes(de)) W(`offer price ${de} € not visible on /pricing`); });
      }
    }
    if (!pr.sku && !pr.gtin && !pr.mpn) W('Product: no sku/gtin/mpn (optional for Google merchant listings)');
    if (!pr['@id']) W('Product has no @id (same Product repeated on several pages)');
  });
  // Article
  of('Article').concat(of('BlogPosting')).forEach((a) => {
    ['headline', 'datePublished', 'author', 'publisher'].forEach((k) => { if (!a[k]) F(`Article.${k} missing`); });
    if (a.publisher && !a.publisher.logo) W('Article.publisher has no logo (Google recommends one; add only once the official logo exists)');
  });
  results.push({ page: p, canonical: canon, jsonLdScripts: raws.length, types });
}
console.log(JSON.stringify(results, null, 1));
console.log('\nWARNINGS (' + warns.length + ')'); [...new Set(warns)].forEach((w) => console.log(' -', w));
console.log('\nFAILURES (' + fails.length + ')'); fails.forEach((f) => console.log(' -', f));
console.log(fails.length ? '\nLocal JSON-LD validation: FAIL' : '\nLocal JSON-LD validation: PASS');
console.log('Google Rich Results Test: NOT RUN');
process.exit(fails.length ? 1 : 0);
