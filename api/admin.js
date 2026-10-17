'use strict';
// The owner's admin API. Locked by the ADMIN_TOKEN environment variable (set it in Vercel; at least 12 characters).
// Without the variable every request is refused. Wrong passwords are limited per address.
//   GET  ?a=stats | queue | posts | authors | chat
//   POST ?a=approve {id} | reject {id,reason} | unpublish {id,reason} | ban {aid} | unban {aid} | hide {id} | keep {id}
const crypto = require('crypto');
const store = require('./_store.js');
const U = require('./_util.js');
const P = store.pipe;

const fold = (x) => { const o = {}; if (Array.isArray(x)) for (let i = 0; i + 1 < x.length; i += 2) o[x[i]] = Number(x[i + 1]) || 0; return o; };
function same(a, b) { const x = crypto.createHash('sha256').update(String(a)).digest(), y = crypto.createHash('sha256').update(String(b)).digest(); return crypto.timingSafeEqual(x, y); }

async function full(ids) {
  if (!ids.length) return [];
  const r = await P(ids.map((id) => ['GET', 'po:' + id]).concat(ids.map((id) => ['HGETALL', 'pst:' + id])));
  return ids.map((id, i) => { const p = U.json(r[i]); if (!p) return null; const st = fold(r[ids.length + i]); return Object.assign(p, { useful: st.u || 0, views: st.v || 0 }); }).filter(Boolean);
}
async function authors(aids) {
  if (!aids.length) return [];
  const r = await P(aids.map((a) => ['GET', 'au:' + a]).concat(aids.map((a) => ['HGETALL', 'aus:' + a])));
  return aids.map((a, i) => { const au = U.json(r[i]); if (!au) return null; const st = fold(r[aids.length + i]); return Object.assign(au, { rep: st.rep || 0, np: st.np || 0, nr: st.nr || 0, nu: st.nu || 0 }); }).filter(Boolean);
}
async function notify(aid, n) { await P([['LPUSH', 'nt:' + aid, JSON.stringify(Object.assign({ at: Date.now() }, n))], ['LTRIM', 'nt:' + aid, '0', '49']]); }
async function setStatus(p, status, reason) { p.status = status; p.reason = reason || ''; p.mod = Date.now(); await P([['SET', 'po:' + p.id, JSON.stringify(p)]]); }

