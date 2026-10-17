/* Language switch for the legal pages (Russian and English on one page). */
(function () {
  var want = location.hash === '#en' || location.hash === '#ru' ? location.hash.slice(1) : null;
  if (!want) { try { var s = JSON.parse(localStorage.getItem('newzeem.v1') || '{}'); want = s.lang === 'ru' ? 'ru' : (s.lang ? 'en' : null); } catch (e) {} }
  if (!want) want = String(navigator.language || '').slice(0, 2) === 'ru' ? 'ru' : 'en';
  function set(l) { document.body.className = l === 'en' ? 'en' : ''; document.documentElement.lang = l; [].forEach.call(document.querySelectorAll('.langs a'), function (a) { a.className = a.getAttribute('data-l') === l ? 'on' : ''; }); }
  [].forEach.call(document.querySelectorAll('.langs a'), function (a) { a.addEventListener('click', function (e) { e.preventDefault(); set(a.getAttribute('data-l')); history.replaceState(null, '', '#' + a.getAttribute('data-l')); }); });
  set(want);
})();
