// Mobiles Menü: der Knopf „Menü“ klappt die Navigation auf und zu.
// Ohne JavaScript ist die Navigation einfach immer offen (css/ohne-js.css).
(function () {
  var knopf = document.querySelector('.kopf__menue');
  var nav = document.getElementById('hauptnavigation');
  if (!knopf || !nav) return;
  var wort = knopf.querySelector('.kopf__menue-wort');

  function setze(offen) {
    knopf.setAttribute('aria-expanded', offen ? 'true' : 'false');
    nav.classList.toggle('ist-offen', offen);
    if (wort) wort.textContent = offen ? 'Schließen' : 'Menü';
  }

  knopf.addEventListener('click', function () {
    setze(knopf.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && knopf.getAttribute('aria-expanded') === 'true') {
      setze(false);
      knopf.focus();
    }
  });
})();
