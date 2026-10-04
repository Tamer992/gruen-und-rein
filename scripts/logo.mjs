// Erzeugt Logo, Favicon und Vorschaubild für geteilte Links.
// Zeichen: ein Dach über einem Herz (Fürsorge zu Hause), von Hand auf einem 48er-Raster gezeichnet.
// Die Schrift (Hanken Grotesk Medium, seit 04.10.2026 dezenter statt SemiBold) wird in Pfade umgewandelt, damit das Logo überall gleich aussieht.
// Aufruf: python scripts/instanzen.py && node scripts/logo.mjs
// Nach einer Änderung am Logo in Kopf.astro und Fuss.astro die Zahl hinter „?v=“ erhöhen, damit Browser es neu laden.
import * as fontkit from 'fontkit';
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const I = 'scripts/_instanzen/';
const wort = fontkit.openSync(I + 'wort.ttf');
const titel = fontkit.openSync(I + 'titel.ttf');
const zeile = fontkit.openSync(I + 'zeile.ttf');

// Zeile unter Zeichen und Wortmarke (Tamer, 04.10.2026)
const ZEILE = ['Zuverlässig', 'mit Herz', 'individuell'];

// Wie in src/styles/global.css (:root). Höchstens zwei Farben je Fassung.
const F = {
  waldgruen: '#1D4733',
  tinte: '#17221B',
  leinen: '#F6F1E8',
  salbei: '#A3C4AC', // Grün auf dunklem Grund
  tanne: '#11231A',
  messing: '#A27C3C',
  messingHell: '#D6BB87',
};

// Zeichen auf dem 48er-Raster: Dach (Linie, 5 stark) und Herz (Fläche)
const DACH = 'M8 21L24 8L40 21';
const HERZ = 'M24 40L14 30A5.66 5.66 0 0 1 22 22L24 24L26 22A5.66 5.66 0 0 1 34 30Z';
const BOX = [5.5, 5.5, 42.5, 40]; // sichtbare Ausdehnung inkl. halber Strichstärke
const zeichen = (dach, herz) =>
  `<path d="${DACH}" fill="none" stroke="${dach}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="${HERZ}" fill="${herz}"/>`;

const rund = (d) => d.replace(/-?\d*\.\d+/g, (z) => String(Math.round(parseFloat(z) * 10) / 10));

function setze(font, text, groesse, x0, grundlinie, sperrung = 0) {
  const lauf = font.layout(text);
  const s = groesse / font.unitsPerEm;
  let x = x0;
  const teile = [];
  lauf.glyphs.forEach((g, i) => {
    const pos = lauf.positions[i];
    const d = g.path.scale(s, -s).translate(x + pos.xOffset * s, grundlinie - pos.yOffset * s).toSVG();
    if (d) teile.push(d);
    x += pos.xAdvance * s + sperrung;
  });
  return { d: rund(teile.join('')), breite: x - x0 - sperrung };
}

// Bild- plus Wortmarke: Zeichen 32 hoch, Versalhöhe der Schrift 17, „&“ in der Akzentfarbe.
// Darunter über die ganze Breite die Zeile „Zuverlässig · mit Herz · individuell“, Punkte in der Akzentfarbe.
function logo({ dach, herz, text, et }) {
  const H = 32;
  const VERSAL = 17;
  const groesse = (VERSAL / wort.glyphForCodePoint(72).bbox.maxY) * wort.unitsPerEm;
  const sp = -0.005 * groesse;
  const s = H / (BOX[3] - BOX[1]);
  const x0 = (BOX[2] - BOX[0]) * s + VERSAL * 0.68;
  const linie = H / 2 + VERSAL / 2;
  const raum = groesse * 0.26;
  const a = setze(wort, 'Grün', groesse, x0, linie, sp);
  const b = setze(wort, '&', groesse, x0 + a.breite + raum, linie, sp);
  const c = setze(wort, 'Rein', groesse, x0 + a.breite + raum + b.breite + raum, linie, sp);
  const breite = Math.ceil(x0 + a.breite + b.breite + c.breite + raum * 2 + 1);

  // Zeile: Schriftgröße so wählen, dass sie genau die Breite des Logos füllt
  const zsp = 0.03; // Sperrung in em
  const mitte = ' · ';
  const messen = (g) => {
    const t = ZEILE.join(mitte);
    return setze(zeile, t, g, 0, 0, zsp * g).breite;
  };
  const zg = (10 * (breite - 1)) / messen(10);
  const zVersal = (zeile.glyphForCodePoint(72).bbox.maxY / zeile.unitsPerEm) * zg;
  const zLinie = H + 5 + zVersal;
  const unten = Math.ceil(zLinie + (Math.abs(zeile.descent) / zeile.unitsPerEm) * zg * 0.6);
  let x = 0;
  const woerter = [];
  const punkte = [];
  ZEILE.forEach((w, i) => {
    if (i) {
      const m = setze(zeile, mitte, zg, x, zLinie, zsp * zg);
      punkte.push(m.d);
      x += m.breite + zsp * zg;
    }
    const t = setze(zeile, w, zg, x, zLinie, zsp * zg);
    woerter.push(t.d);
    x += t.breite + zsp * zg;
  });

  const marke = `<g transform="translate(${rund((-BOX[0] * s).toFixed(2))} ${rund((-BOX[1] * s).toFixed(2))}) scale(${s.toFixed(4)})">${zeichen(dach, herz)}</g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${breite} ${unten}" width="${breite}" height="${unten}" role="img" aria-labelledby="t"><title id="t">Grün &amp; Rein. ${ZEILE.join(', ')}</title>${marke}<path fill="${text}" d="${a.d}${c.d}${woerter.join('')}"/><path fill="${et}" d="${b.d}${punkte.join('')}"/></svg>`;
  return { svg, breite, hoehe: unten, schrift: zg };
}

