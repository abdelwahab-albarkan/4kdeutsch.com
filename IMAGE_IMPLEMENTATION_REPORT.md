# IMAGE_IMPLEMENTATION_REPORT – 4kdeutsch.com

Stand: 2026-10-01 (Runde 2). Nichts committet, gepusht oder deployt. Es wurden keine Fotos erfunden oder generiert.

## IMAGE LIBRARY (50 Slots, `lib/image-library.ts`, Generator `scripts/build-image-library.mjs`)
- **final assets: 40** – 25 wiederverwendete, markenfreie Fotos (WebP) + 1 Social-JPG + 14 abstrakte Vektorgrafiken (kein Text/Logo)
- **fallback assets: 8** (`status: 'fallback'`, zeigen auf ein semantisch passendes Bibliotheksbild, alt = Alt des Zielbildes):
  - `iptv-fire-stick-einrichtung` → `iptv-fire-stick`
  - `iptv-player` → `iptv-apps`
  - `smart-iptv` → `iptv-smart-tv`
  - `iptv-box` → `iptv-apple-tv` (Streaming-Box mit Fernbedienung)
  - `iptv-stick` → `iptv-fire-stick`
  - `iptv-champions-league` → `iptv-fussball`
  - `iptv-home-entertainment` → `iptv-smart-tv`
  - `iptv-film-abend` → `iptv-streaming-erlebnis`
- **missing assets: 2** (`status: 'missing'`, kein passendes markenfreies Bild vorhanden → Seiten rendern nichts, kein kaputtes `<img>`, kein leerer Container): `iptv-receiver`, `iptv-formel-1`
- Bibliotheksordner: 0 doppelte Dateien. Gesamtgröße ca. 2,1 MB, alle ≤ 300 KB.

## THIRD-PARTY BRANDING (Geräte-Heroes)
8 betroffene Geräte-Bilder (`public/images/iptv/devices/hero-*.webp`, gleiche Dateinamen):
- **fixed: 0** (Retusche war nicht sicher möglich – Logos/Oberflächen sind Teil der Fotos)
- **replaced: 8** durch neutrale, flache Vektor-Illustrationen (1200×900, transparent, kein Logo/Text/App-Icon): samsung-tv 66 KB, lg-tv 68 KB, android-tv 56 KB, apple-tv 85 KB, fire-stick 76 KB, mag-box 78 KB, android-handy 86 KB, windows-mac 57 KB. Gerätekategorie bleibt erkennbar (Smart-TV, Streaming-Box, HDMI-Stick, Smartphone/Tablet, Laptop).
- Zusätzlich ersetzt: 3 weitere Bilder auf `/install`, die Amazon-, Netflix/YouTube- und Apple-Logos zeigten (`/devices/install/firestick-install.png`, `android-tv-install.png`, `mobile-install.png`) → jetzt die neuen Illustrationen.
- Alt-Texte der Device-Seiten beschreiben jetzt ehrlich „Illustration: …“ statt Markennamen.
- **still affected (aktiv): 0**
- Hinweis: Die alten Original-Dateien (`public/images/*.png`, `public/devices/…`) liegen unverändert im Projekt, sind aber nicht mehr referenziert.

## LOGO
- official logo available: **NO** (im Projekt nur Logos fremder Marken: `ukstream4k-*`, `logo.png`)
- placeholder removed: **YES** – die selbst erzeugte Text-Logo-Datei (`public/images/branding/4kdeutsch-logo.svg|png`) wurde gelöscht; es gibt kein erfundenes Logo mehr
- zentrale Schnittstelle: `lib/brand.ts` (`BRAND_LOGO = null`). `components/layout/Logo.tsx` zeigt bis dahin nur den Seitennamen als schlichten Text (ohne Farbverlauf/Logo-Optik); `lib/structured-data.ts` lässt `logo` weg, solange keins existiert (Organization/Product-`image` nutzt das Social-Bild).
- **Benötigte Datei:** `public/images/branding/4kdeutsch-logo.svg` (oder `.png`, transparent, ideal 1200×400) und dann `BRAND_LOGO` in `lib/brand.ts` setzen (Anleitung steht dort). Navbar, Footer und Schema übernehmen es automatisch.
- final logo path: *(noch nicht vorhanden)*
- Offen: Favicons/App-Icons (`app/icon.png`, `app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`) sind weiterhin ein „4k“-Monogramm als **vorläufiger Ersatz** (`scripts/build-brand-assets.mjs`); sie müssen aus dem offiziellen Logo ersetzt werden.

