# Prompt: Premium-Redesign für Grün & Rein

Diesen Text komplett in eine neue Claude-Code-Sitzung im Repository `gruen-und-rein` kopieren.

---

Du bist ein Senior Art Director und Frontend-Entwickler einer preisgekrönten Digitalagentur. Deine Aufgabe: Die Website von **Grün & Rein** (Alltagsbegleitung, Trauerbegleitung, Hauswirtschaft, Gebäudereinigung und Gartenpflege in Heppenheim) so gestalten, dass sie wirkt wie ein Projekt, für das ein Kunde 50.000 € bezahlt hat. Hochwertig, ruhig, vertrauenswürdig und unverwechselbar. Kein Template-Look.

## 1. Erst verstehen, dann gestalten

Bevor du eine Zeile änderst:

1. Lies `src/site.config.ts`, `src/styles/global.css`, `src/layouts/Basis.astro`, alle Dateien in `src/components/` und `src/pages/index.astro` vollständig.
2. Starte die Seite (`npm install`, dann `npm run dev -- --port 4325`) und mache mit Playwright (Chromium liegt unter `/opt/pw-browsers`) ganzseitige Screenshots bei **390 px, 768 px, 1280 px und 1600 px** Breite. Das ist der Vorher-Stand.
3. Schreib mir eine kurze, ehrliche Kritik: Was wirkt heute billig, beliebig oder unruhig? Wo fehlt Spannung, Rhythmus, Tiefe? Konkret pro Abschnitt (Einstieg, Für Sie oder Ihre Eltern, Leistungen, Pflegekasse, Ablauf, Über uns, Kontakt, Kopf, Fuß).
4. Formuliere dann eine **Designrichtung in 5 bis 8 Sätzen** (Stimmung, Leitidee, Typografie, Farbe, Bildsprache, Bewegung) und setze sie anschließend um.

## 2. Zielgruppe: der Maßstab für jede Entscheidung

- **Senioren (70+)**, die selbst Hilfe suchen: brauchen große Schrift, hohe Kontraste, klare Wege, einen sichtbaren Anrufknopf.
- **Erwachsene Kinder (40 bis 60)**, die für ihre Eltern suchen, oft abends am Handy: wollen in Sekunden Vertrauen fassen und sehen, dass die Pflegekasse zahlt.
- **Betriebe und Hausverwaltungen** für Reinigung und Garten: wollen Professionalität.

„Premium“ heißt hier: **Ruhe, Wärme, Klarheit und Sorgfalt im Detail.** Nicht: Effekthascherei, dunkle Tech-Optik, Glitzer oder verspielte Animationen.

## 3. Was eine 50.000-€-Website ausmacht (umsetzen)

**Typografie**
- Eine echte typografische Hierarchie mit deutlichem Größenkontrast zwischen Display-Titel, Zwischentitel, Fließtext und Etiketten. Optisch ausgeglichene Zeilenumbrüche (`text-wrap: balance` für Titel, `pretty` für Text).
- Feinschliff: passende Laufweiten bei Großbuchstaben-Etiketten, negative Laufweite bei großen Titeln, Ziffern in Tabellen mit `tabular-nums`, echte Anführungszeichen „…“ und Gedankenstriche.
- Die vorhandenen Schriften (Literata und Atkinson Hyperlegible Next) bleiben die Basis, weil sie für ältere Augen gut lesbar sind. Du darfst Schnitte, Größen und Einsatz verfeinern.

**Raster und Komposition**
- Ein sichtbares, konsequentes Raster. Mutige, aber ruhige Asymmetrie, großzügiger Weißraum, überlappende Ebenen (z. B. Foto mit darübergelegter Karte), wechselnder Rhythmus zwischen hellen, sandfarbenen und tannengrünen Flächen.
- Jeder Abschnitt bekommt eine eigene, klar erkennbare Komposition. Keine fünf gleich aussehenden Blöcke untereinander.

**Farbe und Material**
- Die Palette (Waldgrün, Tanne, Messing, Leinen, Sand, Salbei) bleibt erkennbar und wird verfeinert: feine Verläufe, ein dezentes Papier-/Leinenkorn als Textur, Messing sparsam als Akzent für Linien, Ziffern und Auszeichnungen.
- Mehrstufige, warme Schatten statt harter Kanten. Feine Haarlinien als Gliederung.

**Bildsprache**
- Einheitliche Bildbearbeitung (Farbstimmung, Zuschnitt), unterschiedliche Formate für Spannung (hochkant, breit, angeschnitten), sanfte Masken oder Rahmen passend zum Blatt-Motiv des Logos.
- Das Blatt aus dem Logo als wiederkehrendes, zurückhaltendes Gestaltungselement (Ornament, Trennlinie, Aufzählungszeichen), nie kitschig.

