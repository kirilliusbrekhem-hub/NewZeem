'use strict';
// GET /api/story?u=<article url>&lang=en|es|pt|fr|de|ru|hi|zh|ar
// The reader tapped "More" on a story: read the original article and retell it in a few short paragraphs.
// Only articles from the outlets we already read feeds from are fetched (never an arbitrary address). Every number in
// the retelling must appear in the article text, otherwise that paragraph is dropped.
const AI = require('./_ai.js');
const { supported, text, clip } = require('./topic.js')._test;

const HOSTS = ['bbc.co.uk', 'bbc.com', 'theguardian.com', 'aljazeera.com', 'dw.com', 'npr.org', 'theverge.com', 'arstechnica.com', 'wired.com',
  'technologyreview.com', 'cnbc.com', 'nasa.gov', 'sciencedaily.com', 'nature.com', 'who.int', 'carbonbrief.org', 'espn.com', 'polygon.com'];
const LANG = { en: 'English', es: 'Spanish', pt: 'Brazilian Portuguese', fr: 'French', de: 'German', ru: 'Russian', hi: 'Hindi', zh: 'Simplified Chinese', ar: 'Modern Standard Arabic' };
const PER_DAY = Number(process.env.NZ_DETAIL_PER_DAY) > 0 ? Number(process.env.NZ_DETAIL_PER_DAY) : 600;
const mem = new Map();
let day = '', calls = 0;

const testMode = () => !!process.env.NZ_FEED_HOST;
const okHost = (h) => HOSTS.some((d) => h === d || h.endsWith('.' + d)) || (testMode() && h === 'news.example');

async function getHtml(start) {
  let url = start;
  for (let hop = 0; hop < 4; hop++) {
    let u; try { u = new URL(url); } catch (e) { return null; }
    if (u.protocol !== 'https:' || !okHost(u.hostname) || u.username || u.password) return null;
    const ac = new AbortController(), timer = setTimeout(() => ac.abort(), 7000);
    try {
      const target = testMode() ? process.env.NZ_FEED_HOST + '/article?u=' + encodeURIComponent(url) : url;
      const r = await fetch(target, { redirect: 'manual', signal: ac.signal, headers: { 'user-agent': 'Mozilla/5.0 (compatible; NewZeemBot/1.0)', accept: 'text/html' } });
      if (r.status >= 300 && r.status < 400 && r.headers.get('location')) { url = new URL(r.headers.get('location'), url).toString(); continue; }
      if (!r.ok || !/html/i.test(r.headers.get('content-type') || '')) return null;
      const buf = await r.arrayBuffer();
      if (buf.byteLength > 2500000) return null;
      return new TextDecoder('utf-8').decode(buf);
    } catch (e) { return null; } finally { clearTimeout(timer); }
  }
  return null;
}

function extract(html) {
  let h = html.replace(/<(script|style|noscript|svg|nav|header|footer|aside|form|figure|iframe)\b[\s\S]*?<\/\1>/gi, ' ');
  const art = /<article\b[\s\S]*?<\/article>/i.exec(h); if (art) h = art[0];
  const seen = new Set(); let out = '';
  const re = /<p\b[^>]*>([\s\S]*?)<\/p>/gi; let m;
  while ((m = re.exec(h))) {
    const p = text(m[1]);
    if (p.length < 50 || seen.has(p)) continue;
    seen.add(p);
    if (out.length + p.length > 7000) break;
    out += p + '\n';
  }
  return out.trim();
}

const SYSTEM = (lg) => `You retell ONE news article for a busy reader who tapped "More". Write in ${LANG[lg]}, plain and neutral. Write numbers with Western digits 0-9.
Use ONLY facts present in the article text; never add numbers, names, causes, dates or quotes that are not there. No opinions.
Return JSON only: {"paragraphs": [3 to 5 short paragraphs, at most 170 words in total. First what happened, then the key details, then what is still unknown or what comes next, only if the article says so]}`;

module.exports = async (req, res) => {
  const q = new URL(req.url, 'http://x').searchParams;
  const lg = LANG[q.get('lang')] ? q.get('lang') : 'en';
  const send = (code, body, cache) => {
    res.statusCode = code; res.setHeader('content-type', 'application/json; charset=utf-8'); res.setHeader('cache-control', cache || 'no-store'); res.end(JSON.stringify(body));
  };
  if (req.method !== 'GET') return send(405, { error: 'method' });
  let u; try { u = new URL(q.get('u') || ''); } catch (e) { return send(400, { error: 'url' }); }
  if (u.protocol !== 'https:' || !okHost(u.hostname)) return send(403, { error: 'host' });
  if (!AI.configured()) return send(503, { error: 'noai' });
  const key = u.toString() + '|' + lg, hit = mem.get(key);
  const cache = 'public, s-maxage=86400, stale-while-revalidate=172800';
  if (hit && Date.now() - hit.at < 12 * 3600e3) return send(200, hit.body, cache);
  const today = new Date().toISOString().slice(0, 10);
  if (day !== today) { day = today; calls = 0; }
  if (calls >= PER_DAY) return send(429, { error: 'busy' });
  const html = await getHtml(u.toString());
  const body = html ? extract(html) : '';
  if (body.length < 400) return send(422, { error: 'unreadable' });
  calls++;
  try {
    const j = await AI.askJson(SYSTEM(lg), '<article>\n' + body + '\n</article>', { temperature: 0.2, maxTokens: 1400 });
    const paragraphs = (Array.isArray(j.paragraphs) ? j.paragraphs : []).map((p) => clip(p, 700)).filter((p) => p && supported(p, body)).slice(0, 5);
    if (paragraphs.length < 2) return send(502, { error: 'bad' });
    const out = { lang: lg, ai: true, paragraphs };
    mem.set(key, { at: Date.now(), body: out });
    if (mem.size > 300) mem.delete(mem.keys().next().value);
    return send(200, out, cache);
  } catch (e) {
    console.error('story ai error:', e && e.message);
    return send(502, { error: 'ai' });
  }
};
module.exports._test = { extract, okHost };
