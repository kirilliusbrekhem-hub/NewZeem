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
      foot: 'newzeem бесплатный и без рекламы. Темы хранятся только на вашем устройстве, мы не следим за вами. Пересказы делает ИИ и он может ошибаться: проверяйте по ссылке на источник. Реакции и голоса считаются анонимно.',
      viewsH: 'Два взгляда', viewsSub: 'Одно событие у разных изданий. Смотрите, как каждое его подаёт.', viewsNote: 'Сравнение написал ИИ по заголовкам самих изданий. Он не решает, кто прав.', followH: 'Что изменилось с вчера', followWas: 'Вчера', followNow: 'Сегодня', predH: 'Прогноз дня', predSub: 'Один тап. Узнайте, что думает мир, и возвращайтесь за результатом.', predYes: 'Да', predNo: 'Нет', predFirst: 'Вы одним из первых. Загляните позже: увидите, что думает мир.', predN: 'Голосов: {n}', predWait: 'Результат появится здесь в течение 3 дней.', predY: 'Сбылось', predNn: 'Не сбылось', predX: 'Закрыт: в новостях нет ясного ответа', predRight: 'Вы угадали', predWrong: 'В этот раз нет', predRecord: 'Ваш счёт: {a} из {b}', predNote: 'Итог подвёл ИИ по заголовкам новостей. Сверьтесь с источником.', predEarlier: 'Прошлый прогноз',
      docs: 'Документы', privacy: 'Политика конфиденциальности', terms: 'Условия использования', contact: 'Связь', ckH: 'Мы не следим за вами.', ckP: 'У newzeem нет рекламы и следящих cookies. На вашем устройстве хранятся только настройки: темы, язык и серия.', ckOk: 'Понятно', ckMore: 'Подробнее', photoBy: 'Фото: {s}', morningKick: 'Ваш выпуск · {m} мин', streakH: 'Ваша серия',
      other: 'Другое', pickFull: 'Подборка заполнена (20)', pickAdd: 'В мою подборку', picked: 'Добавлено в подборку', unpicked: 'Убрано из подборки', saveL: 'Сохранить', saved: 'Сохранено', unsaved: 'Убрано из сохранённого', forYou: 'Для вас', inside: 'В сегодняшнем выпуске', quick: 'Коротко', quickSub: 'Ещё {n} — по строчке', cFeed: 'Посты', cTop: 'Топ', cChat: 'Чат', write: 'Написать', authorsH: 'Авторы', authorsSub: 'Разборы от читателей. Каждый проверяет модератор.', cNew: 'Новые', cOff: 'Сообщество ещё не включено.', cEmpty: 'Постов пока нет. Будьте первым.', topNews: 'Самое обсуждаемое сегодня', topNone: 'Пока пусто.', topPosts: 'Лучшие посты', topAuthors: 'Лучшие авторы', repN: '{n} реп.', tabIssue: 'Выпуск', tabAuthors: 'Авторы', tabMe: 'Моё', missing: 'Страница недоступна.', usefulL: 'Полезно', thanks: 'Спасибо!', sources: 'Источники', postNote: 'Написал читатель, проверил модератор. Сверяйтесь с источниками.', rep: 'репутация', nPosts: 'постов', nUseful: 'сочли полезным', toNext: '{n} до уровня «{l}»', writeH: 'Написать пост', writeSub: 'Объясните что-то ясно и с источниками. Модератор читает каждый пост до публикации.', banned: 'Ваша страница автора заблокирована.', fTitle: 'Понятный заголовок', fBody: 'Объясните просто: факты, контекст, почему это важно.', fLink: 'Ссылка на источник (обязательно)', fLink2: 'Ещё источник (необязательно)', sendMod: 'Отправить на проверку', minChars: 'Минимум {n} символов', fTitleL: 'Заголовок', fTopicL: 'Тема', fBodyL: 'Текст', fLinksL: 'Источники', rule1: 'Факты с источниками, без рекламы и самопиара.', rule2: 'Без оскорблений и чужих личных данных.', rule3: 'Решает модератор, вам придёт уведомление.', eTitle: 'Заголовок слишком короткий', eLinks: 'Добавьте хотя бы одну ссылку на источник', sentMod: 'Отправлено! Модератор скоро посмотрит.', myPosts: 'Мои посты', fName: 'Псевдоним', fBio: 'Пара слов о себе (необязательно)', join: 'Стать автором', joinH: 'Выберите псевдоним', joinSub: 'Без почты и пароля: на устройстве хранится секретный ключ. Его можно скопировать в «Моё», чтобы войти с другого устройства.', fNameL: 'Псевдоним', fBioL: 'О себе', haveKey: 'У меня уже есть ключ', welcome: 'Добро пожаловать!', keyPh: 'Вставьте ключ автора', useKey: 'Войти', eKey: 'Этот ключ не подходит', chatSub: 'Авторы обсуждают свои темы. Будьте вежливы.', chatEmpty: 'Сообщений пока нет.', report: 'Пожаловаться', reported: 'Спасибо, модератор посмотрит', chatJoin: 'Писать в чат могут только авторы.', chatPh: 'Сообщение', send: 'Отправить', fromAuthors: 'От наших авторов', allPosts: 'Все посты', remove: 'Убрать', myPicks: 'Моя подборка на день', myPicksSub: 'Ваш собственный короткий выпуск. Поделитесь им ссылкой.', picksEmpty: 'Нажмите + под новостью, чтобы добавить её сюда.', sharePicks: 'Поделиться подборкой', savedH: 'Сохранённое', savedEmpty: 'Нажмите закладку под новостью, чтобы сохранить её.', myAuthor: 'Моя страница автора', becomeSub: 'Пишите разборы, получайте репутацию и читателей.', publicPage: 'Публичная страница', keyH: 'Мой ключ автора', keySub: 'Не показывайте его никому. С ним можно войти с другого устройства.', copy: 'Копировать', settings: 'Настройки', interestsNote: 'Интересы считаются только на этом устройстве: по тому, что вы сохраняете, добавляете и открываете.', cleared: 'Интересы сброшены', clearInterests: 'Сбросить интересы', nOk: 'Ваш пост опубликован', nNo: 'Пост не опубликован', nOff: 'Пост снят с публикации', nTop: 'Главная новость дня', nRec: 'Новое от {a}', notesH: 'Уведомления', notesEmpty: 'Ничего нового.', lv0: 'Новичок', lv1: 'Автор', lv2: 'Эксперт', lv3: 'Легенда', st_pending: 'На проверке', st_live: 'Опубликован', st_rejected: 'Не опубликован', eLimit: 'Можно отправить 3 поста в день', eName: 'Псевдоним: 3–24 буквы или цифры', eTaken: 'Этот псевдоним занят', eSlow: 'Чуть помедленнее'
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
      foot: 'newzeem is free and has no ads. Your topics are stored on your device only, and we do not track you. Summaries are written by an AI and can be wrong: check the source link. Reactions and votes are counted anonymously.',
      viewsH: 'Two views', viewsSub: 'One event, reported by different outlets. See how each one frames it.', viewsNote: 'Comparison written by AI from the outlets\' own headlines. It does not say who is right.', followH: 'What changed since yesterday', followWas: 'Yesterday', followNow: 'Today', predH: 'Prediction of the day', predSub: 'One tap. See what the world thinks, then come back for the result.', predYes: 'Yes', predNo: 'No', predFirst: 'You are among the first. Come back later to see the world.', predN: '{n} votes', predWait: 'The result will appear here within 3 days.', predY: 'It happened', predNn: 'It did not happen', predX: 'Closed: nothing clear in the news', predRight: 'You called it', predWrong: 'Not this time', predRecord: 'Your record: {a} of {b}', predNote: 'Settled by AI from news headlines. Check the source.', predEarlier: 'Earlier prediction',
      docs: 'Documents', privacy: 'Privacy policy', terms: 'Terms of use', contact: 'Contact', ckH: 'We don’t track you.', ckP: 'newzeem has no ads and no tracking cookies. Only your settings (topics, language, streak) are kept on this device.', ckOk: 'Got it', ckMore: 'Learn more', photoBy: 'Photo: {s}', morningKick: 'Your issue · {m} min', streakH: 'Your streak',
      other: 'Other', pickFull: 'Your picks are full (20)', pickAdd: 'Add to my picks', picked: 'Added to your picks', unpicked: 'Removed from your picks', saveL: 'Save', saved: 'Saved', unsaved: 'Removed from saved', forYou: 'For you', inside: 'In today\'s issue', quick: 'Quick hits', quickSub: '{n} more in one line each', cFeed: 'Posts', cTop: 'Top', cChat: 'Chat', write: 'Write', authorsH: 'Authors', authorsSub: 'Explainers by readers, checked by a moderator before they appear.', cNew: 'New', cOff: 'The community is not switched on yet.', cEmpty: 'No posts yet. Be the first.', topNews: 'Most discussed news today', topNone: 'Nothing here yet.', topPosts: 'Top posts', topAuthors: 'Top authors', repN: '{n} rep', tabIssue: 'Issue', tabAuthors: 'Authors', tabMe: 'Mine', missing: 'This page is not available.', usefulL: 'Useful', thanks: 'Thanks!', sources: 'Sources', postNote: 'Written by a reader and checked by a moderator. Check the sources.', rep: 'reputation', nPosts: 'posts', nUseful: 'found it useful', toNext: '{n} to {l}', writeH: 'Write a post', writeSub: 'Explain something clearly and with sources. A moderator reads every post before it goes live.', banned: 'Your author page is blocked.', fTitle: 'A clear title', fBody: 'Explain it simply. Facts, context, why it matters.', fLink: 'Source link (required)', fLink2: 'Another source (optional)', sendMod: 'Send for review', minChars: 'At least {n} characters', fTitleL: 'Title', fTopicL: 'Topic', fBodyL: 'Text', fLinksL: 'Sources', rule1: 'Facts with sources, no ads or self-promotion.', rule2: 'No insults, no personal data of others.', rule3: 'A moderator decides; you get a notification.', eTitle: 'The title is too short', eLinks: 'Add at least one source link', sentMod: 'Sent! A moderator will review it soon.', myPosts: 'My posts', fName: 'Pen name', fBio: 'A line about you (optional)', join: 'Become an author', joinH: 'Pick a pen name', joinSub: 'No e-mail, no password: this device keeps a secret key. You can copy it in Mine to sign in elsewhere.', fNameL: 'Pen name', fBioL: 'About you', haveKey: 'I already have a key', welcome: 'Welcome!', keyPh: 'Paste your author key', useKey: 'Sign in', eKey: 'This key does not work', chatSub: 'Authors talk shop. Be kind, stay on topic.', chatEmpty: 'No messages yet.', report: 'Report', reported: 'Thanks, a moderator will look', chatJoin: 'Only authors can write in the chat.', chatPh: 'Message', send: 'Send', fromAuthors: 'From our authors', allPosts: 'All posts', remove: 'Remove', myPicks: 'My picks for today', myPicksSub: 'Your own short issue. Share it as a link.', picksEmpty: 'Tap + under any story to add it here.', sharePicks: 'Share my picks', savedH: 'Saved', savedEmpty: 'Tap the bookmark under a story to keep it.', myAuthor: 'My author page', becomeSub: 'Write explainers, earn reputation and reach readers.', publicPage: 'Public page', keyH: 'My author key', keySub: 'Keep it private. With it you can sign in on another device.', copy: 'Copy', settings: 'Settings', interestsNote: 'Your interests are learned on this device only, from what you save, pick and open.', cleared: 'Interests cleared', clearInterests: 'Clear my interests', nOk: 'Your post is live', nNo: 'Your post was not published', nOff: 'Your post was taken down', nTop: 'The big story today', nRec: 'New from {a}', notesH: 'Notifications', notesEmpty: 'Nothing new.', lv0: 'Newcomer', lv1: 'Author', lv2: 'Expert', lv3: 'Legend', st_pending: 'In review', st_live: 'Published', st_rejected: 'Not published', eLimit: 'You can send 3 posts a day', eName: 'Pen name: 3–24 letters or digits', eTaken: 'This pen name is taken', eSlow: 'Slow down a little'
    }
  };

  Object.keys(window.NZ_I18N || {}).forEach(function (k) { D[k] = window.NZ_I18N[k]; });
  var LANGS = TP.langs;

  /* ---------- small helpers ---------- */
  function guess() { var l = String(navigator.language || 'en').slice(0, 2).toLowerCase(); return TP.langs.indexOf(l) >= 0 ? l : 'en'; }
  var memStore = null;
  function load() { try { return JSON.parse(localStorage.getItem('newzeem.v1') || 'null') || memStore; } catch (e) { return memStore; } }
  var S = Object.assign({ lang: guess(), topics: [], read: {}, last: '', streak: 0, cache: null, mins: 5, days: [], rx: {}, did: '', pr: {}, hist: {},
    saved: {}, picks: { day: '', items: [] }, pref: { t: {}, w: {}, n: 0, day: '' }, notes: [], bellSeen: 0, feedSeen: 0, ak: '', me: null, voted: {} }, load() || {});
  if (TP.langs.indexOf(S.lang) < 0) S.lang = 'en';
  var MINS = [1, 3, 5, 10];
  if (MINS.indexOf(S.mins) < 0) S.mins = 5;
  // A shared link carries the sender's topics, language and length: ?t=world,tech&l=es&m=3. ?post=<id> opens an author's post.
  (function () {
    try {
      var q = new URLSearchParams(location.search), tl = (q.get('t') || '').split(',').filter(function (x) { return TP.byId[x]; });
      var post = q.get('post');
      if (post && /^[a-z0-9]{1,14}$/.test(post)) { history.replaceState(null, '', location.pathname + '#/post/' + post); return; }
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
  function topicName(id) { var x = TP.byId[id]; return x ? x[S.lang] || x.en : t('other'); }
  function topicEmoji(id) { var x = TP.byId[id]; return x ? x.e : '💡'; }
  function topicColor(id) { var x = TP.byId[id]; return x ? x.c : '#C8321B'; }
  // Every full stop in a headline is vermilion: the brand's way of saying "this ends here".
  function dotted(str) {
    var out = [];
    String(str).split(/([.。।])/).forEach(function (p) { if (!p) return; out.push(/^[.。।]$/.test(p) ? h('span.dot', p) : p); });
    return out;
  }
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
  function ago(ms) {
    var s = Math.max(1, Math.round((Date.now() - ms) / 1000)), rtf;
    try { rtf = new Intl.RelativeTimeFormat(S.lang, { numeric: 'auto', style: 'short' }); } catch (e) { return ''; }
    if (s < 3600) return rtf.format(-Math.max(1, Math.round(s / 60)), 'minute');
    if (s < 86400) return rtf.format(-Math.round(s / 3600), 'hour');
    return rtf.format(-Math.round(s / 86400), 'day');
  }
  function api(path, opts) {
    opts = opts || {};
    var headers = { 'content-type': 'application/json' };
    if (S.ak) headers['x-nz-key'] = S.ak;
    return fetch(path, { method: opts.body ? 'POST' : 'GET', headers: headers, body: opts.body ? JSON.stringify(opts.body) : undefined })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j = j || {}; j._status = r.status; return j; }); })
      .catch(function () { return { _status: 0 }; });
  }

  var cleanup = null; // removes listeners of the current view
  function view() { if (cleanup) { cleanup(); cleanup = null; } Say.stop(); window.scrollTo(0, 0); return clear($('main')); }

  /* ---------- icons ---------- */
  var ICONS = { play: 'M8 5v14l11-7z', pause: 'M6 5h4v14H6zM14 5h4v14h-4z', next: 'M6 6l8 6-8 6zM16 6h2v12h-2z', prev: 'M18 6l-8 6 8 6zM8 6H6v12h2z',
    save: 'M6 3h12v18l-6-4.2L6 21z', plus: 'M11 4h2v16h-2zM4 11h16v2H4z', share: 'M12 2l5 5h-3.5v7h-3V7H7zM4 13h3v6h10v-6h3v9H4z',
    bell: 'M12 2a6.5 6.5 0 0 0-6.5 6.5V13L3 17v1h18v-1l-2.5-4V8.5A6.5 6.5 0 0 0 12 2zm-2.6 18a2.6 2.6 0 0 0 5.2 0z',
    paper: 'M3.5 8h14v4.5A6.5 6.5 0 0 1 11 19h-1a6.5 6.5 0 0 1-6.5-6.5zm14 1.2h1.3a2.6 2.6 0 0 1 0 5.2h-1.6a7 7 0 0 0 .3-1.8h1.3a.8.8 0 0 0 0-1.6h-1.3zM7 2.5h1.7v4H7zm3.6 1h1.7v3h-1.7zM3 20.5h16V22H3z',
    people: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.5 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3.6 3.1-6 7-6s7 2.4 7 6zm15.5 0c0-2.2-.8-4-2.2-5.2 3.5-.6 6.7 1.4 6.7 5.2z',
    user: 'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm-8.5 9c0-4.4 3.8-7 8.5-7s8.5 2.6 8.5 7z',
    useful: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.6 14.2L5.8 11.6l1.6-1.6 3 3 6.2-6.2 1.6 1.6z',
    back: 'M15.5 4l1.6 1.6L10.7 12l6.4 6.4-1.6 1.6-8-8z', close: 'M6 6l12 12M18 6L6 18', pen: 'M3 17.3V21h3.7L17.8 9.9l-3.7-3.7zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.7 3.7z' };
  function ico(name) {
    var NS = 'http://www.w3.org/2000/svg', s = document.createElementNS(NS, 'svg'), p = document.createElementNS(NS, 'path');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('width', '20'); s.setAttribute('height', '20'); s.setAttribute('aria-hidden', 'true'); s.setAttribute('class', 'ico');
    p.setAttribute('d', ICONS[name]);
    if (name === 'close') { p.setAttribute('fill', 'none'); p.setAttribute('stroke', 'currentColor'); p.setAttribute('stroke-width', '2.4'); p.setAttribute('stroke-linecap', 'round'); } else p.setAttribute('fill', 'currentColor');
    s.appendChild(p); return s;
  }

  /* ---------- the frame: header tabs, bottom bar, bell, footer ---------- */
  var TABS = [['issue', 'paper', 'tabIssue'], ['feed', 'people', 'tabAuthors'], ['me', 'user', 'tabMe']];
  function tabOf(r) { return r === 'feed' || r === 'top' || r === 'chat' || r === 'write' || r === 'post' || r === 'author' ? 'feed' : r === 'me' || r === 'bell' ? 'me' : 'issue'; }
  function chrome(route) {
    document.documentElement.lang = S.lang;
    document.documentElement.dir = TP.rtl.indexOf(S.lang) >= 0 ? 'rtl' : 'ltr';
    document.title = TITLE;
    $('lang').value = S.lang;
    $('slogan').textContent = SLOGAN;
    $('udate').textContent = dateLabel();
    $('bellL').textContent = t('notesH');
    var cur = tabOf(route || 'issue');
    [$('tabs'), $('tabbar')].forEach(function (box) {
      clear(box);
      TABS.forEach(function (x) {
        box.appendChild(h('a.tab', { href: '#/' + (x[0] === 'issue' ? '' : x[0]), 'aria-current': cur === x[0] ? 'page' : null }, ico(x[1]), h('span', t(x[2]))));
      });
    });
    flame(); Bell.badge();
    var f = clear($('foot'));
    f.appendChild(h('div.fin',
      h('div', h('a.flogo', { href: '/' }, 'newzeem', h('span.dot', '.')), h('p', t('foot'))),
      h('div', h('h5', t('docs')), h('a', { href: '/privacy' }, t('privacy')), h('a', { href: '/terms' }, t('terms'))),
      h('div', h('h5', t('contact')), h('a', { href: 'mailto:joneskir4@gmail.com' }, 'joneskir4@gmail.com'), h('a', { href: '#/write' }, t('join')))));
    cookieNote();
  }
  // A one-time notice: there are no tracking cookies, only settings kept on the device.
  function cookieNote() {
    var seen = false; try { seen = localStorage.getItem('nz-ck') === '1'; } catch (e) { seen = true; }
    var old = $('ck'); if (old) old.remove();
    if (seen) return;
    var box = h('div.ck', { id: 'ck', role: 'region', 'aria-label': t('ckH') }, h('div.ckin',
      h('div', h('b', t('ckH')), h('p', t('ckP'))),
      h('div.ckb', h('a.lnk', { href: '/privacy' }, t('ckMore')), h('button.btn.dark', { type: 'button', onclick: function () { try { localStorage.setItem('nz-ck', '1'); } catch (e) { /* fine */ } box.remove(); } }, t('ckOk')))));
    document.body.appendChild(box);
  }

  /* ---------- personal interests: kept on this device only; they reorder the issue and pick posts for you ---------- */
  var STOP = { this: 1, that: 1, with: 1, from: 1, have: 1, will: 1, about: 1, after: 1, says: 1, said: 1, what: 1, when: 1, more: 1, over: 1, into: 1, their: 1, they: 1, been: 1, were: 1, have: 1, year: 1, years: 1, which: 1, could: 1, would: 1, also: 1, than: 1, most: 1, just: 1, very: 1, это: 1, как: 1, что: 1, для: 1, после: 1, года: 1, будет: 1, может: 1, также: 1, более: 1 };
  function toks(s) {
    var out = {}, str = String(s).toLowerCase();
    (str.match(/[㐀-鿿]+/g) || []).forEach(function (run) { for (var i = 0; i + 1 < run.length; i++) out[run.substr(i, 2)] = 1; });
    str.replace(/[㐀-鿿]+/g, ' ').split(/[^\p{L}\p{M}\p{N}]+/u).forEach(function (w) {
      if (!STOP[w] && w.length >= (/^[a-zà-ÿа-яё\d]+$/.test(w) ? 4 : 3)) out[w] = 1;
    });
    return out;
  }
  function overlap(a, b) {
    var ka = Object.keys(a), n = 0; if (!ka.length) return 0;
    ka.forEach(function (k) { if (b[k]) n++; });
    var m = Math.min(ka.length, Object.keys(b).length);
    return n >= 2 && m ? n / m : 0;
  }
  var Pref = {
    tidy: function () { // interests fade a little every day, so the paper follows the reader's current curiosity
      var p = S.pref, d = today(); if (p.day === d) return; p.day = d;
      Object.keys(p.t).forEach(function (k) { p.t[k] *= 0.9; if (p.t[k] < 0.2) delete p.t[k]; });
      var ws = Object.keys(p.w).map(function (k) { p.w[k] *= 0.9; return k; }).filter(function (k) { return p.w[k] >= 0.3; });
      ws.sort(function (a, b) { return p.w[b] - p.w[a]; });
      var keep = {}; ws.slice(0, 300).forEach(function (k) { keep[k] = p.w[k]; }); p.w = keep;
    },
    like: function (topic, text, w) {
      Pref.tidy();
      var p = S.pref; p.n = (p.n || 0) + 1;
      if (topic) p.t[topic] = (p.t[topic] || 0) + w;
      Object.keys(toks(text)).forEach(function (k) { p.w[k] = (p.w[k] || 0) + w * 0.5; });
      save();
    },
    score: function (topic, text) {
      var p = S.pref, s = (p.t[topic] || 0) * 0.6;
      Object.keys(toks(text)).forEach(function (k) { if (p.w[k]) s += Math.min(3, p.w[k]); });
      return s;
    },
    ready: function () { return (S.pref.n || 0) >= 4; }
  };

  /* ---------- saved stories and today's picks ---------- */
  function snap(it) { return { id: it.id, h: it.headline, g: it.gist || '', u: it.url, s: it.source, t: it.topic, at: Date.now() }; }
  function isSaved(id) { return !!S.saved[id]; }
  function toggleSave(it) {
    if (S.saved[it.id]) delete S.saved[it.id];
    else { S.saved[it.id] = snap(it); Pref.like(it.topic, it.headline + ' ' + (it.gist || ''), 3); var ks = Object.keys(S.saved); if (ks.length > 200) delete S.saved[ks[0]]; }
    save(); return !!S.saved[it.id];
  }
  function picks() { if (S.picks.day !== today()) S.picks = { day: today(), items: [] }; return S.picks.items; }
  function isPicked(id) { return picks().some(function (x) { return x.id === id; }); }
  function togglePick(it) {
    var p = picks(), i = -1; p.forEach(function (x, k) { if (x.id === it.id) i = k; });
    if (i >= 0) p.splice(i, 1); else { if (p.length >= 20) { toast(t('pickFull')); return true; } p.push(snap(it)); Pref.like(it.topic, it.headline, 3); }
    save(); return i < 0;
  }
  function shareNews(it) {
    api('/api/c?a=share', { body: { id: it.id, h: it.headline, g: it.gist || '', u: it.url, s: it.source, t: it.topic } }).then(function (j) {
      var link = j && j.id ? location.origin + '/n/' + j.id : it.url;
      shareLink(link, '📰 ' + it.headline + ' · newzeem.');
    });
  }
  function shareLink(link, text) {
    if (navigator.share) { navigator.share({ title: 'newzeem.', text: text, url: link }).catch(function () { /* cancelled */ }); return; }
    var done = function () { toast(t('copied')); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text + '\n' + link).then(done, done); else done();
  }

  /* ---------- listen: the issue read aloud by the device's own voice (free, nothing leaves the browser) ---------- */
  var BCP = { en: 'en-US', es: 'es-ES', pt: 'pt-BR', fr: 'fr-FR', de: 'de-DE', ru: 'ru-RU', hi: 'hi-IN', zh: 'zh-CN', ar: 'ar-SA' };
  var SPEEDS = [1, 1.25, 1.5];
  function canSpeak() { return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window; }
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
      if (!Say.on && !Say.bar) return;
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
    chrome('pick');
    var main = view();
    var sel = (S.topics.length ? S.topics : DEFAULTS).slice();
    var counter = h('p.count'), go = h('button.go', { type: 'button' }, editing ? t('save') : t('build'));
    function refresh() { counter.textContent = t('pickN', { n: sel.length, m: MAX_TOPICS }); go.disabled = !sel.length; }
    var tiles = h('div.tiles', { role: 'group', 'aria-label': t('pickH') }, TP.list.map(function (tp) {
      var b = h('button.tile', { type: 'button', style: '--c:' + tp.c, 'aria-pressed': sel.indexOf(tp.id) >= 0 ? 'true' : 'false' },
        h('span.te'), h('span.tn', topicName(tp.id)), h('span.tk', { 'aria-hidden': 'true' }, '✓'));
      b.addEventListener('click', function () {
        var i = sel.indexOf(tp.id);
        if (i >= 0) sel.splice(i, 1); else { if (sel.length >= MAX_TOPICS) return toast(t('max', { m: MAX_TOPICS })); sel.push(tp.id); }
        b.setAttribute('aria-pressed', i >= 0 ? 'false' : 'true'); refresh();
      });
      return b;
    }));
    go.addEventListener('click', function () { S.topics = sel.slice(); S.cache = null; save(); if (location.hash && location.hash !== '#/') location.hash = '#/'; else renderDigest(); });
    main.appendChild(h('section.hero',
      editing ? null : h('div.intro', h('h1', dotted(SLOGAN)), h('p.sub', t('heroP')), h('ul.promise', h('li', t('p1')), h('li', t('p2')), h('li', t('p3')))),
      h('h2.pick-h', t('pickH')), tiles,
      h('h2.pick-h.pick-t', t('howLong')), dial(),
      h('div.bar', h('div.barin', counter, go))));
    refresh();
  }

  /* ---------- building the issue ---------- */
  // Every 4 hours the address changes, so no cache in between can hand out an older issue than that.
  function bucket() { return Math.floor(Date.now() / 14400000); }
  var shownDay = '';
  function fetchTopic(id, retry) {
    var ac = new AbortController(), timer = setTimeout(function () { ac.abort(); }, 25000);
    return fetch('/api/topic?t=' + encodeURIComponent(id) + '&lang=' + S.lang + '&b=' + bucket() + (retry ? '&r=' + Date.now() : ''), { signal: ac.signal })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return j && Array.isArray(j.items) ? { id: id, items: j.items, ai: !!j.ai, quiz: Array.isArray(j.quiz) ? j.quiz : [] } : null; })
      .catch(function () { return null; })
      .then(function (x) { clearTimeout(timer); return x; });
  }

  // Puts every story on its shelf: the top stories first, then each topic, and the small ones as one-line quick hits.
  // The same event reported in two topics is shown once. The reader's interests move what they like up.
  function assemble(results, mins) {
    var budget = (mins || 5) * 60;
    var told = results.filter(function (r) { return r.ai; });
    if (S.lang !== 'en' && told.length) results = told; // untranslated source headlines are not shown in another language
    var pool = [], seenIds = {}, keys = [], df = {}, all = 0;
    // words found in many headlines (templates, "says", "new") do not make two stories the same event
    results.forEach(function (r) { r.items.forEach(function (it) { all++; Object.keys(toks(it.headline)).forEach(function (w) { df[w] = (df[w] || 0) + 1; }); }); });
    var rare = function (o) { var x = {}; Object.keys(o).forEach(function (w) { if (df[w] <= Math.max(2, all * 0.15)) x[w] = 1; }); return x; };
    results.forEach(function (r) {
      r.items.forEach(function (it, i) {
        if (seenIds[it.id]) return;
        var k = rare(toks(it.headline));
        if (Object.keys(k).length >= 3 && keys.some(function (o) { var n = 0; Object.keys(k).forEach(function (w) { if (o[w]) n++; }); return n >= 3 && n / Math.min(Object.keys(k).length, Object.keys(o).length) >= 0.6; })) return; // the same event again, from another shelf
        seenIds[it.id] = 1; keys.push(k);
        pool.push(Object.assign({}, it, { topic: r.id, pos: i, like: Pref.score(r.id, it.headline + ' ' + (it.gist || '')) }));
      });
    });
    var rank = function (a, b) { return (b.weight + Math.min(1.5, b.like / 3)) - (a.weight + Math.min(1.5, a.like / 3)) || a.pos - b.pos; };
    var strong = pool.filter(function (x) { return x.weight >= 2; }).sort(rank);
    var main = [], usedTopics = {}, taken = {}, total = 0;
    strong.forEach(function (x) { if (main.length < 3 && !usedTopics[x.topic] && (!main.length || total + x.secs <= budget)) { main.push(x); usedTopics[x.topic] = 1; taken[x.id] = 1; total += x.secs; } });
    // For you: stories close to what the reader saves, picks and opens (only once there is enough to go on)
    var mine = [];
    if (Pref.ready()) pool.filter(function (x) { return !taken[x.id] && x.like >= 2; }).sort(function (a, b) { return b.like - a.like; }).slice(0, 2).forEach(function (x) {
      if (total + x.secs <= budget * 1.1) { mine.push(x); taken[x.id] = 1; total += x.secs; }
    });
    var order = results.slice().sort(function (a, b) { return (S.pref.t[b.id] || 0) - (S.pref.t[a.id] || 0); });
    var queues = order.map(function (r) { return pool.filter(function (x) { return x.topic === r.id && !taken[x.id]; }).sort(rank); });
    var picked = {}, quick = []; order.forEach(function (r) { picked[r.id] = []; });
    var grew = true;
    while (grew) {
      grew = false;
      queues.forEach(function (q, qi) {
        while (q.length) {
          var x = q.shift(), quickOne = x.weight <= 1 && picked[order[qi].id].length >= 1;
          var cost = quickOne ? Math.min(x.secs, 12) : x.secs;
          if (total + cost <= budget) { (quickOne ? quick : picked[order[qi].id]).push(x); total += cost; grew = true; break; }
        }
      });
    }
    var sections = [];
    if (main.length) sections.push({ id: 'main', items: main });
    if (mine.length) sections.push({ id: 'foryou', items: mine });
    order.forEach(function (r) { if (picked[r.id].length) sections.push({ id: r.id, items: picked[r.id] }); });
    var count = sections.reduce(function (n, s) { return n + s.items.length; }, 0) + quick.length;
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
    return { at: Date.now(), total: total, count: count, sections: sections, quick: quick, quiz: qs };
  }

  function renderDigest() {
    shownDay = today();
    chrome('issue');
    view();
    var key = S.topics.join(',');
    var c = S.cache;
    if (c && c.v === 3 && c.day === today() && c.lang === S.lang && c.key === key && c.results) {
      if (Date.now() - c.at > 4 * 3600e3) { build(key, false); return; } // an old issue is rebuilt, not shown
      draw(assemble(c.results, S.mins), c.failed || []);
      return;
    }
    build(key, false);
  }

  function build(key, quiet) {
    var main = $('main');
    var bar = h('p.hint', t('loading', { n: 0, m: S.topics.length }));
    if (!quiet) clear(main).appendChild(h('div', h('div.mast.card', h('div.date', dateLabel()), h('h1', dotted(t('issue') + '.')), bar), h('div.skel'), h('div.skel'), h('div.skel')));
    var done = 0, ids = S.topics.slice();
    // Three topics at a time: the free AI plans limit tokens per minute, so a burst of ten requests would be refused.
    pool(ids, 3, function (id) { return fetchTopic(id).then(function (r) { done++; bar.textContent = t('loading', { n: done, m: ids.length }); return r; }); }).then(function (rs) {
      var weak = rs.map(function (r, i) { return r && !r.ai ? i : -1; }).filter(function (i) { return i >= 0; });
      var again = weak.length ? new Promise(function (ok) { setTimeout(ok, 2500); }).then(function () {
        return Promise.all(weak.map(function (i) { return fetchTopic(ids[i], true).then(function (r) { if (r && r.ai) rs[i] = r; }); }));
      }) : Promise.resolve();
      return again.then(function () { return rs; });
    }).then(function (rs) {
      var ok = rs.filter(Boolean), failed = ids.filter(function (id, i) { return !rs[i]; });
      if (key !== S.topics.join(',') || route().name !== 'issue') return; // the reader moved on meanwhile
      if (!ok.length) { var old = S.cache; if (!quiet && old && old.results && old.key === key) draw(assemble(old.results, S.mins), old.failed || []); else if (!quiet) drawFail(); return; } // offline: an older issue is better than none
      S.cache = { v: 3, at: Date.now(), day: today(), lang: S.lang, key: key, results: ok, failed: failed }; save();
      if (!quiet) draw(assemble(ok, S.mins), failed);
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
      if (!items.length) return done(out);
      function next() {
        if (i >= items.length) return;
        var k = i++;
        fn(items[k]).then(function (r) { out[k] = r; }).then(function () { if (++fin === items.length) done(out); else next(); });
      }
      for (var j = 0; j < Math.min(n, items.length); j++) next();
    });
  }
  function dateLabel() { var s = new Date().toLocaleDateString({ en: 'en-US', zh: 'zh-CN', pt: 'pt-BR' }[S.lang] || S.lang, { weekday: 'long', day: 'numeric', month: 'long' }); return s.charAt(0).toUpperCase() + s.slice(1); }
  function drawFail() {
    var main = clear($('main'));
    main.appendChild(h('div.err.card', h('p', t('fail')), h('button.btn.dark', { type: 'button', onclick: renderDigest }, t('retry'))));
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
  function actBtn(icon, label, pressed, onClick) {
    var b = h('button.act', { type: 'button', 'aria-label': label, title: label, 'aria-pressed': pressed == null ? null : String(!!pressed) }, ico(icon));
    b.addEventListener('click', function () { var r = onClick(); if (typeof r === 'boolean') b.setAttribute('aria-pressed', String(r)); });
    return b;
  }

  // The story's key number ("30 стран", "7 лет", "85%") is shown big beside it, Morning Brew style. Years are not key numbers.
  var SMALL = { from: 1, to: 1, in: 1, of: 1, on: 1, at: 1, and: 1, the: 1, a: 1, an: 1, by: 1, for: 1, with: 1, as: 1, into: 1, в: 1, на: 1, из: 1, и: 1, с: 1, по: 1, до: 1, за: 1, к: 1, от: 1, о: 1, у: 1, de: 1, del: 1, la: 1, el: 1, en: 1, et: 1, le: 1, les: 1, des: 1, der: 1, die: 1, das: 1, und: 1, im: 1, e: 1, do: 1, da: 1, em: 1 };
  function keyNum(it) {
    var txt = it.headline + '. ' + (it.gist || '');
    var re = /(^|[^\p{L}\p{N}_./])((?:\d{1,3}(?:[ \u00a0.,]\d{3})+|\d+(?:[.,]\d+)?)\s?(?:%|‰)?)(?![\p{L}\p{N}_])/gu, m;
    while ((m = re.exec(txt))) {
      var n = m[2].trim(), v = parseFloat(n.replace(/[  ]/g, '').replace(',', '.'));
      var pct = /[%‰]$/.test(n);
      if (/^(19|20)\d\d$/.test(n) || v === 0 || (!pct && v < 2)) continue;
      var rest = txt.slice(m.index + m[0].length).replace(/^[\s]+/, '');
      var w = rest.split(/\s+/), first = (w[0] || '').replace(/[^\p{L}]/gu, '');
      var unit = !pct && /^\p{L}+[.,;:!?]?$/u.test(w[0] || '') && first.length <= 8 && !SMALL[first.toLowerCase()] ? first : '';
      var cap = w.slice(unit ? 1 : 0, (unit ? 1 : 0) + 5).join(' ').replace(/[.!?;:].*$/, '').replace(/[,—–-]+$/, '').trim();
      if (unit && /[.!?;:]$/.test(w[0])) cap = '';
      if (!unit && !pct && !cap) continue;
      return { n: n + (unit ? ' ' + unit : ''), cap: cap };
    }
    return null;
  }
  function item(it, lead, showTag) {
    var a = h('a.src', { href: safeUrl(it.url), target: '_blank', rel: 'noopener noreferrer' }, it.source + ' ↗');
    var pts = (it.points || []).length ? h('ul.pts', it.points.map(function (p) { return h('li', p); })) : null;
    var hb = h('button.hbtn', { type: 'button', 'aria-expanded': 'false' }, it.headline);
    var more = h('button.more', { type: 'button' }, t('more'));
    var detail = h('div.detail', { hidden: 'hidden' }), rxBox = h('div.rx', { hidden: 'hidden' });
    Rx.probe.then(function () { if (Rx.on) rxInit(it, rxBox); });
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
      hb.setAttribute('aria-expanded', open ? 'true' : 'false'); more.textContent = open ? t('less') : t('more');
      if (open) { S.read[it.id] = 1; el.classList.add('read'); Pref.like(it.topic, it.headline + ' ' + (it.gist || ''), 2); if (!state) load(); }
    }
    hb.addEventListener('click', toggle); more.addEventListener('click', toggle);
    var kn = keyNum(it), fig = null;
    if (lead && it.img) {
      var im = h('img', { src: it.img, alt: '', loading: 'lazy', referrerpolicy: 'no-referrer', decoding: 'async' });
      fig = h('figure.photo', im, h('figcaption', t('photoBy', { s: it.source })));
      im.addEventListener('error', function () { if (kn) fig.replaceWith(h('div.leadnum', h('b', kn.n), h('span', kn.cap))); else fig.remove(); });
    } else if (lead && kn) fig = h('div.leadnum', h('b', kn.n), h('span', kn.cap));
    var body = h('div.itx',
      showTag ? h('span.tag', topicName(it.topic)) : null,
      h('h3', hb),
      it.gist ? h('p.gist', it.gist) : null,
      pts,
      it.why ? h('p.why', h('b', t('why')), ' ', it.why) : null,
      detail,
      rxBox,
      h('div.ifoot', a, more, h('span.grow'),
        actBtn('plus', t('pickAdd'), isPicked(it.id), function () { var on = togglePick(it); toast(on ? t('picked') : t('unpicked')); return on; }),
        actBtn('save', t('saveL'), isSaved(it.id), function () { var on = toggleSave(it); toast(on ? t('saved') : t('unsaved')); return on; }),
        actBtn('share', t('share'), null, function () { shareNews(it); })));
    var side = !lead && kn ? h('aside.num', h('b', kn.n), h('span', kn.cap)) : null;
    var el = h('article.item' + (lead ? '.lead' : '') + (side ? '.hasnum' : '') + (S.read[it.id] ? '.read' : ''), { style: '--c:' + topicColor(it.topic), 'data-id': it.id }, fig, body, side);
    a.addEventListener('click', function () { S.read[it.id] = 1; el.classList.add('read'); Pref.like(it.topic, it.headline, 2); });
    spoken.push({ it: it, el: el });
    return el;
  }

  function secLabel(id) { var tp = TP.byId[id]; return id === 'main' ? t('main') : id === 'foryou' ? t('forYou') : topicName(id); }
  function secEmoji(id) { return id === 'main' ? '⚡' : id === 'foryou' ? '✨' : topicEmoji(id); }

  function draw(d, failed) {
    var main = view();
    spoken = [];
    var lead = d.sections[0] && d.sections[0].items[0];
    var col = h('div.col'), rail = h('aside.rail'), railIn = h('div.railin');
    rail.appendChild(railIn);
    main.appendChild(h('div.page', col, rail));
    col.appendChild(h('section.hello',
      h('div', h('div.kick', t('morningKick', { m: S.mins })), h('h1', dotted(greeting() + '.')), h('p.lede', t('issueLead', { m: S.mins }))),
      h('div.controls', canSpeak() ? h('button.listen', { type: 'button', onclick: function () { Say.start(0); } }, ico('play'), t('listen')) : null,
        dial(function () { var c = S.cache; if (c && c.results) draw(assemble(c.results, S.mins), c.failed || []); else renderDigest(); }))));
    if (failed && failed.length) col.appendChild(h('p.notice', t('skipped', { t: failed.map(topicName).join(', ') })));
    var fu = followBlock(d); if (fu) col.appendChild(fu);
    var viewsEl = h('section.views.block', { hidden: 'hidden' }), predEl = h('section.pred.rbox', { hidden: 'hidden' });
    var jump = function (id) { return function () { var el = document.getElementById('sec-' + id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }; };
    d.sections.forEach(function (s, si) {
            col.appendChild(h('section.sec', { id: 'sec-' + s.id, style: '--c:' + (TP.byId[s.id] ? topicColor(s.id) : s.id === 'foryou' ? '#7048E8' : '#C8321B') },
        h('h2.kicker', h('i'), h('span', secLabel(s.id))),
        s.items.map(function (it, i) { return item(it, s.id === 'main' && i === 0, s.id === 'main' || s.id === 'foryou'); })));
      if (si === 0) col.appendChild(viewsEl);
    });
    if (!d.sections.length) col.appendChild(viewsEl);
    loadViews(viewsEl);
    if (d.quick.length) {
      col.appendChild(h('section.sec', { id: 'sec-quick' }, h('h2.kicker', h('i'), h('span', t('quick'))),
        h('div.quick', h('h3', t('quickSub', { n: d.quick.length })),
          h('ul', d.quick.map(function (it) {
            return h('li', h('b', topicName(it.topic) + '. '), it.headline + (it.gist ? '. ' + it.gist : '') + ' ', h('a.src', { href: safeUrl(it.url), target: '_blank', rel: 'noopener noreferrer', onclick: function () { Pref.like(it.topic, it.headline, 2); } }, it.source + ' ↗'));
          })))));
    }
    worldEl = h('section.world.block', { hidden: 'hidden' }); col.appendChild(worldEl);
    Rx.probe.then(updateWorld);
    if (d.quiz && d.quiz.length >= 2) col.appendChild(quizBlock(d.quiz));
    var fromAuthors = h('section.fromau', { hidden: 'hidden' }); col.appendChild(fromAuthors); authorsPick(fromAuthors);
    // the right rail: what is inside, the prediction, the streak
    railIn.appendChild(h('div.rbox.rtoc', h('h4', t('inside')), h('ol.toc', d.sections.map(function (s) {
      return h('li', h('button', { type: 'button', onclick: jump(s.id) }, h('b', secLabel(s.id)), h('span', s.items[0].headline)));
    }).concat(d.quick.length ? [h('li', h('button', { type: 'button', onclick: jump('quick') }, h('b', t('quick')), h('span', t('quickSub', { n: d.quick.length }))))] : []))));
    railIn.appendChild(predEl); loadPred(predEl);
    var streak = h('p.streak'), week = weekRow(); streak.hidden = true;
    railIn.appendChild(h('div.rbox', h('h4', t('streakH')), week, streak));
    var end = h('section.end', h('div.row', h('button.btn.dark', { type: 'button', onclick: share }, ico('share'), t('share')), h('button.btn', { type: 'button', onclick: function () { renderPick(true); } }, t('change'))));
    rail.parentNode.appendChild(end); // after the rail on phones, under the column on wide screens
    wire(end, streak, week, rail);
    progress();
    hit('issue');
    Say.mount();
    if (lead && lead.weight >= 3) Bell.important(lead);
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
  function rxButtons(it, box) {
    clear(box); box.hidden = false;
    box.appendChild(h('div.rxrow', { role: 'group', 'aria-label': t('rxQ') }, RXI.map(function (e, i) {
      var b = h('button.rxb', { type: 'button', title: t('rx' + i) }, h('span.rxe', e), h('span.rxl', t('rx' + i)));
      b.addEventListener('click', function () { rxSend(it, i, box); });
      return b;
    })));
  }
  function rxSend(it, r, box) {
    var id = it.id, btns = box.querySelectorAll('.rxb');
    Array.prototype.forEach.call(btns, function (b) { b.disabled = true; });
    fetch('/api/react', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: id, r: r, d: did(), h: it.headline, g: it.gist || '', u: it.url, s: it.source, t: it.topic }) })
      .then(function (x) { return x.ok ? x.json() : Promise.reject(); })
      .then(function (j) {
        if (!j || !j.s || !j.s[id]) throw 0;
        S.rx[id] = r; var ks = Object.keys(S.rx); if (ks.length > 300) delete S.rx[ks[0]];
        Pref.like(it.topic, it.headline, 1);
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
    box.appendChild(h('p.rxnote', t('rxN', { n: d.n })));
  }
  function rxInit(it, box) {
    var id = it.id;
    if (S.rx[id] == null) return rxButtons(it, box);
    rxResults(id, box);
    if (!Rx.res[id]) rxFetch(id).then(function () { rxResults(id, box); updateWorld(); }); else updateWorld();
  }
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
    worldEl.appendChild(h('div.qres', h('button.btn.dark.qshare', { type: 'button', onclick: function () { shareText('newzeem. 🌍 ' + hits.map(function (x) { return x ? '●' : '○'; }).join('') + ' ' + a + '/' + ids.length + '\n' + SLOGAN); } }, t('quizShare'))));
  }

  /* ---------- check yourself ---------- */
  function quizBlock(qs) {
    var key = qs.map(function (q) { return q.id; }).join(','), saved = S.qz && S.qz.day === today() && S.qz.key === key ? S.qz.pick : [];
    var picks = qs.map(function (q, i) { return saved[i] != null ? saved[i] : -1; });
    var res = h('div.qres'), box = h('section.quiz.block', h('h2', dotted(t('quizH') + '.')), h('p.qsub', t('quizSub')));
    function dots() { return picks.map(function (p, i) { return p === qs[i].a ? '●' : '○'; }).join(''); }
    function score() { return picks.filter(function (p, i) { return p === qs[i].a; }).length; }
    function finish() {
      if (picks.some(function (p) { return p < 0; })) return;
      clear(res);
      res.appendChild(h('div.qdots', picks.map(function (p, i) { return h('span.qd' + (p === qs[i].a ? '.on' : ''), '●'); })));
      res.appendChild(h('p.qscore', score() + ' / ' + qs.length));
      res.appendChild(h('button.btn.dark.qshare', { type: 'button', onclick: function () { shareText('newzeem. ' + dots() + ' ' + score() + '/' + qs.length + '\n' + SLOGAN); } }, t('quizShare')));
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

  /* ---------- what changed since yesterday (matched on this device, no AI) ---------- */
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
    return h('section.follow.block', h('h2', dotted(t('followH') + '.')),
      found.map(function (f) {
        return h('button.fu', { type: 'button', onclick: function () {
          var el = document.querySelector('[data-id="' + f.now.id + '"]'); if (!el) return;
          el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('flash'); setTimeout(function () { el.classList.remove('flash'); }, 1600);
        } }, h('span.fuw', h('b', t('followWas')), ' ', f.was), h('span.fun', h('b', t('followNow')), ' ', f.now.headline));
      }));
  }

  /* ---------- two views ---------- */
  var viewsMemo = {};
  function viewsTopic() {
    if (S.topics.indexOf('world') >= 0) return 'world';
    var ok = S.topics.filter(function (id) { return TP.byId[id] && TP.byId[id].feeds.length >= 3; });
    return ok[0] || null;
  }
  function loadViews(el) {
    var tp = viewsTopic(); if (!tp) return;
    var k = tp + '|' + S.lang;
    var go = viewsMemo[k] ? Promise.resolve(viewsMemo[k]) : fetch('/api/views?t=' + tp + '&lang=' + S.lang + '&b=' + bucket())
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

  /* ---------- prediction of the day ---------- */
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
      prune(); save();
      predDraw(el, id);
      Object.keys(S.pr).filter(function (k) { return k !== id && S.pr[k].v && !S.pr[k].o; }).slice(-3).forEach(function (k) {
        fetch('/api/predict?resolve=' + k).then(function (r) { return r.ok ? r.json() : null; }).then(function (r) {
          if (!r || !r.o || !S.pr[k]) return;
          S.pr[k].o = r.o; S.pr[k].src = r.source ? { source: r.source, url: r.url, title: r.title } : null; save();
          Bell.local('pred', { q: S.pr[k].q, o: r.o, ok: r.o === S.pr[k].v });
          if (el.isConnected) predDraw(el, id);
        }).catch(function () { /* settled next time */ });
      });
    });
  }
  function predDraw(el, id) {
    var e = S.pr[id]; clear(el); el.hidden = false;
    el.appendChild(h('h2', dotted(t('predH') + '.')));
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
    cleanup = function () { window.removeEventListener('scroll', on); bar.style.transform = 'scaleX(0)'; if (prev) prev(); };
  }

  // The streak is counted when the reader reaches the end of the issue.
  function wire(end, streak, week, rail) {
    var io = null;
    function show() { streak.hidden = false; streak.textContent = curStreak() > 1 ? t('streak', { n: curStreak() }) : t('streak1'); week.replaceWith(week = weekRow()); flame(); }
    function complete() {
      var td = today();
      hit('done');
      if (S.last !== td) { S.streak = S.last === ymd(new Date(Date.now() - 864e5)) ? (S.streak || 0) + 1 : 1; S.last = td; S.days = (S.days || []).concat(td).slice(-30); save(); }
      show();
      if (io) io.disconnect();
    }
    if ('IntersectionObserver' in window) { io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) complete(); }, { threshold: 0.6 }); io.observe(end); }
    else complete();
    if (S.last === today()) show();
    var prev = cleanup;
    cleanup = function () { if (io) io.disconnect(); if (prev) prev(); };
  }

  function shareText(text) {
    var link = location.origin + '/?t=' + S.topics.join(',') + '&l=' + S.lang + '&m=' + S.mins;
    shareLink(link, text);
  }
  function share() { shareText(t('shareText')); }

  /* ====================================================================================
     Authors: posts written by readers, checked by a moderator before anyone sees them
     ==================================================================================== */
  var LV = ['lv0', 'lv1', 'lv2', 'lv3'], LVE = ['🌱', '✍️', '🎓', '🏆'];
  function badge(lv) { lv = lv || 0; return h('span.lv.lv' + lv, { title: t(LV[lv]) }, t(LV[lv])); }
  function authorKey() {
    if (!S.ak) {
      var a = new Uint8Array(24);
      try { crypto.getRandomValues(a); } catch (e) { for (var i = 0; i < 24; i++) a[i] = Math.floor(Math.random() * 256); }
      S.ak = Array.prototype.map.call(a, function (x) { return ('0' + x.toString(16)).slice(-2); }).join(''); save();
    }
    return S.ak;
  }
  var Me = { data: null, loading: null };
  function loadMe(force) {
    if (!S.ak) return Promise.resolve(null);
    if (Me.loading && !force) return Me.loading;
    Me.loading = api('/api/c?a=me').then(function (j) {
      Me.data = j && j.author ? j : null;
      if (Me.data) { Bell.server(j.notes || [], j.seen || 0); S.me = { id: j.author.id, name: j.author.name }; save(); }
      Me.loading = null; return Me.data;
    });
    return Me.loading;
  }
  function readMins(text) { return Math.max(1, Math.round(String(text).split(/\s+/).length / 200)); }
  function postCard(p) {
    var el = h('a.pcard.card', { href: '#/post/' + p.id, style: '--c:' + topicColor(p.topic) },
      h('span.tag', topicName(p.topic)),
      h('h3', p.title),
      p.ex ? h('p', p.ex) : null,
      h('div.pmeta', h('b', p.name), badge(p.lv), h('span.grow'), h('span.useful', ico('useful'), String(p.useful || 0)), h('span', ago(p.at))));
    return el;
  }
  function subnav(cur) {
    var items = [['feed', t('cFeed')], ['top', t('cTop')], ['chat', t('cChat')]];
    return h('div.subnav', h('nav.seg', items.map(function (x) { return h('a', { href: '#/' + x[0], 'aria-current': cur === x[0] ? 'page' : null }, x[1]); })),
      h('a.btn.dark.write', { href: '#/write' }, ico('pen'), t('write')));
  }
  function emptyNote(text, cta) { return h('div.empty.card', h('p', text), cta || null); }

  function renderFeed(mode) {
    chrome('feed'); var main = view();
    main.appendChild(h('header.phead', h('h1', dotted(t('authorsH') + '.')), h('p.lede', t('authorsSub'))));
    main.appendChild(subnav('feed'));
    var tabs = h('div.chips', [['foryou', t('forYou')], ['new', t('cNew')]].concat(TP.list.map(function (tp) { return [tp.id, topicName(tp.id)]; })).map(function (x) {
      return h('button.chip', { type: 'button', 'aria-pressed': String((mode || 'foryou') === x[0]), onclick: function () { renderFeed(x[0]); } }, x[1]);
    }));
    main.appendChild(tabs);
    var list = h('div.plist', h('div.skel'), h('div.skel'));
    main.appendChild(list);
    var m = mode || 'foryou', q = TP.byId[m] ? '&topic=' + m : '';
    api('/api/c?a=feed&n=40' + q).then(function (j) {
      clear(list);
      if (j.on === false) { list.appendChild(emptyNote(t('cOff'))); return; }
      var ps = j.posts || [];
      if (m === 'foryou') ps = ps.map(function (p) { return Object.assign(p, { sc: Pref.score(p.topic, p.title + ' ' + (p.ex || '')) + (S.topics.indexOf(p.topic) >= 0 ? 2 : 0) + Math.log(1 + (p.useful || 0)) }); }).sort(function (a, b) { return b.sc - a.sc || b.at - a.at; });
      if (!ps.length) { list.appendChild(emptyNote(t('cEmpty'), h('a.btn.dark', { href: '#/write' }, t('write')))); return; }
      if (ps[0]) S.feedSeen = Math.max(S.feedSeen || 0, ps.reduce(function (m2, p) { return Math.max(m2, p.at); }, 0)); save();
      ps.forEach(function (p) { list.appendChild(postCard(p)); });
    });
  }

  function renderTop() {
    chrome('top'); var main = view();
    main.appendChild(h('header.phead', h('h1', dotted(t('cTop') + '.'))));
    main.appendChild(subnav('top'));
    var box = h('div', h('div.skel'));
    main.appendChild(box);
    api('/api/c?a=top').then(function (j) {
      clear(box);
      if (j.on === false) { box.appendChild(emptyNote(t('cOff'))); return; }
      var news = j.news || [], posts = j.posts || [], aus = j.authors || [];
      box.appendChild(h('section.card.topbox', h('h2', t('topNews')), news.length ? h('ol.rank', news.map(function (n) {
        return h('li', h('a', { href: safeUrl(n.u), target: '_blank', rel: 'noopener noreferrer' }, h('b', n.h), h('span', ' ' + (n.s || '') + ' ↗')), h('span.rn', t('rxN', { n: n.n })));
      })) : h('p.qsub', t('topNone'))));
      box.appendChild(h('section.card.topbox', h('h2', t('topPosts')), posts.length ? h('ol.rank', posts.map(function (p) {
        return h('li', h('a', { href: '#/post/' + p.id }, h('b', p.title), h('span', ' · ' + p.name)), h('span.rn', h('span.useful', ico('useful'), String(p.useful || 0))));
      })) : h('p.qsub', t('topNone'))));
      box.appendChild(h('section.card.topbox', h('h2', t('topAuthors')), aus.length ? h('ol.rank', aus.map(function (a) {
        return h('li', h('a', { href: '#/author/' + a.id }, h('b', a.name), ' ', badge(a.lv)), h('span.rn', t('repN', { n: a.rep })));
      })) : h('p.qsub', t('topNone'))));
    });
  }

  function renderPost(id) {
    chrome('post'); var main = view();
    var box = h('div', h('div.skel'));
    main.appendChild(h('a.back', { href: '#/feed' }, ico('back'), t('tabAuthors')));
    main.appendChild(box);
    api('/api/c?a=post&id=' + encodeURIComponent(id)).then(function (j) {
      clear(box);
      if (!j.post) { box.appendChild(emptyNote(t('missing'))); return; }
      var p = j.post, a = j.author || {}, mine = S.me && S.me.id === p.aid;
      Pref.like(p.topic, p.title, 1);
      var useful = h('button.btn.usefulb', { type: 'button', 'aria-pressed': String(!!S.voted[p.id]) }, ico('useful'), h('span', t('usefulL')), h('b', String(p.useful || 0)));
      useful.disabled = !!mine || p.status !== 'live';
      useful.addEventListener('click', function () {
        if (S.voted[p.id]) return;
        useful.disabled = true;
        api('/api/c?a=useful', { body: { id: p.id, d: did() } }).then(function (r) {
          if (r.useful != null) { S.voted[p.id] = 1; save(); useful.lastChild.textContent = String(r.useful); useful.setAttribute('aria-pressed', 'true'); Pref.like(p.topic, p.title, 2); toast(t('thanks')); }
          else { useful.disabled = false; toast(t('rxFail')); }
        });
      });
      var art = h('article.post.card', { style: '--c:' + topicColor(p.topic) },
        h('span.tag', topicName(p.topic)),
        p.status !== 'live' ? h('p.status.st-' + p.status, t('st_' + p.status) + (p.reason ? ': ' + p.reason : '')) : null,
        h('h1', p.title),
        h('div.pmeta', h('a', { href: '#/author/' + p.aid }, h('b', p.name)), badge(a.lv), h('span', ' · ' + ago(p.at) + ' · ' + t('rt', { m: readMins(p.body) }))),
        h('div.pbody', String(p.body).split(/\n+/).map(function (x) { return h('p', x); })),
        (p.links || []).length ? h('div.plinks', h('b', t('sources')), h('ul', p.links.map(function (u) { return h('li', h('a', { href: safeUrl(u), target: '_blank', rel: 'nofollow noopener noreferrer' }, u.replace(/^https?:\/\/(www\.)?/, '').slice(0, 70))); }))) : null,
        h('div.pacts', useful, p.status === 'live' ? h('button.btn', { type: 'button', onclick: function () { shareLink(location.origin + '/p/' + p.id, '💡 ' + p.title + ' · newzeem.'); } }, ico('share'), t('share')) : null),
        h('p.dnote', t('postNote')));
      box.appendChild(art);
    });
  }

  function renderAuthor(aid) {
    chrome('author'); var main = view();
    var box = h('div', h('div.skel'));
    main.appendChild(h('a.back', { href: '#/top' }, ico('back'), t('cTop')));
    main.appendChild(box);
    api('/api/c?a=author&id=' + encodeURIComponent(aid)).then(function (j) {
      clear(box);
      if (!j.author) { box.appendChild(emptyNote(t('missing'))); return; }
      box.appendChild(authorCard(j.author));
      (j.posts || []).forEach(function (p) { p.lv = j.author.lv; box.appendChild(postCard(p)); });
    });
  }
  function authorCard(a) {
    var next = [20, 100, 500][a.lv], prev = [0, 20, 100, 500][a.lv];
    return h('section.acard.card', h('div.av', String(a.name).slice(0, 1).toUpperCase()), h('h1', a.name), badge(a.lv),
      a.bio ? h('p', a.bio) : null,
      h('div.stats', h('div', h('b', String(a.rep)), h('span', t('rep'))), h('div', h('b', String(a.np)), h('span', t('nPosts'))), h('div', h('b', String(a.nu)), h('span', t('nUseful')))),
      next ? h('div.lvbar', h('span', { style: 'width:' + Math.min(100, Math.round((a.rep - prev) / (next - prev) * 100)) + '%' }), h('small', t('toNext', { n: next - a.rep, l: t(LV[a.lv + 1]) }))) : null);
  }

  // Writing: first a pen name (no e-mail, no password), then the post goes to the moderator.
  function renderWrite() {
    chrome('write'); var main = view();
    main.appendChild(h('header.phead', h('h1', dotted(t('writeH') + '.')), h('p.lede', t('writeSub'))));
    var box = h('div', h('div.skel')); main.appendChild(box);
    loadMe().then(function (me) {
      clear(box);
      if (me && me.author.ban) { box.appendChild(emptyNote(t('banned'))); return; }
      if (!me) return joinForm(box, renderWrite);
      var title = h('input.in', { type: 'text', maxlength: '120', placeholder: t('fTitle') });
      var topic = h('select.in', TP.list.map(function (tp) { return h('option', { value: tp.id }, topicName(tp.id)); }).concat(h('option', { value: 'other' }, t('other'))));
      if (S.topics[0]) topic.value = S.topics[0];
      var body = h('textarea.in.ta', { rows: '12', maxlength: '6000', placeholder: t('fBody') });
      var count = h('small.cnt2');
      var links = [0, 1, 2].map(function (i) { return h('input.in', { type: 'url', placeholder: i ? t('fLink2') : t('fLink') }); });
      var send = h('button.go', { type: 'submit' }, t('sendMod'));
      function upd() { var n = body.value.trim().length; count.textContent = n + ' / 6000' + (n < 200 ? ' · ' + t('minChars', { n: 200 }) : ''); }
      body.addEventListener('input', upd); upd();
      var form = h('form.wform.card',
        h('label', h('span', t('fTitleL')), title), h('label', h('span', t('fTopicL')), topic),
        h('label', h('span', t('fBodyL')), body, count), h('div.lab', h('span', t('fLinksL')), links),
        h('ul.rules', h('li', t('rule1')), h('li', t('rule2')), h('li', t('rule3'))), send);
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (title.value.trim().length < 10) return toast(t('eTitle'));
        if (body.value.trim().length < 200) return toast(t('minChars', { n: 200 }));
        var ls = links.map(function (x) { return x.value.trim(); }).filter(Boolean);
        if (!ls.length) return toast(t('eLinks'));
        send.disabled = true;
        api('/api/c?a=submit', { body: { title: title.value, body: body.value, topic: topic.value, links: ls, lang: S.lang } }).then(function (j) {
          send.disabled = false;
          if (j.post) { clear(box).appendChild(emptyNote(t('sentMod'), h('a.btn.dark', { href: '#/me' }, t('myPosts')))); loadMe(true); return; }
          toast(t({ links: 'eLinks', short: 'minChars', limit: 'eLimit', banned: 'banned' }[j.error] || 'rxFail', { n: 200 }));
        });
      });
      box.appendChild(form);
    });
  }
  function joinForm(box, after) {
    var name = h('input.in', { type: 'text', maxlength: '24', placeholder: t('fName') });
    var bio = h('input.in', { type: 'text', maxlength: '160', placeholder: t('fBio') });
    var go = h('button.go', { type: 'submit' }, t('join'));
    var f = h('form.wform.card', h('h2', t('joinH')), h('p.qsub', t('joinSub')), h('label', h('span', t('fNameL')), name), h('label', h('span', t('fBioL')), bio), go,
      h('details.restore', h('summary', t('haveKey')), restoreRow(after)));
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      authorKey(); go.disabled = true;
      api('/api/c?a=join', { body: { name: name.value.trim(), bio: bio.value } }).then(function (j) {
        go.disabled = false;
        if (j.author) { Me.data = null; loadMe(true).then(function () { toast(t('welcome')); after(); }); return; }
        toast(t({ name: 'eName', taken: 'eTaken' }[j.error] || 'rxFail'));
      });
    });
    box.appendChild(f);
  }
  function restoreRow(after) {
    var inp = h('input.in', { type: 'text', placeholder: t('keyPh'), autocomplete: 'off' });
    var b = h('button.btn.dark', { type: 'button' }, t('useKey'));
    b.addEventListener('click', function () {
      var k = inp.value.trim().toLowerCase();
      if (!/^[a-f0-9]{32,64}$/.test(k)) return toast(t('eKey'));
      var old = S.ak; S.ak = k; save(); Me.data = null;
      loadMe(true).then(function (me) { if (me) { toast(t('welcome')); after(); } else { S.ak = old; save(); toast(t('eKey')); } });
    });
    return h('div.krow', inp, b);
  }

  // The authors' chat: plain text only, slow mode, readers' reports hide a message until the moderator looks.
  function renderChat() {
    chrome('chat'); var main = view();
    main.appendChild(h('header.phead', h('h1', dotted(t('cChat') + '.')), h('p.lede', t('chatSub'))));
    main.appendChild(subnav('chat'));
    var list = h('div.chat.card', { role: 'log', 'aria-live': 'polite' }, h('div.skel'));
    var form = h('div.chatin'); main.appendChild(list); main.appendChild(form);
    var last = '', timer = null, shown = {};
    function paint(msgs) {
      var sig = msgs.map(function (m) { return m.id; }).join(','); if (sig === last) return; last = sig;
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      clear(list);
      if (!msgs.length) list.appendChild(h('p.qsub', t('chatEmpty')));
      msgs.forEach(function (m) {
        var mine = S.me && m.aid === S.me.id;
        list.appendChild(h('div.msg' + (mine ? '.mine' : ''), h('div.mh', h('a', { href: '#/author/' + m.aid }, h('b', m.name)), badge(m.lv), h('span', ago(m.at)),
          mine ? null : h('button.rep', { type: 'button', title: t('report'), 'aria-label': t('report'), onclick: function (e) { var b = e.currentTarget; api('/api/c?a=report', { body: { id: m.id, d: did() } }).then(function () { b.disabled = true; toast(t('reported')); }); } }, '⚑')),
          h('p', m.t)));
        shown[m.id] = 1;
      });
      if (atBottom) window.scrollTo(0, document.documentElement.scrollHeight);
    }
    function poll() {
      if (document.visibilityState === 'visible') api('/api/c?a=chat').then(function (j) { if (j.on === false) { clear(list).appendChild(h('p.qsub', t('cOff'))); return; } if (j.msgs) paint(j.msgs); });
      timer = setTimeout(poll, 10000);
    }
    poll();
    var prev = cleanup; cleanup = function () { clearTimeout(timer); if (prev) prev(); };
    loadMe().then(function (me) {
      if (!me) { form.appendChild(h('div.card.join2', h('p', t('chatJoin')), h('a.btn.dark', { href: '#/write' }, t('join')))); return; }
      var ta = h('textarea.in', { rows: '2', maxlength: '500', placeholder: t('chatPh') }), b = h('button.go', { type: 'button' }, t('send'));
      b.addEventListener('click', function () {
        var v = ta.value.trim(); if (v.length < 2) return;
        b.disabled = true;
        api('/api/c?a=chat', { body: { t: v } }).then(function (j) {
          setTimeout(function () { b.disabled = false; }, 1500);
          if (j.msg) { ta.value = ''; last = ''; api('/api/c?a=chat').then(function (x) { if (x.msgs) paint(x.msgs); window.scrollTo(0, document.documentElement.scrollHeight); }); }
          else toast(t(j.error === 'slow' ? 'eSlow' : j.error === 'banned' ? 'banned' : 'rxFail'));
        });
      });
      form.appendChild(h('div.chatbox', ta, b));
    });
  }

  // "From our authors" at the end of the issue: two posts that fit the reader's interests.
  function authorsPick(el) {
    api('/api/c?a=feed&n=30').then(function (j) {
      if (!el.isConnected || !j.posts || !j.posts.length) return;
      var ps = j.posts.map(function (p) { return Object.assign(p, { sc: Pref.score(p.topic, p.title + ' ' + (p.ex || '')) + (S.topics.indexOf(p.topic) >= 0 ? 2 : 0) + Math.log(1 + (p.useful || 0)) }); })
        .sort(function (a, b) { return b.sc - a.sc || b.at - a.at; }).slice(0, 2);
      el.hidden = false;
      el.appendChild(h('h2', dotted(t('fromAuthors') + '.')));
      ps.forEach(function (p) { el.appendChild(postCard(p)); });
      el.appendChild(h('a.more2', { href: '#/feed' }, t('allPosts') + ' →'));
      Bell.posts(j.posts);
    });
  }

  /* ====================================================================================
     Mine: today's picks, saved stories, my author page, notifications, settings
     ==================================================================================== */
  function miniItem(x, onRemove) {
    return h('li.mini', { style: '--c:' + topicColor(x.t) }, h('i.qt'),
      h('div', h('a', { href: safeUrl(x.u), target: '_blank', rel: 'noopener noreferrer' }, h('b', x.h)), x.g ? h('p', x.g) : null, h('small', x.s || '')),
      onRemove ? h('button.x', { type: 'button', 'aria-label': t('remove'), onclick: onRemove }, ico('close')) : null);
  }
  function renderMe() {
    chrome('me'); var main = view();
    main.appendChild(h('header.phead', h('h1', dotted(t('tabMe') + '.'))));
    // today's picks
    var pk = picks();
    var pbox = h('section.card.mybox', h('h2', t('myPicks')), h('p.qsub', t('myPicksSub')));
    if (!pk.length) pbox.appendChild(h('p.empty2', t('picksEmpty')));
    else {
      pbox.appendChild(h('ul.minis', pk.map(function (x) { return miniItem(x, function () { togglePick({ id: x.id }); renderMe(); }); })));
      pbox.appendChild(h('button.btn.dark', { type: 'button', onclick: function (e) {
        var b = e.currentTarget; b.disabled = true;
        api('/api/c?a=col', { body: { title: t('myPicks') + ' · ' + dateLabel(), items: pk } }).then(function (j) {
          b.disabled = false;
          if (j.id) shareLink(location.origin + '/c/' + j.id, t('myPicks') + ' · newzeem.'); else toast(t('rxFail'));
        });
      } }, ico('share'), t('sharePicks')));
    }
    main.appendChild(pbox);
    // notifications
    main.appendChild(Bell.box());
    // saved
    var sv = Object.keys(S.saved).map(function (k) { return S.saved[k]; }).sort(function (a, b) { return b.at - a.at; });
    var sbox = h('section.card.mybox', h('h2', t('savedH')));
    if (!sv.length) sbox.appendChild(h('p.empty2', t('savedEmpty')));
    else sbox.appendChild(h('ul.minis', sv.map(function (x) { return miniItem(x, function () { delete S.saved[x.id]; save(); renderMe(); }); })));
    main.appendChild(sbox);
    // author page
    var abox = h('section.card.mybox', h('h2', t('myAuthor')), h('div.skel'));
    main.appendChild(abox);
    loadMe().then(function (me) {
      abox.removeChild(abox.lastChild);
      if (!me) { abox.appendChild(h('p.qsub', t('becomeSub'))); abox.appendChild(h('a.btn.dark', { href: '#/write' }, t('join'))); abox.appendChild(h('details.restore', h('summary', t('haveKey')), restoreRow(renderMe))); return; }
      abox.appendChild(authorCard(me.author));
      if ((me.posts || []).length) abox.appendChild(h('ul.myposts', me.posts.map(function (p) {
        return h('li', h('a', { href: '#/post/' + p.id }, h('b', p.title)), h('span.status.st-' + p.status, t('st_' + p.status)), p.status === 'live' ? h('span.useful', ico('useful'), String(p.useful)) : null);
      })));
      abox.appendChild(h('div.row2', h('a.btn.dark', { href: '#/write' }, ico('pen'), t('write')), h('a.btn', { href: '#/author/' + me.author.id }, t('publicPage'))));
      var kbox = h('details.restore', h('summary', t('keyH')), h('p.qsub', t('keySub')), h('div.krow', h('code.key', S.ak), h('button.btn', { type: 'button', onclick: function () {
        var done = function () { toast(t('copied')); }; if (navigator.clipboard) navigator.clipboard.writeText(S.ak).then(done, done); else done();
      } }, t('copy'))));
      abox.appendChild(kbox);
    });
    // settings
    main.appendChild(h('section.card.mybox', h('h2', t('settings')),
      h('p.qsub', S.topics.map(topicName).join(', ')),
      h('div.row2', h('button.btn.dark', { type: 'button', onclick: function () { renderPick(true); } }, t('change'))),
      h('p.qsub', t('howLong')), dial(),
      h('p.qsub', t('interestsNote')),
      h('button.btn', { type: 'button', onclick: function () { S.pref = { t: {}, w: {}, n: 0, day: '' }; save(); toast(t('cleared')); } }, t('clearInterests'))));
  }

  /* ---------- notifications: inside the site (the bell), from the moderator, the news and your interests ---------- */
  var Bell = {
    srv: [], srvSeen: 0,
    all: function () {
      var a = (S.notes || []).concat(Bell.srv.map(function (n) { return { k: n.k, at: n.at, title: n.title, reason: n.reason, id: n.id, srv: 1 }; }));
      return a.sort(function (x, y) { return y.at - x.at; }).slice(0, 40);
    },
    unread: function () { return Bell.all().filter(function (n) { return n.at > (S.bellSeen || 0); }).length; },
    badge: function () { var b = $('bellN'); if (!b) return; var n = Bell.unread(); b.textContent = n > 9 ? '9+' : String(n); b.hidden = !n; },
    local: function (k, data) {
      S.notes = (S.notes || []).concat([Object.assign({ k: k, at: Date.now() }, data)]).slice(-40); save(); Bell.badge();
    },
    server: function (notes, seen) { Bell.srv = notes; Bell.srvSeen = seen; Bell.badge(); },
    important: function (it) { // the day's biggest story, once a day
      var d = today(); if (S.notes.some(function (n) { return n.k === 'top' && n.day === d; })) return;
      Bell.local('top', { day: d, title: it.headline, sid: it.id });
    },
    posts: function (ps) { // new author posts that fit the reader's interests
      var since = S.feedSeen || 0; if (!since) { S.feedSeen = Date.now(); save(); return; }
      var fresh = ps.filter(function (p) { return p.at > since && (S.topics.indexOf(p.topic) >= 0 || Pref.score(p.topic, p.title) >= 2); }).slice(0, 3);
      fresh.forEach(function (p) { if (!S.notes.some(function (n) { return n.pid === p.id; })) Bell.local('rec', { pid: p.id, title: p.title, name: p.name }); });
      S.feedSeen = Math.max(since, ps.reduce(function (m, p) { return Math.max(m, p.at); }, 0)); save();
    },
    text: function (n) {
      if (n.k === 'ok') return [t('nOk'), n.title, '#/post/' + n.id];
      if (n.k === 'no') return [t('nNo'), n.title + (n.reason ? ' — ' + n.reason : ''), '#/me'];
      if (n.k === 'off') return [t('nOff'), n.title + (n.reason ? ' — ' + n.reason : ''), '#/me'];
      if (n.k === 'top') return [t('nTop'), n.title, '#/'];
      if (n.k === 'rec') return [t('nRec', { a: n.name }), n.title, '#/post/' + n.pid];
      if (n.k === 'pred') return [(n.o === 'x' ? t('predX') : n.ok ? t('predRight') : t('predWrong')), n.q, '#/'];
      return ['', n.title || '', '#/'];
    },
    box: function () {
      var all = Bell.all(), seen = S.bellSeen || 0;
      var box = h('section.card.mybox', { id: 'bell' }, h('h2', t('notesH')));
      if (!all.length) box.appendChild(h('p.empty2', t('notesEmpty')));
      else box.appendChild(h('ul.notes', all.map(function (n) { var x = Bell.text(n); return h('li' + (n.at > seen ? '.new' : ''), h('a', { href: x[2] }, h('b', x[0]), h('span', x[1]), h('small', ago(n.at)))); })));
      S.bellSeen = Date.now(); save(); setTimeout(Bell.badge, 0);
      if (Bell.srv.length && S.ak) api('/api/c?a=seen', { body: {} });
      return box;
    }
  };

  /* ---------- routes ---------- */
  function route() {
    var p = (location.hash || '').replace(/^#\/?/, '').split('/');
    return { name: p[0] || 'issue', arg: decodeURIComponent(p[1] || '') };
  }
  function render() {
    var r = route();
    if (r.name === 'issue') { if (S.topics.length) renderDigest(); else renderPick(false); }
    else if (r.name === 'feed') renderFeed();
    else if (r.name === 'top') renderTop();
    else if (r.name === 'chat') renderChat();
    else if (r.name === 'write') renderWrite();
    else if (r.name === 'post' && /^[a-z0-9]{1,14}$/.test(r.arg)) renderPost(r.arg);
    else if (r.name === 'author' && /^[a-f0-9]{16}$/.test(r.arg)) renderAuthor(r.arg);
    else if (r.name === 'me') renderMe();
    else if (r.name === 'bell') { renderMe(); setTimeout(function () { var b = $('bell'); if (b) b.scrollIntoView({ block: 'start' }); }, 50); }
    else { location.hash = '#/'; }
  }
  window.addEventListener('hashchange', render);

  var sel = $('lang');
  TP.langNames.forEach(function (l) { sel.appendChild(h('option', { value: l[0], lang: l[0] }, l[1])); });
  sel.addEventListener('change', function () { S.lang = sel.value; save(); render(); });
  $('bellb').addEventListener('click', function () { location.hash = '#/bell'; });
  // A tab left open overnight (or a phone app brought back) shows the old day: when the reader returns on a new day, build the new issue.
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && shownDay && shownDay !== today() && S.topics.length && route().name === 'issue') renderDigest();
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted && shownDay && shownDay !== today() && S.topics.length && route().name === 'issue') renderDigest(); });
  function hit(ev) { try { fetch('/api/c?a=hit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ d: did(), ev: ev, lang: S.lang }), keepalive: true }).catch(function () {}); } catch (e) { /* counting is optional */ } }
  Pref.tidy();
  render();
  hit('open');
  loadMe();
})();
