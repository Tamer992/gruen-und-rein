// Erzeugt Logo, Favicon und Vorschaubild für geteilte Links.
// Seit 09.10.2026 „Herz & Glanz Service“ nach dem Logo der Inhaber: Zeichen aus scripts/zeichen.mjs
// (Herz aus zwei Bögen mit Blättern, Haus, Funkeln), Wortmarke „HERZ & GLANZ“ in Literata SemiBold,
// darunter „SERVICE“ zwischen zwei feinen Linien. Die Schrift wird in Pfade umgewandelt, damit das Logo überall gleich aussieht.
// Aufruf: python scripts/instanzen.py && node scripts/logo.mjs
// Nach einer Änderung am Logo in Kopf.astro und Fuss.astro die Zahl hinter „?v=“ erhöhen, damit Browser es neu laden.
import * as fontkit from 'fontkit';
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { zeichen, BOX, ANSICHT } from './zeichen.mjs';

const I = 'scripts/_instanzen/';
const wort = fontkit.openSync(I + 'wort.ttf');
const titel = fontkit.openSync(I + 'titel.ttf');
const zeile = fontkit.openSync(I + 'zeile.ttf');

const NAME = 'Herz &amp; Glanz Service';

// Wie in src/styles/global.css (:root). Blattgrün nur im Zeichen.
const F = {
  waldgruen: '#1D4733',
  blatt: '#3E7A47',
  tinte: '#17221B',
  leinen: '#F6F1E8',
  grund: '#F6F7F4',
  salbei: '#A3C4AC', // Grün auf dunklem Grund
  blattHell: '#6FA67A',
  tanne: '#11231A',
  messingHell: '#D6BB87',
};

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

// Bild- plus Wortmarke: Zeichen 40 hoch, rechts daneben „HERZ & GLANZ“ (Versalhöhe 15),
// darunter „SERVICE“ mittig zwischen zwei Linien, zusammen so breit wie die Wortmarke.
function logo({ herz, blatt, grund, text, linie }) {
  const H = 40;
  const VERSAL = 15;
  const groesse = (VERSAL / wort.glyphForCodePoint(72).bbox.maxY) * wort.unitsPerEm;
  const s = H / (BOX[3] - BOX[1]);
  const x0 = (BOX[2] - BOX[0]) * s + 9;
  const zg = 8.8; // Schriftgröße „SERVICE“
  const zVersal = (zeile.glyphForCodePoint(72).bbox.maxY / zeile.unitsPerEm) * zg;
  const abstand = 6;
  const block = VERSAL + abstand + zVersal;
  const oben = (H - block) / 2;
  const grundlinie = oben + VERSAL;
  const w = setze(wort, 'HERZ & GLANZ', groesse, x0, grundlinie, 0.04 * groesse);
  const zsp = 0.3 * zg;
  const zb = setze(zeile, 'SERVICE', zg, 0, 0, zsp).breite;
  const zLinie = grundlinie + abstand + zVersal;
  const zx = x0 + (w.breite - zb) / 2;
  const z = setze(zeile, 'SERVICE', zg, zx, zLinie, zsp);
  const ly = rund((zLinie - zVersal / 2).toFixed(2));
  const luecke = 6;
  const striche = `<path stroke="${linie}" stroke-width="0.8" d="M${rund(x0.toFixed(2))} ${ly}H${rund((zx - luecke).toFixed(2))}M${rund((zx + zb + luecke).toFixed(2))} ${ly}H${rund((x0 + w.breite).toFixed(2))}"/>`;
  const breite = Math.ceil(x0 + w.breite + 1);
  const marke = `<g transform="translate(${rund((-BOX[0] * s).toFixed(2))} ${rund((-BOX[1] * s).toFixed(2))}) scale(${s.toFixed(4)})">${zeichen(herz, blatt, grund)}</g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${breite} ${H}" width="${breite}" height="${H}" role="img" aria-labelledby="t"><title id="t">${NAME}</title>${marke}<path fill="${text}" d="${w.d}${z.d}"/>${striche}</svg>`;
  return { svg, breite, hoehe: H, schrift: groesse };
}

// Nur das Zeichen, knapp zugeschnitten
const marke = (herz, blatt, grund) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ANSICHT}" width="64" height="56" role="img" aria-labelledby="t"><title id="t">${NAME}</title>${zeichen(herz, blatt, grund)}</svg>`;

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
const dunkel = logo({ herz: F.waldgruen, blatt: F.blatt, grund: F.grund, text: F.tinte, linie: F.blatt });
const hell = logo({ herz: F.salbei, blatt: F.blattHell, grund: F.tanne, text: F.leinen, linie: F.blattHell });
writeFileSync('public/logo.svg', dunkel.svg);
writeFileSync('public/logo-hell.svg', hell.svg);
writeFileSync('public/logo-mark.svg', marke(F.waldgruen, F.blatt, F.grund));
writeFileSync('public/logo-mark-hell.svg', marke(F.salbei, F.blattHell, F.tanne));
writeFileSync('src/components/logo-mass.json', JSON.stringify({ breite: dunkel.breite, hoehe: dunkel.hoehe }));

// Favicon als SVG: Zeichen auf einer hellen Fläche, damit es in hellen und dunklen Browsern gleich gut wirkt
const flaeche = (rundung, rand) => {
  const k = (64 - 2 * rand) / 64;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${rundung}" fill="${F.grund}"/><g transform="translate(${rand} ${rand + 1.5 * k}) scale(${k})">${zeichen(F.waldgruen, F.blatt, F.grund)}</g></svg>`;
};
writeFileSync('public/favicon.svg', flaeche(12, 2));

const png = (g, svg) => sharp(Buffer.from(svg), { density: 600 }).resize(g, g).png().toBuffer();
writeFileSync(
  'public/favicon.ico',
  ico([
    { groesse: 16, daten: await png(16, flaeche(12, 2)) },
    { groesse: 32, daten: await png(32, flaeche(12, 2)) },
    { groesse: 48, daten: await png(48, flaeche(12, 2)) },
  ]),
);
writeFileSync('public/apple-touch-icon.png', await png(180, flaeche(0, 8)));
writeFileSync('public/icon-512.png', await png(512, flaeche(0, 8)));

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
