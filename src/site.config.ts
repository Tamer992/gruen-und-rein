// Alle Angaben zum Betrieb an einer Stelle.
// Was hier steht, erscheint automatisch auf allen Seiten, im Kopf, im Fuß,
// in den Suchmaschinen-Daten und in der Sitemap.
//
// Damit die Vorschau ordentlich aussieht, stehen hier neutrale Beispielwerte.
// Jede Zeile mit [PLATZHALTER: ...] muss vor dem Veröffentlichen ersetzt werden.
// Übersicht aller Stellen: npm run platzhalter

export const site = {
  // Neuer Name seit 09.10.2026 (vorher „Herz & Glanz“)
  name: 'Herz & Glanz Service',
  // Domain aus der E-Mail-Adresse abgeleitet (09.10.2026). [PLATZHALTER: Domain bestätigen] Ist sie schon registriert?
  domain: 'https://herzglanz-service.de',

  // Kurz, so sprechen die Inhaber ihre Kundschaft an
  inhaberin: 'Hussain und Ali',
  // Volle Namen für Impressum, Datenschutz und Suchmaschinen (von Tamer am 09.10.2026)
  inhaberVoll: 'Mohammad Hussain Zafari und Alireza Moradi',
  inhaberinVorname: 'Hussain und Ali',
  // „Inhaberin“, „Inhaber“ oder „Inhaber“ (Mehrzahl)
  inhaberTitel: 'Inhaber',
  mehrereInhaber: true,

  // Telefon Hussain (Mohammad Hussain Zafari), von Tamer am 09.10.2026. So wird die Nummer angezeigt
  telefon: '0171 7057151',
  // Ziffern mit +49, ohne 0 vorne
  telefonLink: '+491717057151',
  // Zweite Nummer: Ali (Alireza Moradi). Leer lassen, wenn es keine gibt.
  telefon2: '0171 6958218',
  telefon2Link: '+491716958218',
  // Vorname, der vor der zweiten Nummer steht
  telefon2Name: 'Ali',
  // [PLATZHALTER: WhatsApp-Nummer bestätigen] Vorläufig Hussains Handynummer. Ziffern mit 49 vorne, ohne + und ohne 0
  whatsappLink: '491717057151',
  // Am Computer steht sie als Text statt des WhatsApp-Knopfs
  whatsapp: '0171 7057151',
  // Von Tamer am 09.10.2026
  email: 'info@herzglanz-service.de',

  adresse: {
    // Vom Flyer übernommen
    strasse: 'Vogelsbergstraße 2',
    plz: '64646',
    ort: 'Heppenheim',
    land: 'DE',
  },

  // Hauptort für Überschriften und Seitentitel
  ort: 'Heppenheim',

  // Einsatzorte, ein Eintrag je Ort. Auf Tamers Wunsch (09.10.2026) leer: „Heppenheim und Umgebung“ steht nicht mehr
  // auf der Seite. Solange die Liste leer ist, fallen Etikett im Einstieg, „Unterwegs in“ (Fuß, Kontakt, Steckbriefe)
  // und das Einsatzgebiet in den Suchmaschinen-Daten weg.
  einsatzorte: [] as string[],

  // Erreichbarkeit, so steht es auf der Seite: rund um die Uhr, Montag bis Sonntag (Tamer, 09.10.2026)
  erreichbarkeit: 'Montag bis Sonntag, 24 Stunden',
  erreichbarkeitKurz: 'Mo bis So, 24 Stunden',
  // Dieselben Zeiten für Suchmaschinen. Tage: Mo Tu We Th Fr Sa Su (00:00 bis 23:59 heißt bei Google „rund um die Uhr“)
  oeffnungszeiten: [{ tage: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], von: '00:00', bis: '23:59' }],

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

  // Anerkennung als Angebot zur Unterstützung im Alltag (§ 45a SGB XI, Hessen). Zeigt das Siegel auf der Startseite
  // und auf „Über uns“. Laut Rückmeldung vom 03.10.2026 liegt sie vor. Auf false stellen, falls nicht.
  // [PLATZHALTER: Anerkennung bestätigen] Bescheid oder Registriernummer bei Hussain und Ali erfragen
  anerkennung: true,

  // [PLATZHALTER: echte Bewertungen] Nur echte Stimmen mit Einverständnis der Kundinnen und Kunden eintragen,
  // zum Beispiel aus Google. Solange die Liste leer ist, erscheint auf der Seite nichts davon.
  // Form: { text: '…', name: 'Frau M.', ort: 'Heppenheim', quelle: 'Google' }
  bewertungen: [] as { text: string; name: string; ort?: string; quelle?: string }[],

  // Entlastungsbetrag nach § 45b SGB XI in Euro pro Monat (seit 1.1.2025, gilt auch 2026).
  // Steht auf der Seite „Pflegekasse“. Bei einer gesetzlichen Erhöhung hier anpassen.
  entlastungsbetrag: 131,

  // Gibt es eigene Unterseiten für die Leistungen, „Pflegekasse“, „Über uns“ und „Kontakt“?
  // Bei false zeigen Navigation, Kacheln und Fuß auf die Abschnitte der Startseite.
  unterseiten: true,
};

// Leistungen wie auf dem Flyer von Hussain und Ali, ergänzt am 03.10.2026 (Bügeln, Mahlzeiten, Rezepte und
// Medikamente, Post und Termine, Behördengänge, Fenster und Gardinen). Mit Hussain und Ali bestätigen.
// Alltagsbegleitung am 04.10.2026 nach Liste der Inhaber ergänzt: Demenz, Erwachsene und Kinder, Gespräche.
// kasse: Abrechnung über die Pflegekasse möglich (nur sichtbar, wenn pflegekasse: true)
export const leistungen = [
  {
    titel: 'Alltagsbegleitung und Betreuung',
    kurz: 'Alltagsbegleitung',
    pfad: '/alltagsbegleitung/',
    anker: 'alltagsbegleitung',
    kasse: true,
    punkte: ['Betreuung', 'Demenz', 'Spaziergänge', 'Gespräche', 'Arztbegleitung', 'Rezepte und Medikamente'],
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
