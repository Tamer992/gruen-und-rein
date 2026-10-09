// Zeichen von Herz & Glanz (09.10.2026, nach dem Logo der Inhaber): ein Herz aus zwei Bögen, die unten in
// zwei Blätter auslaufen, darin ein Haus mit Schornstein und Fenster, oben rechts ein Funkeln für den „Glanz“.
// Gezeichnet auf einem 64er-Raster. Wird von scripts/logo.mjs benutzt.
const spiegel = (d) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${+(64 - x).toFixed(2)} ${y}`);

// Linke Herzhälfte als Sichel: außen dick, zur Spitze unten und zur Mitte oben dünn
const HERZ_L =
  'M32 54.5 C22 45.5 8.5 35 8.5 22 C8.5 13.5 14.3 7.8 21.5 7.8 C26.6 7.8 30.4 10.8 32 15.6 ' +
  'C30.3 12.2 26.9 10.6 23 10.6 C16.4 10.6 11.6 15.4 11.6 22 C11.6 32.5 21.2 42.5 32 54.5 Z';
// Linkes Blatt: wächst unten aus der Herzspitze nach links oben, Mittelrippe als Aussparung
const BLATT_L = 'M31 55 C19 54.5 7.5 47 2.5 32.5 C14.5 38 25 45 31 55 Z';
const RIPPE_L = 'M28.5 53.4 C21.5 48.2 13.5 42.5 7 36.6';
// Haus: Dach als Winkel, Schornstein rechts, Fenster aus vier Scheiben
const DACH = 'M18.5 33 L32 21 L45.5 33';
const SCHORNSTEIN = 'M39.2 20.6 H43 V27.6 L39.2 24.2 Z';
const FENSTER = [
  [28.4, 33.2], [32.4, 33.2], [28.4, 37.2], [32.4, 37.2],
].map(([x, y]) => `M${x} ${y}h3.2v3.2h-3.2z`).join('');
// Funkeln: vierzackiger Stern
const stern = (cx, cy, r) => {
  const k = r * 0.22;
  return `M${cx} ${cy - r} Q${cx + k} ${cy - k} ${cx + r} ${cy} Q${cx + k} ${cy + k} ${cx} ${cy + r} Q${cx - k} ${cy + k} ${cx - r} ${cy} Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
};
const FUNKELN = stern(57.5, 9.5, 4.2);

export const BOX = [2.5, 5.3, 61.5, 55]; // sichtbare Ausdehnung
export const ANSICHT = '0 2 64 56';

// herz: Herzbögen, Haus und Funkeln; blatt: Blätter
export function zeichen(herz, blatt, grund = 'none') {
  const blaetter = `<path fill="${blatt}" d="${BLATT_L}${spiegel(BLATT_L)}"/>` +
    `<path fill="none" stroke="${grund === 'none' ? '#fff' : grund}" stroke-width="0.7" stroke-linecap="round" d="${RIPPE_L}${spiegel(RIPPE_L)}"/>`;
  return blaetter +
    `<path fill="${herz}" d="${HERZ_L}${spiegel(HERZ_L)}"/>` +
    `<path fill="none" stroke="${herz}" stroke-width="3.4" stroke-linejoin="miter" d="${DACH}"/>` +
    `<path fill="${herz}" d="${SCHORNSTEIN}${FENSTER}${FUNKELN}"/>`;
}
