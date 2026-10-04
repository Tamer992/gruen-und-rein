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

  // Zier-Animationen (Dach, Zierlinien, Siegel) starten erst, wenn sie ein Viertel weit im Bild sind.
  // Vorher liefen sie schon am unteren Rand ab und fielen kaum auf (Tamer, 04.10.2026).
  var spaet = new IntersectionObserver(
    function (eintraege) {
      eintraege.forEach(function (eintrag) {
        if (!eintrag.isIntersecting) return;
        eintrag.target.classList.add('ist-sichtbar');
        spaet.unobserve(eintrag.target);
      });
    },
    { rootMargin: '0px 0px -25% 0px' }
  );
  var zier = /^(zeichnen|zier|siegel)$/;

  var hoehe = window.innerHeight;
  teile.forEach(function (teil) {
    var istZier = zier.test(teil.getAttribute('data-einblenden'));
    if (teil.getBoundingClientRect().top < hoehe * (istZier ? 0.75 : 1)) teil.classList.add('ist-sichtbar');
    else (istZier ? spaet : beobachter).observe(teil);
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
  // Nur am Computer mit Maus. Auf Handy und Tablet scrollt die Seite flüssiger, als das Skript nachkommt:
  // Die Fotos hingen dort einen Tick hinterher und wirkten verzögert (Tamer 04.10.2026, „Bilder laggen“).
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var sichtbar = [];
  var geplant = false;

  // Abstand der Rahmenmitte zur Fenstermitte, begrenzt auf ±1
  function anteilVon(el) {
    var r = el.getBoundingClientRect();
    var mitte = window.innerHeight / 2;
    return { r: r, a: Math.max(-1, Math.min(1, (r.top + r.height / 2 - mitte) / (mitte + r.height / 2))) };
  }
  // Ausgangslage beim Laden merken: Das Foto steht dort, wo die Seite es zeigt, und gleitet erst beim Scrollen.
  // Vorher sprang es kurz nach dem Laden um ein paar Pixel (Tamer: „Bilder laggen beim Aufrufen“, 04.10.2026).
  var basis = new Map();
  rahmen.forEach(function (el) {
    basis.set(el, anteilVon(el).a);
  });

  function rechne() {
    geplant = false;
    sichtbar.forEach(function (el) {
      var m = anteilVon(el);
      // Höchstens 3,5 % der Rahmenhöhe: Das Bild ist um 8 % vergrößert, die Kanten bleiben verdeckt
      var weg = Math.max(-0.035, Math.min(0.035, (m.a - basis.get(el)) * 0.03));
      el.style.setProperty('--parallaxe', (weg * m.r.height).toFixed(1) + 'px');
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