## OG IMAGE
- previous size: ~424 KB (dynamisches PNG)
- final size: **49.124 Byte (≈ 48 KB)**, 1200×630 JPEG (q86, optisch unverändert)
- status: erledigt. `app/opengraph-image.tsx` wurde durch das statische `app/opengraph-image.jpg` + `opengraph-image.alt.txt` ersetzt (Quelle zur Neuerstellung: `scripts/opengraph-card.source.txt`). Produktion liefert `/opengraph-image.jpg` mit 200, `og:image` ist gesetzt.

## DEV SERVER
- issue: Bilder wirkten im Dev-Server/Browser-Pane teilweise „kaputt“
- cause: Der Optimizer liefert in Dev **und** Produktion gültige WebP/AVIF-Daten (curl + sharp-Dekodierung für w=128–1200 mit AVIF- und WebP-Accept: alle OK). Die „kaputten“ Befunde stammen aus der Messmethode im versteckten Browser-Pane (lazy Bilder werden dort nicht geladen; Priority-Bilder in unsichtbaren iFrames melden `naturalWidth=0`); Quelldateien dekodieren fehlerfrei. Im sichtbaren Top-Level-Test laden die Hero-Bilder korrekt (z. B. w=750 auf 375 px).
- fixed/not fixed: **kein Anwendungsfehler, nichts geändert.**

## TMDB POSTER WALL
Status: **PRE-EXISTING / OUT OF SCOPE** (~150 `<img>` auf der Startseite, nicht verändert).

## PERFORMANCE
- Alle Bilder mit width/height bzw. `fill` + Container, `sizes` gesetzt (0 Tags ohne Abmessungen, 0 ohne `alt`, 170 `<img>` auf 21 Seiten geprüft).
- Hero-Hintergrund `priority`, alles andere `loading="lazy"`. Mobile bekommt skalierte Varianten (375 px → w=750).

## BUILD / QA
- TypeScript: **PASS** (`npx tsc --noEmit`, keine Fehler)
- Production build: **PASS** (277 Seiten)
- Image reference validation: 78 eindeutige lokale Bild-URLs aus dem HTML von 21 Seiten abgerufen und dekodiert → **Broken image references: 0**
- Leere `src`: 0; `undefined`-Importe: 0
- Missing active image references: **0** (2 Slots `missing` werden nirgends gerendert)
- Third-party branded active images: **0** (Geräte-Heroes ersetzt; Hintergründe `iptv-hintergrund-abstrakt.jpg`/`iptv-tech-hintergrund.jpg` visuell geprüft: abstrakte grüne Wellen). Ausnahme außerhalb des Scopes: TMDB-Filmposter der Poster-Wand.
- Responsive (375/390/768/1024/1280/1440) auf `/`, `/features`, `/iptv-kaufen`, `/iptv-samsung-tv`, `/iptv-android-tv`, `/iptv-fire-stick`, `/iptv-sport`, `/iptv-hilfe`: **0 Seiten mit horizontalem Überlauf** (47 von 48 Kombinationen im iFrame-Lauf, die letzte `/iptv-hilfe` separat geprüft).
- Duplikate: 0 in `public/images/iptv`; 9 Duplikatgruppen im Alt-Bestand (`public/`) bleiben unangetastet (siehe `IMAGE_AUDIT.md`).

## Verbleibende Blocker
1. Offizielles Logo fehlt (`public/images/branding/4kdeutsch-logo.svg|png` + `lib/brand.ts`), danach Favicons neu erzeugen.
2. 2 Slots ohne Bild (`iptv-receiver`, `iptv-formel-1`); 8 Fallbacks ersetzen, sobald echte, markenfreie Fotos vorliegen.
3. Echte, markenfreie Produktfotos für die Geräte-Heroes wären besser als die Illustrationen (gleiche Dateinamen verwenden).
4. Außerhalb der Bildaufgabe: Platzhalter in Impressum/AGB/Datenschutz/Widerruf, DMCA-Frist „24–48 Stunden“, Soft-404 bei unbekannten `/blog/[slug]`, echte Bewertungen.
