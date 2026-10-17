'use strict';
// Reactions: "How do you feel about it?" under every story. Five fixed reactions, counted anonymously in Upstash Redis.
//   GET  /api/react                -> { on, cc }                  (is the feature on, and the reader's country)
//   GET  /api/react?ids=a,b,c      -> { on, cc, s: { id: {n, t[5], c:{n, t[5]}, k} } }
//   POST /api/react {id, r, d}     -> same shape for that story; counts one reaction per device and story
// No text from readers is ever stored, so there is nothing to moderate. The device id is a random string kept on the
// reader's device and only used to count each story once. Votes also have a per-IP cap per story and per day.
const crypto = require('crypto');
const store = require('./_store.js');

const TTL = 4 * 86400;              // stories are fresh for about 3 days
const PER_IP_PER_STORY = 3;         // a family, an office or a mobile network may share one address
const PER_IP_PER_DAY = 400;
const idOk = (s) => /^[a-z0-9]{1,12}$/.test(String(s));
const country = (req) => { const c = String(req.headers['x-vercel-ip-country'] || '').toUpperCase(); return /^[A-Z]{2}$/.test(c) ? c : 'XX'; };
const { ipHash } = require('./_util.js');

function fold(x) {
  if (Array.isArray(x)) { const o = {}; for (let i = 0; i + 1 < x.length; i += 2) o[x[i]] = Number(x[i + 1]) || 0; return o; }
  return x && typeof x === 'object' ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, Number(v) || 0])) : {};
}
const sum = (a) => a.reduce((p, q) => p + q, 0);
function shape(tot, cty, cc) {
  const t = [0, 1, 2, 3, 4].map((i) => tot[i] || 0), ct = [0, 1, 2, 3, 4].map((i) => cty[cc + ':' + i] || 0);
  return { n: sum(t), t, c: { n: sum(ct), t: ct }, k: new Set(Object.keys(cty).map((k) => k.split(':')[0])).size };
}
async function counts(ids, cc) {
  const cmds = []; ids.forEach((id) => { cmds.push(['HGETALL', 'rx:' + id], ['HGETALL', 'rc:' + id]); });
  const r = await store.pipe(cmds), s = {};
  ids.forEach((id, i) => { s[id] = shape(fold(r[i * 2]), fold(r[i * 2 + 1]), cc); });
  return s;
}
async function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let raw = ''; for await (const c of req) { raw += c; if (raw.length > 2000) break; }
  try { return JSON.parse(raw || '{}'); } catch (e) { return {}; }
}

module.exports = async (req, res) => {
  const send = (code, b) => { res.statusCode = code; res.setHeader('content-type', 'application/json; charset=utf-8'); res.setHeader('cache-control', 'no-store'); res.end(JSON.stringify(b)); };
  const cc = country(req);
  if (!store.configured()) return send(req.method === 'GET' ? 200 : 503, { on: false, cc });
  try {
    if (req.method === 'GET') {
      if (new URL(req.url, 'http://x').searchParams.get('check')) { // /api/react?check=1 : can this site WRITE to the store? (a read-only token or a wrong address shows up here)
        const [w, r] = await store.pipe([['SET', 'nz:check', '1', 'EX', '60'], ['GET', 'nz:check']]);
        return send(200, { on: true, write: w === 'OK', read: r === '1' });
      }
      const ids = String(new URL(req.url, 'http://x').searchParams.get('ids') || '').split(',').filter(idOk).slice(0, 12);
      return send(200, ids.length ? { on: true, cc, s: await counts(ids, cc) } : { on: true, cc });
    }
    if (req.method !== 'POST') return send(405, { error: 'method' });
    const b = await body(req), id = String(b.id || ''), r = Math.floor(Number(b.r)), d = String(b.d || '');
    if (!idOk(id) || !(r >= 0 && r <= 4) || !/^[\w-]{8,40}$/.test(d)) return send(400, { error: 'input' });
    const ip = ipHash(req), day = new Date().toISOString().slice(0, 10);
    const [fresh, perStory, , perDay] = await store.pipe([
      ['SET', 'seen:' + id + ':' + d, '1', 'NX', 'EX', String(TTL)],
      ['INCR', 'ipc:' + id + ':' + ip], ['EXPIRE', 'ipc:' + id + ':' + ip, String(TTL)],
      ['INCR', 'rl:' + day + ':' + ip], ['EXPIRE', 'rl:' + day + ':' + ip, '86400']
    ]);
    const allowed = fresh === 'OK' && perStory <= PER_IP_PER_STORY && perDay <= PER_IP_PER_DAY;
    if (allowed && b.h && /^https?:\/\//.test(String(b.u || '')) && String(b.u).length < 400) { // remember the story for "top news today"
      const nw = { h: String(b.h).replace(/\s+/g, ' ').slice(0, 140), g: String(b.g || '').replace(/\s+/g, ' ').slice(0, 300), u: String(b.u), s: String(b.s || '').slice(0, 40), t: String(b.t || '').slice(0, 16) };
      const lg = /^[a-z]{2}$/.test(String(b.l || '')) ? b.l : 'en';
      await store.pipe([['SET', 'nw:' + id + ':' + lg, JSON.stringify(nw), 'NX', 'EX', String(4 * 86400)], ['ZINCRBY', 'top:news:' + day, '1', id], ['EXPIRE', 'top:news:' + day, String(3 * 86400)]]);
    }
    if (allowed) await store.pipe([['HINCRBY', 'rx:' + id, String(r), '1'], ['HINCRBY', 'rc:' + id, cc + ':' + r, '1'], ['EXPIRE', 'rx:' + id, String(TTL)], ['EXPIRE', 'rc:' + id, String(TTL)]]);
    return send(200, { on: true, cc, ok: allowed, s: await counts([id], cc) });
  } catch (e) {
    console.error('react error:', e && e.message);
    return send(502, { error: 'store', why: String((e && e.message) || '').slice(0, 160) }); // the store's own message (e.g. NOPERM for a read-only token); it never contains the token
  }
};
module.exports._test = { fold, shape };
