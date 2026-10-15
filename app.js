/* NewZeem: a free daily paper that fits your topics into five minutes. No accounts. State lives in this browser only. */
(function () {
  'use strict';
  var TP = window.NZ_TOPICS;
  var SLOGAN = 'Read less. Know more.', TITLE = 'newzeem. ' + SLOGAN;
  var BUDGET = TP.BUDGET_SEC, MAX_TOPICS = 8, DEFAULTS = ['world', 'tech', 'business'];

  var D = {
    ru: {
      topics: 'Темы', rx0: 'Тревога', rx1: 'Рад', rx2: 'Злит', rx3: 'Удивило', rx4: 'Всё равно', rxQ: 'Что вы чувствуете?', rxWith: 'Вы с {p}% читателей', rxAlone: 'Так чувствуют лишь {p}%', rxIn: 'В {c}: {p}% чувствуют так же', rxFirst: 'Вы одним из первых. Загляните позже: увидите, что думает мир.', rxN: 'Откликнулись: {n}', rxNote: 'Анонимные отклики непроверенных читателей', rxFail: 'Не удалось отправить отклик', worldH: 'Вы и мир', worldSub: 'С большинством читателей вы совпали в {a} из {b} историй', quizH: 'Проверь себя', quizSub: 'Вопросы по тому, что вы только что прочитали', quizFrom: 'Из новости: {h}', quizShare: 'Поделиться результатом', more: 'Подробнее', less: 'Свернуть', detailLoad: 'Читаю статью…', detailFail: 'Не получилось пересказать. Откройте оригинал.', detailNote: 'Подробный пересказ от ИИ. Сверьтесь с оригиналом.', howLong: 'Сколько у вас времени?', listen: 'Слушать', pauseL: 'Пауза', playL: 'Продолжить', nextS: 'Следующая история', prevS: 'Предыдущая история', stopL: 'Стоп', noVoice: 'На устройстве нет голоса для этого языка',
      heroP: 'Выберите темы, и мы соберём выпуск на пять минут: только главное, без шума. Ленты без дна здесь нет.',
      p1: 'Бесплатно', p2: 'Без рекламы', p3: 'Без регистрации', pickH: 'Что вам интересно?', pickN: 'Выбрано: {n} из {m}', build: 'Собрать выпуск', save: 'Сохранить темы',
      pickHint: 'Выбор хранится только на этом устройстве.', max: 'Можно выбрать не больше {m} тем',
      issue: 'Ваш выпуск', issueLead: 'Вот ваш выпуск на {m} мин.', sections: 'Разделы', rt: '{m} мин', gMorning: 'Доброе утро', gDay: 'Добрый день', gEvening: 'Добрый вечер', gNight: 'Доброй ночи', meta: '{n} историй, около {m} мин чтения', main: 'Главное', loading: 'Собираю выпуск: {n} из {m}', why: 'Почему это важно:',
      read: 'Источник: {s}', noai: 'Пересказ ИИ сейчас недоступен. Показаны заголовки и описания источников, часть на английском.',
      fail: 'Не удалось собрать выпуск. Проверьте соединение и попробуйте ещё раз.', retry: 'Повторить', skipped: 'Не загрузились темы: {t}.',
      endH: 'На сегодня всё.', endP: 'Вы прочитали главное. Остальное подождёт, и это нормально. Следующий выпуск будет завтра.', streak: 'Серия: {n} дн.', streak1: 'Первый выпуск прочитан',
      share: 'Поделиться', copied: 'Ссылка скопирована', change: 'Изменить темы', shareText: 'newzeem. Читай меньше. Знай больше. Новости за 5 минут: бесплатно, без рекламы и регистрации.',
      foot: 'newzeem бесплатный и без рекламы. Темы хранятся только на вашем устройстве, мы не следим за вами. Пересказы делает ИИ и он может ошибаться: проверяйте по ссылке на источник.',
      viewsH: 'Два взгляда', viewsSub: 'Одно событие у разных изданий. Смотрите, как каждое его подаёт.', viewsNote: 'Сравнение написал ИИ по заголовкам самих изданий. Он не решает, кто прав.', followH: 'Что изменилось с вчера', followWas: 'Вчера', followNow: 'Сегодня', predH: 'Прогноз дня', predSub: 'Один тап. Узнайте, что думает мир, и возвращайтесь за результатом.', predYes: 'Да', predNo: 'Нет', predFirst: 'Вы одним из первых. Загляните позже: увидите, что думает мир.', predN: 'Голосов: {n}', predWait: 'Результат появится здесь в течение 3 дней.', predY: 'Сбылось', predNn: 'Не сбылось', predX: 'Закрыт: в новостях нет ясного ответа', predRight: 'Вы угадали', predWrong: 'В этот раз нет', predRecord: 'Ваш счёт: {a} из {b}', predNote: 'Итог подвёл ИИ по заголовкам новостей. Сверьтесь с источником.', predEarlier: 'Прошлый прогноз'
    },
    en: {
      topics: 'Topics', rx0: 'Worried', rx1: 'Glad', rx2: 'Angry', rx3: 'Surprised', rx4: 'Don\'t care', rxQ: 'How do you feel about it?', rxWith: 'You are with {p}% of readers', rxAlone: 'Only {p}% feel the same', rxIn: 'In {c}: {p}% feel the same', rxFirst: 'You are among the first to react. Come back later to see the world.', rxN: '{n} readers so far', rxNote: 'Anonymous reactions from unverified readers', rxFail: 'Could not send your reaction', worldH: 'You and the world', worldSub: 'You felt the same as most readers on {a} of {b} stories', quizH: 'Check yourself', quizSub: 'Questions about what you just read', quizFrom: 'From: {h}', quizShare: 'Share result', more: 'More', less: 'Less', detailLoad: 'Reading the article…', detailFail: 'Could not retell this one. Open the original.', detailNote: 'Retold in detail by AI. Check the original.', howLong: 'How much time do you have?', listen: 'Listen', pauseL: 'Pause', playL: 'Play', nextS: 'Next story', prevS: 'Previous story', stopL: 'Stop', noVoice: 'This device has no voice for this language',
      heroP: 'Pick your topics and we build a five-minute issue: what matters, no noise. There is no endless feed here.',
      p1: 'Free', p2: 'No ads', p3: 'No sign-up', pickH: 'What are you interested in?', pickN: 'Selected: {n} of {m}', build: 'Build my issue', save: 'Save topics',
      pickHint: 'Your choice is stored on this device only.', max: 'You can pick up to {m} topics',
      issue: 'Your issue', issueLead: 'Here is your {m}-minute issue.', sections: 'Sections', rt: '{m} min', gMorning: 'Good morning', gDay: 'Good afternoon', gEvening: 'Good evening', gNight: 'Good night', meta: '{n} stories, about {m} min to read', main: 'Top stories', loading: 'Building your issue: {n} of {m}', why: 'Why it matters:',
      read: 'Source: {s}', noai: 'The AI summary is unavailable right now. You see headlines and descriptions from the sources.',
      fail: 'Could not build your issue. Check your connection and try again.', retry: 'Try again', skipped: 'These topics did not load: {t}.',
      endH: 'That is all for today.', endP: 'You have read what matters. The rest can wait, and that is fine. The next issue is tomorrow.', streak: 'Streak: {n} days', streak1: 'First issue read',
      share: 'Share', copied: 'Link copied', change: 'Change topics', shareText: 'newzeem. Read less. Know more. Your news in 5 minutes: free, no ads, no sign-up.',
      foot: 'newzeem is free and has no ads. Your topics are stored on your device only, and we do not track you. Summaries are written by an AI and can be wrong: check the source link.',
      viewsH: 'Two views', viewsSub: 'One event, reported by different outlets. See how each one frames it.', viewsNote: 'Comparison written by AI from the outlets\' own headlines. It does not say who is right.', followH: 'What changed since yesterday', followWas: 'Yesterday', followNow: 'Today', predH: 'Prediction of the day', predSub: 'One tap. See what the world thinks, then come back for the result.', predYes: 'Yes', predNo: 'No', predFirst: 'You are among the first. Come back later to see the world.', predN: '{n} votes', predWait: 'The result will appear here within 3 days.', predY: 'It happened', predNn: 'It did not happen', predX: 'Closed: nothing clear in the news', predRight: 'You called it', predWrong: 'Not this time', predRecord: 'Your record: {a} of {b}', predNote: 'Settled by AI from news headlines. Check the source.', predEarlier: 'Earlier prediction'
    }
  };

  Object.keys(window.NZ_I18N || {}).forEach(function (k) { D[k] = window.NZ_I18N[k]; });
  var LANGS = TP.langs;

  /* ---------- small helpers ---------- */
  function guess() { var l = String(navigator.language || 'en').slice(0, 2).toLowerCase(); return TP.langs.indexOf(l) >= 0 ? l : 'en'; }
  var memStore = null;
  function load() { try { return JSON.parse(localStorage.getItem('newzeem.v1') || 'null') || memStore; } catch (e) { return memStore; } }
  var S = Object.assign({ lang: guess(), topics: [], read: {}, last: '', streak: 0, cache: null, mins: 5, days: [], rx: {}, did: '', pr: {}, hist: {} }, load() || {});
  if (TP.langs.indexOf(S.lang) < 0) S.lang = 'en';
  var MINS = [1, 3, 5, 10];
  if (MINS.indexOf(S.mins) < 0) S.mins = 5;
  // A shared link carries the sender's topics, language and length: ?t=world,tech&l=es&m=3
  (function () {
    try {
      var q = new URLSearchParams(location.search), tl = (q.get('t') || '').split(',').filter(function (x) { return TP.byId[x]; });
      if (!tl.length) return;
      S.topics = tl.slice(0, MAX_TOPICS); S.cache = null;
      if (TP.langs.indexOf(q.get('l')) >= 0) S.lang = q.get('l');
      if (MINS.indexOf(+q.get('m')) >= 0) S.mins = +q.get('m');
      memStore = S; save();
      history.replaceState(null, '', location.pathname);
    } catch (e) { /* a bad link just opens the normal start screen */ }
  })();
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
  // Every full stop in a headline is vermilion: the brand's way of saying "this ends here".
  function dotted(str) {
    var out = [];
    String(str).split(/([.。।])/).forEach(function (p) { if (!p) return; out.push(/^[.。।]$/.test(p) ? h('span.dot', p) : p); });
    return out;
  }
  // "How much time do you have?": one control, used on the start screen and above the issue.
  function dial(onPick) {
    var box = h('div.dial', { role: 'radiogroup', 'aria-label': t('howLong') });
    MINS.forEach(function (m) {
      var b = h('button.dbtn', { type: 'button', role: 'radio', 'aria-checked': S.mins === m ? 'true' : 'false' }, t('rt', { m: m }));
      b.addEventListener('click', function () {
        S.mins = m; save();
        Array.prototype.forEach.call(box.children, function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
        if (onPick) onPick(m);
      });
      box.appendChild(b);
    });
    return box;
  }
  function safeUrl(u) { return /^https?:\/\//i.test(u) ? u : '#'; }

  var cleanup = null; // removes listeners of the current view
  function view() { if (cleanup) { cleanup(); cleanup = null; } window.scrollTo(0, 0); return clear($('main')); }

  function chrome() {
    document.documentElement.lang = S.lang;
    document.documentElement.dir = TP.rtl.indexOf(S.lang) >= 0 ? 'rtl' : 'ltr';
    document.title = TITLE;
    var tb = $('btn-topics'); tb.textContent = t('topics'); tb.hidden = !S.topics.length;
    $('lang').value = S.lang;
    $('slogan').textContent = SLOGAN;
    flame();
    clear($('foot')).appendChild(document.createTextNode(t('foot')));
  }

  /* ---------- listen: the issue read aloud by the device's own voice (free, nothing leaves the browser) ---------- */
  var BCP = { en: 'en-US', es: 'es-ES', pt: 'pt-BR', fr: 'fr-FR', de: 'de-DE', ru: 'ru-RU', hi: 'hi-IN', zh: 'zh-CN', ar: 'ar-SA' };
  var SPEEDS = [1, 1.25, 1.5];
  function canSpeak() { return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window; }
  function ico(name) {
    var P = { play: 'M8 5v14l11-7z', pause: 'M6 5h4v14H6zM14 5h4v14h-4z', next: 'M6 6l8 6-8 6zM16 6h2v12h-2z', prev: 'M18 6l-8 6 8 6zM8 6H6v12h2z', close: 'M6 6l12 12M18 6L6 18' };
    var NS = 'http://www.w3.org/2000/svg', s = document.createElementNS(NS, 'svg'), p = document.createElementNS(NS, 'path');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('width', '20'); s.setAttribute('height', '20'); s.setAttribute('aria-hidden', 'true'); s.setAttribute('class', 'ico');
    p.setAttribute('d', P[name]);
    if (name === 'close') { p.setAttribute('fill', 'none'); p.setAttribute('stroke', 'currentColor'); p.setAttribute('stroke-width', '2.4'); p.setAttribute('stroke-linecap', 'round'); } else p.setAttribute('fill', 'currentColor');
    s.appendChild(p); return s;
  }
  var Say = {
    on: false, paused: false, i: 0, j: 0, tok: 0, speed: 1, bar: null, parts: {},
    voice: function () {
      var vs = speechSynthesis.getVoices() || [], lg = S.lang;
      var m = vs.filter(function (v) { return String(v.lang).toLowerCase().replace('_', '-').indexOf(lg) === 0; });
      return { any: vs.length > 0, voice: m.filter(function (v) { return v.localService; })[0] || m[0] || null };
    },
    chunks: function (it) {
      var a = [it.headline, it.gist].concat(it.points || []);
      if (it.why) a.push(t('why') + ' ' + it.why);
      a.push(t('read', { s: it.source }));
      return a.filter(Boolean);
    },
    start: function (i) {
      var v = Say.voice();
      if (v.any && !v.voice) return toast(t('noVoice'));
      Say.on = true; Say.paused = false; Say.i = i; Say.j = 0; Say.show(); Say.focus(); Say.step();
    },
    step: function () {
      if (!Say.on || Say.paused) return;
      var cur = spoken[Say.i];
      if (!cur) return Say.stop();
      var ch = Say.chunks(cur.it);
      if (Say.j >= ch.length) { S.read[cur.it.id] = 1; cur.el.classList.add('read'); save(); Say.i++; Say.j = 0; if (!spoken[Say.i]) return Say.stop(); Say.focus(); return Say.step(); }
      var tok = ++Say.tok, u = new SpeechSynthesisUtterance(ch[Say.j]), v = Say.voice().voice;
      u.lang = BCP[S.lang] || S.lang; if (v) u.voice = v; u.rate = Say.speed;
      var next = function () { if (tok !== Say.tok || !Say.on || Say.paused) return; Say.j++; Say.step(); };
      u.onend = next; u.onerror = function (e) { if (e && (e.error === 'interrupted' || e.error === 'canceled')) return; next(); };
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    },
    toggle: function () {
      if (!Say.on) return;
      Say.paused = !Say.paused; Say.tok++; speechSynthesis.cancel();
      if (!Say.paused) Say.step();
      Say.show();
    },
    skip: function (d) {
      if (!Say.on) return;
      var n = Math.max(0, Math.min(spoken.length - 1, Say.i + d));
      Say.tok++; speechSynthesis.cancel(); Say.i = n; Say.j = 0; Say.focus(); Say.show(); if (!Say.paused) Say.step();
    },
    rate: function () {
      Say.speed = SPEEDS[(SPEEDS.indexOf(Say.speed) + 1) % SPEEDS.length];
      if (Say.on && !Say.paused) { Say.tok++; speechSynthesis.cancel(); Say.step(); }
      Say.show();
    },
    focus: function () {
      spoken.forEach(function (x, k) { x.el.classList.toggle('speaking', Say.on && k === Say.i); });
      var cur = spoken[Say.i]; if (Say.on && cur && cur.el.scrollIntoView) cur.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    stop: function () {
      Say.on = false; Say.paused = false; Say.tok++;
      if (canSpeak()) try { speechSynthesis.cancel(); } catch (e) { /* nothing to stop */ }
      spoken.forEach(function (x) { x.el.classList.remove('speaking'); });
      Say.show();
    },
    mount: function () {
      if (Say.bar && Say.bar.parentNode) Say.bar.parentNode.removeChild(Say.bar);
      if (!canSpeak()) { Say.bar = null; return; }
      var P = Say.parts;
      P.title = h('span.pt'); P.count = h('span.pc');
      P.prev = h('button.pb', { type: 'button', 'aria-label': t('prevS'), onclick: function () { Say.skip(-1); } }, ico('prev'));
      P.play = h('button.pb.pp', { type: 'button', onclick: Say.toggle });
      P.next = h('button.pb', { type: 'button', 'aria-label': t('nextS'), onclick: function () { Say.skip(1); } }, ico('next'));
      P.speed = h('button.psp', { type: 'button', 'aria-label': '×', onclick: Say.rate });
      P.stop = h('button.pb', { type: 'button', 'aria-label': t('stopL'), onclick: Say.stop }, ico('close'));
      Say.bar = h('div.player', { role: 'region', 'aria-label': t('listen'), hidden: 'hidden' }, h('div.pinfo', P.count, P.title), h('div.pctl', P.prev, P.play, P.next, P.speed, P.stop));
      document.body.appendChild(Say.bar);
      Say.show();
    },
    show: function () {
      if (!Say.bar) return;
      Say.bar.hidden = !Say.on;
      document.body.classList.toggle('listening', Say.on);
      var P = Say.parts, cur = spoken[Say.i];
      if (cur) { P.title.textContent = cur.it.headline; P.count.textContent = (Say.i + 1) + ' / ' + spoken.length; }
      P.play.textContent = ''; P.play.appendChild(ico(Say.paused ? 'play' : 'pause')); P.play.setAttribute('aria-label', Say.paused ? t('playL') : t('pauseL'));
      P.speed.textContent = Say.speed + '×';
    }
  };

  /* ---------- topic picker ---------- */
  function renderPick(editing) {
    chrome();
    var main = view();
    var sel = (S.topics.length ? S.topics : DEFAULTS).slice();
    var counter = h('p.count'), go = h('button.go', { type: 'button' }, editing ? t('save') : t('build'));
    function refresh() { counter.textContent = t('pickN', { n: sel.length, m: MAX_TOPICS }); go.disabled = !sel.length; }
    var tiles = h('div.tiles', { role: 'group', 'aria-label': t('pickH') }, TP.list.map(function (tp) {
      var b = h('button.tile', { type: 'button', style: '--c:' + tp.c, 'aria-pressed': sel.indexOf(tp.id) >= 0 ? 'true' : 'false' },
        h('span.te', tp.e), h('span.tn', topicName(tp.id)), h('span.tk', { 'aria-hidden': 'true' }, '✓'));
      b.addEventListener('click', function () {
        var i = sel.indexOf(tp.id);
        if (i >= 0) sel.splice(i, 1); else { if (sel.length >= MAX_TOPICS) return toast(t('max', { m: MAX_TOPICS })); sel.push(tp.id); }
        b.setAttribute('aria-pressed', i >= 0 ? 'false' : 'true'); refresh();
      });
      return b;
    }));
    go.addEventListener('click', function () { S.topics = sel.slice(); S.cache = null; save(); renderDigest(); });
    main.appendChild(h('section.hero',
      editing ? null : h('div.intro', h('h1', dotted(SLOGAN)), h('p.sub', t('heroP')), h('ul.promise', h('li', t('p1')), h('li', t('p2')), h('li', t('p3')))),
      h('h2.pick-h', t('pickH')), tiles,
      h('h2.pick-h.pick-t', t('howLong')), dial(),
      h('div.bar', h('div.barin', counter, go)), h('p.hint', t('pickHint'))));
    refresh();
  }

  /* ---------- building the issue ---------- */
  function fetchTopic(id, retry) {
    var ac = new AbortController(), timer = setTimeout(function () { ac.abort(); }, 25000);
    return fetch('/api/topic?t=' + encodeURIComponent(id) + '&lang=' + S.lang + (retry ? '&r=' + Date.now() : ''), { signal: ac.signal })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return j && Array.isArray(j.items) ? { id: id, items: j.items, ai: !!j.ai, quiz: Array.isArray(j.quiz) ? j.quiz : [] } : null; })
      .catch(function () { return null; })
      .then(function (x) { clearTimeout(timer); return x; });
  }

  // Fits the stories into the time budget: a few top stories first, then the topics take turns until the five minutes are full.
  function assemble(results, mins) {
    var budget = (mins || 5) * 60;
    var told = results.filter(function (r) { return r.ai; });
    if (S.lang !== 'en' && told.length) results = told; // untranslated source headlines are not shown in another language
    var pool = [];
    var seenIds = {};
    results.forEach(function (r) { r.items.forEach(function (it, i) { if (seenIds[it.id]) return; seenIds[it.id] = 1; pool.push(Object.assign({}, it, { topic: r.id, pos: i })); }); });
    var strong = pool.filter(function (x) { return x.weight >= 2; });
    strong.sort(function (a, b) { return b.weight - a.weight || a.pos - b.pos; });
    var main = [], usedTopics = {}, taken = {}, total = 0;
    strong.forEach(function (x) { if (main.length < 3 && !usedTopics[x.topic] && (!main.length || total + x.secs <= budget)) { main.push(x); usedTopics[x.topic] = 1; taken[x.id] = 1; total += x.secs; } });
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
          if (total + x.secs <= budget) { picked[results[qi].id].push(x); total += x.secs; grew = true; break; }
        }
      });
    }
    var sections = [];
    if (main.length) sections.push({ id: 'main', items: main });
    results.forEach(function (r) { if (picked[r.id].length) sections.push({ id: r.id, items: picked[r.id] }); });
    var count = sections.reduce(function (n, s) { return n + s.items.length; }, 0);
    // Up to three questions from different topics, only about stories that are in this issue.
    var titles = {}; sections.forEach(function (s) { s.items.forEach(function (x) { titles[x.id] = x; }); });
    var qs = [], used = {}, rounds = 0;
    while (qs.length < 3 && rounds < 3) {
      results.forEach(function (r) {
        if (qs.length >= 3) return;
        var q = (r.quiz || []).filter(function (x) { return titles[x.id] && !used[x.id]; })[0];
        if (q) { used[q.id] = 1; qs.push(Object.assign({}, q, { h: titles[q.id].headline, u: titles[q.id].url })); }
      });
      rounds++;
    }
    return { at: Date.now(), total: total, count: count, ai: results.every(function (r) { return r.ai; }), sections: sections, quiz: qs };
  }

  function renderDigest() {
    chrome();
    var main = view();
    var key = S.topics.join(',');
    var c = S.cache;
    if (c && c.v === 3 && c.day === today() && c.lang === S.lang && c.key === key && c.results) {
      draw(assemble(c.results, S.mins), c.failed || []);
      if (Date.now() - c.at > 4 * 3600e3) build(key, true);
      return;
    }
    build(key, false);
  }

  function build(key, quiet) {
    var main = $('main');
    var bar = h('p.hint', t('loading', { n: 0, m: S.topics.length }));
    if (!quiet) {
      clear(main).appendChild(h('div', h('div.mast', h('div.date', dateLabel()), h('h1', dotted(t('issue') + '.'))), bar, h('div.skel'), h('div.skel'), h('div.skel')));
    }
    var done = 0, ids = S.topics.slice();
    // Three topics at a time: the free AI plans limit tokens per minute, so a burst of ten requests would be refused.
    pool(ids, 3, function (id) { return fetchTopic(id).then(function (r) { done++; bar.textContent = t('loading', { n: done, m: ids.length }); return r; }); }).then(function (rs) {
      // A topic whose AI retelling failed (a busy moment at the provider) is asked for once more before we give up on it.
      var weak = rs.map(function (r, i) { return r && !r.ai ? i : -1; }).filter(function (i) { return i >= 0; });
      var again = weak.length ? new Promise(function (ok) { setTimeout(ok, 2500); }).then(function () {
        return Promise.all(weak.map(function (i) { return fetchTopic(ids[i], true).then(function (r) { if (r && r.ai) rs[i] = r; }); }));
      }) : Promise.resolve();
      return again.then(function () { return rs; });
    }).then(function (rs) {
      var ok = rs.filter(Boolean), failed = ids.filter(function (id, i) { return !rs[i]; });
      if (key !== S.topics.join(',')) return; // the reader changed topics meanwhile
      if (!ok.length) { if (!quiet) drawFail(); return; }
      var digest = assemble(ok, S.mins);
      S.cache = { v: 3, at: Date.now(), day: today(), lang: S.lang, key: key, results: ok, failed: failed }; save();
      if (!quiet) draw(digest, failed);
    });
  }

  // Streak: consecutive days with a finished issue. It counts only while yesterday or today is read.
  function curStreak() { var y = ymd(new Date(Date.now() - 864e5)); return S.last === today() || S.last === y ? (S.streak || 0) : 0; }
  function flame() {
    var n = curStreak(), f = $('flame');
    f.hidden = n < 1; f.textContent = ''; if (n < 1) return;
    f.appendChild(h('span.fd')); f.appendChild(document.createTextNode(String(n)));
    f.setAttribute('aria-label', t('streak', { n: n })); f.setAttribute('title', t('streak', { n: n }));
  }
  function weekRow() {
    var loc = { en: 'en-US', zh: 'zh-CN', pt: 'pt-BR' }[S.lang] || S.lang, days = S.days || [], row = h('div.week', { 'aria-hidden': 'true' });
    for (var k = 6; k >= 0; k--) {
      var d = new Date(Date.now() - k * 864e5), on = days.indexOf(ymd(d)) >= 0;
      row.appendChild(h('span.wd' + (on ? '.on' : '') + (k === 0 ? '.now' : ''), h('i'), h('b', d.toLocaleDateString(loc, { weekday: 'narrow' }))));
    }
    return row;
  }
  function pool(items, n, fn) {
    var out = new Array(items.length), i = 0, fin = 0;
    return new Promise(function (done) {
      function next() {
        if (i >= items.length) return;
        var k = i++;
        fn(items[k]).then(function (r) { out[k] = r; }).then(function () { if (++fin === items.length) done(out); else next(); });
      }
      for (var j = 0; j < Math.min(n, items.length); j++) next();
    });
  }
  function dateLabel() { return new Date().toLocaleDateString({ en: 'en-US', zh: 'zh-CN', pt: 'pt-BR' }[S.lang] || S.lang, { weekday: 'long', day: 'numeric', month: 'long' }); }

  function drawFail() {
    var main = clear($('main'));
    main.appendChild(h('div.err', h('p', t('fail')), h('button.btn', { type: 'button', onclick: renderDigest }, t('retry'))));
  }

  /* ---------- the paper ---------- */
  function greeting() {
    var hr = new Date().getHours();
    var k = hr >= 5 && hr < 11 ? 'gMorning' : hr >= 11 && hr < 17 ? 'gDay' : hr >= 17 && hr < 23 ? 'gEvening' : 'gNight';
    return t(k);
  }
  function mins(secs) { return Math.max(1, Math.round(secs / 60)); }

  var spoken = [];
  var storyMemo = {};
  function fetchStory(url) {
    var k = url + '|' + S.lang;
    if (storyMemo[k]) return Promise.resolve(storyMemo[k]);
    var ac = new AbortController(), timer = setTimeout(function () { ac.abort(); }, 45000);
    return fetch('/api/story?u=' + encodeURIComponent(url) + '&lang=' + S.lang, { signal: ac.signal })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { if (j && Array.isArray(j.paragraphs) && j.paragraphs.length) storyMemo[k] = j; return storyMemo[k] || null; })
      .catch(function () { return null; })
      .then(function (x) { clearTimeout(timer); return x; });
  }

  function item(it, lead, showTag) {
    var tp = TP.byId[it.topic] || {};
    var a = h('a.src', { href: safeUrl(it.url), target: '_blank', rel: 'noopener noreferrer', 'aria-label': t('read', { s: it.source }) }, it.source + ' ↗');
    var pts = (it.points || []).length ? h('ul.pts', it.points.map(function (p) { return h('li', p); })) : null;
    var hb = h('button.hbtn', { type: 'button', 'aria-expanded': 'false' }, it.headline);
    var more = h('button.more', { type: 'button' }, t('more') + ' ▾');
    var detail = h('div.detail', { hidden: 'hidden' }), rxBox = h('div.rx', { hidden: 'hidden' });
    Rx.probe.then(function () { if (Rx.on) rxInit(it.id, rxBox); });
    var open = false, state = '';
    function load() {
      state = 'busy'; clear(detail).appendChild(h('p.dload', t('detailLoad')));
      fetchStory(it.url).then(function (r) {
        clear(detail);
        if (!r) { state = ''; detail.appendChild(h('p.dfail', t('detailFail'))); return; }
        state = 'done';
        r.paragraphs.forEach(function (p) { detail.appendChild(h('p', p)); });
        detail.appendChild(h('p.dnote', t('detailNote')));
      });
    }
    function toggle() {
      open = !open; detail.hidden = !open;
      hb.setAttribute('aria-expanded', open ? 'true' : 'false'); more.textContent = (open ? t('less') + ' ▴' : t('more') + ' ▾');
      if (open) { S.read[it.id] = 1; el.classList.add('read'); save(); if (!state) load(); }
    }
    hb.addEventListener('click', toggle); more.addEventListener('click', toggle);
    var el = h('article.item' + (lead ? '.lead' : '') + (S.read[it.id] ? '.read' : ''), { style: '--c:' + (tp.c || '#1C7ED6'), 'data-id': it.id },
      showTag ? h('span.tag', (tp.e || '') + ' ' + topicName(it.topic)) : null,
      h('h3', hb),
      it.gist ? h('p.gist', it.gist) : null,
      pts,
      it.why ? h('p.why', h('b', t('why')), ' ', it.why) : null,
      detail,
      rxBox,
      h('p.ifoot', more, a, h('span.rt', t('rt', { m: mins(it.secs) }))));
    a.addEventListener('click', function () { S.read[it.id] = 1; el.classList.add('read'); save(); });
    spoken.push({ it: it, el: el });
    return el;
  }

  function secLabel(id) { var tp = TP.byId[id]; return id === 'main' ? '⚡ ' + t('main') : (tp ? tp.e + ' ' : '') + topicName(id); }

  function draw(d, failed) {
    var main = view();
    spoken = [];
    main.appendChild(h('div.mast', h('div.date', dateLabel()), h('h1', dotted(greeting() + '.')), h('p.lede', t('issueLead', { m: S.mins })),
      h('p.meta', t('meta', { n: d.count, m: Math.max(1, Math.round(d.total / 60)) })),
      h('div.acts', canSpeak() ? h('button.listen', { type: 'button', onclick: function () { Say.start(0); } }, ico('play'), t('listen')) : null,
        h('div.dwrap', h('span.dlab', t('howLong')), dial(function () { var c = S.cache; if (c && c.results) draw(assemble(c.results, S.mins), c.failed || []); else renderDigest(); })))));
    if (failed && failed.length) main.appendChild(h('p.notice', t('skipped', { t: failed.map(topicName).join(', ') })));
    var nav = h('nav.jump', { 'aria-label': t('sections') }, d.sections.map(function (s) {
      var tp = TP.byId[s.id];
      return h('button.jchip', { type: 'button', style: '--c:' + (tp ? tp.c : '#C8321B'), onclick: function () {
        var el = document.getElementById('sec-' + s.id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } }, secLabel(s.id));
    }));
    main.appendChild(nav);
    var fu = followBlock(d); if (fu) main.appendChild(fu);
    var viewsEl = h('section.views', { hidden: 'hidden' }), predEl = h('section.pred', { hidden: 'hidden' });
    d.sections.forEach(function (s, si) {
      var tp = TP.byId[s.id];
      main.appendChild(h('section.sec', { id: 'sec-' + s.id, style: '--c:' + (tp ? tp.c : '#C8321B') },
        h('h2', secLabel(s.id), h('span.dot', '.'), h('span.cnt', String(s.items.length))),
        s.items.map(function (it, i) { return item(it, s.id === 'main' && i === 0, s.id === 'main'); })));
      if (si === 0) main.appendChild(viewsEl);
    });
    if (!d.sections.length) main.appendChild(viewsEl);
    loadViews(viewsEl);
    worldEl = h('section.world', { hidden: 'hidden' }); main.appendChild(worldEl);
    Rx.probe.then(updateWorld);
    main.appendChild(predEl); loadPred(predEl);
    if (d.quiz && d.quiz.length >= 2) main.appendChild(quizBlock(d.quiz));
    var streak = h('span.streak'), week = weekRow(); streak.hidden = true;
    var end = h('section.end', streak, week,
      h('div.row', h('button.btn', { type: 'button', onclick: share }, t('share')), h('button.btn', { type: 'button', onclick: function () { renderPick(true); } }, t('change'))));
    main.appendChild(end);
    wire(end, streak, week);
    progress();
    Say.mount();
  }

  /* ---------- the world thinks: one tap of reaction under a story, then how the world and your country felt ---------- */
  var RXI = ['😟', '🙂', '😠', '😮', '😐'];
  var Rx = { on: false, cc: '', res: {} };
  Rx.probe = fetch('/api/react').then(function (r) { return r.ok ? r.json() : {}; }).then(function (j) { Rx.on = !!(j && j.on); Rx.cc = (j && j.cc) || ''; }).catch(function () { Rx.on = false; });
  var worldEl = null;
  function did() {
    if (!S.did) {
      var a = new Uint8Array(12);
      try { crypto.getRandomValues(a); } catch (e) { for (var i = 0; i < 12; i++) a[i] = Math.floor(Math.random() * 256); }
      S.did = Array.prototype.map.call(a, function (x) { return ('0' + x.toString(16)).slice(-2); }).join(''); save();
    }
    return S.did;
  }
  function regionName(cc) { try { return new Intl.DisplayNames([S.lang], { type: 'region' }).of(cc) || cc; } catch (e) { return cc; } }
  var rxPending = {}, rxTimer = null;
  function rxFetch(id) { // reloads ask for the counts of every story the reader reacted to in one request
    return new Promise(function (ok) {
      (rxPending[id] = rxPending[id] || []).push(ok);
      if (rxTimer) return;
      rxTimer = setTimeout(function () {
        var ids = Object.keys(rxPending), waits = rxPending, chunks = []; rxPending = {}; rxTimer = null;
        for (var i = 0; i < ids.length; i += 12) chunks.push(ids.slice(i, i + 12));
        Promise.all(chunks.map(function (c) {
          return fetch('/api/react?ids=' + c.join(',')).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
            if (j && j.s) { Rx.cc = j.cc || Rx.cc; Object.keys(j.s).forEach(function (k) { Rx.res[k] = j.s[k]; }); }
          }).catch(function () { /* the line below just stays in its waiting state */ });
        })).then(function () { ids.forEach(function (k) { waits[k].forEach(function (f) { f(); }); }); });
      }, 40);
    });
  }
  function rxButtons(id, box) {
    clear(box); box.hidden = false;
    box.appendChild(h('p.rxq', t('rxQ')));
    box.appendChild(h('div.rxrow', { role: 'group', 'aria-label': t('rxQ') }, RXI.map(function (e, i) {
      var b = h('button.rxb', { type: 'button' }, h('span.rxe', e), h('span.rxl', t('rx' + i)));
      b.addEventListener('click', function () { rxSend(id, i, box); });
      return b;
    })));
  }
  function rxSend(id, r, box) {
    var btns = box.querySelectorAll('.rxb');
    Array.prototype.forEach.call(btns, function (b) { b.disabled = true; });
    fetch('/api/react', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: id, r: r, d: did() }) })
      .then(function (x) { return x.ok ? x.json() : Promise.reject(); })
      .then(function (j) {
        if (!j || !j.s || !j.s[id]) throw 0;
        S.rx[id] = r; var ks = Object.keys(S.rx); if (ks.length > 300) delete S.rx[ks[0]]; save();
        Rx.res[id] = j.s[id]; Rx.cc = j.cc || Rx.cc; rxResults(id, box); updateWorld();
      })
      .catch(function () { toast(t('rxFail')); Array.prototype.forEach.call(btns, function (b) { b.disabled = false; }); });
  }
  function rxResults(id, box) {
    var d = Rx.res[id], mine = S.rx[id]; clear(box); box.hidden = false;
    if (!d || d.n < 5) { box.appendChild(h('p.rxnote', RXI[mine] + ' ' + t('rx' + mine) + ' · ' + t('rxFirst'))); return; }
    var pct = function (i) { return Math.round(d.t[i] / d.n * 100); }, top = d.t.indexOf(Math.max.apply(null, d.t)), p = pct(mine);
    box.appendChild(h('div.rxres', RXI.map(function (e, i) {
      return h('div.rxr' + (i === mine ? '.me' : '') + (i === top ? '.mode' : ''), h('span.rxe', e), h('span.rxl', t('rx' + i)), h('span.rxbar', h('i', { style: 'width:' + Math.max(3, pct(i)) + '%' })), h('span.rxp', pct(i) + '%'));
    })));
    box.appendChild(h('p.rxsum', t(p >= 30 ? 'rxWith' : 'rxAlone', { p: p })));
    if (d.c && d.c.n >= 5 && Rx.cc && Rx.cc !== 'XX') box.appendChild(h('p.rxin', t('rxIn', { c: regionName(Rx.cc), p: Math.round(d.c.t[mine] / d.c.n * 100) })));
    box.appendChild(h('p.rxnote', t('rxN', { n: d.n }) + ' · ' + t('rxNote')));
  }
  function rxInit(id, box) {
    if (S.rx[id] == null) return rxButtons(id, box);
    rxResults(id, box);
    if (!Rx.res[id]) rxFetch(id).then(function () { rxResults(id, box); updateWorld(); }); else updateWorld();
  }
  // "You and the world": on how many stories your reaction was the most common one.
  function updateWorld() {
    if (!worldEl) return;
    var ids = Object.keys(S.rx).filter(function (id) { return Rx.res[id] && Rx.res[id].n >= 5 && spoken.some(function (x) { return x.it.id === id; }); });
    if (ids.length < 2) { worldEl.hidden = true; return; }
    var hits = ids.map(function (id) { var d = Rx.res[id]; return S.rx[id] === d.t.indexOf(Math.max.apply(null, d.t)); });
    var a = hits.filter(Boolean).length;
    clear(worldEl); worldEl.hidden = false;
    worldEl.appendChild(h('h2', dotted(t('worldH') + '.')));
    worldEl.appendChild(h('p.qsub', t('worldSub', { a: a, b: ids.length })));
    worldEl.appendChild(h('div.qdots', hits.map(function (x) { return h('span.qd' + (x ? '.on' : ''), '●'); })));
    worldEl.appendChild(h('div.qres', h('button.btn.qshare', { type: 'button', onclick: function () { shareText('newzeem. 🌍 ' + hits.map(function (x) { return x ? '●' : '○'; }).join('') + ' ' + a + '/' + ids.length + '\n' + SLOGAN); } }, t('quizShare'))));
  }

  /* ---------- check yourself: a few questions on what was just read, and a result you can share ---------- */
  function quizBlock(qs) {
    var key = qs.map(function (q) { return q.id; }).join(','), saved = S.qz && S.qz.day === today() && S.qz.key === key ? S.qz.pick : [];
    var picks = qs.map(function (q, i) { return saved[i] != null ? saved[i] : -1; });
    var res = h('div.qres'), box = h('section.quiz', h('h2', dotted(t('quizH') + '.')), h('p.qsub', t('quizSub')));
    function dots() { return picks.map(function (p, i) { return p === qs[i].a ? '●' : '○'; }).join(''); }
    function score() { return picks.filter(function (p, i) { return p === qs[i].a; }).length; }
    function finish() {
      if (picks.some(function (p) { return p < 0; })) return;
      clear(res);
      res.appendChild(h('div.qdots', picks.map(function (p, i) { return h('span.qd' + (p === qs[i].a ? '.on' : ''), '●'); })));
      res.appendChild(h('p.qscore', score() + ' / ' + qs.length));
      res.appendChild(h('button.btn.qshare', { type: 'button', onclick: function () { shareText('newzeem. ' + dots() + ' ' + score() + '/' + qs.length + '\n' + SLOGAN); } }, t('quizShare')));
    }
    qs.forEach(function (q, i) {
      var from = h('p.qfrom', { hidden: 'hidden' }, h('a', { href: safeUrl(q.u), target: '_blank', rel: 'noopener noreferrer' }, t('quizFrom', { h: q.h })));
      var opts = h('div.qopts', q.o.map(function (txt, k) {
        var b = h('button.qopt', { type: 'button' }, h('span.qm', { 'aria-hidden': 'true' }), h('span', txt));
        b.addEventListener('click', function () { if (picks[i] >= 0) return; picks[i] = k; mark(); S.qz = { day: today(), key: key, pick: picks.slice() }; save(); finish(); });
        return b;
      }));
      function mark() {
        if (picks[i] < 0) return;
        Array.prototype.forEach.call(opts.children, function (b, k) {
          b.disabled = true; b.classList.toggle('right', k === q.a); b.classList.toggle('wrong', k === picks[i] && k !== q.a);
          b.querySelector('.qm').textContent = k === q.a ? '✓' : k === picks[i] ? '✗' : '';
        });
        from.hidden = false;
      }
      box.appendChild(h('div.qcard', h('p.qq', h('b', (i + 1) + '. '), q.q), opts, from));
      mark();
    });
    box.appendChild(res); finish();
    return box;
  }

  /* ---------- what changed since yesterday: stories you saw yesterday that have moved on (matched on this device, no AI) ---------- */
  function toks(s) {
    var out = {}, str = String(s).toLowerCase();
    (str.match(/[㐀-鿿]+/g) || []).forEach(function (run) { for (var i = 0; i + 1 < run.length; i++) out[run.substr(i, 2)] = 1; });
    str.replace(/[㐀-鿿]+/g, ' ').split(/[^\p{L}\p{M}\p{N}]+/u).forEach(function (w) {
      if (w.length >= (/^[a-zà-ÿа-яё\d]+$/.test(w) ? 4 : 3)) out[w] = 1;
    });
    return out;
  }
  function overlap(a, b) {
    var ka = Object.keys(a), n = 0; if (!ka.length) return 0;
    ka.forEach(function (k) { if (b[k]) n++; });
    var m = Math.min(ka.length, Object.keys(b).length);
    return n >= 2 && m ? n / m : 0;
  }
  function followBlock(d) {
    var td = today(), items = [];
    d.sections.forEach(function (s) { s.items.forEach(function (it) { items.push(it); }); });
    S.hist = S.hist || {};
    var days = Object.keys(S.hist).filter(function (k) { return k < td; }).sort(), pd = days[days.length - 1];
    var prev = pd && S.hist[pd].lang === S.lang && (Date.parse(td) - Date.parse(pd)) / 864e5 <= 3 ? S.hist[pd].items : [];
    var pk = prev.map(function (p) { return toks(p.h + ' ' + (p.g || '')); }), pids = {}, usedPrev = {}, found = [];
    prev.forEach(function (p) { pids[p.id] = 1; });
    items.forEach(function (it) {
      if (found.length >= 3 || pids[it.id]) return;
      var tk = toks(it.headline + ' ' + (it.gist || '')), best = -1, bs = 0;
      pk.forEach(function (k, i) { if (usedPrev[i]) return; var sc = overlap(tk, k); if (sc > bs) { bs = sc; best = i; } });
      if (best >= 0 && bs >= 0.5) { usedPrev[best] = 1; found.push({ was: prev[best].h, now: it }); }
    });
    S.hist[td] = { lang: S.lang, items: items.slice(0, 40).map(function (it) { return { id: it.id, h: it.headline, g: it.gist || '' }; }) };
    Object.keys(S.hist).sort().slice(0, -4).forEach(function (k) { delete S.hist[k]; });
    save();
    if (!found.length) return null;
    return h('section.follow', h('h2', dotted(t('followH') + '.')),
      found.map(function (f) {
        return h('button.fu', { type: 'button', onclick: function () {
          var el = document.querySelector('[data-id="' + f.now.id + '"]'); if (!el) return;
          el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('flash'); setTimeout(function () { el.classList.remove('flash'); }, 1600);
        } }, h('span.fuw', h('b', t('followWas')), ' ', f.was), h('span.fun', h('b', t('followNow')), ' ', f.now.headline));
      }));
  }

  /* ---------- two views: the same event as different outlets word it ---------- */
  var viewsMemo = {};
  function viewsTopic() {
    if (S.topics.indexOf('world') >= 0) return 'world';
    var ok = S.topics.filter(function (id) { return TP.byId[id] && TP.byId[id].feeds.length >= 3; });
    return ok[0] || null;
  }
  function loadViews(el) {
    var tp = viewsTopic(); if (!tp) return;
    var k = tp + '|' + S.lang;
    var go = viewsMemo[k] ? Promise.resolve(viewsMemo[k]) : fetch('/api/views?t=' + tp + '&lang=' + S.lang)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { if (j && Array.isArray(j.events)) viewsMemo[k] = j.events; return viewsMemo[k] || []; })
      .catch(function () { return []; });
    go.then(function (evs) {
      if (!el.isConnected || !evs.length) return;
      el.hidden = false; clear(el);
      el.appendChild(h('h2', dotted(t('viewsH') + '.')));
      el.appendChild(h('p.qsub', t('viewsSub')));
      evs.forEach(function (e) {
        el.appendChild(h('div.vev', h('h3', e.title),
          h('ul.vlist', e.views.map(function (v) {
            return h('li', h('a.vsrc', { href: safeUrl(v.url), target: '_blank', rel: 'noopener noreferrer', title: v.headline }, v.source + ' ↗'), h('span.vang', v.angle));
          })),
          e.diff ? h('p.vdiff', e.diff) : null));
      });
      el.appendChild(h('p.dnote', t('viewsNote')));
    });
  }

  /* ---------- prediction of the day: one tap, the world's split, and the result a few days later ---------- */
  var Pred = { s: {} };
  function prune() { var ks = Object.keys(S.pr).sort(); ks.slice(0, -20).forEach(function (k) { delete S.pr[k]; }); }
  function loadPred(el) {
    S.pr = S.pr || {};
    function get(retry) {
      return fetch('/api/predict?lang=' + S.lang + '&d=' + encodeURIComponent(did())).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
        .then(function (j) { return j && j.on && !j.q && !retry ? new Promise(function (ok) { setTimeout(ok, 6000); }).then(function () { return get(true); }) : j; });
    }
    get(false).then(function (j) {
      if (!el.isConnected || !j || !j.on || !j.q) return;
      var id = j.q.id, e = S.pr[id] = Object.assign(S.pr[id] || {}, { q: j.q.text });
      if (j.mine) e.v = j.mine;
      if (j.s) Pred.s[id] = j.s;
      Pred.cc = j.cc || ''; prune(); save();
      predDraw(el, id);
      // old questions the reader voted on: ask whether the news has settled them
      Object.keys(S.pr).filter(function (k) { return k !== id && S.pr[k].v && !S.pr[k].o; }).slice(-3).forEach(function (k) {
        fetch('/api/predict?resolve=' + k).then(function (r) { return r.ok ? r.json() : null; }).then(function (r) {
          if (!r || !r.o || !S.pr[k]) return;
          S.pr[k].o = r.o; S.pr[k].src = r.source ? { source: r.source, url: r.url, title: r.title } : null; save();
          if (el.isConnected) predDraw(el, id);
        }).catch(function () { /* settled next time */ });
      });
    });
  }
  function predDraw(el, id) {
    var e = S.pr[id]; clear(el); el.hidden = false;
    el.appendChild(h('h2', dotted(t('predH') + '.')));
    el.appendChild(h('p.qsub', t('predSub')));
    // earlier questions that have been settled and not shown yet
    Object.keys(S.pr).filter(function (k) { return k !== id && S.pr[k].o && !S.pr[k].seen; }).forEach(function (k) {
      var p = S.pr[k], res = p.o === 'y' ? t('predY') : p.o === 'n' ? t('predNn') : t('predX');
      el.appendChild(h('div.qcard.pold', h('p.qsub', t('predEarlier')), h('p.qq', p.q),
        h('p.pres' + (p.o === p.v ? '.ok' : ''), res + (p.o === 'x' ? '' : ' · ' + (p.o === p.v ? t('predRight') : t('predWrong')))),
        p.src ? h('p.qfrom', h('a', { href: safeUrl(p.src.url), target: '_blank', rel: 'noopener noreferrer' }, p.src.source + ': ' + p.src.title)) : null));
      p.seen = 1;
    });
    save();
    var card = h('div.qcard', h('p.qq', e.q));
    if (!e.v) {
      var row = h('div.pbtns');
      [['y', t('predYes')], ['n', t('predNo')]].forEach(function (b) {
        var btn = h('button.pbtn', { type: 'button' }, b[1]);
        btn.addEventListener('click', function () { predVote(el, id, b[0], row); });
        row.appendChild(btn);
      });
      card.appendChild(row);
    } else {
      var s = Pred.s[id], tot = s ? s.y + s.n : 0;
      if (!s || tot < 5) card.appendChild(h('p.rxnote', (e.v === 'y' ? t('predYes') : t('predNo')) + ' · ' + t('predFirst')));
      else {
        var py = Math.round(s.y / tot * 100), pn = 100 - py;
        card.appendChild(h('div.rxres', [['y', t('predYes'), py], ['n', t('predNo'), pn]].map(function (r) {
          return h('div.rxr.prow' + (r[0] === e.v ? '.me' : ''), h('span.rxl', r[1]), h('span.rxbar', h('i', { style: 'width:' + Math.max(3, r[2]) + '%' })), h('span.rxp', r[2] + '%'));
        })));
        card.appendChild(h('p.rxnote', t('predN', { n: tot })));
      }
      card.appendChild(h('p.rxnote', t('predWait')));
    }
    el.appendChild(card);
    var done = Object.keys(S.pr).filter(function (k) { return S.pr[k].v && (S.pr[k].o === 'y' || S.pr[k].o === 'n'); });
    if (done.length) {
      var right = done.filter(function (k) { return S.pr[k].o === S.pr[k].v; }).length;
      el.appendChild(h('p.qsub', t('predRecord', { a: right, b: done.length })));
    }
    if (Object.keys(S.pr).some(function (k) { return S.pr[k].o; })) el.appendChild(h('p.dnote', t('predNote')));
  }
  function predVote(el, id, v, row) {
    Array.prototype.forEach.call(row.children, function (b) { b.disabled = true; });
    fetch('/api/predict', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: id, v: v, d: did() }) })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (j) {
        if (!j || !j.s) throw 0;
        S.pr[id].v = j.mine || v; Pred.s[id] = j.s; save(); predDraw(el, id);
      })
      .catch(function () { toast(t('rxFail')); Array.prototype.forEach.call(row.children, function (b) { b.disabled = false; }); });
  }


  // A thin line under the header shows how far through the issue the reader is. It is not a timer.
  function progress() {
    var bar = $('prog'), prev = cleanup;
    function on() { var max = document.documentElement.scrollHeight - window.innerHeight; bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')'; }
    window.addEventListener('scroll', on, { passive: true }); on();
    cleanup = function () { window.removeEventListener('scroll', on); bar.style.transform = 'scaleX(0)'; Say.stop(); if (prev) prev(); };
  }

  // The streak is counted when the reader reaches the end of the issue.
  function wire(end, streak, week) {
    var io = null;
    function show() { streak.hidden = false; streak.textContent = curStreak() > 1 ? t('streak', { n: curStreak() }) : t('streak1'); week.replaceWith(week = weekRow()); flame(); }
    function complete() {
      var td = today();
      if (S.last !== td) { S.streak = S.last === ymd(new Date(Date.now() - 864e5)) ? (S.streak || 0) + 1 : 1; S.last = td; S.days = (S.days || []).concat(td).slice(-30); save(); }
      show();
      if (io) io.disconnect();
    }
    if ('IntersectionObserver' in window) { io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) complete(); }, { threshold: 0.6 }); io.observe(end); }
    else complete();
    if (S.last === today()) show();
    cleanup = function () { if (io) io.disconnect(); };
  }

  function shareText(text) {
    var link = location.origin + '/?t=' + S.topics.join(',') + '&l=' + S.lang + '&m=' + S.mins;
    if (navigator.share) { navigator.share({ title: 'newzeem.', text: text, url: link }).catch(function () { /* cancelled */ }); return; }
    var done = function () { toast(t('copied')); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text + '\n' + link).then(done, done); else done();
  }

  function share() {
    var link = location.origin + '/?t=' + S.topics.join(',') + '&l=' + S.lang + '&m=' + S.mins;
    var data = { title: 'newzeem.', text: t('shareText'), url: link };
    if (navigator.share) { navigator.share(data).catch(function () { /* cancelled */ }); return; }
    var done = function () { toast(t('copied')); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(done, done); else done();
  }

  var sel = $('lang');
  TP.langNames.forEach(function (l) { sel.appendChild(h('option', { value: l[0], lang: l[0] }, l[1])); });
  sel.addEventListener('change', function () { S.lang = sel.value; save(); S.topics.length ? renderDigest() : renderPick(false); });
  $('btn-topics').addEventListener('click', function () { renderPick(true); });
  if (S.topics.length) renderDigest(); else renderPick(false);
})();
