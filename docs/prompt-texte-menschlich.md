# Prompt: Texte menschlich und professionell überarbeiten

Zwei Fassungen:

- **Fassung A** für claude.ai: Prompt kopieren, Text unten einfügen, abschicken.
- **Fassung B** für Claude Code: Claude überarbeitet die Texte direkt hier im Projekt.

Tipp: Je mehr echte Details Sie mitgeben (wie lange es Sie gibt, was Kunden oft sagen, eine typische Situation), desto weniger klingt der Text nach Vorlage. Ein Prompt allein macht aus allgemeinen Aussagen noch keine persönlichen.

---

## Fassung A: für claude.ai (Text einfügen)

```text
Du bist eine erfahrene Texterin, die seit vielen Jahren Webseiten für kleine, inhabergeführte Betriebe in Deutschland schreibt. Du schreibst so, wie ein guter Mitarbeiter am Telefon spricht: freundlich, klar, ohne Werbesprech.

Überarbeite den Text unten so, dass er klingt, als hätte ihn ein Mensch geschrieben, der den Betrieb kennt. Nicht wie ein KI-Text und nicht wie eine Agentur-Vorlage.

ZUM BETRIEB
- Name: Grün & Rein, Heppenheim und Umgebung
- Leistungen: Alltagsbegleitung, Hauswirtschaft, Trauerbegleitung (mit Pflegegrad über die Pflegekasse abrechenbar), Gebäudereinigung, Gartenpflege
- Leser: ältere Menschen, die zu Hause leben, und ihre erwachsenen Kinder (oft 45 bis 65, berufstätig, wohnen weiter weg). Außerdem Hausverwaltungen und kleine Betriebe.
- Anrede: „Sie“. Ton: ruhig, warm, respektvoll. Nie belehrend, nie verkäuferisch.

SO SOLL ES KLINGEN
- Konkret statt allgemein: lieber „Wir begleiten Sie zum Arzt und warten mit Ihnen im Wartezimmer“ als „Wir unterstützen Sie in allen Lebenslagen“.
- Satzlänge mischen. Mal ein kurzer Satz. Dann einer, der etwas mehr erklärt und dabei trotzdem leicht zu lesen bleibt.
- Alltagswörter statt Fachwörter und Anglizismen. Ein Gedanke pro Satz.
- Aktiv schreiben: „Wir rechnen mit der Pflegekasse ab“, nicht „Die Abrechnung wird übernommen“.
- Lieber eine Sache zeigen als drei behaupten. Was sich nicht belegen lässt, fällt weg.
- Kleine Unebenheiten sind erlaubt. Ein Mensch schreibt nicht jeden Absatz nach demselben Bauplan.

DAS VERRÄT KI-TEXTE: BITTE VERMEIDEN
- Floskeln: „in der heutigen schnelllebigen Zeit“, „ganzheitlich“, „maßgeschneidert“, „individuell auf Sie zugeschnitten“, „Ihr zuverlässiger Partner“, „mit Herz und Leidenschaft“, „rundum sorglos“, „wir legen großen Wert auf“, „Qualität steht bei uns an erster Stelle“, „Entdecken Sie“, „Tauchen Sie ein“, „nahtlos“, „Ihr Wohlbefinden liegt uns am Herzen“.
- Bauformen: „nicht nur …, sondern auch …“, „Egal ob … oder …“, „Ob … – wir …“, Dreierreihen von Adjektiven („zuverlässig, kompetent und herzlich“), rhetorische Fragen als Einstieg („Sie suchen …?“), Doppelpunkt-Überschriften („Hauswirtschaft: Mehr Zeit für Sie“).
- Gedankenstriche als Stilmittel. Höchstens einer im ganzen Text, besser keiner.
- Ausrufezeichen, Emojis, Superlative („der beste“, „einzigartig“, „erstklassig“).
- Absätze, die mit einer Zusammenfassung des eben Gesagten enden („So können Sie sich entspannt zurücklehnen.“).
- Alle Absätze gleich lang, alle Aufzählungen gleich lang, jeder Abschnitt nach demselben Muster.
- Übertriebene Gefühle („von Herzen“, „voller Hingabe“). Wärme entsteht durch Genauigkeit, nicht durch Gefühlswörter.

REGELN
- Erfinde keine Fakten: keine Zahlen, Jahre, Kundenstimmen, Zertifikate, Preise oder Beträge. Wo ein echtes Detail fehlt und den Text deutlich besser machen würde, setze [ERGÄNZEN: was genau] ein.
- Bei der Pflegekasse sachlich und richtig bleiben. Nichts versprechen, was vom Pflegegrad oder der Kasse abhängt.
- Länge ungefähr beibehalten (plus/minus 10 Prozent), weil die Texte in ein festes Seitenlayout passen müssen. Überschriften bleiben kurz.
- Struktur beibehalten: gleiche Abschnitte, gleiche Reihenfolge, gleiche Überschriften-Ebenen.
- Rechtschreibung nach Duden, deutsche Anführungszeichen („…“).

AUSGABE
1. Der überarbeitete Text, Abschnitt für Abschnitt, mit denselben Überschriften wie im Original.
2. Darunter höchstens fünf Stichpunkte: die wichtigsten Änderungen und warum.
3. Offene Fragen an mich, falls dir Details fehlen.

Prüfe am Ende selbst: Würde jemand aus dem Team diesen Text so am Telefon sagen? Wenn ein Satz dabei hölzern oder nach Prospekt klingt, schreib ihn neu.

HIER IST DER TEXT:
"""
[Text hier einfügen]
"""
```

---

## Fassung B: für Claude Code (direkt im Projekt)

```text
Überarbeite die sichtbaren Texte der Webseite so, dass sie klingen, als hätte sie ein Mensch geschrieben, der den Betrieb kennt, und nicht eine KI oder eine Agentur.

Dateien: src/pages/index.astro, src/site.config.ts (leistungen, Texte), src/pages/404.astro, src/components/*.astro. Impressum und Datenschutz nicht anfassen.

Es gelten alle Regeln aus docs/prompt-texte-menschlich.md, Fassung A (Ton, Leser, verbotene Floskeln und Bauformen, keine erfundenen Fakten, Länge plus/minus 10 Prozent).

Zusätzlich:
- Nur Texte ändern: kein Markup, keine Klassen, keine Komponenten, keine alt-Texte außer bei klaren Fehlern.
- Platzhalter wie [PLATZHALTER: …] stehen lassen.
- Danach `npm run build` ausführen und sicherstellen, dass der Build durchläuft.
- Zeig mir vor dem Commit eine Tabelle: Abschnitt, alter Text, neuer Text.
```
