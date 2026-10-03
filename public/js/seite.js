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

// Leistungen in der Navigation (Desktop): Der Knopf klappt die Liste auf und zu.
// Escape, ein Klick daneben oder Weitertabben schließt sie. Im Handy-Menü ist die Liste immer offen.
(function () {
  var knopf = document.querySelector('.hauptnav__auf');
  if (!knopf) return;
  var gruppe = knopf.closest('.hauptnav__gruppe');
  document.documentElement.classList.add('js-menue');

  function setze(offen) {
    knopf.setAttribute('aria-expanded', offen ? 'true' : 'false');
    gruppe.classList.toggle('ist-offen', offen);
  }

  knopf.addEventListener('click', function () {
    setze(knopf.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('click', function (e) {
    if (!gruppe.contains(e.target)) setze(false);
  });
  gruppe.addEventListener('focusout', function (e) {
    if (e.relatedTarget && !gruppe.contains(e.relatedTarget)) setze(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && knopf.getAttribute('aria-expanded') === 'true') {
      setze(false);
      knopf.focus();
    }
  });
})();

// Kopf beim Scrollen: dezenter Schatten und etwas kleineres Logo (Klasse ist-gescrollt).
// Die Leiste darüber gleitet ohnehin von selbst hinaus (CSS, position: sticky).
(function () {
  var wurzel = document.documentElement;
  var geplant = false;
  function pruefe() {
    geplant = false;
    wurzel.classList.toggle('ist-gescrollt', window.scrollY > 48);
  }
  window.addEventListener(
    'scroll',
    function () {
      if (!geplant) {
        geplant = true;
        window.requestAnimationFrame(pruefe);
      }
    },
    { passive: true }
  );
  pruefe();
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

// Leichte Parallaxe für Fotos mit data-parallaxe: höchstens ein paar Pixel, nur solange sie sichtbar sind.
// Bei „Bewegung reduzieren“ oder ohne IntersectionObserver bleibt alles still.
(function () {
  var rahmen = document.querySelectorAll('[data-parallaxe]');
  if (!rahmen.length || !('IntersectionObserver' in window)) return;
  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (ruhig.matches) return;

  var sichtbar = [];
  var geplant = false;

  function rechne() {
    geplant = false;
    var mitte = window.innerHeight / 2;
    sichtbar.forEach(function (el) {
      var r = el.getBoundingClientRect();
      // Abstand der Rahmenmitte zur Fenstermitte, begrenzt auf ±1
      var anteil = Math.max(-1, Math.min(1, (r.top + r.height / 2 - mitte) / (mitte + r.height / 2)));
      // Höchstens 3 % der Rahmenhöhe: Das Bild ist um 8 % vergrößert, die Kanten bleiben verdeckt
      el.style.setProperty('--parallaxe', (anteil * r.height * 0.03).toFixed(1) + 'px');
    });
  }
  function plane() {
    if (!geplant) {
      geplant = true;
      window.requestAnimationFrame(rechne);
    }
  }

  var beobachter = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (eintrag) {
      var i = sichtbar.indexOf(eintrag.target);
      if (eintrag.isIntersecting && i < 0) sichtbar.push(eintrag.target);
      if (!eintrag.isIntersecting && i >= 0) sichtbar.splice(i, 1);
    });
    plane();
  });
  rahmen.forEach(function (el) {
    beobachter.observe(el);
  });
  window.addEventListener('scroll', plane, { passive: true });
  window.addEventListener('resize', plane);
  document.documentElement.classList.add('js-parallaxe');
})();
