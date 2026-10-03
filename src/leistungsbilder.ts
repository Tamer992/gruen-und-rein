// Ein Foto je Leistung, für die Kacheln „Weitere Leistungen“ auf den Unterseiten.
// Dieselben Fotos wie auf der Startseite. Quellen in src/bilder/QUELLEN.md
import type { ImageMetadata } from 'astro';
import alltag from './bilder/alltag-park.jpg';
import haus from './bilder/hauswirtschaft-kueche.jpg';
import trauer from './bilder/trauer-blumen.jpg';
import rein from './bilder/reinigung-wischen.jpg';
import garten from './bilder/garten-rasen.jpg';

export const leistungsbilder: Record<string, { bild: ImageMetadata; alt: string; ausschnitt: 'mitte' | 'oben' | 'rechts' }> = {
  alltagsbegleitung: { bild: alltag, alt: 'Zwei Frauen gehen untergehakt und lachend durch einen Park', ausschnitt: 'oben' },
  hauswirtschaft: { bild: haus, alt: 'Eine ältere Frau bereitet in ihrer Küche einen Salat zu', ausschnitt: 'mitte' },
  trauerbegleitung: { bild: trauer, alt: 'Blumen im warmen Abendlicht', ausschnitt: 'rechts' },
  gebaeudereinigung: { bild: rein, alt: 'Eine Reinigungskraft wischt den Boden einer hellen Wohnung', ausschnitt: 'mitte' },
  gartenpflege: { bild: garten, alt: 'Ein Rasenmäher auf frisch gemähtem, sattgrünem Rasen', ausschnitt: 'mitte' },
};
