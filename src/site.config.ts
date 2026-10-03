// Alle Angaben zum Betrieb an einer Stelle.
// Was hier steht, erscheint automatisch auf allen Seiten, im Kopf, im Fuß,
// in den Suchmaschinen-Daten und in der Sitemap.
//
// Damit die Vorschau ordentlich aussieht, stehen hier neutrale Beispielwerte.
// Jede Zeile mit [PLATZHALTER: ...] muss vor dem Veröffentlichen ersetzt werden.
// Übersicht aller Stellen: npm run platzhalter

export const site = {
  name: 'Grün & Rein',
  // [PLATZHALTER: echte Domain] Volle Adresse, ohne Schrägstrich am Ende
  domain: 'https://platzhalter-domain.de',

  // [PLATZHALTER: Schreibweise der Vornamen und Nachnamen bestätigen]
  inhaberin: 'Hussain und Ali',
  inhaberinVorname: 'Hussain und Ali',
  // „Inhaberin“, „Inhaber“ oder „Inhaber“ (Mehrzahl)
  inhaberTitel: 'Inhaber',
  mehrereInhaber: true,

  // [PLATZHALTER: Telefonnummer] So wird die Nummer angezeigt
  telefon: '0000 000 000',
  // [PLATZHALTER: Telefonnummer für den Anruf-Link] Ziffern mit +49, ohne 0 vorne
  telefonLink: '+49000000000',
  // [PLATZHALTER: zweite Telefonnummer] Leer lassen, wenn es keine gibt.
  // Auf dem Flyer stehen 0160 1234567 und 0176 98765432. Das sind vermutlich Beispielnummern, bitte prüfen.
  telefon2: '',
  telefon2Link: '',
  // [PLATZHALTER: WhatsApp-Nummer] Ziffern mit 49 vorne, ohne + und ohne 0
  whatsappLink: '49000000000',
  // [PLATZHALTER: E-Mail-Adresse] Achtung: gruenundrein.de gehört einer anderen Firma (Grün und Rein GbR, Pforzheim)
  email: 'name@beispiel.de',

  adresse: {
    // Vom Flyer übernommen
    strasse: 'Vogelsbergstraße 2',
    plz: '64646',
    ort: 'Heppenheim',
    land: 'DE',
  },

  // Hauptort für Überschriften und Seitentitel
  ort: 'Heppenheim',

  // [PLATZHALTER: Einsatzorte] Ein Eintrag je Ort, zum Beispiel Heppenheim, Bensheim, Lorsch
  einsatzorte: ['Heppenheim und Umgebung'],

  // Erreichbarkeit, so steht es auf der Seite (Montag bis Samstag, laut Rückmeldung vom 03.10.2026)
  erreichbarkeit: 'Montag bis Samstag, 8 bis 18 Uhr',
  erreichbarkeitKurz: 'Mo bis Sa, 8 bis 18 Uhr',
  // Dieselben Zeiten für Suchmaschinen. Tage: Mo Tu We Th Fr Sa Su
  oeffnungszeiten: [{ tage: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], von: '08:00', bis: '18:00' }],

  // Abrechnung über die Pflegekasse (Entlastungsbetrag nach § 45b SGB XI) für Alltagsbegleitung,
  // Hauswirtschaft und Trauerbegleitung. Laut Hussain und Ali möglich (03.10.2026).
  // Anerkennung als Angebot zur Unterstützung im Alltag (Hessen) liegt vor, auch für die Trauerbegleitung
  // (Rückmeldung vom 03.10.2026).
  // Auf false stellen, falls die Anerkennung doch fehlt: Dann verschwinden alle Hinweise.
  // OFFEN (Tamer, 03.10.2026): Wer abrechnet, ist noch nicht geklärt (direkt mit der Pflegekasse über eine
  // Abtretungserklärung, oder Kundin/Kunde reicht die Rechnung selbst ein). Alle Texte sind bis dahin neutral
  // formuliert. Die früheren Sätze stehen als Kommentar mit [ERGÄNZEN: Abrechnung …] an Ort und Stelle,
  // Liste aller Stellen: npm run platzhalter
  pflegekasse: true,

  // Entlastungsbetrag nach § 45b SGB XI in Euro pro Monat (seit 1.1.2025, gilt auch 2026).
  // Steht auf der Seite „Pflegekasse“. Bei einer gesetzlichen Erhöhung hier anpassen.
  entlastungsbetrag: 131,

  // Gibt es eigene Unterseiten für die Leistungen, „Pflegekasse“, „Über uns“ und „Kontakt“?
  // Bei false zeigen Navigation, Kacheln und Fuß auf die Abschnitte der Startseite.
  unterseiten: true,
};

