// Erzeugt Logo, Favicon und Vorschaubild für geteilte Links.
// Die Schrift wird in Pfade umgewandelt, damit das Logo überall gleich aussieht.
// Aufruf: python scripts/instanzen.py && node scripts/logo.mjs
import * as fontkit from 'fontkit';
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const I = 'scripts/_instanzen/';
const fett = fontkit.openSync(I + 'wort.ttf');
const mittel = fontkit.openSync(I + 'et.ttf');
const zeile = fontkit.openSync(I + 'zeile.ttf');

const F = {
  waldgruen: '#1E4D36',
  tanne: '#12291D',
  grund: '#F6F7F4',
  salbei: '#E7EEE8',
  blatt: '#A9D3B2',
  tinte: '#14211A',
  leise: '#4A5A51',
  hellAufTanne: '#BFD0C4',
};

// Zeichen: abgerundetes Quadrat, darin ein Blatt, das zugleich ein Tropfen ist
const BLATT = 'M74 19C50 20 25.5 33.5 25.5 58.5 25.5 71.5 35.5 81 49 81 70.5 81 80.5 55 74 19Z';
const ADER = 'M37.5 70.5C47 57 57 44 66.5 30.5';
function zeichen(x, y, groesse, flaeche, blatt) {
  const s = groesse / 100;
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect width="100" height="100" rx="28" fill="${flaeche}"/><path d="${BLATT}" fill="${blatt}"/><path d="${ADER}" fill="none" stroke="${flaeche}" stroke-width="4.5" stroke-linecap="round"/></g>`;
}

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
  return { d: teile.join(''), breite: x - x0 - sperrung };
}
const rund = (d) => d.replace(/-?\d+\.\d+/g, (n) => (Math.round(parseFloat(n) * 10) / 10).toString());

// Wortmarke mit Zeichen links
function logo({ text = F.tinte, et = F.waldgruen, zeileFarbe = F.leise, flaeche = F.waldgruen, blatt = F.grund } = {}) {
  const H = 56;
  const G = 30;
  const x0 = H + 14;
  const linie = 30;
  const sp = -G * 0.02;
  const a = setze(fett, 'Grün', G, x0, linie, sp);
  const lu = G * 0.24;
  const b = setze(mittel, '&', G, x0 + a.breite + lu, linie, sp);
  const c = setze(fett, 'Rein', G, x0 + a.breite + lu + b.breite + lu, linie, sp);
  const z = setze(zeile, 'Hilfe zu Hause', 14.5, x0 + 1, 51, 0.2);
  const breite = Math.ceil(x0 + a.breite + lu * 2 + b.breite + c.breite + 2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${breite} ${H}" width="${breite}" height="${H}" role="img" aria-labelledby="t"><title id="t">Grün &amp; Rein</title>${zeichen(0, 0, H, flaeche, blatt)}<path fill="${text}" d="${rund(a.d + c.d)}"/><path fill="${et}" d="${rund(b.d)}"/><path fill="${zeileFarbe}" d="${rund(z.d)}"/></svg>`;
  return { svg, breite, hoehe: H };
}

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

const hell = logo();
const dunkel = logo({ text: F.grund, et: F.blatt, zeileFarbe: F.hellAufTanne, flaeche: F.blatt, blatt: F.tanne });
writeFileSync('public/logo.svg', hell.svg);
writeFileSync('public/logo-hell.svg', dunkel.svg);
writeFileSync('src/components/logo-mass.json', JSON.stringify({ breite: hell.breite, hoehe: hell.hoehe }));

const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${zeichen(0, 0, 100, F.waldgruen, F.grund)}</svg>`;
writeFileSync('public/favicon.svg', fav);
const png = (g, svg = fav) => sharp(Buffer.from(svg), { density: 400 }).resize(g, g).png().toBuffer();
const voll = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${F.waldgruen}"/><g transform="translate(14 14) scale(.72)"><path d="${BLATT}" fill="${F.grund}"/><path d="${ADER}" fill="none" stroke="${F.waldgruen}" stroke-width="4.5" stroke-linecap="round"/></g></svg>`;
writeFileSync('public/apple-touch-icon.png', await png(180, voll));
writeFileSync('public/icon-512.png', await png(512, voll));
writeFileSync('public/favicon.ico', ico([{ groesse: 16, daten: await png(16) }, { groesse: 32, daten: await png(32) }]));

// Vorschaubild 1200 x 630: links Tanne mit Logo und Satz, rechts das Foto vom Einstieg
const satz1 = setze(fett, 'Gut versorgt', 74, 80, 360, -1.5);
const satz2 = setze(fett, 'zu Hause.', 74, 80, 440, -1.5);
const flaeche = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${F.tanne}"/><g transform="translate(80 90) scale(1.6)">${dunkel.svg.replace(/<svg[^>]*>|<\/svg>|<title[^>]*>.*?<\/title>/g, '')}</g><path fill="${F.grund}" d="${rund(satz1.d + satz2.d)}"/></svg>`;
const foto = await sharp('src/bilder/gespraech-fotoalbum.jpg').resize(460, 630, { fit: 'cover', position: 'attention' }).toBuffer();
writeFileSync(
  'public/og-bild.jpg',
  await sharp(Buffer.from(flaeche)).composite([{ input: foto, left: 740, top: 0 }]).jpeg({ quality: 84, mozjpeg: true }).toBuffer(),
);
console.log('Logo', hell.breite, 'x', hell.hoehe);