const GET = {
  async stats() {
    const d = U.day();
    const [pend, live, au, chat, rep, pv, tn] = await P([['ZCARD', 'q:pending'], ['ZCARD', 'po:live'], ['ZCARD', 'top:au'], ['LLEN', 'chat'], ['SCARD', 'chat:rep'], ['HGETALL', 'pv:' + d], ['ZCARD', 'top:news:' + d]]);
    const v = fold(pv);
    return { pending: pend || 0, live: live || 0, authors: au || 0, chat: chat || 0, reported: rep || 0, votesToday: (v.y || 0) + (v.n || 0), newsReactedToday: tn || 0, ai: !!(process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY) };
  },
  async visits() {
    const days = []; for (let i = 13; i >= 0; i--) days.push(new Date(Date.now() - i * 864e5).toISOString().slice(0, 10));
    const r = await P(days.map((d) => ['HGETALL', 'st:' + d]).concat(days.slice(-7).map((d) => ['HGETALL', 'st:' + d + ':l'])).concat(days.slice(-7).map((d) => ['HGETALL', 'st:' + d + ':c'])));
    const sum = (list) => { const o = {}; list.forEach((x) => { const f = fold(x); Object.keys(f).forEach((k) => { o[k] = (o[k] || 0) + f[k]; }); }); return o; };
    return { days: days.map((d, i) => Object.assign({ day: d }, fold(r[i]))), langs: sum(r.slice(14, 21)), countries: sum(r.slice(21, 28)) };
  },
  async queue() { const [ids] = await P([['ZRANGE', 'q:pending', '0', '49']]); const ps = await full(ids || []); const au = await authors([...new Set(ps.map((p) => p.aid))]); return { posts: ps, authors: au }; },
  async posts() { const [ids] = await P([['ZREVRANGE', 'po:live', '0', '99']]); return { posts: await full(ids || []) }; },
  async authors() { const [ids] = await P([['ZREVRANGE', 'top:au', '0', '199']]); return { authors: await authors(ids || []) }; },
  async chat() {
    const [msgs, hid, rep] = await P([['LRANGE', 'chat', '0', '199'], ['SMEMBERS', 'chat:hid'], ['SMEMBERS', 'chat:rep']]);
    const ids = rep || [], counts = ids.length ? await P(ids.map((id) => ['GET', 'crp:' + id])) : [];
    const rc = {}; ids.forEach((id, i) => { rc[id] = Number(counts[i]) || 0; });
    return { msgs: (msgs || []).map(U.json).filter(Boolean), hidden: hid || [], reports: rc };
  }
};
const POST = {
  async approve(b) {
    const [p] = await full([String(b.id || '')]); if (!p || p.status !== 'pending') return [404, { error: 'missing' }];
    await setStatus(p, 'live');
    const now = String(Date.now());
    await P([['ZREM', 'q:pending', p.id], ['ZADD', 'po:live', now, p.id], ['ZADD', 'po:t:' + p.topic, now, p.id], ['ZINCRBY', 'top:posts', '0', p.id],
      ['HINCRBY', 'aus:' + p.aid, 'rep', '5'], ['HINCRBY', 'aus:' + p.aid, 'np', '1'], ['ZINCRBY', 'top:au', '5', p.aid]]);
    await notify(p.aid, { k: 'ok', id: p.id, title: p.title });
    return { ok: true };
  },
  async reject(b) {
    const [p] = await full([String(b.id || '')]); if (!p || p.status !== 'pending') return [404, { error: 'missing' }];
    const reason = U.line(b.reason, 300);
    await setStatus(p, 'rejected', reason);
    await P([['ZREM', 'q:pending', p.id], ['HINCRBY', 'aus:' + p.aid, 'rep', '-3'], ['HINCRBY', 'aus:' + p.aid, 'nr', '1'], ['ZINCRBY', 'top:au', '-3', p.aid]]);
    await notify(p.aid, { k: 'no', id: p.id, title: p.title, reason });
    return { ok: true };
  },
  async unpublish(b) {
    const [p] = await full([String(b.id || '')]); if (!p || p.status !== 'live') return [404, { error: 'missing' }];
    const reason = U.line(b.reason, 300);
    await setStatus(p, 'rejected', reason);
    await P([['ZREM', 'po:live', p.id], ['ZREM', 'po:t:' + p.topic, p.id], ['ZREM', 'top:posts', p.id]]);
    await notify(p.aid, { k: 'off', id: p.id, title: p.title, reason });
    return { ok: true };
  },
  async ban(b) { const [au] = await authors([String(b.aid || '')]); if (!au) return [404, { error: 'missing' }]; au.ban = true; await P([['SET', 'au:' + au.id, JSON.stringify({ id: au.id, name: au.name, bio: au.bio, at: au.at, ban: true })]]); return { ok: true }; },
  async unban(b) { const [au] = await authors([String(b.aid || '')]); if (!au) return [404, { error: 'missing' }]; await P([['SET', 'au:' + au.id, JSON.stringify({ id: au.id, name: au.name, bio: au.bio, at: au.at })]]); return { ok: true }; },
  async hide(b) { const id = String(b.id || ''); await P([['SADD', 'chat:hid', id], ['SREM', 'chat:rep', id]]); return { ok: true }; },
  async keep(b) { const id = String(b.id || ''); await P([['SREM', 'chat:hid', id], ['SREM', 'chat:rep', id], ['DEL', 'crp:' + id]]); return { ok: true }; }
};

module.exports = async (req, res) => {
  const token = process.env.ADMIN_TOKEN || '';
  if (token.length < 12) return U.send(res, 503, { error: 'locked', message: 'Set ADMIN_TOKEN (12+ characters) in Vercel to open the admin.' });
  if (!store.configured()) return U.send(res, 503, { error: 'store' });
  const ip = U.ipHash(req), fk = 'adf:' + ip;
  try {
    const [fails] = await P([['GET', fk]]);
    if (Number(fails) >= 10) return U.send(res, 429, { error: 'wait' });
    if (!same(req.headers['x-admin'] || '', token)) { await P([['INCR', fk], ['EXPIRE', fk, '900']]); return U.send(res, 401, { error: 'password' }); }
    const a = new URL(req.url, 'http://x').searchParams.get('a') || '';
    let out;
    if (req.method === 'GET' && GET[a]) out = await GET[a]();
    else if (req.method === 'POST' && POST[a]) out = await POST[a](await U.body(req));
    else return U.send(res, 400, { error: 'action' });
    if (Array.isArray(out)) return U.send(res, out[0], out[1]);
    return U.send(res, 200, out);
  } catch (e) {
    console.error('admin error:', e && e.message);
    return U.send(res, 502, { error: 'store', why: String((e && e.message) || '').slice(0, 160) });
  }
};
