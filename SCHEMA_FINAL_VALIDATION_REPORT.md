# SCHEMA_FINAL_VALIDATION_REPORT – 4kdeutsch.com

Stand: 2026-10-01. Nichts committet, gepusht oder deployt. Es wurden keine Schema-Typen hinzugefügt oder entfernt; die einzige Änderung in dieser Runde ist das erweiterte Prüfskript `scripts/validate-schema.mjs`.

## Ergebnis
- **Local JSON-LD validation: PASS** (0 Fehler, 7 Warnungen)
- **Google Rich Results Test: NOT RUN** (nicht aus der lokalen Umgebung ausführbar; es wird **nicht** behauptet, dass Google das Markup validiert hat). Ebenso nicht ausgeführt: validator.schema.org.
- Ein im Projekt vorhandener Schema.org-Validator/eine Bibliothek existiert nicht (`package.json`: keine). Die lokale Prüfung ist daher ein eigenes Skript (JSON-Parsing, @context, @id-Auflösung, Pflichtfelder der verwendeten Typen, Verbotsliste, Canonical-Abgleich) – **kein** vollständiger Schema.org-Vokabular-Check.

## Geprüfte Seiten (Produktions-Build, `next start`) und gefundene Typen
| Seite | Canonical | Typen |
|---|---|---|
| `/` | `https://4kdeutsch.com` | Organization, WebSite, WebPage, Product, FAQPage |
| `/pricing` | `…/pricing` | Organization, WebSite, Product, FAQPage, BreadcrumbList |
| `/contact` | `…/contact` | Organization, WebSite |
| `/features` | `…/features` | Organization, WebSite |
| `/iptv-kaufen` | `…/iptv-kaufen` | Organization, WebSite, Product, FAQPage, BreadcrumbList |
| `/blog/iptv-fire-tv-stick-2026` (Zusatzstichprobe) | `…/blog/iptv-fire-tv-stick-2026` | Organization, WebSite, Article, BreadcrumbList, FAQPage |

## Geprüfte Punkte – alle bestanden
- Gültiges JSON in allen Blöcken; `@context` überall `https://schema.org`
- Genau 1 Organization (`https://4kdeutsch.com/#organization`) und 1 WebSite (`…/#website`) pro Seite, keine doppelten `@id`
- Alle `@id`-Verweise lösen auf (WebSite.publisher → Organization; Homepage-WebPage → WebSite + Organization)
- Schema-URLs passen zum Canonical (WebPage.url, Breadcrumb-Endpunkt, Article.mainEntityOfPage); Canonical immer auf `https://4kdeutsch.com`
- Keine alten Domains (`germanystreamtv.com`, `ipgermany.de`, `ukstream4k`) in JSON-LD
- Kein leeres `sameAs` (Eigenschaft fehlt, da keine bestätigten Profile)
- Kein `Review`, `AggregateRating`, `LocalBusiness`, `address`, `legalName`, `vatID`, `taxID`, Auszeichnungen
- Kein `logo` an Organization und keins im Article-Publisher (kein offizielles Logo vorhanden)
- BreadcrumbList: Positionen lückenlos, erster Eintrag Startseite, letzter Eintrag = Canonical
- FAQPage: alle Fragen im sichtbaren Seitentext vorhanden (0 fehlend), Frage/Antwort-Struktur korrekt
- Product/Offer: EUR, Preise 40,99 / 55,99 / 70,99 €, `offerCount` = Anzahl der Offers, Preise auf `/pricing` sichtbar
- Keine unbelegten Behauptungen im Markup gefunden (Suche nach Garantie/Testsieger/Millionen/Zertifiziert/Prozentversprechen/Auszeichnung: 0 Treffer)
- **Telefon:** Organization und ContactPoint beziehen `telephone` aus `SITE_CONFIG.whatsappNumber` (`lib/structured-data.ts` Zeilen 20/31, zentral in `lib/constants.ts`), aktuell `+212625218443`. Nicht verändert.

## Warnungen (nicht blockierend)
1. **Product ohne `sku`/`gtin`/`mpn`** und **ohne `@id`** (dasselbe Product wird auf mehreren Seiten wiederholt). Optional für Google; keine Daten erfunden.
2. **Article.publisher ohne `logo`** – Google empfiehlt eins; erst hinzufügen, wenn das offizielle Logo existiert (`lib/brand.ts`).
3. **Article.author = „Marcus Schmidt“, „Senior Streaming-Architekt“** (Person) stammt aus den fiktiven Blog-Autorenprofilen. Diese Angabe ist im Markup nicht belegt (siehe `LAUNCH_BLOCKERS_REPORT.md`). Nicht entfernt, weil gültiges Schema; sollte mit der Autorenentscheidung ersetzt werden (echter Autor oder Organization).
4. Telefonnummer im Schema = WhatsApp-Nummer; falls die Support-Telefonnummer abweicht, müsste ein eigenes Feld in `SITE_CONFIG` angelegt werden.
5. Product-Offers ohne `priceValidUntil`, Versand-/Rückgabeangaben (nur für Merchant-Listings relevant; nicht erfunden).

## Build
- TypeScript (`npx tsc --noEmit`): **PASS**, keine Fehler
- Production build (`next build`): **PASS** – „Compiled successfully“, **277/277** statische Seiten
- Schema-Validierung: **PASS** (0 Fehler)

## Verbleibende Aktionen vor dem Deployment
1. **Google Rich Results Test und validator.schema.org manuell auf der Live-URL ausführen** (hier nicht ausgeführt).
2. Offizielles Logo liefern → `BRAND_LOGO` in `lib/brand.ts` setzen → Organization- und Article-Publisher-Logo erscheinen automatisch.
3. Entscheidung zu den fiktiven Blog-Autoren (Article.author).
4. Bestätigen, ob die WhatsApp-Nummer auch als Support-Telefon im Schema stehen soll.
5. Rechtsangaben (Adresse, Rechtsform, USt-IdNr. …) erst nach Bestätigung ins Schema übernehmen – derzeit bewusst nicht vorhanden.
