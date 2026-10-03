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

  // Nach einem Klick auf eine Sprungmarke das Menü wieder schließen
  nav.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (link && link.hash && knopf.getAttribute('aria-expanded') === 'true') setze(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && knopf.getAttribute('aria-expanded') === 'true') {
      setze(false);
      knopf.focus();
    }
  });
})();

// Sanftes Einblenden beim Scrollen. Was beim Laden schon zu sehen ist, bleibt einfach stehen.
// Bei „Bewegung reduzieren“ oder ohne IntersectionObserver passiert nichts.
(function () {
  var teile = document.querySelectorAll('[data-einblenden]');
  if (!teile.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var beobachter = new IntersectionObserver(
    function (eintraege) {
      eintraege.forEach(function (eintrag) {
        if (!eintrag.isIntersecting) return;
        eintrag.target.classList.add('ist-sichtbar');
        beobachter.unobserve(eintrag.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px' }
  );

  var hoehe = window.innerHeight;
  teile.forEach(function (teil) {
    if (teil.getBoundingClientRect().top < hoehe) teil.classList.add('ist-sichtbar');
    else beobachter.observe(teil);
  });
  document.documentElement.classList.add('js-bereit');
})();
