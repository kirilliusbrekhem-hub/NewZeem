'use strict';
// AI provider layer for NewZeem. Set ONE key in the environment:
//   GROQ_API_KEY (free tier; models tried in order, see below), OPENAI_API_KEY, ANTHROPIC_API_KEY.
//   AI_PROVIDER forces a choice when several are set. *_HOST / *_MODEL variables override defaults (tests use them).
// With no key the site still works: the digest falls back to headlines and descriptions from the sources.

function provider() {
  const has = { groq: !!process.env.GROQ_API_KEY, anthropic: !!process.env.ANTHROPIC_API_KEY, openai: !!process.env.OPENAI_API_KEY };
  const want = String(process.env.AI_PROVIDER || '').toLowerCase();
  if (has[want]) return want;
  return ['groq', 'anthropic', 'openai'].find((p) => has[p]) || null;
}
const configured = () => !!provider();

async function jfetch(url, init, headers) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 40000);
  try {
    const r = await fetch(url, Object.assign({ signal: ac.signal }, init, { headers: Object.assign({ 'content-type': 'application/json' }, headers) }));
    const text = await r.text();
    let data = null;
    try { data = JSON.parse(text); } catch (e) { /* keep null */ }
    if (!r.ok) {
      const e = new Error('upstream ' + r.status + ': ' + text.slice(0, 200));
      e.code = r.status === 401 || r.status === 403 ? 'auth' : r.status === 429 ? 'busy' : 'upstream';
      throw e;
    }
    return data;
  } catch (e) { if (!e.code) e.code = 'upstream'; throw e; } finally { clearTimeout(timer); }
}
const bad = (m) => { const e = new Error(m); e.code = 'upstream'; return e; };

function chatText(d) {
  const ch = d && d.choices && d.choices[0];
  const t = ch && ch.message && ch.message.content;
  if (!t) throw bad('empty answer');
  if (ch.finish_reason === 'length') throw bad('cut off: answer hit the token limit');
  return String(t);
}

// Groq retires models and a key may lack access to some: try known ones in turn and remember the one that works.
let groqModel = null;
async function groqChat(system, user, temperature, maxTokens) {
  const list = [groqModel, process.env.GROQ_MODEL, 'openai/gpt-oss-120b', 'llama-3.3-70b-versatile', 'openai/gpt-oss-20b', 'llama-3.1-8b-instant']
    .filter((m, i, a) => m && a.indexOf(m) === i);
  let last;
  for (const model of list) {
    const reasoning = /gpt-oss/.test(model);
    const payload = { model, temperature, max_tokens: maxTokens + (reasoning ? 1500 : 0), messages: [{ role: 'system', content: system }, { role: 'user', content: user }] };
    if (reasoning) payload.reasoning_effort = 'low';
    try {
      const d = await jfetch((process.env.GROQ_HOST || 'https://api.groq.com/openai') + '/v1/chat/completions', { method: 'POST', body: JSON.stringify(payload) }, { authorization: 'Bearer ' + process.env.GROQ_API_KEY });
      const t = chatText(d); groqModel = model; return t;
    } catch (e) { last = e; if (!/upstream (404|400)/.test(String(e.message))) throw e; }
  }
  throw last;
}

async function gpt(system, user, o) {
  const p = provider();
  const temperature = o && o.temperature != null ? o.temperature : 0.3, maxTokens = (o && o.maxTokens) || 1800;
  if (!p) { const e = new Error('config'); e.code = 'config'; throw e; }
  if (p === 'groq') return groqChat(system, user, temperature, maxTokens);
  if (p === 'openai') {
    return chatText(await jfetch((process.env.OPENAI_HOST || 'https://api.openai.com') + '/v1/chat/completions', {
      method: 'POST', body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4o-mini', max_tokens: maxTokens, temperature, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] })
    }, { authorization: 'Bearer ' + process.env.OPENAI_API_KEY }));
  }
  const d = await jfetch((process.env.ANTHROPIC_HOST || 'https://api.anthropic.com') + '/v1/messages', {
    method: 'POST', body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5', max_tokens: maxTokens, temperature: Math.min(1, temperature), system, messages: [{ role: 'user', content: user }] })
  }, { 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' });
  const t = d && Array.isArray(d.content) ? d.content.filter((x) => x && x.type === 'text').map((x) => x.text).join('') : '';
  if (!t) throw bad('empty answer');
  return t;
}

function parseJson(text) {
  let s = String(text).trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const a = s.indexOf('{'), b = s.lastIndexOf('}');
  if (a < 0 || b <= a) throw new Error('no json');
  s = s.slice(a, b + 1);
  try { return JSON.parse(s); } catch (e) { return JSON.parse(s.replace(/,\s*([}\]])/g, '$1')); }
}

async function askJson(system, user, opts) {
  const sys = system + '\nReturn ONLY one valid JSON object. No markdown, no comments, no text outside JSON.';
  let last;
  for (let i = 0; i < 2; i++) {
    try {
      const txt = await gpt(i ? sys + '\nYour previous answer was not valid JSON. Fix it.' : sys, user, opts);
      try { return parseJson(txt); } catch (pe) { pe.message = 'bad json: ' + String(txt).replace(/\s+/g, ' ').slice(0, 70); throw pe; }
    } catch (e) { last = e; if (e.code === 'auth' || e.code === 'config' || e.code === 'busy') break; }
  }
  throw last;
}

module.exports = { provider, configured, askJson, gpt, parseJson };
