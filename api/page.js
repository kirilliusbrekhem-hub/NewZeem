'use strict';
// Share pages: /p/<id> (an author's post), /n/<id> (a news story), /c/<id> (a reader's collection).
// Plain HTML with Open Graph tags, so a shared link shows a proper card in messengers and social apps.
const store = require('./_store.js');
const U = require('./_util.js');
const TOPICS = require('../topics.js');

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const topicLabel = (id, lg) => { const t = TOPICS.byId[id]; return t ? (t[lg] || t.en) : ''; };
// The few words on these pages, in the visitor's language (from the browser's Accept-Language; a post page follows the post).
const W = {
  en: { gone: 'This link has expired.', goneP: 'The page was removed or is older than 30 days.', nf: 'Not found', open: 'Open newzeem.', more: 'Read more on newzeem.', src: 'Sources', source: 'Source', get: 'Get your 5-minute issue', picks: 'My picks for today', picked: '{n} stories picked', by: 'Picked by {a}', reader: 'A reader picked these', own: 'Make your own issue', foot: 'Read less. Know more. Free, no ads, no sign-up.' },
  ru: { gone: 'Ссылка устарела.', goneP: 'Страницу удалили, или ей больше 30 дней.', nf: 'Не найдено', open: 'Открыть newzeem.', more: 'Читать на newzeem.', src: 'Источники', source: 'Источник', get: 'Собрать свой выпуск на 5 минут', picks: 'Моя подборка на день', picked: 'Историй в подборке: {n}', by: 'Подборка от {a}', reader: 'Подборка читателя', own: 'Собрать свой выпуск', foot: 'Read less. Know more. Бесплатно, без рекламы и регистрации.' },
  es: { gone: 'Este enlace ha caducado.', goneP: 'La página se eliminó o tiene más de 30 días.', nf: 'No encontrado', open: 'Abrir newzeem.', more: 'Leer en newzeem.', src: 'Fuentes', source: 'Fuente', get: 'Crea tu edición de 5 minutos', picks: 'Mi selección de hoy', picked: '{n} noticias elegidas', by: 'Selección de {a}', reader: 'Selección de un lector', own: 'Crea tu propia edición', foot: 'Read less. Know more. Gratis, sin anuncios y sin registro.' },
  pt: { gone: 'Este link expirou.', goneP: 'A página foi removida ou tem mais de 30 dias.', nf: 'Não encontrado', open: 'Abrir newzeem.', more: 'Ler no newzeem.', src: 'Fontes', source: 'Fonte', get: 'Monte sua edição de 5 minutos', picks: 'Minha seleção do dia', picked: '{n} notícias escolhidas', by: 'Seleção de {a}', reader: 'Seleção de um leitor', own: 'Monte sua própria edição', foot: 'Read less. Know more. Grátis, sem anúncios e sem cadastro.' },
  fr: { gone: 'Ce lien a expiré.', goneP: 'La page a été supprimée ou date de plus de 30 jours.', nf: 'Introuvable', open: 'Ouvrir newzeem.', more: 'Lire sur newzeem.', src: 'Sources', source: 'Source', get: 'Votre numéro de 5 minutes', picks: 'Ma sélection du jour', picked: '{n} articles choisis', by: 'Sélection de {a}', reader: 'La sélection d’un lecteur', own: 'Créez votre numéro', foot: 'Read less. Know more. Gratuit, sans pub, sans inscription.' },
  de: { gone: 'Dieser Link ist abgelaufen.', goneP: 'Die Seite wurde entfernt oder ist älter als 30 Tage.', nf: 'Nicht gefunden', open: 'newzeem öffnen.', more: 'Auf newzeem lesen.', src: 'Quellen', source: 'Quelle', get: 'Deine 5-Minuten-Ausgabe', picks: 'Meine Auswahl für heute', picked: '{n} Meldungen ausgewählt', by: 'Auswahl von {a}', reader: 'Die Auswahl eines Lesers', own: 'Eigene Ausgabe erstellen', foot: 'Read less. Know more. Kostenlos, ohne Werbung und Anmeldung.' },
  hi: { gone: 'यह लिंक पुराना हो गया है।', goneP: 'पेज हटा दिया गया है या 30 दिन से पुराना है।', nf: 'नहीं मिला', open: 'newzeem खोलें।', more: 'newzeem पर पढ़ें।', src: 'स्रोत', source: 'स्रोत', get: 'अपना 5 मिनट का अंक पाएँ', picks: 'आज का मेरा चयन', picked: '{n} ख़बरें चुनी गईं', by: '{a} का चयन', reader: 'एक पाठक का चयन', own: 'अपना अंक बनाएँ', foot: 'Read less. Know more. मुफ़्त, बिना विज्ञापन, बिना साइन-अप।' },
  zh: { gone: '该链接已失效。', goneP: '页面已被删除或已超过 30 天。', nf: '未找到', open: '打开 newzeem.', more: '在 newzeem 上阅读。', src: '来源', source: '来源', get: '获取你的 5 分钟新闻', picks: '我的今日精选', picked: '精选了 {n} 条新闻', by: '{a} 的精选', reader: '一位读者的精选', own: '生成你自己的今日内容', foot: 'Read less. Know more. 免费、无广告、无需注册。' },
  ar: { gone: 'انتهت صلاحية هذا الرابط.', goneP: 'حُذفت الصفحة أو مرّ عليها أكثر من 30 يومًا.', nf: 'غير موجود', open: 'افتح newzeem.', more: 'اقرأ على newzeem.', src: 'المصادر', source: 'المصدر', get: 'احصل على عددك في 5 دقائق', picks: 'اختياراتي لليوم', picked: 'اختيرت {n} أخبار', by: 'اختيارات {a}', reader: 'اختيارات أحد القرّاء', own: 'اصنع عددك', foot: 'Read less. Know more. مجاني، بلا إعلانات ولا تسجيل.' }
};
function langOf(req) {
  const al = String(req.headers['accept-language'] || '').toLowerCase().split(',').map((x) => x.trim().slice(0, 2));
  return al.find((l) => W[l]) || 'en';
}

