(() => {
  const kopf = document.getElementById('kopf');
  const knopf = document.getElementById('menue-knopf');
  const nav = document.getElementById('navigation');

  // Kopf bekommt beim Scrollen einen Hintergrund
  const kopfPruefen = () => kopf.classList.toggle('gescrollt', window.scrollY > 20);
  kopfPruefen();
  window.addEventListener('scroll', kopfPruefen, { passive: true });

  // Mobiles Menü
  if (knopf && nav) {
    const setzen = (offen) => {
      knopf.setAttribute('aria-expanded', String(offen));
      knopf.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen');
      nav.classList.toggle('offen', offen);
      kopf.classList.toggle('menue-offen', offen);
      document.body.style.overflow = offen ? 'hidden' : '';
    };
    knopf.addEventListener('click', () => setzen(knopf.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setzen(false)));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setzen(false));
    window.matchMedia('(min-width: 901px)').addEventListener('change', (m) => m.matches && setzen(false));
  }

  // Elemente beim Scrollen einblenden
  const elemente = document.querySelectorAll('.einblenden');
  if ('IntersectionObserver' in window) {
    const beobachter = new IntersectionObserver((eintraege) => {
      eintraege.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('sichtbar');
          beobachter.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    elemente.forEach((el) => beobachter.observe(el));
  } else {
    elemente.forEach((el) => el.classList.add('sichtbar'));
  }

  // Aktiven Menüpunkt markieren
  const links = [...document.querySelectorAll('.navigation a[href^="#"]:not(.knopf)')];
  const bereiche = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (bereiche.length && 'IntersectionObserver' in window) {
    const markierer = new IntersectionObserver((eintraege) => {
      eintraege.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    bereiche.forEach((b) => markierer.observe(b));
  }

  // Goldener Lichtkegel folgt der Maus auf den Leistungskarten
  document.querySelectorAll('.karte').forEach((karte) => {
    karte.addEventListener('pointermove', (e) => {
      const r = karte.getBoundingClientRect();
      karte.style.setProperty('--mx', `${e.clientX - r.left}px`);
      karte.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  const jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = new Date().getFullYear();
})();
