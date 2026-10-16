'use strict';
// Small helpers shared by the community endpoints.
const crypto = require('crypto');

function send(res, code, body, cache) {
  res.statusCode = code;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', cache || 'no-store');
  res.end(JSON.stringify(body));
}
async function body(req, max) {
  if (req.body && typeof req.body === 'object') return req.body;
  let raw = ''; for await (const c of req) { raw += c; if (raw.length > (max || 20000)) break; }
  try { return JSON.parse(raw || '{}'); } catch (e) { return {}; }
}
const sha = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');
const ipHash = (req) => sha(String(req.headers['x-forwarded-for'] || (req.socket && req.socket.remoteAddress) || '').split(',')[0].trim() + ':nz').slice(0, 16);
const country = (req) => { const c = String(req.headers['x-vercel-ip-country'] || '').toUpperCase(); return /^[A-Z]{2}$/.test(c) ? c : 'XX'; };
// One line of plain text: no control characters, collapsed spaces, cut to n characters.
const line = (s, n) => { s = String(s == null ? '' : s).replace(/[\u0000-\u001F\u007F​-‏‪-‮]/g, ' ').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n).trim() : s; };
// Several paragraphs of plain text: keeps line breaks (at most one empty line in a row).
const text = (s, n) => { s = String(s == null ? '' : s).replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000B-\u001F\u007F​-‏‪-‮]/g, ' ').replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim(); return s.length > n ? s.slice(0, n).trim() : s; };
const json = (s) => { if (s == null) return null; if (typeof s === 'object') return s; try { return JSON.parse(s); } catch (e) { return null; } };
const rid = (n) => crypto.randomBytes(n || 6).toString('base64').replace(/[+/=]/g, '').toLowerCase().slice(0, (n || 6) + 2).replace(/[^a-z0-9]/g, 'x');
const urlOk = (u) => { try { const x = new URL(String(u)); return (x.protocol === 'https:' || x.protocol === 'http:') && String(u).length <= 400 && !/^(localhost|127\.|10\.|192\.168\.)/.test(x.hostname); } catch (e) { return false; } };
const day = () => new Date().toISOString().slice(0, 10);

module.exports = { send, body, sha, ipHash, country, line, text, json, rid, urlOk, day };