// Leistungen wie auf dem Flyer von Hussain und Ali, ergänzt am 03.10.2026 (Bügeln, Mahlzeiten, Rezepte und
// Medikamente, Post und Termine, Behördengänge, Fenster und Gardinen). Mit Hussain und Ali bestätigen.
// kasse: Abrechnung über die Pflegekasse möglich (nur sichtbar, wenn pflegekasse: true)
export const leistungen = [
  {
    titel: 'Alltagsbegleitung und Betreuung',
    kurz: 'Alltagsbegleitung',
    pfad: '/alltagsbegleitung/',
    anker: 'alltagsbegleitung',
    kasse: true,
    punkte: ['Betreuung', 'Spaziergänge', 'Arztbegleitung', 'Rezepte und Medikamente', 'Post und Termine', 'Behördengänge'],
  },
  {
    titel: 'Hauswirtschaft',
    kurz: 'Hauswirtschaft',
    pfad: '/hauswirtschaft/',
    anker: 'hauswirtschaft',
    kasse: true,
    punkte: ['Wohnungsreinigung', 'Waschen und Bügeln', 'Mahlzeiten', 'Einkaufen', 'Küche und Bad', 'Fenster'],
  },
  {
    titel: 'Trauerbegleitung',
    kurz: 'Trauerbegleitung',
    pfad: '/trauerbegleitung/',
    anker: 'trauerbegleitung',
    kasse: true,
    punkte: ['Zuhören', 'Gespräche', 'Unterstützung im Alltag', 'Begleitung in schweren Zeiten'],
  },
  {
    titel: 'Gebäudereinigung',
    kurz: 'Gebäudereinigung',
    pfad: '/gebaeudereinigung/',
    anker: 'gebaeudereinigung',
    kasse: false,
    punkte: ['Wohnungsreinigung', 'Hausreinigung', 'Büroreinigung', 'Treppenhaus', 'Grundreinigung'],
  },
  {
    titel: 'Gartenpflege',
    kurz: 'Gartenpflege',
    pfad: '/gartenpflege/',
    anker: 'gartenpflege',
    kasse: false,
    punkte: ['Rasenpflege', 'Unkraut entfernen', 'Laub entfernen', 'Beetpflege', 'Außenanlagen'],
  },
];

// Ziel eines Links auf eine Leistung: Unterseite oder Kachel auf der Startseite
export function leistungsPfad(l: { pfad: string; anker: string }): string {
  return site.unterseiten ? l.pfad : `/#${l.anker}`;
}

// Navigation im Kopf. „unter“ erscheint auf dem Desktop als aufklappende Liste, im Handy-Menü direkt darunter.
type Navigationspunkt = { titel: string; pfad: string; unter?: { titel: string; pfad: string }[] };
const navigationUnterseiten: Navigationspunkt[] = [
  { titel: 'Leistungen', pfad: '/#leistungen', unter: leistungen.map((l) => ({ titel: l.kurz, pfad: l.pfad })) },
  ...(site.pflegekasse ? [{ titel: 'Pflegekasse', pfad: '/pflegekasse/' }] : []),
  { titel: 'Über uns', pfad: '/ueber-uns/' },
  { titel: 'Kontakt', pfad: '/kontakt/' },
];
// Ohne Unterseiten: Sprungmarken auf der Startseite
const navigationStartseite: Navigationspunkt[] = [
  { titel: 'Leistungen', pfad: '/#leistungen' },
  ...(site.pflegekasse ? [{ titel: 'Pflegekasse', pfad: '/#pflegekasse' }] : []),
  { titel: 'Ablauf', pfad: '/#ablauf' },
  { titel: 'Über uns', pfad: '/#ueber-uns' },
  { titel: 'Kontakt', pfad: '/#kontakt' },
];
export const navigation = site.unterseiten ? navigationUnterseiten : navigationStartseite;
