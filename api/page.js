'use strict';
// Share pages: /p/<id> (an author's post), /n/<id> (a news story), /c/<id> (a reader's collection).
// Plain HTML with Open Graph tags, so a shared link shows a proper card in messengers and social apps.
const store = require('./_store.js');
const U = require('./_util.js');
const TOPICS = require('../topics.js');

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const topicLabel = (id) => { const t = TOPICS.byId[id]; return t ? t.e + ' ' + t.en : ''; };

function page(o) {
  const origin = 'https://' + (o.host || 'newzeem.vercel.app');
  return `<!doctype html><html lang="${esc(o.lang || 'en')}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)} · newzeem.</title><meta name="description" content="${esc(o.desc)}">
<meta property="og:type" content="article"><meta property="og:site_name" content="newzeem."><meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}"><meta property="og:image" content="${origin}/og-en.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:url" content="${origin}${esc(o.path)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(o.title)}"><meta name="twitter:description" content="${esc(o.desc)}">
<link rel="icon" href="/icon.svg" type="image/svg+xml"><style>
:root{--bg:#FFF4DC;--paper:#fff;--ink:#141414;--muted:#5d5a52;--accent:#C8321B;--line:#141414}
@media (prefers-color-scheme:dark){:root{--bg:#17140f;--paper:#211d16;--ink:#f4efe4;--muted:#b3ab9a;--line:#f4efe4}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:18px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
.w{max-width:680px;margin:0 auto;padding:22px 16px 48px}.top{display:flex;align-items:center;gap:10px;font-weight:900;font-size:22px;letter-spacing:-.04em;text-decoration:none;color:inherit}
.top b{color:var(--accent)}.card{margin-top:18px;background:var(--paper);border:2px solid var(--line);border-radius:18px;box-shadow:6px 6px 0 var(--line);padding:24px 20px}
.k{font-weight:800;font-size:14px;color:var(--muted)}h1{font-size:clamp(28px,7vw,40px);line-height:1.1;letter-spacing:-.03em;margin:8px 0 14px}
p{margin:0 0 14px}.by{font-weight:700;font-size:15px;color:var(--muted)}ul{padding-inline-start:20px}li{margin:6px 0}
a{color:var(--accent)}.cta{display:inline-block;margin-top:22px;background:var(--accent);color:#fff;text-decoration:none;font-weight:900;padding:16px 22px;border-radius:14px;border:2px solid var(--line);box-shadow:4px 4px 0 var(--line)}
.it{border-top:2px dashed color-mix(in srgb,var(--ink) 25%,transparent);padding:14px 0}.it:first-of-type{border-top:0}.it h2{font-size:20px;line-height:1.25;margin:0 0 6px}.s{font-size:14px;font-weight:700}
.f{margin-top:26px;font-size:14px;color:var(--muted)}</style></head><body><div class="w">
<a class="top" href="/"><img src="/icon.svg" width="30" height="30" alt="">newzeem<b>.</b></a>
<div class="card">${o.html}</div><a class="cta" href="${esc(o.cta)}">${esc(o.ctaText || 'Open newzeem.')}</a>
<p class="f">newzeem. Read less. Know more. Free, no ads, no sign-up.</p></div></body></html>`;
}

module.exports = async (req, res) => {
  const q = new URL(req.url, 'http://x').searchParams, type = q.get('type'), id = String(q.get('id') || '');
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || 'newzeem.vercel.app').replace(/[^a-z0-9.:-]/gi, '');
  const html = (code, body) => { res.statusCode = code; res.setHeader('content-type', 'text/html; charset=utf-8'); res.setHeader('cache-control', code === 200 ? 'public, s-maxage=600' : 'no-store'); res.end(body); };
  const missing = () => html(404, page({ host, title: 'Not found', desc: 'This link has expired or was removed.', path: '/', html: '<h1>This link has expired.</h1><p>The page was removed or is older than 30 days.</p>', cta: '/' }));
  if (!store.configured() || !/^[a-z0-9]{1,14}$/.test(id)) return missing();
  try {
    if (type === 'p') {
      const [raw] = await store.pipe([['GET', 'po:' + id]]); const p = U.json(raw);
      if (!p || p.status !== 'live') return missing();
      const paras = String(p.body).split(/\n+/).map((x) => '<p>' + esc(x) + '</p>').join('');
      const links = (p.links || []).map((u) => '<li><a href="' + esc(u) + '" rel="nofollow noopener" target="_blank">' + esc(u.replace(/^https?:\/\/(www\.)?/, '').slice(0, 60)) + '</a></li>').join('');
      return html(200, page({ host, lang: p.lang, title: p.title, desc: U.line(p.body, 180), path: '/p/' + id,
        html: '<div class="k">' + esc(topicLabel(p.topic)) + '</div><h1>' + esc(p.title) + '</h1><p class="by">' + esc(p.name) + '</p>' + paras + (links ? '<p class="k">Sources</p><ul>' + links + '</ul>' : ''),
        cta: '/?post=' + id, ctaText: 'Read more on newzeem.' }));
    }
    if (type === 'n') {
      const [raw] = await store.pipe([['GET', 'nw:' + id]]); const n = U.json(raw); if (!n) return missing();
      return html(200, page({ host, title: n.h, desc: n.g || n.s, path: '/n/' + id,
        html: '<div class="k">' + esc(topicLabel(n.t)) + '</div><h1>' + esc(n.h) + '</h1>' + (n.g ? '<p>' + esc(n.g) + '</p>' : '') + '<p class="s"><a href="' + esc(n.u) + '" rel="noopener" target="_blank">' + esc(n.s || 'Source') + ' ↗</a></p>',
        cta: '/', ctaText: 'Get your 5-minute issue' }));
    }
    if (type === 'c') {
      const [raw] = await store.pipe([['GET', 'col:' + id]]); const c = U.json(raw); if (!c) return missing();
      const items = c.items.map((x) => '<div class="it"><h2>' + esc(x.h) + '</h2>' + (x.g ? '<p>' + esc(x.g) + '</p>' : '') + '<a class="s" href="' + esc(x.u) + '" rel="noopener" target="_blank">' + esc(x.s || 'Source') + ' ↗</a></div>').join('');
      const title = c.title || 'My picks for today';
      return html(200, page({ host, title, desc: c.items.length + ' stories picked' + (c.by ? ' by ' + c.by : '') + ': ' + c.items.map((x) => x.h).slice(0, 2).join(' · '), path: '/c/' + id,
        html: '<div class="k">' + esc(c.by ? 'Picked by ' + c.by : 'A reader picked these') + '</div><h1>' + esc(title) + '</h1>' + items, cta: '/', ctaText: 'Make your own issue' }));
    }
    return missing();
  } catch (e) { console.error('page error:', e && e.message); return missing(); }
};
