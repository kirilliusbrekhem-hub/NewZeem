'use strict';
// AI provider layer for NewZeem. Set one or more keys in the environment:
//   GEMINI_API_KEY, GROQ_API_KEY (free tiers; models tried in turn, see below), OPENAI_API_KEY, ANTHROPIC_API_KEY.
//   With several keys the first one is used and the next takes over when it is busy or out of quota.
//   AI_PROVIDER puts one first. *_HOST / *_MODEL variables override defaults (tests use them).
// With no key the site still works: the digest falls back to headlines and descriptions from the sources.

function providers() {
  const has = { gemini: !!process.env.GEMINI_API_KEY, groq: !!process.env.GROQ_API_KEY, anthropic: !!process.env.ANTHROPIC_API_KEY, openai: !!process.env.OPENAI_API_KEY };
  const list = ['gemini', 'groq', 'anthropic', 'openai'].filter((p) => has[p]);
  const want = String(process.env.AI_PROVIDER || '').toLowerCase();
  return has[want] ? [want].concat(list.filter((p) => p !== want)) : list;
}
const provider = () => providers()[0] || null;
const configured = () => providers().length > 0;

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

// Free tiers limit each model separately (tokens per minute and per day), and models get retired: try them in turn,
// skip one for a while after it says "busy", and remember the one that works.
const cool = {};
async function viaModels(list, call) {
  const now = Date.now();
  const ready = list.filter((m) => !(cool[m] > now));
  let last;
  for (const model of (ready.length ? ready : list)) {
    try { return await call(model); } catch (e) {
      last = e; const msg = String(e.message);
      if (/upstream 429/.test(msg)) { cool[model] = Date.now() + (/per day|TPD/i.test(msg) ? 20 * 60e3 : 45e3); continue; }
      if (/upstream (404|400|5\d\d)|cut off|empty answer/.test(msg)) continue;
      throw e;
    }
  }
  throw last;
}
const uniq = (l) => l.filter((m, i, x) => m && x.indexOf(m) === i);

let groqModel = null;
function groqChat(system, user, temperature, maxTokens) {
  return viaModels(uniq([groqModel, process.env.GROQ_MODEL, 'openai/gpt-oss-120b', 'llama-3.3-70b-versatile', 'openai/gpt-oss-20b', 'llama-3.1-8b-instant']), async (model) => {
    const reasoning = /gpt-oss/.test(model);
    const payload = { model, temperature, max_tokens: maxTokens + (reasoning ? 700 : 0), messages: [{ role: 'system', content: system }, { role: 'user', content: user }] };
    if (reasoning) payload.reasoning_effort = 'low';
    const d = await jfetch((process.env.GROQ_HOST || 'https://api.groq.com/openai') + '/v1/chat/completions', { method: 'POST', body: JSON.stringify(payload) }, { authorization: 'Bearer ' + process.env.GROQ_API_KEY });
    const t = chatText(d); groqModel = model; return t;
  });
}

let geminiModel = null;
function geminiChat(system, user, temperature, maxTokens) {
  return viaModels(uniq([geminiModel, process.env.GEMINI_MODEL, 'gemini-2.5-flash-lite', 'gemini-2.5-flash']), async (model) => {
    const d = await jfetch((process.env.GEMINI_HOST || 'https://generativelanguage.googleapis.com') + '/v1beta/models/' + model + ':generateContent', {
      method: 'POST', body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] }, contents: [{ role: 'user', parts: [{ text: user }] }],
        generationConfig: { temperature, maxOutputTokens: maxTokens, responseMimeType: 'application/json', thinkingConfig: { thinkingBudget: 0 } }
      })
    }, { 'x-goog-api-key': process.env.GEMINI_API_KEY });
    const c = d && d.candidates && d.candidates[0];
    const t = c && c.content && Array.isArray(c.content.parts) ? c.content.parts.map((x) => x.text || '').join('') : '';
    if (!t) throw bad('empty answer');
    if (c.finishReason === 'MAX_TOKENS') throw bad('cut off: answer hit the token limit');
    geminiModel = model; return t;
  });
}

async function one(p, system, user, temperature, maxTokens) {
  if (p === 'gemini') return geminiChat(system, user, temperature, maxTokens);
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

async function gpt(system, user, o) {
  const temperature = o && o.temperature != null ? o.temperature : 0.3, maxTokens = (o && o.maxTokens) || 1800;
  const ps = providers();
  if (!ps.length) { const e = new Error('config'); e.code = 'config'; throw e; }
  let last;
  for (const p of ps) { try { return await one(p, system, user, temperature, maxTokens); } catch (e) { last = e; } } // next provider takes over
  throw last;
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
    } catch (e) { last = e; if (e.code === 'auth' || e.code === 'config') break; }
  }
  throw last;
}

module.exports = { provider, configured, askJson, gpt, parseJson };