function page(o) {
  const origin = 'https://' + (o.host || 'newzeem.vercel.app');
  const w = W[o.lang] || W.en;
  return `<!doctype html><html lang="${esc(o.lang || 'en')}" dir="${o.lang === 'ar' ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
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
<div class="card">${o.html}</div><a class="cta" href="${esc(o.cta)}">${esc(o.ctaText || w.open)}</a>
<p class="f">newzeem. ${esc(w.foot)}</p></div></body></html>`;
}

module.exports = async (req, res) => {
  const q = new URL(req.url, 'http://x').searchParams, type = q.get('type'), id = String(q.get('id') || '');
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || 'newzeem.vercel.app').replace(/[^a-z0-9.:-]/gi, '');
  const html = (code, body) => { res.statusCode = code; res.setHeader('content-type', 'text/html; charset=utf-8'); res.setHeader('cache-control', code === 200 ? 'public, s-maxage=600' : 'no-store'); res.end(body); };
  let lg = langOf(req), w = W[lg];
  const missing = () => html(404, page({ host, lang: lg, title: w.nf, desc: w.goneP, path: '/', html: '<h1>' + esc(w.gone) + '</h1><p>' + esc(w.goneP) + '</p>', cta: '/' }));
  if (!store.configured() || !/^[a-z0-9]{1,14}$/.test(id)) return missing();
  try {
    if (type === 'p') {
      const [raw] = await store.pipe([['GET', 'po:' + id]]); const p = U.json(raw);
      if (!p || p.status !== 'live') return missing();
      if (W[p.lang]) { lg = p.lang; w = W[lg]; }
      const paras = String(p.body).split(/\n+/).map((x) => '<p>' + esc(x) + '</p>').join('');
      const links = (p.links || []).map((u) => '<li><a href="' + esc(u) + '" rel="nofollow noopener" target="_blank">' + esc(u.replace(/^https?:\/\/(www\.)?/, '').slice(0, 60)) + '</a></li>').join('');
      return html(200, page({ host, lang: lg, title: p.title, desc: U.line(p.body, 180), path: '/p/' + id,
        html: '<div class="k">' + esc(topicLabel(p.topic, lg)) + '</div><h1>' + esc(p.title) + '</h1><p class="by">' + esc(p.name) + '</p>' + paras + (links ? '<p class="k">' + esc(w.src) + '</p><ul>' + links + '</ul>' : ''),
        cta: '/?post=' + id, ctaText: w.more }));
    }
    if (type === 'n') {
      const [raw] = await store.pipe([['GET', 'nw:' + id]]); const n = U.json(raw); if (!n) return missing();
      return html(200, page({ host, lang: lg, title: n.h, desc: n.g || n.s, path: '/n/' + id,
        html: '<div class="k">' + esc(topicLabel(n.t, lg)) + '</div><h1>' + esc(n.h) + '</h1>' + (n.g ? '<p>' + esc(n.g) + '</p>' : '') + '<p class="s"><a href="' + esc(n.u) + '" rel="noopener" target="_blank">' + esc(n.s || w.source) + ' ↗</a></p>',
        cta: '/', ctaText: w.get }));
    }
    if (type === 'c') {
      const [raw] = await store.pipe([['GET', 'col:' + id]]); const c = U.json(raw); if (!c) return missing();
      const items = c.items.map((x) => '<div class="it"><h2>' + esc(x.h) + '</h2>' + (x.g ? '<p>' + esc(x.g) + '</p>' : '') + '<a class="s" href="' + esc(x.u) + '" rel="noopener" target="_blank">' + esc(x.s || w.source) + ' ↗</a></div>').join('');
      const title = c.title || w.picks;
      return html(200, page({ host, lang: lg, title, desc: w.picked.replace('{n}', c.items.length) + ': ' + c.items.map((x) => x.h).slice(0, 2).join(' · '), path: '/c/' + id,
        html: '<div class="k">' + esc(c.by ? w.by.replace('{a}', c.by) : w.reader) + '</div><h1>' + esc(title) + '</h1>' + items, cta: '/', ctaText: w.own }));
    }
    return missing();
  } catch (e) { console.error('page error:', e && e.message); return missing(); }
};
