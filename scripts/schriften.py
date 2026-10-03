# Verkleinert die Schriftdateien aus node_modules auf das, was die Seite braucht.
# Aufruf: python scripts/schriften.py  (benötigt: pip install fonttools brotli)
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

ZEICHEN = "U+0020-007E,U+00A0-00FF,U+0152-0153,U+2018-201E,U+2022,U+2026,U+2030,U+2039-203A,U+20AC,U+2122,U+2212"
FS = "node_modules/@fontsource-variable/"

def baue(quelle, ziel, achsen):
    font = TTFont(quelle, lazy=False)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["kern", "liga", "calt", "lnum", "pnum", "onum", "case", "ss01"]
    opts.unicodes = subset.parse_unicodes(ZEICHEN)
    s = subset.Subsetter(opts)
    s.populate(unicodes=opts.unicodes)
    s.subset(font)
    font = instancer.instantiateVariableFont(font, achsen)
    font.flavor = "woff2"
    font.save(ziel)
    print(ziel)

baue(FS + "schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2", "src/fonts/schibsted.woff2",
     {"wght": (500, 800)})
baue(FS + "atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2",
     "src/fonts/atkinson-next.woff2", {"wght": (400, 700)})
baue(FS + "atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-italic.woff2",
     "src/fonts/atkinson-next-kursiv.woff2", {"wght": (400, 700)})
