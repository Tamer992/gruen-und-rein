// Listet alle Stellen mit [PLATZHALTER: ...] im Quelltext auf.
// Aufruf: npm run platzhalter
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const treffer = [];
function durchsuche(ordner) {
  for (const name of readdirSync(ordner)) {
    const pfad = join(ordner, name);
    if (statSync(pfad).isDirectory()) durchsuche(pfad);
    else if (/\.(astro|ts|mjs|md|php)$/.test(name)) {
      readFileSync(pfad, 'utf8').split('\n').forEach((zeile, i) => {
        const m = zeile.match(/\[PLATZHALTER:[^\]]*\]/g);
        if (m) m.forEach((t) => treffer.push(`${pfad}:${i + 1}  ${t}`));
      });
    }
  }
}
durchsuche('src');
console.log(treffer.join('\n'));
console.log(`\n${treffer.length} Stellen`);