// Nur das Zeichen, knapp zugeschnitten
const ANSICHT = '4 3 40 40';
const marke = (dach, herz) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ANSICHT}" width="40" height="40" role="img" aria-labelledby="t"><title id="t">Grün &amp; Rein</title>${zeichen(dach, herz)}</svg>`;

function ico(pngs) {
  const kopf = Buffer.alloc(6 + 16 * pngs.length);
  kopf.writeUInt16LE(0, 0);
  kopf.writeUInt16LE(1, 2);
  kopf.writeUInt16LE(pngs.length, 4);
  let offset = kopf.length;
  pngs.forEach(({ groesse, daten }, i) => {
    const o = 6 + i * 16;
    kopf.writeUInt8(groesse, o);
    kopf.writeUInt8(groesse, o + 1);
    kopf.writeUInt16LE(1, o + 4);
    kopf.writeUInt16LE(32, o + 6);
    kopf.writeUInt32LE(daten.length, o + 8);
    kopf.writeUInt32LE(offset, o + 12);
    offset += daten.length;
  });
  return Buffer.concat([kopf, ...pngs.map((p) => p.daten)]);
}

// Logo: dunkle Fassung für hellen Grund (Kopf), helle Fassung für dunklen Grund (Fuß)
// Dezenter (Tamer, 04.10.2026): Dach und Herz einfarbig in der Akzentfarbe, Schrift Medium
// Herz, „&“ und die Punkte der Zeile in Messing (Tamer, 04.10.2026, Variante 3)
const dunkel = logo({ dach: F.waldgruen, herz: F.messing, text: F.tinte, et: F.messing });
const hell = logo({ dach: F.salbei, herz: F.messingHell, text: F.leinen, et: F.messingHell });
writeFileSync('public/logo.svg', dunkel.svg);
writeFileSync('public/logo-hell.svg', hell.svg);
writeFileSync('public/logo-mark.svg', marke(F.waldgruen, F.messing));
writeFileSync('public/logo-mark-hell.svg', marke(F.salbei, F.messingHell));
writeFileSync('src/components/logo-mass.json', JSON.stringify({ breite: dunkel.breite, hoehe: dunkel.hoehe }));

// Favicon als SVG: passt sich hellem und dunklem Browser an
const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ANSICHT}"><style>.d{stroke:${F.waldgruen}}.h{fill:${F.messing}}@media (prefers-color-scheme:dark){.d{stroke:${F.salbei}}.h{fill:${F.messingHell}}}</style><path class="d" d="${DACH}" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path class="h" d="${HERZ}"/></svg>`;
writeFileSync('public/favicon.svg', fav);

// Feste Bilder (ICO, Apple, 512): Zeichen auf einer hellen Fläche, damit es auch auf dunklen Leisten sichtbar bleibt
// Das Zeichen liegt auf dem Raster bei y 5,5 bis 40, also 1,25 über der Mitte: beim Verkleinern nachschieben
const flaeche = (rundung, rand) => {
  const k = (48 - 2 * rand) / 48;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="${rundung}" fill="${F.leinen}"/><g transform="translate(${rand} ${rand + 1.25 * k}) scale(${k})">${zeichen(F.waldgruen, F.messing)}</g></svg>`;
};
const png = (g, svg) => sharp(Buffer.from(svg), { density: 600 }).resize(g, g).png().toBuffer();
writeFileSync(
  'public/favicon.ico',
  ico([
    { groesse: 16, daten: await png(16, flaeche(9, 2)) },
    { groesse: 32, daten: await png(32, flaeche(9, 2)) },
    { groesse: 48, daten: await png(48, flaeche(9, 2)) },
  ]),
);
writeFileSync('public/apple-touch-icon.png', await png(180, flaeche(0, 7)));
writeFileSync('public/icon-512.png', await png(512, flaeche(0, 7)));

// Vorschaubild 1200 x 630: links Tanne mit Logo und Satz, rechts das Foto vom Einstieg
const satz1 = setze(titel, 'Alltag. Zuhause.', 74, 80, 365, -1.5);
const satz2 = setze(titel, 'Sauber. Gepflegt.', 74, 80, 448, -1.5);
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${F.tanne}"/><g transform="translate(80 110) scale(2.3)">${hell.svg.replace(/<svg[^>]*>|<\/svg>|<title[^>]*>.*?<\/title>/g, '')}</g><rect x="80" y="505" width="64" height="2" fill="${F.messingHell}"/><path fill="${F.leinen}" d="${satz1.d}"/><path fill="${F.messingHell}" d="${satz2.d}"/></svg>`;
// Ausschnitt um die ältere Dame (etwa 60 % der Bildbreite), damit Gesicht und Tasse im Bild bleiben
const fotoBreit = await sharp('src/bilder/einstieg-kaffee.jpg').resize({ height: 630 }).toBuffer();
const breit = (await sharp(fotoBreit).metadata()).width;
const links = Math.max(0, Math.min(breit - 460, Math.round(breit * 0.6 - 230)));
const foto = await sharp(fotoBreit).extract({ left: links, top: 0, width: 460, height: 630 }).toBuffer();
writeFileSync(
  'public/og-bild.jpg',
  await sharp(Buffer.from(og)).composite([{ input: foto, left: 740, top: 0 }]).jpeg({ quality: 84, mozjpeg: true }).toBuffer(),
);
console.log('Logo', dunkel.breite, 'x', dunkel.hoehe, 'Zeile', dunkel.schrift.toFixed(2), 'px');
