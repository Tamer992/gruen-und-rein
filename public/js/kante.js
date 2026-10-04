// Leuchtkante im Kopf: Beim ersten Seitenaufruf eines Besuchs zieht sich die Messinglinie einmal von der Mitte
// aus auf (CSS in Kopf.astro). Danach nicht mehr, damit es beim Weiterklicken nicht stört.
// Läuft im <head> vor dem ersten Bild, damit die Linie nicht erst steht und dann neu startet.
(function () {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.sessionStorage.getItem('gr-kante')) return;
    window.sessionStorage.setItem('gr-kante', '1');
    document.documentElement.classList.add('kante-auf');
  } catch (e) {
    /* Ohne Speicher (privates Fenster) einfach keine Animation */
  }
})();
