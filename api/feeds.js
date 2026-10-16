'use strict';
// GET /api/feeds : checks every source feed once and says which ones answer (for the site's owner; cached for 10 minutes).
const TOPICS = require('../topics.js');
const { parseFeed } = require('./topic.js')._test;

let memo = null;
async function probe(url) {
  const ac = new AbortController(), timer = setTimeout(() => ac.abort(), 7000), t0 = Date.now();
  try {
    const r = await fetch(process.env.NZ_FEED_HOST ? process.env.NZ_FEED_HOST + '/feed?u=' + encodeURIComponent(url) : url, { signal: ac.signal, headers: { 'user-agent': 'Mozilla/5.0 (compatible; NewZeemBot/1.0; +https://newzeem.vercel.app)', accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*' } });
    const buf = await r.arrayBuffer();
    const items = r.ok ? parseFeed(new TextDecoder('utf-8').decode(buf), 'x') : [];
    const newest = items.reduce((m, x) => Math.max(m, x.when || 0), 0);
    return { status: r.status, items: items.length, newest: newest ? new Date(newest).toISOString().slice(0, 16) : '', ms: Date.now() - t0 };
  } catch (e) { return { status: 0, items: 0, error: String((e && e.name) || 'error'), ms: Date.now() - t0 }; } finally { clearTimeout(timer); }
}

module.exports = async (req, res) => {
  res.setHeader('content-type', 'application/json; charset=utf-8'); res.setHeader('cache-control', 'no-store');
  if (!memo || Date.now() - memo.at > 600e3) {
    const urls = []; TOPICS.list.forEach((t) => t.feeds.forEach((f) => { if (!urls.some((u) => u[1] === f[1])) urls.push([f[0], f[1]]); }));
    const rows = await Promise.all(urls.map(async (u) => Object.assign({ source: u[0], url: u[1] }, await probe(u[1]))));
    const topics = {}; TOPICS.list.forEach((t) => { topics[t.id] = t.feeds.map((f) => rows.find((r) => r.url === f[1])).filter((r) => r.items > 0).length + '/' + t.feeds.length; });
    memo = { at: Date.now(), body: { checked: new Date().toISOString(), working: rows.filter((r) => r.items > 0).length, total: rows.length, topics, broken: rows.filter((r) => !(r.items > 0)), all: rows } };
  }
  res.statusCode = 200; res.end(JSON.stringify(memo.body));
};
