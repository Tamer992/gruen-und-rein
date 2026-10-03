// Erzeugt Wortmarke, Favicon und Vorschaubild aus den echten Schriftkonturen.
// Die SVGs brauchen dadurch keine Schrift und sehen überall gleich aus.
// Aufruf: python scripts/instanzen.py && node scripts/logo.mjs
import * as fontkit from 'fontkit';
import sharp from 'sharp';
import { writeFileSync, readFileSync } from 'node:fs';

const zweig = JSON.parse(readFileSync('src/components/zweig-pfad.json', 'utf8'));

// Vorher: python scripts/instanzen.py (legt feste Schnitte in scripts/_instanzen/ an)
const I = 'scripts/_instanzen/';
const wort = fontkit.openSync(I + 'wort.ttf');
const et = fontkit.openSync(I + 'et.ttf');
const zeile = fontkit.openSync(I + 'zeile.ttf');

const FARBE = { tanne: '#2F5640', moos: '#55705A', papier: '#FAF7F0', blatt: '#EAF0E6', tinte: '#1E2A23', leise: '#46534B' };

// Setzt einen Text als Pfad. Liefert Pfaddaten und Laufweite in px.
function setze(font, text, groesse, x0, grundlinie, sperrung = 0) {
  const lauf = font.layout(text);
  const s = groesse / font.unitsPerEm;
  let x = x0;
  const teile = [];
  lauf.glyphs.forEach((g, i) => {
    const pos = lauf.positions[i];
    const d = g.path
      .scale(s, -s)
      .translate(x + pos.xOffset * s, grundlinie - pos.yOffset * s)
      .toSVG();
    if (d) teile.push(d);
    x += pos.xAdvance * s + sperrung;
  });
  return { d: teile.join(''), breite: x - x0 - sperrung };
}

function rund(d) {
  return d.replace(/-?\d+\.\d+/g, (n) => (Math.round(parseFloat(n) * 10) / 10).toString());
}

// Wortmarke: „Grün & Rein“, darunter eine gesperrte Zeile in Kapitälchen
function wortmarke({ text = FARBE.tanne, et: etFarbe = FARBE.moos, zeileFarbe = FARBE.leise, mitZeile = true } = {}) {
  const G = 64;
  const linie = 62;
  const a = setze(wort, 'Grün', G, 0, linie);
  const abstand = G * 0.2;
  const etTeil = setze(et, '&', G * 1.12, a.breite + abstand, linie + G * 0.04);
  const b = setze(wort, 'Rein', G, a.breite + abstand + etTeil.breite + abstand, linie);
  const breite = a.breite + abstand * 2 + etTeil.breite + b.breite;

  let zeilePfad = '';
  let hoehe = 80;
  if (mitZeile) {
    const zText = 'ALLTAGSHILFE · HAUS · GARTEN';
    const zG = 13.2;
    const probe = setze(zeile, zText, zG, 0, 0, 0);
    const zeichen = [...zText].length - 1;
    const sperrung = (breite - probe.breite) / zeichen;
    const z = setze(zeile, zText, zG, 0, 98, sperrung);
    zeilePfad = `<path fill="${zeileFarbe}" d="${rund(z.d)}"/>`;
    hoehe = 104;
  }
  const w = Math.ceil(breite + 2);
  return {
    breite: w,
    hoehe,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 ${w} ${hoehe}" width="${w}" height="${hoehe}" role="img" aria-labelledby="t"><title id="t">Grün &amp; Rein</title><path fill="${text}" d="${rund(a.d + b.d)}"/><path fill="${etFarbe}" d="${rund(etTeil.d)}"/>${zeilePfad}</svg>`,
  };
}

// Favicon: das Et-Zeichen allein auf hellem Grün
function favicon() {
  const g = 76;
  const lauf = et.layout('&');
  const s = g / et.unitsPerEm;
  const bbox = lauf.glyphs[0].bbox;
  const bw = (bbox.maxX - bbox.minX) * s;
  const bh = (bbox.maxY - bbox.minY) * s;
  const x = (100 - bw) / 2 - bbox.minX * s;
  const y = (100 + bh) / 2 + bbox.minY * s;
  const p = setze(et, '&', g, x, y);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="${FARBE.blatt}"/><path fill="${FARBE.tanne}" d="${rund(p.d)}"/></svg>`;
}

// Kleines ICO mit eingebetteten PNGs (16 und 32 px)
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

const logo = wortmarke();
const logoHell = wortmarke({ text: FARBE.papier, et: '#CFDCCB', zeileFarbe: '#CFDCCB' });
writeFileSync('public/logo.svg', logo.svg);
writeFileSync('public/logo-hell.svg', logoHell.svg);
writeFileSync('src/components/logo-mass.json', JSON.stringify({ breite: logo.breite, hoehe: logo.hoehe }));

const fav = favicon();
writeFileSync('public/favicon.svg', fav);
const png = (g) => sharp(Buffer.from(fav), { density: 300 }).resize(g, g).png().toBuffer();
writeFileSync('public/apple-touch-icon.png', await sharp(Buffer.from(fav.replace('rx="14"', 'rx="0"')), { density: 300 }).resize(180, 180).png().toBuffer());
writeFileSync('public/icon-512.png', await png(512));
writeFileSync('public/favicon.ico', ico([{ groesse: 16, daten: await png(16) }, { groesse: 32, daten: await png(32) }]));

// Vorschaubild für geteilte Links (1200 x 630)
const gross = wortmarke();
const faktor = 760 / gross.breite;
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${FARBE.papier}"/>
<rect x="0" y="560" width="1200" height="70" fill="${FARBE.tanne}"/>
<line x1="120" y1="150" x2="1080" y2="150" stroke="#C9CFC2" stroke-width="2"/>
<g transform="translate(120 215) scale(${faktor})">${gross.svg.replace(/<svg[^>]*>|<\/svg>|<title[^>]*>.*?<\/title>/g, '')}</g>
<g transform="translate(960 250) scale(1.9)" fill="none" stroke="${FARBE.moos}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${zweig.stiel}"/>${zweig.blaetter.map((d) => `<path d="${d}"/>`).join('')}${zweig.adern.map((d) => `<path d="${d}" stroke-width="1"/>`).join('')}</g>
</svg>`;
writeFileSync('public/og-bild.jpg', await sharp(Buffer.from(ogSvg)).jpeg({ quality: 86, mozjpeg: true }).toBuffer());
console.log('Logo', logo.breite, 'x', logo.hoehe, 'fertig');
