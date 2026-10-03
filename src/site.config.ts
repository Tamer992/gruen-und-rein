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

  // [PLATZHALTER: Vor- und Nachname]
  inhaberin: 'Hussein',
  inhaberinVorname: 'Hussein',
  // „Inhaberin“ oder „Inhaber“
  inhaberTitel: 'Inhaber',

  // [PLATZHALTER: Telefonnummer] So wird die Nummer angezeigt
  telefon: '0000 000 000',
  // [PLATZHALTER: Telefonnummer für den Anruf-Link] Ziffern mit +49, ohne 0 vorne
  telefonLink: '+49000000000',
  // [PLATZHALTER: WhatsApp-Nummer] Ziffern mit 49 vorne, ohne + und ohne 0
  whatsappLink: '49000000000',
  // [PLATZHALTER: E-Mail-Adresse]
  email: 'name@beispiel.de',

  adresse: {
    // [PLATZHALTER: Straße, PLZ, Ort]
    strasse: 'Musterstraße 1',
    plz: '00000',
    ort: 'Musterstadt',
    land: 'DE',
  },

  // [PLATZHALTER: Hauptort] für Überschriften und Seitentitel
  ort: 'Musterstadt',

  // [PLATZHALTER: Einsatzorte] Ein Eintrag je Ort
  einsatzorte: ['Musterstadt', 'Nachbarort', 'Zweiter Ort', 'Dritter Ort'],

  // [PLATZHALTER: Erreichbarkeit] So steht es auf der Seite
  erreichbarkeit: 'Montag bis Freitag, 8 bis 18 Uhr',
  erreichbarkeitKurz: 'Mo bis Fr, 8 bis 18 Uhr',
  // Dieselben Zeiten für Suchmaschinen. Tage: Mo Tu We Th Fr Sa Su
  oeffnungszeiten: [{ tage: ['Mo', 'Tu', 'We', 'Th', 'Fr'], von: '08:00', bis: '18:00' }],

  // Erst auf true stellen, wenn die Anerkennung für den Entlastungsbetrag (§ 45b SGB XI) vorliegt.
  // Dann erscheint der Hinweis bei Alltagsbegleitung, Hauswirtschaft und Trauerbegleitung.
  pflegekasse: false,
  // [PLATZHALTER: aktueller Entlastungsbetrag in Euro je Monat, vor dem Freischalten prüfen]
  entlastungsbetrag: '131',
};

// Navigation im Kopf: höchstens sechs Punkte
export const navigation = [
  { titel: 'Alltagsbegleitung', pfad: '/alltagsbegleitung/' },
  { titel: 'Hauswirtschaft', pfad: '/hauswirtschaft/' },
  { titel: 'Reinigung', pfad: '/reinigung/' },
  { titel: 'Gartenpflege', pfad: '/gartenpflege/' },
  { titel: 'Über uns', pfad: '/ueber-uns/' },
  { titel: 'Kontakt', pfad: '/kontakt/' },
];

// kasse: Abrechnung über die Pflegekasse möglich (nur sichtbar, wenn pflegekasse: true)
export const leistungen = [
  { titel: 'Alltagsbegleitung', pfad: '/alltagsbegleitung/', kasse: true },
  { titel: 'Hauswirtschaft', pfad: '/hauswirtschaft/', kasse: true },
  { titel: 'Reinigung', pfad: '/reinigung/', kasse: false },
  { titel: 'Gartenpflege', pfad: '/gartenpflege/', kasse: false },
  { titel: 'Trauerbegleitung', pfad: '/trauerbegleitung/', kasse: true },
];
