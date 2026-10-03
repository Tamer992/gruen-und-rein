# Feste Schriftschnitte für scripts/logo.mjs (fontkit kann variable WOFF2 nicht zuverlässig instanziieren)
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
import os
FS = "node_modules/@fontsource-variable/"
os.makedirs("scripts/_instanzen", exist_ok=True)
for quelle, ziel, achsen in [
    (FS + "fraunces/files/fraunces-latin-full-normal.woff2", "wort.ttf", {"wght": 560, "opsz": 96, "SOFT": 50, "WONK": 0}),
    (FS + "fraunces/files/fraunces-latin-full-italic.woff2", "et.ttf", {"wght": 380, "opsz": 144, "SOFT": 100, "WONK": 1}),
    (FS + "atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2", "zeile.ttf", {"wght": 600}),
]:
    f = TTFont(quelle, lazy=False)
    f = instancer.instantiateVariableFont(f, achsen)
    f.flavor = None
    f.save("scripts/_instanzen/" + ziel)
    print(ziel)
