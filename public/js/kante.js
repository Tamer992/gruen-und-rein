// Messinglinie im Kopf: Beim ersten Seitenaufruf eines Besuchs zieht sie sich einmal von der Mitte auf
// (CSS in Kopf.astro, Klasse kante-auf). Beim Weiterklicken steht sie einfach da (Tamer, 04.10.2026).
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
