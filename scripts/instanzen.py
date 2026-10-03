# Feste Schriftschnitte für scripts/logo.mjs (fontkit kann variable WOFF2 nicht zuverlässig instanziieren)
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
import os
FS = "node_modules/@fontsource-variable/"
os.makedirs("scripts/_instanzen", exist_ok=True)
for quelle, ziel, achsen in [
    (FS + "schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2", "wort.ttf", {"wght": 800}),
    (FS + "schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2", "et.ttf", {"wght": 500}),
    (FS + "atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2", "zeile.ttf", {"wght": 400}),
]:
    f = TTFont(quelle, lazy=False)
    f = instancer.instantiateVariableFont(f, achsen)
    f.flavor = None
    f.save("scripts/_instanzen/" + ziel)
    print(ziel)
