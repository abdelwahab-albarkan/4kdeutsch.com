# SCHEMA_IMPLEMENTATION_REPORT – 4kdeutsch.com

Stand: 2026-10-01. Nichts committet, gepusht oder deployt. Sitemap, Preise, Reseller-Pakete, Rechtstexte, SEO-Titel/-Beschreibungen und der Abschnitt „Das erwartet Sie“ sind unverändert.

## Audit (vorher)
- `lib/structured-data.ts` hatte bereits `organizationSchema()` und `websiteSchema()` mit stabilen `@id`s; `app/layout.tsx` gibt beide global **einmal** aus (kein Duplikat auf Unterseiten gefunden).
- Es fehlte: ein `WebPage`-Entity für die Startseite sowie ein gemeinsamer `@graph`.
- Unterseiten nutzen weiter `Product`, `FAQPage`, `BreadcrumbList`, Blog `Article` – gültig, unverändert.
- Bereits vorhanden und korrekt: kein Logo (nicht erfunden), `sameAs` nur aus bestätigten `SOCIAL_LINKS` (leer).

## Files changed
- `lib/structured-data.ts`
- `app/layout.tsx`
- `app/page.tsx`
- neu: `scripts/validate-schema.mjs` (Prüfskript), `SCHEMA_IMPLEMENTATION_REPORT.md`

## Schemas added / geändert
- **`siteGraphSchema()`** (neu): ein `@graph` aus Organization + WebSite, ersetzt die zwei losen JSON-LD-Objekte im Layout (global auf jeder Seite, einmalig).
- **`homeWebPageSchema()`** (neu): WebPage-Entity nur auf der Startseite.
- Organization/WebSite: URL auf `https://4kdeutsch.com/` vereinheitlicht; Organization um `telephone` ergänzt.

## Entities / @ids
| @type | @id |
|---|---|
| Organization | `https://4kdeutsch.com/#organization` |
| WebSite | `https://4kdeutsch.com/#website` (`publisher` → Organization) |
| WebPage (nur `/`) | `https://4kdeutsch.com/#webpage` (`isPartOf` → WebSite, `about` → Organization) |

## Properties used (alle aus bestätigten Projektdaten)
- Organization: `name` 4kdeutsch, `url`, `email` support@streamb4.com, `telephone` **+212625218443**, `image` (vorhandenes Social-Bild), `description` und `areaServed` Germany (bestehende Seitenaussage), `contactPoint` (customer support, E-Mail, Telefon, `availableLanguage: German`, `areaServed: DE`).
- WebSite: `name`, `url`, `inLanguage de-DE`, `publisher`.
- WebPage: `url`, `name` (= Seitentitel), `inLanguage`, `isPartOf`, `about`.
- **Hinweis Telefon:** Der Auftrag nannte +34 602 198 098. Du hast die WhatsApp-Nummer zuvor auf +212 625 218 443 geändert; das Schema übernimmt die Nummer aus `SITE_CONFIG` und ist damit konsistent mit der Seite. Bitte bestätigen, dass dies auch die gewünschte Support-Telefonnummer im Schema ist.
- Geändert gegenüber vorher: `availableLanguage` von „German, English“ auf nur „German“ (Englisch-Support ist nicht bestätigt).

## Bewusst weggelassen (nicht bestätigt)
`logo` (kein offizielles Logo; Favicon-Monogramm wird nicht verwendet), `address`, `legalName`, `vatID`, `taxID`, Registerangaben, `sameAs` (keine bestätigten Profile; leeres Array wird nicht mehr ausgegeben), `Review`, `AggregateRating`, `LocalBusiness`, Auszeichnungen, Bewertungszahlen. Aktivierung des Logos: `BRAND_LOGO` in `lib/brand.ts`; weitere Daten nach Bereitstellung der echten Angaben.

## Validation (Produktions-Build, `scripts/validate-schema.mjs`)
Seiten: `/`, `/pricing`, `/contact`, `/features`, `/iptv-kaufen`
- Genau **ein** Organization-Entity (`#organization`) pro Seite: ✔
- WebSite → Organization (`publisher`): ✔
- WebPage → WebSite und Organization (Startseite): ✔
- Canonical auf `https://4kdeutsch.com…` (z. B. `/pricing`, `/contact`, `/features`, `/iptv-kaufen` selbst-kanonisch; Startseite `https://4kdeutsch.com`): ✔
- Keine alten Domains (`germanystreamtv.com`, `ipgermany.de`, `ukstream4k`) in JSON-LD oder Seiten-HTML: ✔
- Keine fiktiven Rechts-/Firmendaten (kein address/legalName/vatID/taxID/LocalBusiness): ✔
- Kein `Review`/`AggregateRating`: ✔
- Bestehende `Product`, `FAQPage`, `BreadcrumbList` unverändert vorhanden: ✔

## Build result
- TypeScript: **PASS**
- Production build: **PASS** (277 Seiten)
- Ergebnis Validierung: `ALL CHECKS PASSED`

## Hinweis
Das Schema-Markup wurde nur strukturell geprüft (JSON-Parsing, Entity-Beziehungen); ein Test mit Googles Rich-Results-Test/Schema.org-Validator wurde nicht durchgeführt.
