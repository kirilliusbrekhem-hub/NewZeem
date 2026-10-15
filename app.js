/* NewZeem: a free daily paper that fits your topics into five minutes. No accounts. State lives in this browser only. */
(function () {
  'use strict';
  var TP = window.NZ_TOPICS;
  var BUDGET = TP.BUDGET_SEC, MAX_TOPICS = 8, DEFAULTS = ['world', 'tech', 'business'];

  var D = {
    ru: {
      title: 'NewZeem: ваши новости за 5 минут', topics: 'Темы', other: 'EN',
      heroH: 'Газета на 5 минут. Только то, что важно вам.', heroP: 'Выберите темы, и мы соберём выпуск, который читается за пять минут. Ленты без дна здесь нет.',
      p1: 'Бесплатно', p2: 'Без рекламы', p3: 'Без регистрации', pickH: 'Что вам интересно?', pickN: 'Выбрано: {n} из {m}', build: 'Собрать выпуск', save: 'Сохранить темы',
      pickHint: 'Выбор хранится только на этом устройстве.', max: 'Можно выбрать не больше {m} тем',
      issue: 'Ваш выпуск', meta: '{n} историй, около {m} мин чтения', main: 'Главное', loading: 'Собираю выпуск: {n} из {m}', why: 'Почему это важно:',
      read: 'Читать у источника: {s}', left: 'осталось', noai: 'Пересказ ИИ сейчас недоступен. Показаны заголовки и описания источников, часть на английском.',
      fail: 'Не удалось собрать выпуск. Проверьте соединение и попробуйте ещё раз.', retry: 'Повторить', skipped: 'Не загрузились темы: {t}.',
      endH: 'На сегодня всё.', endP: 'Вы прочитали главное. Остальное подождёт, и это нормально. Следующий выпуск будет завтра.', streak: 'Серия: {n} дн.', streak1: 'Первый выпуск прочитан',
      share: 'Поделиться', copied: 'Ссылка скопирована', change: 'Изменить темы', shareText: 'NewZeem: ваши новости за 5 минут. Бесплатно, без рекламы и регистрации.',
      foot: 'NewZeem бесплатный и без рекламы. Темы хранятся только на вашем устройстве, мы не следим за вами. Пересказы делает ИИ и он может ошибаться: проверяйте по ссылке на источник.'
    },
    en: {
      title: 'NewZeem: your news in 5 minutes', topics: 'Topics', other: 'RU',
      heroH: 'A paper that takes 5 minutes. Only what matters to you.', heroP: 'Pick your topics and we build an issue you can read in five minutes. There is no endless feed here.',
      p1: 'Free', p2: 'No ads', p3: 'No sign-up', pickH: 'What are you interested in?', pickN: 'Selected: {n} of {m}', build: 'Build my issue', save: 'Save topics',
      pickHint: 'Your choice is stored on this device only.', max: 'You can pick up to {m} topics',
      issue: 'Your issue', meta: '{n} stories, about {m} min to read', main: 'Top stories', loading: 'Building your issue: {n} of {m}', why: 'Why it matters:',
      read: 'Read at the source: {s}', left: 'left', noai: 'The AI summary is unavailable right now. You see headlines and descriptions from the sources.',
      fail: 'Could not build your issue. Check your connection and try again.', retry: 'Try again', skipped: 'These topics did not load: {t}.',
      endH: 'That is all for today.', endP: 'You have read what matters. The rest can wait, and that is fine. The next issue is tomorrow.', streak: 'Streak: {n} days', streak1: 'First issue read',
      share: 'Share', copied: 'Link copied', change: 'Change topics', shareText: 'NewZeem: your news in 5 minutes. Free, no ads, no sign-up.',
      foot: 'NewZeem is free and has no ads. Your topics are stored on your device only, and we do not track you. Summaries are written by an AI and can be wrong: check the source link.'
    }
  };

  /* ---------- small helpers ---------- */
  var memStore = null;
  function load() { try { return JSON.parse(localStorage.getItem('newzeem.v1') || 'null') || memStore; } catch (e) { return memStore; } }
  var S = Object.assign({ lang: /^ru\b/i.test(navigator.language || '') ? 'ru' : 'en', topics: [], read: {}, last: '', streak: 0, cache: null }, load() || {});
  function save() { memStore = S; try { localStorage.setItem('newzeem.v1', JSON.stringify(S)); } catch (e) { /* private mode: keep in memory */ } }
  function t(k, p) { var s = (D[S.lang] || D.en)[k] || D.en[k] || k; if (p) Object.keys(p).forEach(function (x) { s = s.replace('{' + x + '}', p[x]); }); return s; }
  function h(spec, attrs) {
    var parts = spec.split('.'), el = document.createElement(parts[0] || 'div');
    if (parts.length > 1) el.className = parts.slice(1).join(' ');
    var i = 1;
    if (attrs && typeof attrs === 'object' && !attrs.nodeType && !Array.isArray(attrs)) {
      i = 2;
      Object.keys(attrs).forEach(function (k) {
        if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]); else if (attrs[k] != null && attrs[k] !== false) el.setAttribute(k, attrs[k]);
      });
    }
    for (; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function add(el, c) { if (c == null || c === false) return; if (Array.isArray(c)) return c.forEach(function (x) { add(el, x); }); el.appendChild(c.nodeType ? c : document.createTextNode(String(c))); }
  function $(id) { return document.getElementById(id); }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }
  function ymd(d) { var p = function (n) { return (n < 10 ? '0' : '') + n; }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }
  function today() { return ymd(new Date()); }
  function toast(msg) { var box = $('toasts'), el = h('div.toast', msg); box.appendChild(el); setTimeout(function () { el.remove(); }, 2600); }
  function topicName(id) { var x = TP.byId[id]; return x ? x[S.lang] || x.en : id; }
  function safeUrl(u) { return /^https?:\/\//i.test(u) ? u : '#'; }

  var cleanup = null; // removes listeners of the current view
  function view() { if (cleanup) { cleanup(); cleanup = null; } window.scrollTo(0, 0); return clear($('main')); }

  function chrome() {
    document.documentElement.lang = S.lang;
    document.title = t('title');
    var tb = $('btn-topics'); tb.textContent = t('topics'); tb.hidden = !S.topics.length;
    $('btn-lang').textContent = t('other');
    clear($('foot')).appendChild(document.createTextNode(t('foot')));
    $('fuse').hidden = true;
  }

  /* ---------- topic picker ---------- */
  function renderPick(editing) {
    chrome();
    var main = view();
    var sel = (S.topics.length ? S.topics : DEFAULTS).slice();
    var counter = h('p.hint'), go = h('button.go', { type: 'button' }, editing ? t('save') : t('build'));
    function refresh() { counter.textContent = t('pickN', { n: sel.length, m: MAX_TOPICS }) + '. ' + t('pickHint'); go.disabled = !sel.length; }
    var chips = h('div.chips', { role: 'group', 'aria-label': t('pickH') }, TP.list.map(function (tp) {
      var b = h('button.chip', { type: 'button', 'aria-pressed': sel.indexOf(tp.id) >= 0 ? 'true' : 'false' }, topicName(tp.id));
      b.addEventListener('click', function () {
        var i = sel.indexOf(tp.id);
        if (i >= 0) sel.splice(i, 1); else { if (sel.length >= MAX_TOPICS) return toast(t('max', { m: MAX_TOPICS })); sel.push(tp.id); }
        b.setAttribute('aria-pressed', i >= 0 ? 'false' : 'true'); refresh();
      });
      return b;
    }));
    go.addEventListener('click', function () { S.topics = sel.slice(); S.cache = null; save(); renderDigest(); });
    main.appendChild(h('section.hero',
      editing ? null : h('div', h('h1', t('heroH')), h('p', t('heroP')), h('ul.promise', h('li', t('p1')), h('li', t('p2')), h('li', t('p3')))),
      h('h2', { style: 'font-size:24px;margin:0 0 14px' }, t('pickH')), chips, go, counter));
    refresh();
  }

  /* ---------- building the issue ---------- */
  function fetchTopic(id) {
    var ac = new AbortController(), timer = setTimeout(function () { ac.abort(); }, 25000);
    return fetch('/api/topic?t=' + encodeURIComponent(id) + '&lang=' + S.lang, { signal: ac.signal })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return j && Array.isArray(j.items) ? { id: id, items: j.items, ai: !!j.ai } : null; })
      .catch(function () { return null; })
      .then(function (x) { clearTimeout(timer); return x; });
  }

  // Fits the stories into the time budget: a few top stories first, then the topics take turns until the five minutes are full.
  function assemble(results) {
    var pool = [];
    var seenIds = {};
    results.forEach(function (r) { r.items.forEach(function (it, i) { if (seenIds[it.id]) return; seenIds[it.id] = 1; pool.push(Object.assign({}, it, { topic: r.id, pos: i })); }); });
    var strong = pool.filter(function (x) { return x.weight >= 2; });
    strong.sort(function (a, b) { return b.weight - a.weight || a.pos - b.pos; });
    var main = [], usedTopics = {}, taken = {}, total = 0;
    strong.forEach(function (x) { if (main.length < 3 && !usedTopics[x.topic]) { main.push(x); usedTopics[x.topic] = 1; taken[x.id] = 1; total += x.secs; } });
    var queues = results.map(function (r) {
      return pool.filter(function (x) { return x.topic === r.id && !taken[x.id]; }).sort(function (a, b) { return b.weight - a.weight || a.pos - b.pos; });
    });
    var picked = {}; results.forEach(function (r) { picked[r.id] = []; });
    var grew = true;
    while (grew) {
      grew = false;
      queues.forEach(function (q, qi) {
        while (q.length) {
          var x = q.shift();
          if (total + x.secs <= BUDGET) { picked[results[qi].id].push(x); total += x.secs; grew = true; break; }
        }
      });
    }
    var sections = [];
    if (main.length) sections.push({ id: 'main', items: main });
    results.forEach(function (r) { if (picked[r.id].length) sections.push({ id: r.id, items: picked[r.id] }); });
    var count = sections.reduce(function (n, s) { return n + s.items.length; }, 0);
    return { at: Date.now(), total: total, count: count, ai: results.every(function (r) { return r.ai; }), sections: sections };
  }

  function renderDigest() {
    chrome();
    var main = view();
    var key = S.topics.join(',');
    var c = S.cache;
    if (c && c.day === today() && c.lang === S.lang && c.key === key && c.digest) {
      draw(c.digest, []);
      if (Date.now() - c.digest.at > 4 * 3600e3) build(key, true);
      return;
    }
    build(key, false);
  }

  function build(key, quiet) {
    var main = $('main');
    var bar = h('p.hint', t('loading', { n: 0, m: S.topics.length }));
    if (!quiet) {
      clear(main).appendChild(h('div', h('div.mast', h('div.date', dateLabel()), h('h1', t('issue'))), bar, h('div.skel'), h('div.skel'), h('div.skel')));
    }
    var done = 0, ids = S.topics.slice();
    Promise.all(ids.map(function (id) { return fetchTopic(id).then(function (r) { done++; bar.textContent = t('loading', { n: done, m: ids.length }); return r; }); })).then(function (rs) {
      var ok = rs.filter(Boolean), failed = ids.filter(function (id, i) { return !rs[i]; });
      if (key !== S.topics.join(',')) return; // the reader changed topics meanwhile
      if (!ok.length) { if (!quiet) drawFail(); return; }
      var digest = assemble(ok);
      S.cache = { day: today(), lang: S.lang, key: key, digest: digest, failed: failed }; save();
      if (!quiet) draw(digest, failed);
    });
  }

  function dateLabel() { return new Date().toLocaleDateString(S.lang === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' }); }

  function drawFail() {
    var main = clear($('main'));
    main.appendChild(h('div.err', h('p', t('fail')), h('button.btn', { type: 'button', onclick: renderDigest }, t('retry'))));
  }

  /* ---------- the paper ---------- */
  function item(it, lead, showTag) {
    var a = h('a.src', { href: safeUrl(it.url), target: '_blank', rel: 'noopener noreferrer' }, t('read', { s: it.source }) + ' ↗');
    var el = h('article.item' + (lead ? '.lead' : '') + (S.read[it.id] ? '.read' : ''),
      showTag ? h('span.tag', topicName(it.topic)) : null, h('h3', it.headline), it.summary ? h('p', it.summary) : null,
      it.why ? h('p.why', h('b', t('why') + ' '), h('span', it.why)) : null, a);
    a.addEventListener('click', function () { S.read[it.id] = 1; el.classList.add('read'); save(); });
    return el;
  }

  function draw(d, failed) {
    var main = view();
    main.appendChild(h('div.mast', h('div.date', dateLabel()), h('h1', t('issue')), h('p.meta', t('meta', { n: d.count, m: Math.max(1, Math.round(d.total / 60)) }))));
    if (!d.ai) main.appendChild(h('p.notice', t('noai')));
    if (failed && failed.length) main.appendChild(h('p.notice', t('skipped', { t: failed.map(topicName).join(', ') })));
    d.sections.forEach(function (s) {
      main.appendChild(h('section.sec', h('h2', s.id === 'main' ? t('main') : topicName(s.id)), s.items.map(function (it, i) { return item(it, s.id === 'main' && i === 0, s.id === 'main'); })));
    });
    var streak = h('span.streak'); streak.hidden = true;
    var end = h('section.end', h('h2', t('endH')), h('p', t('endP')), streak,
      h('div.row', h('button.btn', { type: 'button', onclick: share }, t('share')), h('button.btn', { type: 'button', onclick: function () { renderPick(true); } }, t('change'))));
    main.appendChild(end);
    wire(d, end, streak);
  }

  function wire(d, end, streak) {
    var fuse = $('fuse'), bar = $('fuse-bar'), tx = $('fuse-t');
    fuse.hidden = false;
    function mmss(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60); }
    function tick() {
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var p = Math.min(1, Math.max(0, window.scrollY / max));
      bar.style.width = (p * 100) + '%';
      tx.textContent = mmss(d.total * (1 - p)) + ' ' + t('left');
    }
    window.addEventListener('scroll', tick, { passive: true }); window.addEventListener('resize', tick); tick();
    var io = null;
    function complete() {
      var td = today();
      if (S.last !== td) { S.streak = S.last === ymd(new Date(Date.now() - 864e5)) ? (S.streak || 0) + 1 : 1; S.last = td; save(); }
      streak.hidden = false; streak.textContent = S.streak > 1 ? t('streak', { n: S.streak }) : t('streak1');
      if (io) io.disconnect();
    }
    if ('IntersectionObserver' in window) { io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) complete(); }, { threshold: 0.6 }); io.observe(end); }
    else complete();
    if (S.last === today()) { streak.hidden = false; streak.textContent = S.streak > 1 ? t('streak', { n: S.streak }) : t('streak1'); }
    cleanup = function () { window.removeEventListener('scroll', tick); window.removeEventListener('resize', tick); if (io) io.disconnect(); };
  }

  function share() {
    var data = { title: 'NewZeem', text: t('shareText'), url: location.origin };
    if (navigator.share) { navigator.share(data).catch(function () { /* cancelled */ }); return; }
    var done = function () { toast(t('copied')); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(location.origin).then(done, done); else done();
  }

  $('btn-lang').addEventListener('click', function () { S.lang = S.lang === 'ru' ? 'en' : 'ru'; save(); S.topics.length ? renderDigest() : renderPick(false); });
  $('btn-topics').addEventListener('click', function () { renderPick(true); });
  if (S.topics.length) renderDigest(); else renderPick(false);
})();
