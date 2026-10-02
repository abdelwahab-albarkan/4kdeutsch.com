#!/usr/bin/env node

/**
 * 4kdeutsch — IndexNow submission (local CLI, never runs in the browser or on page requests).
 *
 * IndexNow only NOTIFIES participating search engines (Bing, Yandex, Seznam, Naver …) that URLs changed.
 * It does not guarantee crawling or indexing, and it is not a Google API (use Google Search Console for Google).
 *
 * Usage:
 *   npm run index-now                      submit every URL of https://4kdeutsch.com/sitemap.xml
 *   npm run index-now -- --dry-run         run all checks, send NO submission
 *   node scripts/index-now.js https://4kdeutsch.com/ https://4kdeutsch.com/iptv-kaufen   specific URLs only
 *   node scripts/index-now.js --dry-run --sitemap http://localhost:3001/sitemap.xml      (dry-run only) other sitemap source
 *
 * Key: INDEXNOW_KEY in .env.local (or the environment). The public verification file must exist as
 * public/<key>.txt, contain exactly the key, and be reachable at https://4kdeutsch.com/<key>.txt.
 * The key is never printed (only its length).
 */

const fs = require('fs');
const path = require('path');

const HOST = '4kdeutsch.com';
const SITE_URL = `https://${HOST}`;
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH_SIZE = 10000; // IndexNow maximum per request
const UA = '4kdeutsch-IndexNow-Client/1.0';

const STATUS = {
  200: 'OK – submission received.',
  202: 'Accepted – received, key verification pending.',
  400: 'Bad request – invalid payload format.',
  403: 'Forbidden – key invalid / key file not found.',
  422: 'Unprocessable – URL host does not match, or key mismatch.',
  429: 'Too many requests – rate limited, try again later.',
};