**Bewegung und Interaktion**
- Wenige, edle Bewegungen: weiches Einblenden beim Scrollen, leichte Parallaxe bei großen Fotos, sanfte Hover-Zustände bei Karten und Knöpfen (Schatten, minimale Anhebung, Pfeil gleitet).
- Alles respektiert `prefers-reduced-motion`. Die Seite funktioniert und sieht vollständig aus, auch ohne JavaScript.
- Ein Kopfbereich, der beim Scrollen kompakter wird, mit stets erreichbarem Anrufknopf. Auf dem Handy eine feste, elegante Anrufleiste unten.

**Details, an denen man Qualität erkennt**
- Durchgestaltete Fokuszustände (sichtbar, schön, in Markenfarbe).
- Saubere Abstände nach einer festen Skala, keine „ungefähr“-Werte.
- Nummerierter Ablauf mit großen Messing-Ziffern, Pflegekassen-Abschnitt als besonders hochwertige, vertrauensstiftende Fläche.
- Ein Fuß, der wie ein ruhiger Abschluss wirkt, nicht wie eine Linksammlung.
- Gestaltete 404-Seite und ordentliche Textseiten (Impressum, Datenschutz).

## 4. Harte Regeln (nicht verhandelbar)

1. **Barrierefreiheit:** WCAG 2.2 AA mindestens. Kontraste 4,5 : 1 für Text, Fließtext mindestens 1,1875 rem, Klickflächen mindestens 48 × 48 px, nutzbar bei 200 % Zoom und mit Tastatur. Überschriftenreihenfolge und ARIA-Beschriftungen bleiben korrekt.
2. **Nichts erfinden:** Keine Bewertungen, Sterne, Kundenstimmen, Zahlen („500 zufriedene Kunden“), Siegel, Zertifikate oder Partnerlogos, die es nicht gibt. Wo ein Vertrauenselement sinnvoll wäre, setz einen klar markierten Platzhalter im Stil `[PLATZHALTER: …]`, wie im restlichen Projekt.
3. **Inhalte bleiben:** Texte, Leistungen, Kontaktangaben und alle Werte aus `src/site.config.ts` bleiben inhaltlich gleich. Bestehende `[PLATZHALTER: …]`-Kommentare nicht entfernen. Du darfst Texte kürzen oder umstellen, wenn die Gestaltung es braucht, aber sag mir genau, was du geändert hast.
4. **Technik:** Astro bleibt. Keine neuen schweren Abhängigkeiten, kein Tailwind, kein UI-Framework, keine externen Schriften oder CDNs, kein Tracking. Bilder weiter über die `Bild`-Komponente (Astro-Bildoptimierung). Gestaltungswerte als CSS-Variablen in `:root`, in der Benennung des Projekts (deutsch).
5. **Leistung:** Lighthouse-Werte für Performance, Barrierefreiheit, Best Practices und SEO jeweils mindestens 95 auf dem Handy. Kein Layout-Springen (CLS unter 0,05). Das größte Bild im Einstieg wird bevorzugt geladen.
6. **Stil des Codes:** Kommentare und Klassennamen auf Deutsch, wie im bestehenden Code. Gleiche Kommentardichte, gleiche Formatierung.

## 5. Vorgehen

1. Arbeite Abschnitt für Abschnitt, beginnend mit dem Einstieg, weil er den Gesamteindruck bestimmt.
2. Nach jedem größeren Schritt: Screenshots in allen vier Breiten, selbst kritisch prüfen („Würde eine Top-Agentur das so abgeben?“), nachbessern, erst dann weiter.
3. Zum Schluss:
   - `npm run build` muss fehlerfrei laufen.
   - Prüfe mit Playwright und axe-core (oder vergleichbar) auf Barrierefreiheitsfehler und behebe alle.
   - Prüfe Tastaturbedienung, 200 % Zoom und reduzierte Bewegung.
4. Committe in sinnvollen, kleinen Schritten mit klaren deutschen Commit-Nachrichten und pushe auf deinen Arbeitszweig.

## 6. Was ich am Ende von dir haben möchte

- Vorher-Nachher-Screenshots (Handy und Desktop) des Einstiegs und der gesamten Startseite.
- Eine kurze Liste der wichtigsten Gestaltungsentscheidungen und warum sie zur Zielgruppe passen.
- Alle Stellen, an denen echte Inhalte die Wirkung noch deutlich steigern würden (z. B. echtes Foto der Inhaber, echte Kundenstimmen mit Einverständnis, Anerkennung der Pflegekasse).
- Ehrliche Angabe, was nicht geklappt hat oder offen geblieben ist.
