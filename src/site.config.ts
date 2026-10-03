// Alle Angaben zum Betrieb an einer Stelle.
// Was hier steht, erscheint automatisch auf allen Seiten, im Kopf, im Fuß,
// in den Suchmaschinen-Daten und in der Sitemap.
// Jede Stelle mit [PLATZHALTER: ...] muss vor dem Veröffentlichen ersetzt werden.

export const site = {
  name: 'Grün & Rein',
  // [PLATZHALTER: echte Domain] Volle Adresse der Webseite, ohne Schrägstrich am Ende.
  // Wird auch für Sitemap, robots.txt und Vorschaubilder verwendet.
  domain: 'https://platzhalter-domain.de',

  inhaberin: '[PLATZHALTER: Vorname Nachname]',
  inhaberinVorname: '[PLATZHALTER: Vorname]',
  // „Inhaberin“ oder „Inhaber“, erscheint so auf allen Seiten
  inhaberTitel: 'Inhaber',

  // So wird die Nummer angezeigt, zum Beispiel „06201 12 34 56“
  telefon: '[PLATZHALTER: Telefonnummer]',
  // Dieselbe Nummer für den Anruf-Link: nur Ziffern mit +49, ohne 0 vorne, zum Beispiel „+496201123456“
  telefonLink: '+49000000000',
  email: '[PLATZHALTER: E-Mail-Adresse]',
  // WhatsApp: Anzeige und Link. Link nur Ziffern mit 49 vorne, ohne + und ohne 0, zum Beispiel „491701234567“
  whatsapp: '[PLATZHALTER: WhatsApp-Nummer]',
  whatsappLink: '49000000000',

  adresse: {
    strasse: '[PLATZHALTER: Straße und Hausnummer]',
    plz: '[PLATZHALTER: PLZ]',
    ort: '[PLATZHALTER: Ort]',
    land: 'DE',
  },

  // Hauptort für Überschriften und Seitentitel, zum Beispiel „Hemsbach“
  ort: '[PLATZHALTER: Ort]',
  // Region für Seitentitel, zum Beispiel „an der Bergstraße“
  region: '[PLATZHALTER: Region, zum Beispiel an der Bergstraße]',

  // Orte, in die Sie fahren. Ein Eintrag je Ort.
  einsatzorte: [
    '[PLATZHALTER: Ort 1]',
    '[PLATZHALTER: Ort 2]',
    '[PLATZHALTER: Ort 3]',
    '[PLATZHALTER: Ort 4]',
  ],

  // Telefonische Erreichbarkeit, so wie sie auf der Seite stehen soll
  erreichbarkeit: '[PLATZHALTER: Erreichbarkeit, zum Beispiel Montag bis Freitag, 8 bis 17 Uhr]',
  // Dieselben Zeiten für Suchmaschinen. Tage: Mo Tu We Th Fr Sa Su
  oeffnungszeiten: [{ tage: ['Mo', 'Tu', 'We', 'Th', 'Fr'], von: '08:00', bis: '17:00' }],

  // Erst auf true stellen, wenn die Anerkennung für den Entlastungsbetrag (§ 45b SGB XI) vorliegt.
  // Dann erscheint der Hinweis zur Pflegekasse bei Alltagsbegleitung, Hauswirtschaft und Trauerbegleitung.
  pflegekasse: false,
  // [PLATZHALTER: aktueller Entlastungsbetrag in Euro je Monat, vor dem Freischalten prüfen]
  entlastungsbetrag: '[PLATZHALTER: Betrag]',
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

export const leistungen = [
  { titel: 'Alltagsbegleitung', pfad: '/alltagsbegleitung/' },
  { titel: 'Hauswirtschaft', pfad: '/hauswirtschaft/' },
  { titel: 'Reinigung', pfad: '/reinigung/' },
  { titel: 'Gartenpflege', pfad: '/gartenpflege/' },
  { titel: 'Trauerbegleitung', pfad: '/trauerbegleitung/' },
];