function loadEnv() {
  const root = path.resolve(__dirname, '..');
  for (const file of ['.env.local', '.env']) {
    const p = path.join(root, file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i <= 0) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if (/^(".*"|'.*')$/.test(v)) v = v.slice(1, -1);
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

function getKey() {
  loadEnv();
  const key = (process.env.INDEXNOW_KEY || '').trim();
  if (!key) fail('INDEXNOW_KEY is missing. Add INDEXNOW_KEY=<key> to .env.local (the key is never printed).');
  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) fail('INDEXNOW_KEY has an invalid format (8–128 chars: a–z, A–Z, 0–9, dash).');
  return key;
}

/** Local key file must exist and match the key exactly. */
function checkLocalKeyFile(key) {
  const p = path.resolve(__dirname, '..', 'public', `${key}.txt`);
  if (!fs.existsSync(p)) fail(`Local key file public/${'*'.repeat(8)}.txt is missing. Create public/<key>.txt containing exactly the key.`);
  if (fs.readFileSync(p, 'utf8').trim() !== key) fail('Local key file content does not match INDEXNOW_KEY.');
}

async function get(url, opts = {}) {
  return fetch(url, { headers: { 'User-Agent': UA, Accept: '*/*' }, redirect: 'follow', ...opts });
}

async function getSitemapUrls(sitemapUrl) {
  console.log(`📡 Fetching sitemap: ${sitemapUrl}`);
  const res = await get(sitemapUrl, { headers: { 'User-Agent': UA, Accept: 'application/xml, text/xml, */*' } });
  if (res.status !== 200) fail(`Sitemap returned HTTP ${res.status} (expected 200).`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((m) => m[1].replace(/&amp;/g, '&'));
  if (!urls.length) fail('Sitemap parsed but contains no <loc> entries.');
  console.log(`✔ Sitemap HTTP 200, ${urls.length} <loc> entries.`);
  return urls;
}

/** Keeps only valid, unique https://4kdeutsch.com URLs. */
function sanitize(rawUrls) {
  const seen = new Set();
  const valid = [];
  const rejected = [];
  for (const raw of rawUrls) {
    const u = raw.trim();
    if (seen.has(u)) { rejected.push([u, 'duplicate']); continue; }
    seen.add(u);
    let p;
    try { p = new URL(u); } catch { rejected.push([u, 'malformed URL']); continue; }
    if (p.protocol !== 'https:') rejected.push([u, 'not https']);
    else if (p.hostname !== HOST) rejected.push([u, `host is not ${HOST}`]);
    else valid.push(p.href); // href keeps/normalises percent-encoding
  }
  return { valid: [...new Set(valid)], rejected };
}

async function preflight(key, urls, base = SITE_URL) {
  const toBase = (u) => (base === SITE_URL ? u : u.replace(SITE_URL, base));
  // key file public + content match
  const keyUrl = `${SITE_URL}/${key}.txt`;
  let res;
  try { res = await get(toBase(keyUrl)); } catch (e) { fail(`Key file not reachable (${e.message}). Deploy public/<key>.txt first.`); }
  if (res.status !== 200) fail(`Public key file returned HTTP ${res.status} (expected 200). Deploy public/<key>.txt to ${SITE_URL}/ first.`);
  const body = (await res.text()).trim();
  if (body !== key) fail('Public key file content does NOT match INDEXNOW_KEY.');
  console.log('✔ Public key file reachable (HTTP 200) and content matches the key.');
  // first URL reachable
  let first;
  try { first = await get(toBase(urls[0])); } catch (e) { fail(`First URL not reachable (${e.message}).`); }
  if (first.status !== 200) fail(`First URL ${urls[0]} returned HTTP ${first.status} (expected 200).`);
  console.log(`✔ First URL reachable: ${urls[0]} (HTTP 200).`);
  return keyUrl;
}

async function submit(urls, key, keyLocation) {
  const batches = Math.ceil(urls.length / BATCH_SIZE);
  let accepted = 0, failed = 0;
  const results = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const n = i / BATCH_SIZE + 1;
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`⏳ Batch ${n}/${batches}: ${batch.length} URLs → ${ENDPOINT}`);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'User-Agent': UA },
        body: JSON.stringify({ host: HOST, key, keyLocation, urlList: batch }),
      });
      const note = STATUS[res.status] || res.statusText || 'Unexpected status';
      const ok = res.status === 200 || res.status === 202;
      console.log(`${ok ? '✅' : '⚠️ '} Batch ${n}: HTTP ${res.status} – ${note}`);
      if (!ok) { const t = await res.text().catch(() => ''); if (t) console.log(`   detail: ${t.slice(0, 200)}`); }
      ok ? (accepted += batch.length) : (failed += batch.length);
      results.push({ batch: n, status: res.status });
    } catch (e) {
      console.error(`❌ Batch ${n}: network error – ${e.message}`);
      failed += batch.length;
      results.push({ batch: n, status: 'network error' });
    }
  }
  console.log(`\nNotified (accepted by IndexNow): ${accepted} URLs | not accepted: ${failed} URLs`);
  console.log('ℹ️  This only means IndexNow received the notification – it does not mean the URLs are indexed.');
  return { accepted, failed, results };
}

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes('--dry-run') || args.includes('--validate');
  const sIdx = args.indexOf('--sitemap');
  const customSitemap = sIdx >= 0 ? args[sIdx + 1] : null;
  const explicit = args.filter((a) => /^https?:\/\//.test(a) && a !== customSitemap);

  if (args.includes('--help') || args.includes('-h')) {
    console.log('See the header of scripts/index-now.js for usage.');
    return;
  }
  if (customSitemap && !dry) fail('--sitemap is only allowed together with --dry-run.');

  console.log(`⚡ 4kdeutsch IndexNow ${dry ? '(DRY RUN – nothing will be submitted)' : ''}`);
  console.log(`   host ${HOST} | endpoint ${ENDPOINT}`);
  const key = getKey();
  console.log(`🔑 Key loaded (${key.length} chars, not printed).`);
  checkLocalKeyFile(key);
  console.log('✔ Local public key file exists and matches the key.');

  let raw;
  if (explicit.length) {
    console.log(`🎯 Mode: ${explicit.length} explicit URL(s).`);
    raw = explicit;
  } else {
    console.log('🗺️  Mode: sitemap URLs.');
    raw = await getSitemapUrls(customSitemap || SITEMAP_URL);
  }

  const { valid, rejected } = sanitize(raw);
  console.log(`\nURLs found: ${raw.length} | valid: ${valid.length} | rejected: ${rejected.length}`);
  rejected.slice(0, 10).forEach(([u, why]) => console.log(`   ✗ ${u} (${why})`));
  if (explicit.length && rejected.some(([, why]) => why !== 'duplicate')) fail(`Only https://${HOST}/ URLs are accepted. Remove the rejected URL(s) and retry.`);
  if (!valid.length) fail('No valid URLs to submit.');

  const base = customSitemap ? new URL(customSitemap).origin : SITE_URL; // dry-run against a local server
  if (customSitemap) console.log(`ℹ️  Dry-run source: key file and first URL are checked on ${base} (not on the live domain).`);
  const keyLocation = await preflight(key, valid, base);

  console.log(`\n==================================================`);
  console.log(`Ready to submit: ${valid.length} URLs in ${Math.ceil(valid.length / BATCH_SIZE)} batch(es)`);
  console.log(`keyLocation: ${keyLocation.replace(key, '<key>')}`);
  console.log(`==================================================`);
  if (dry) {
    valid.slice(0, 5).forEach((u) => console.log(`   ✓ ${u}`));
    if (valid.length > 5) console.log(`   … and ${valid.length - 5} more`);
    console.log('\n✅ Dry run passed. No POST request was sent.');
    return;
  }
  await submit(valid, key, keyLocation);
}

main().catch((e) => fail(`Unexpected error: ${e.message}`));
