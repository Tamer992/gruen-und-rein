// Setzt den Unterordner der Seite vor einen Pfad.
// Auf der echten Domain ist das nichts („/kontakt/“), in der Vorschau auf GitHub Pages „/herz-und-glanz/kontakt/“ (Name des Repos).
const basis = import.meta.env.BASE_URL.replace(/\/$/, '');

export function p(pfad: string): string {
  return basis + pfad;
}
