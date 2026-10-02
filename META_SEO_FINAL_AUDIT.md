# META_SEO_FINAL_AUDIT – 4kdeutsch.com

Stand: 2026-10-01. Nichts committet, gepusht oder deployt. Keine neuen Seiten, keine URL-/Sitemap-/Indexierungsänderung, Preise/Reseller/Rechtstexte unverändert. Prüfung gegen den Produktions-Build (`next start`) mit `scripts/audit-meta.mjs`, `scripts/audit-indexation.mjs`, `scripts/validate-schema.mjs`.

## Zusammenfassung (nachher)
1. **Routen geprüft:** 235 Sitemap-URLs + 24 weitere bekannte Routen (statische Routen, Redirect-Quellen, 404-Proben) = 259 Routen klassifiziert
2. **Indexierbar:** 235 (= exakt die Sitemap, 0 Abweichungen)
3. **Noindex:** 11 (`/agb`, `/cookies`, `/datenschutz`, `/impressum`, `/refund`, `/widerruf`, `/offline`, `/iptv-in` + 3 interne Blog-Entwürfe; weitere 5 Blog-Entwürfe sind per direkter URL noindex). Keiner in der Sitemap, keine Canonical zeigt auf eine nicht indexierbare URL.
   - Redirect (9): 4 Blog (siehe unten), `/blog/m3u-vs-xstream-codes`, 5× `/legal/*` → deutsche Legal-Routen. 404 (2): `/best-iptv` (existiert nicht – die Seite heißt `/bestes-iptv`), `/does-not-exist`. Keiner davon in der Sitemap.
4. **Doppelte Titel:** 0
5. **Doppelte Beschreibungen:** 0
6. **Fehlende Beschreibungen:** 0
7. **Fehlende Canonical:** 0 (alle selbst-kanonisch, `https://4kdeutsch.com…`, keine Query/Slash-Probleme, kein localhost)
8. **Fehlendes og:image:** 0 (vorher **214 von 235**)
9. **Fehlende Twitter-Metadaten:** 0 (vorher alle Seiten mit generischem Layout-Titel/-Text und ohne Bild)
10. **Alt-Domain/-Marke** (`germanystreamtv.com`, `GermanyStreamTV`, `ipgermany.de`, `IPGermany`): **0 im Code, in Metadaten und im sichtbaren HTML**; Treffer nur in meinen Prüfskripten/Berichten (Suchmuster)
11. **Schema-Probleme:** 0 Fehler (siehe JSON-LD)

## Gefundene Hauptprobleme und Fixes
- **Open Graph / Twitter (hohe Priorität):** Next.js ersetzt das globale `openGraph`/`twitter` komplett, sobald eine Seite ein eigenes definiert. Folge: bei ~214 Seiten fehlten `og:image`, bei ~211 `og:type`; Twitter hatte überall den generischen Startseiten-Titel und kein Bild; 10 Seiten hatten `og:url` = Startseite. **Fix zentral:** neue `lib/seo.ts` (`withSocial()`), eingebaut in alle 57 Seiten-/Route-Metadaten. Ergebnis auf allen 235 Seiten: `og:title`, `og:description`, `og:url` (= Canonical), `og:type`, `og:image`, `og:locale`, `og:site_name`, `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`. Seitenspezifische Werte bleiben erhalten.
- **OG-Bild-Pfad geprüft:** `https://4kdeutsch.com/opengraph-image.jpg` → 200, `image/jpeg`, 49 KB, 1200×630 (echter Produktionspfad). Blog-Artikel nutzen ihr Cover als `og:image` (1600×900).
- **OG-Typen:** Startseite und Inhaltsseiten `website` (221), Blog-Artikel `article` (14).
- **Meta keywords:** auf 235 Seiten vorhanden (inkl. Layout-Default) → entfernt (von Suchmaschinen ignoriert, Spam-Signal). Jetzt 0.
- **Doppelte Marke im Blog-Titel** (`… | 4kdeutsch | 4kdeutsch Blog`, 6 Artikel) → bereinigt.
- **Nicht belegte Aussagen in Titeln/Beschreibungen** (Auswahl, geändert):
  - `/affiliate`: „Bis zu 40 % Provision“ / „Gut konvertierende Links“ (Konditionen nicht bestätigt) → neutral
  - `/bestes-iptv`: „Bester IPTV Anbieter … Empfehlung“ → „Kriterien für die Wahl eines IPTV-Anbieters“
  - `/iptv-android-tv`, `/iptv-apple-tv`: „Beste … Apps“, „flüssige 4K-Streams“ → sachlich
  - `/iptv-vpn`: „Drosselung verhindert“ → entschärft
  - `/tivimate-iptv`: „Die Top-App“ → entfernt
  - `/blog/bestes-iptv-deutschland-2026`: „Bestes IPTV-Abo … im Test“, „stotterfreies IPTV“ → neutral
  - `/blog/iptv-ohne-buffering`: „ruckelfrei zu streamen“ → „Ruckeln und Buffering zu verringern“
