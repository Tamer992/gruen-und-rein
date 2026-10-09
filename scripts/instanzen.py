# Feste Schriftschnitte für scripts/logo.mjs (fontkit kann variable WOFF2 nicht zuverlässig instanziieren)
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
import os
FS = "node_modules/@fontsource-variable/"
os.makedirs("scripts/_instanzen", exist_ok=True)
for quelle, ziel, achsen in [
    # Wortmarke im Logo „HERZ & GLANZ“: Serifenschrift wie im Logo der Inhaber (09.10.2026)
    (FS + "literata/files/literata-latin-opsz-normal.woff2", "wort.ttf", {"wght": 600, "opsz": 36}),
    # Zeile „SERVICE“ unter der Wortmarke
    (FS + "hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2", "zeile.ttf", {"wght": 500}),
    # Überschriftenschrift für das Vorschaubild, wie auf der Seite
    (FS + "literata/files/literata-latin-opsz-normal.woff2", "titel.ttf", {"wght": 500, "opsz": 72}),
]:
    f = TTFont(quelle, lazy=False)
    f = instancer.instantiateVariableFont(f, achsen)
    f.flavor = None
    f.save("scripts/_instanzen/" + ziel)
    print(ziel)
