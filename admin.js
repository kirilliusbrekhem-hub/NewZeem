/* newzeem admin: moderation queue, published posts, authors, chat, sources. The password is the ADMIN_TOKEN set in Vercel;
   it stays in this browser tab only (sessionStorage) and goes to the server in a header. */
(function () {
  'use strict';
  var TOPIC = { world: '🌍 Мир', tech: '💻 Технологии', ai: '🤖 ИИ', business: '📈 Бизнес', science: '🔬 Наука', health: '🩺 Здоровье', climate: '🌱 Климат', sport: '⚽ Спорт', culture: '🎬 Культура', games: '🎮 Игры', edu: '🎓 Образование', other: '💡 Другое' };
  var LV = ['🌱 Новичок', '✍️ Автор', '🎓 Эксперт', '🏆 Легенда'];
  var REASONS = ['Нет источников или они не подтверждают текст', 'Реклама или самопиар', 'Слишком коротко, мало пользы', 'Оскорбления или травля', 'Личные данные людей', 'Недостоверная информация', 'Не по теме сайта'];
  var pass = '';
  try { pass = sessionStorage.getItem('nz-admin') || ''; } catch (e) { /* private mode */ }
  var tab = 'queue', counts = {};

  function h(spec, attrs) {
    var parts = spec.split('.'), el = document.createElement(parts[0] || 'div');
    if (parts.length > 1) el.className = parts.slice(1).join(' ');
    var i = 1;
    if (attrs && typeof attrs === 'object' && !attrs.nodeType && !Array.isArray(attrs)) {
      i = 2;
      Object.keys(attrs).forEach(function (k) { if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]); else if (attrs[k] != null && attrs[k] !== false) el.setAttribute(k, attrs[k]); });
    }
    for (; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function add(el, c) { if (c == null || c === false) return; if (Array.isArray(c)) return c.forEach(function (x) { add(el, x); }); el.appendChild(c.nodeType ? c : document.createTextNode(String(c))); }
  function $(id) { return document.getElementById(id); }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }
  function toast(m) { var t = h('div.toast', m); document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2400); }
  function when(ms) { return new Date(ms).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); }
  function safe(u) { return /^https?:\/\//i.test(u) ? u : '#'; }
  function api(a, body) {
    return fetch('/api/admin?a=' + a, { method: body ? 'POST' : 'GET', headers: { 'content-type': 'application/json', 'x-admin': pass }, body: body ? JSON.stringify(body) : undefined })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j._s = r.status; return j; }); })
      .catch(function () { return { _s: 0 }; });
  }

  function login(msg) {
    $('nav').hidden = true; $('out').hidden = true;
    var inp = h('input.in', { type: 'password', placeholder: 'Пароль (ADMIN_TOKEN)', autocomplete: 'current-password' });
    var go = h('button.btn.dark', { type: 'submit' }, 'Войти');
    var f = h('form.card.login', h('h2', 'Вход в админку'), h('p.muted', 'Пароль — значение переменной ADMIN_TOKEN в настройках проекта на Vercel.'), msg ? h('p', { style: 'color:var(--accent);font-weight:800' }, msg) : null, inp, h('div.row', go));
    f.addEventListener('submit', function (e) {
      e.preventDefault(); pass = inp.value; go.disabled = true;
      api('stats').then(function (j) {
        go.disabled = false;
        if (j._s === 200) { try { sessionStorage.setItem('nz-admin', pass); } catch (er) { /* fine */ } start(); }
        else login(j._s === 503 && j.error === 'locked' ? 'Админка закрыта: в Vercel не задан ADMIN_TOKEN (минимум 12 символов). Добавьте его и сделайте редеплой.' : j._s === 429 ? 'Слишком много попыток. Подождите 15 минут.' : j._s === 401 ? 'Неверный пароль.' : 'Не получилось: сервер ответил ' + j._s);
      });
    });
    clear($('main')).appendChild(f); inp.focus();
  }

  function start() {
    $('out').hidden = false; $('nav').hidden = false;
    api('stats').then(function (s) { if (s._s === 401) return login('Сессия устарела, войдите снова.'); counts = s; nav(); show(); });
  }
  var TABS = [['overview', 'Обзор'], ['visits', 'Посетители'], ['queue', 'Очередь'], ['posts', 'Опубликованные'], ['authors', 'Авторы'], ['chat', 'Чат'], ['feeds', 'Источники']];
  function nav() {
    clear($('nav'));
    TABS.forEach(function (x) {
      var n = x[0] === 'queue' ? counts.pending : x[0] === 'chat' ? counts.reported : 0;
      $('nav').appendChild(h('button', { type: 'button', 'aria-pressed': String(tab === x[0]), onclick: function () { tab = x[0]; nav(); show(); } }, x[1], n ? h('span', String(n)) : null));
    });
  }
  function refresh() { api('stats').then(function (s) { if (s._s === 200) { counts = s; nav(); } }); show(); }
  function show() {
    var m = clear($('main'));
    ({ overview: overview, visits: visits, queue: queue, posts: posts, authors: authors, chat: chat, feeds: feeds })[tab](m);
  }

  function overview(m) {
    var s = counts;
    m.appendChild(h('h1', 'Обзор'));
    m.appendChild(h('div.grid',
      h('div.tile' + (s.pending ? '.hot' : ''), h('b', String(s.pending || 0)), h('span', 'постов ждут проверки')),
      h('div.tile', h('b', String(s.live || 0)), h('span', 'опубликовано')),
      h('div.tile', h('b', String(s.authors || 0)), h('span', 'авторов')),
      h('div.tile', h('b', String(s.chat || 0)), h('span', 'сообщений в чате')),
      h('div.tile' + (s.reported ? '.hot' : ''), h('b', String(s.reported || 0)), h('span', 'жалоб в чате')),
      h('div.tile', h('b', String(s.votesToday || 0)), h('span', 'голосов в прогнозе дня')),
      h('div.tile', h('b', String(s.newsReactedToday || 0)), h('span', 'новостей с реакциями сегодня')),
      h('div.tile', h('b', s.ai ? 'да' : 'нет'), h('span', 'ИИ-ключ подключён'))));
    m.appendChild(h('div.card', h('h2', 'Как это работает'),
      h('p', 'Авторы пишут посты, ИИ даёт подсказку (оценка и флаги), а решение за вами. Опубликованный пост попадает в ленту, топ и даёт автору +5 репутации; отклонённый — −3. Каждый «Полезно» от читателя даёт автору +2.'),
      h('p.muted', 'Три жалобы читателей скрывают сообщение в чате до вашего решения. Бан закрывает автору чат, публикации и страницу.')));
  }

  var LANGN = { en: 'English', es: 'Español', pt: 'Português', fr: 'Français', de: 'Deutsch', ru: 'Русский', hi: 'हिन्दी', zh: '中文', ar: 'العربية', xx: '—' };
  function country(cc) { if (cc === 'XX') return 'Неизвестно'; try { return new Intl.DisplayNames(['ru'], { type: 'region' }).of(cc) || cc; } catch (e) { return cc; } }
  function pct(a, b) { return b ? Math.round(a / b * 100) + '%' : '—'; }
  function visits(m) {
    m.appendChild(h('h1', 'Посетители'));
    m.appendChild(h('p.muted', 'Анонимно: каждое устройство считается один раз в день. Без имён, IP и cookies.'));
    var box = h('div', h('p.muted', 'Загружаю…')); m.appendChild(box);
    api('visits').then(function (j) {
      clear(box);
      if (!j.days) { box.appendChild(h('p.empty', 'Не удалось загрузить.')); return; }
      var d = j.days, td = d[d.length - 1], w = d.slice(-7), s = function (k, list) { return (list || w).reduce(function (n, x) { return n + (x[k] || 0); }, 0); };
      box.appendChild(h('div.grid',
        h('div.tile.hot', h('b', String(td.open || 0)), h('span', 'посетителей сегодня')),
        h('div.tile', h('b', String(s('open'))), h('span', 'визитов за 7 дней (по дням)')),
        h('div.tile', h('b', String(td.new || 0)), h('span', 'новых сегодня')),
        h('div.tile', h('b', pct(s('back'), s('open'))), h('span', 'вернулись на следующий день (7 дн.)')),
        h('div.tile', h('b', pct(s('issue'), s('open'))), h('span', 'собрали выпуск (7 дн.)')),
        h('div.tile', h('b', pct(s('done'), s('issue'))), h('span', 'дочитали до конца (7 дн.)'))));
      var max = Math.max.apply(null, d.map(function (x) { return x.open || 0; }).concat(1));
      var chart = h('div', { style: 'display:flex;align-items:flex-end;gap:6px;height:180px;margin-top:14px' }, d.map(function (x) {
        var o = x.open || 0, dn = x.done || 0;
        return h('div', { style: 'flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end', title: x.day + ': ' + o + ' посетителей, ' + dn + ' дочитали' },
          h('b', { style: 'font-size:11px' }, o ? String(o) : ''),
          h('div', { style: 'width:100%;max-width:34px;border:2px solid var(--ink);border-radius:6px 6px 0 0;background:var(--mark);position:relative;height:' + Math.max(2, Math.round(o / max * 140)) + 'px' },
            h('div', { style: 'position:absolute;left:0;right:0;bottom:0;background:var(--accent);height:' + (o ? Math.round(dn / o * 100) : 0) + '%' })),
          h('span', { style: 'font-size:10px;color:var(--muted)' }, x.day.slice(8) + '.' + x.day.slice(5, 7)));
      }));
      box.appendChild(h('div.card', h('h2', '14 дней'), h('p.muted', 'Жёлтое — посетители, красное — дочитали выпуск до конца.'), chart));
      function top(obj, name) {
        var ks = Object.keys(obj).sort(function (a, b) { return obj[b] - obj[a]; }).slice(0, 10), tot = ks.reduce(function (n, k) { return n + obj[k]; }, 0);
        return h('div.card', h('h2', name), ks.length ? h('table', h('tbody', ks.map(function (k) { return h('tr', h('td', k.length === 2 && k === k.toUpperCase() ? country(k) : (LANGN[k] || k)), h('td', String(obj[k])), h('td', pct(obj[k], tot))); }))) : h('p.empty', 'Пока нет данных.'));
      }
      box.appendChild(top(j.countries || {}, 'Страны (7 дней)'));
      box.appendChild(top(j.langs || {}, 'Языки (7 дней)'));
    });
  }
  function aiBox(ai) {
    if (!ai) return h('div.ai', 'Подсказки ИИ нет (ИИ был недоступен).');
    return h('div.ai', h('b', 'ИИ: ' + '★'.repeat(ai.score) + '☆'.repeat(5 - ai.score) + ' '), (ai.flags || []).map(function (f) { return h('span.pill.warn', f); }), ' ', ai.note || '');
  }
  function queue(m) {
    m.appendChild(h('h1', 'Очередь на проверку'));
    var box = h('div', h('p.muted', 'Загружаю…')); m.appendChild(box);
    api('queue').then(function (j) {
      clear(box);
      if (!j.posts || !j.posts.length) { box.appendChild(h('p.empty', 'Очередь пуста. Отличная работа ☕')); return; }
      var au = {}; (j.authors || []).forEach(function (a) { au[a.id] = a; });
      j.posts.forEach(function (p) {
        var a = au[p.aid] || {}, lvl = (a.rep || 0) >= 500 ? 3 : (a.rep || 0) >= 100 ? 2 : (a.rep || 0) >= 20 ? 1 : 0;
        var reason = h('input.in', { type: 'text', placeholder: 'Причина отказа (увидит автор)' });
        var card = h('div.card',
          h('div.meta', h('span.pill', TOPIC[p.topic] || p.topic), h('span.pill', p.lang), h('span', when(p.at)), h('span', '· ' + p.body.length + ' симв.')),
          h('h2', { style: 'margin-top:10px' }, p.title),
          h('div.meta', h('b', a.name || p.name), h('span', LV[lvl]), h('span', 'реп. ' + (a.rep || 0)), h('span', 'опубл. ' + (a.np || 0) + ', откл. ' + (a.nr || 0)), a.ban ? h('span.pill.warn', 'забанен') : null),
          aiBox(p.ai),
          h('div.body', p.body),
          h('ul.links', (p.links || []).map(function (u) { return h('li', h('a', { href: safe(u), target: '_blank', rel: 'noopener noreferrer' }, u)); })),
          h('div.row', h('button.btn.ok', { type: 'button', onclick: function (e) { act(e.currentTarget, 'approve', { id: p.id }, 'Опубликовано'); } }, '✓ Опубликовать')),
          h('div.row', reason), h('div.reasons', REASONS.map(function (r) { return h('button', { type: 'button', onclick: function () { reason.value = r; } }, r); })),
          h('div.row', h('button.btn.no', { type: 'button', onclick: function (e) { if (!reason.value.trim()) { toast('Напишите причину'); reason.focus(); return; } act(e.currentTarget, 'reject', { id: p.id, reason: reason.value.trim() }, 'Отклонено'); } }, '✕ Отклонить')));
        box.appendChild(card);
      });
    });
  }
  function act(btn, a, body, ok) {
    btn.disabled = true;
    api(a, body).then(function (j) { if (j.ok) { toast(ok); refresh(); } else { btn.disabled = false; toast('Ошибка: ' + (j.error || j._s)); } });
  }
  function posts(m) {
    m.appendChild(h('h1', 'Опубликованные'));
    var box = h('div', h('p.muted', 'Загружаю…')); m.appendChild(box);
    api('posts').then(function (j) {
      clear(box);
      if (!j.posts || !j.posts.length) { box.appendChild(h('p.empty', 'Пока нет опубликованных постов.')); return; }
      var t = h('table', h('thead', h('tr', h('th', 'Пост'), h('th', 'Автор'), h('th', 'Полезно / просмотры'), h('th', 'Дата'), h('th', ''))));
      var tb = h('tbody'); t.appendChild(tb);
      j.posts.forEach(function (p) {
        tb.appendChild(h('tr', h('td', h('a', { href: '/p/' + p.id, target: '_blank', rel: 'noopener' }, p.title), h('div.muted', TOPIC[p.topic] || p.topic)), h('td', p.name), h('td', p.useful + ' / ' + p.views), h('td', when(p.mod || p.at)),
          h('td', h('button.btn', { type: 'button', onclick: function (e) { var r = prompt('Почему снимаете пост? (увидит автор)', ''); if (r == null) return; act(e.currentTarget, 'unpublish', { id: p.id, reason: r }, 'Снято с публикации'); } }, 'Снять'))));
      });
      box.appendChild(h('div.card', t));
    });
  }
  function authors(m) {
    m.appendChild(h('h1', 'Авторы'));
    var box = h('div', h('p.muted', 'Загружаю…')); m.appendChild(box);
    api('authors').then(function (j) {
      clear(box);
      if (!j.authors || !j.authors.length) { box.appendChild(h('p.empty', 'Авторов пока нет.')); return; }
      var t = h('table', h('thead', h('tr', h('th', 'Автор'), h('th', 'Репутация'), h('th', 'Посты'), h('th', 'С нами с'), h('th', ''))));
      var tb = h('tbody'); t.appendChild(tb);
      j.authors.forEach(function (a) {
        tb.appendChild(h('tr', h('td', h('b', a.name), a.ban ? ' ' : null, a.ban ? h('span.pill.warn', 'бан') : null, a.bio ? h('div.muted', a.bio) : null), h('td', String(a.rep)), h('td', a.np + ' ✓ / ' + a.nr + ' ✕ · ' + a.nu + ' полезно'), h('td', when(a.at)),
          h('td', a.ban ? h('button.btn', { type: 'button', onclick: function (e) { act(e.currentTarget, 'unban', { aid: a.id }, 'Разбанен'); } }, 'Разбанить')
            : h('button.btn.no', { type: 'button', onclick: function (e) { if (confirm('Забанить ' + a.name + '? Он не сможет писать посты и в чат.')) act(e.currentTarget, 'ban', { aid: a.id }, 'Забанен'); } }, 'Бан'))));
      });
      box.appendChild(h('div.card', t));
    });
  }
  function chat(m) {
    m.appendChild(h('h1', 'Чат авторов'));
    var box = h('div', h('p.muted', 'Загружаю…')); m.appendChild(box);
    api('chat').then(function (j) {
      clear(box);
      var hid = {}; (j.hidden || []).forEach(function (id) { hid[id] = 1; });
      var rep = j.reports || {}, msgs = j.msgs || [];
      var flagged = msgs.filter(function (x) { return rep[x.id]; });
      function row(x) {
        return h('div.msg' + (hid[x.id] ? '.hid' : ''), h('div.meta', h('b', x.name), h('span', when(x.at)), rep[x.id] ? h('span.pill.warn', 'жалоб: ' + rep[x.id]) : null, hid[x.id] ? h('span.pill', 'скрыто') : null),
          h('div', { style: 'white-space:pre-wrap;overflow-wrap:anywhere;margin-top:4px' }, x.t),
          h('div.row', hid[x.id] || rep[x.id] ? h('button.btn.ok', { type: 'button', onclick: function (e) { act(e.currentTarget, 'keep', { id: x.id }, 'Оставлено'); } }, 'Оставить') : null,
            hid[x.id] ? null : h('button.btn.no', { type: 'button', onclick: function (e) { act(e.currentTarget, 'hide', { id: x.id }, 'Скрыто'); } }, 'Скрыть')));
      }
      if (flagged.length) box.appendChild(h('div.card', h('h2', 'Жалобы'), flagged.map(row)));
      box.appendChild(h('div.card', h('h2', 'Все сообщения'), msgs.length ? msgs.map(row) : h('p.empty', 'Сообщений пока нет.')));
    });
  }
  function feeds(m) {
    m.appendChild(h('h1', 'Источники новостей'));
    var box = h('div', h('p.muted', 'Проверяю все ленты, это около 7 секунд…')); m.appendChild(box);
    fetch('/api/feeds').then(function (r) { return r.json(); }).then(function (j) {
      clear(box);
      box.appendChild(h('div.grid', h('div.tile' + (j.working < j.total ? '.hot' : ''), h('b', j.working + ' / ' + j.total), h('span', 'лент отвечают')),
        Object.keys(j.topics).map(function (k) { return h('div.tile', h('b', j.topics[k]), h('span', TOPIC[k] || k)); })));
      var t = h('table.feeds', h('thead', h('tr', h('th', 'Издание'), h('th', 'Статус'), h('th', 'Новостей'), h('th', 'Свежая'))));
      var tb = h('tbody'); t.appendChild(tb);
      j.all.forEach(function (f) { tb.appendChild(h('tr', h('td', h('b', f.source), h('div.muted', f.url)), h('td', f.items > 0 ? h('span.pill.good', 'ок') : h('span.pill.warn', f.status || f.error || 'нет')), h('td', String(f.items)), h('td', f.newest || '—'))); });
      box.appendChild(h('div.card', t));
    }).catch(function () { clear(box).appendChild(h('p.empty', 'Не удалось проверить ленты.')); });
  }

  $('out').addEventListener('click', function () { pass = ''; try { sessionStorage.removeItem('nz-admin'); } catch (e) { /* fine */ } login(); });
  if (pass) start(); else login();
})();