- **Blog-Autoren:** die fiktiven Personas (Sarah Jenkins, Marcus Schmidt, Dave Miller …) werden nirgends mehr angezeigt oder ausgegeben. Alle Artikel sind der Marke zugeordnet (Anzeige „4kdeutsch · Redaktion“, Icon statt Personenfoto, neutraler Autorentext; Schema `author` = Organization `#organization`). Umsetzung zentral in `lib/mongodb.ts` (`EDITORIAL_AUTHOR`), gilt auch für DB-Beiträge.
- **Logo:** Das vom Owner gelieferte Logo (`public/images/Logo 3D 4KDEUTSCH au néon vert.png`) ist aktiv: `public/images/branding/4kdeutsch-logo.png` (1200×369, transparent, 122 KB), Navbar/Footer, Organization-`logo`, Article-Publisher. Favicons/App-Icons aus dem „4K“-Teil des Logos neu erzeugt (`scripts/build-brand-assets.mjs`); beim „4K“-Ausschnitt ist am rechten Rand ein kleiner Rest des „D“ sichtbar (Logo-Buchstaben überlappen) – bei Favicon-Größe kaum erkennbar, ideal wäre eine separate quadratische Icon-Datei.

## JSON-LD (Produktion)
Geprüft: `/`, `/pricing`, `/contact`, `/features`, `/iptv-kaufen`, Blog-Artikel. Je 1 Organization (`#organization`, jetzt mit `logo`) + 1 WebSite, WebPage auf der Startseite, BreadcrumbList/FAQPage/Product nur wo sichtbarer Inhalt vorliegt, Article mit Headline, Bild, `datePublished`, Autor/Publisher = Organization. Kein Review/AggregateRating/address/legalName/sameAs. **Local JSON-LD validation: PASS. Google Rich Results Test: NOT RUN.**
Warnungen (nicht blockierend): Product ohne `sku`/`@id`; `dateModified` = `datePublished` (kein echtes Änderungsdatum gespeichert).

## Geänderte Seiten (Metadaten über `withSocial`)
Alle Seiten mit eigener Metadaten-Definition (57): Startseite, about, affiliate, agb, bestes-iptv, blog, blog/[slug], bundesliga-live-stream, champions-league-live-stream, contact, cookies, datenschutz, devices, einrichtung (+ [thema], [thema]/[geraet]), faq, features, impressum, install, iptv-android-handy, iptv-android-tv, iptv-app (+ [app], [app]/[geraet]), iptv-apple-tv, iptv-apps, iptv-erfahrungen, iptv-fire-stick, iptv-hilfe (+ [problem], [problem]/[geraet]), iptv-in (+ [stadt]), iptv-kaufen, iptv-legal-deutschland, iptv-lg-tv, iptv-samsung-tv, iptv-sicherheit, iptv-smarters-pro, iptv-sport, iptv-vergleich, iptv-vpn, iptv-windows, kostenloses-iptv, legal/acceptable-use, legal/dmca, live (+ [wettbewerb]), pricing, refund, reseller, restream, sky-dazn-iptv, tivimate-iptv, was-ist-iptv, widerruf. Text geändert: affiliate, bestes-iptv, iptv-android-tv, iptv-apple-tv, iptv-vpn, tivimate-iptv, 2 Blog-Beiträge (`lib/mongodb.ts`). Außerdem: `app/layout.tsx` (Keywords entfernt), `lib/seo.ts`, `lib/structured-data.ts`, `lib/brand.ts`, `components/layout/Logo.tsx`, Blog-Autoren-Komponenten (`AuthorAvatar`, `AuthorCard`, `FeaturedPost`).

## Bewusst unverändert
- Alle übrigen Titel/Beschreibungen (eindeutig, passend zum H1; Titel/H1-Abweichungen nur bei `/faq` und `/install`, dort unproblematisch)
- Canonicals, Sitemap, Indexierungsstrategie, URLs, Legal-Seiten (noindex bleibt), Preise/Reseller
- Redaktionelle Blog-Titel mit „Beste Apps …“, „… Test 2026“ (Rundum-Vergleiche/Anleitungen; `Test`-Formulierungen sind redaktionell, nicht belegbar durch eigene Messung – Entscheidung beim Betreiber)

## Verbleibende Hinweise
1. **Titel-/Beschreibungslänge:** 169 Titel > 65 Zeichen und 118 Beschreibungen > 165 Zeichen werden in den Suchergebnissen gekürzt; nicht pauschal angepasst (Nutzen vor Zeichenzahl).
2. `/best-iptv` aus deiner Prüfliste existiert nicht (404); die Seite heißt `/bestes-iptv`. Nichts angelegt.
3. Legal-Seiten sind noindex (Platzhalter fehlen noch) – nach Eintragen der Pflichtangaben ggf. auf indexierbar stellen (Impressum/Datenschutz werden üblicherweise indexierbar belassen).
4. `dateModified` im Blog-Schema = Veröffentlichungsdatum, solange kein Änderungsdatum gespeichert wird.
5. Rich Results Test/Social-Debugger (Facebook, LinkedIn, X) manuell auf der Live-URL ausführen.
6. Offen aus früheren Berichten: Rechtsangaben, Support-Telefon im Schema, Soft-404 `/blog/<unbekannt>`.

## Final status
- TypeScript: **PASS**
- Build: **PASS** (277/277 Seiten)
- Metadata: **PASS** (0 Duplikate, 0 fehlende Beschreibungen/Canonicals, 0 Keywords)
- Canonical: **PASS**
- OpenGraph: **PASS** (0 Seiten ohne og:image/title/description/url/type; Twitter vollständig)
- JSON-LD: **PASS** (lokal; Google-Test nicht ausgeführt)
- Sitemap: **PASS** (235 URLs, alle 200, alle indexierbar, keine Redirects/404/noindex)
