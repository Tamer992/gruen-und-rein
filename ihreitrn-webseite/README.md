# ihreitrn.de – neue Webseite

Neue Webseite für **Ihre IT RN** in Schwarz, Silber und Gold.
Reines HTML, CSS und JavaScript – kein Baukasten, kein Build-Schritt, keine Cookies, keine externen Abrufe
(Schriften liegen auf dem eigenen Server). Läuft auf jedem Webhosting und auf GitHub Pages.

## Aufbau

| Datei | Inhalt |
| --- | --- |
| `index.html` | Startseite: Start, Leistungen, Über mich, Ablauf, Kontakt |
| `impressum/index.html` | Impressum |
| `datenschutz/index.html` | Datenschutzerklärung |
| `404.html` | Fehlerseite |
| `assets/css/style.css` | Gestaltung – Farben stehen oben unter `:root` |
| `assets/js/main.js` | Menü, Einblenden beim Scrollen, Effekte |
| `assets/img/` | Logo und Bilder |
| `assets/fonts/` | Schriften Sora und Manrope (SIL Open Font License) |

## Noch zu erledigen (Inhalte von der alten Seite)

Die alte Seite war beim Erstellen nicht erreichbar. Diese Stellen sind Platzhalter
(im HTML mit `PLATZHALTER` markiert):

- [ ] **Leistungen** – die sechs Karten in `index.html` (Abschnitt `#leistungen`) durch die echten Leistungen ersetzen
- [ ] **Foto** – Bild als `assets/img/ueber-mich.jpg` ablegen (Hochformat 4:5, z. B. 800 × 1000 px) und in `index.html`
      `portrait-platzhalter.svg` durch `ueber-mich.jpg` ersetzen
- [ ] **Über-mich-Text** und **Name** im Abschnitt `#ueber-mich`
- [ ] **Firmenname** – überall `Ihre IT RN` prüfen
- [ ] **Telefon, E-Mail, Einsatzgebiet** im Abschnitt `#kontakt` (auch die `tel:`- und `mailto:`-Links)
- [ ] **Impressum** und **Datenschutz** vollständig ausfüllen, danach dort `<meta name="robots" content="noindex">` entfernen

## Farben

| Name | Wert |
| --- | --- |
| Schwarz | `#09090a` |
| Silber | `#c4c8cf` |
| Gold | `#c9a44c` (Verlauf `#93722a` → `#ebcd85`) |

## Lokal ansehen

```sh
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Veröffentlichen

- **Eigenes Webhosting:** alle Dateien per FTP in das Webverzeichnis von ihreitrn.de laden.
- **GitHub Pages:** In den Repository-Einstellungen unter *Pages* als Quelle „GitHub Actions“ wählen.
  Der Workflow `.github/workflows/pages.yml` veröffentlicht dann bei jedem Push auf `main`.
  (Bei privaten Repositorys setzt GitHub Pages ein kostenpflichtiges Konto voraus.)
