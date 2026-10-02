# LAUNCH_BLOCKERS_REPORT – 4kdeutsch.com

Stand: 2026-10-01. Nichts committet, gepusht oder deployt. Preise, Reseller-Preise, Free Trial, Kontaktdaten, Domain, Bildarchitektur/-dateinamen unverändert.

**Die Seite ist NICHT launch-ready**, solange die Rechtsangaben unten fehlen.

## LEGAL
Auf den vier Seiten stehen insgesamt **14 Marker `[REQUIRED BUSINESS INFORMATION]`** (Komponente `RequiredInfo`). Es wurde nichts erfunden oder abgeleitet.

| Seite | Marker | Exakt benötigte Angaben vom Betreiber |
|---|---|---|
| `/impressum` (5) | Anbieterkennzeichnung | Vollständiger Name bzw. Firma, Rechtsform, ladungsfähige Anschrift (Straße, Nr., PLZ, Ort, Land) |
| | Vertretung | Name(n) der vertretungsberechtigten Person(en); ggf. inhaltlich Verantwortliche(r) nach § 18 Abs. 2 MStV mit Anschrift |
| | Register/USt | Registergericht + Registernummer, USt-IdNr. (§ 27a UStG) – nur falls vorhanden, sonst Abschnitt streichen |
| | Aufsichtsbehörde | Zuständige Behörde – nur falls Tätigkeit zulassungspflichtig, sonst streichen |
| | Streitbeilegung | Erklärung, ob Teilnahme an Verbraucherschlichtung bereit/verpflichtet (§ 36 VSBG) |
| `/agb` (2) | Hinweis Entwurf | Bestätigung von Vertragspartner, Preisen; **anwaltliche Prüfung** der AGB |
| | Recht/Gerichtsstand | Anwendbares Recht und Gerichtsstand |
| `/datenschutz` (5) | Verantwortlicher | Name/Firma + Anschrift (wie Impressum); ggf. Datenschutzbeauftragter |
| | Hosting | Hosting-Anbieter (Name/Anschrift), AV-Vertrag Art. 28 DSGVO, tatsächliche Logfile-Speicherdauer |
| | Google Analytics | AV-Vertrag mit Google, Drittlandtransfer-Grundlage (DPF/SCC), im GA-Konto eingestellte Aufbewahrungsdauer |
| | Vercel Web Analytics/Hosting | AV-Vertrag mit Vercel, Drittlandtransfer-Grundlage |
| | Bestell-/Zahlungssystem | Name + Datenschutzhinweise des Checkout-Systems und der Zahlungsdienstleister |
| `/widerruf` (2) | Widerrufsbelehrung | Vollständige Anbieteranschrift, ggf. Telefon/Fax; empfohlen: Muster-Widerrufsformular |
| | Erlöschen des Widerrufsrechts | Bestätigung, dass die ausdrückliche Zustimmung/Kenntnisbestätigung im externen Bestellsystem tatsächlich eingeholt und dokumentiert wird |

Status: **offen – blockiert den Launch** (Impressum/Datenschutz sind Pflichtangaben).

## DMCA
- Ort: `app/legal/dmca/page.tsx`
- Einordnung: „24–48 Stunden“ ist **weder gesetzliche Vorgabe noch im Projekt belegt** (DSA/Notice-and-Action verlangt zügiges Handeln, keine feste Frist) → selbst gesetztes, nicht belegtes Versprechen.
- old wording: „Wir prüfen alle eingehenden Meldungen unverzüglich und entfernen oder sperren den Zugriff auf das betroffene Material innerhalb von 24-48 Stunden, sofern die Berechtigung nachgewiesen wird (Notice-and-Take-down-Verfahren nach Telemediengesetz / DSA).“
- new wording: „Wir prüfen eingehende Meldungen zeitnah und entfernen oder sperren den Zugriff auf das betroffene Material, sofern die Rechtsverletzung hinreichend belegt ist bzw. sich bestätigt (Notice-and-Take-down-Verfahren nach dem Digital Services Act).“
- reason: keine unbelegte Frist; Rechtsabsicht (Notice-and-Take-down) bleibt. Das veraltete „Telemediengesetz“ (seit 2024 durch das DDG ersetzt) wurde entfernt.
- Offen (nicht geändert): Die Seite nennt den E-Mail-Kontakt als „benannten Urheberrechtsbeauftragten“ – ob ein solcher formal benannt ist, muss der Betreiber bestätigen.

## BLOG
- total blog routes audited: **25** (alle in Sitemap und auf `/blog` verlinkt)
- legitimate articles: **14** (alle 200, 885–1990 Wörter, korrekte Selbst-Canonical, indexierbar)
- soft-404 / thin: **3** (ca. 200–240 Wörter, nur Stichpunkte) → **redirect (permanent, 308)**, aus Sitemap/Listen entfernt:
  - `/blog/best-iptv-players-smart-tv` → `/blog/beste-iptv-apps-2026`
  - `/blog/how-to-install-iptv-on-firestick` → `/blog/iptv-fire-tv-stick-2026`
  - `/blog/watch-champions-league-iptv` → `/champions-league-live-stream`
- noindex candidates: **8** interne Keyword-/Content-Roadmaps („50 Artikelideen“, Keyword-Tabellen) → `noindex, nofollow`, aus Sitemap, `/blog`, Startseite und „Weiterlesen“ entfernt: `dazn-`, `sky-`, `ipad-`, `iphone-`, `macos-`, `windows-iptv-roadmap-2026`, `iptv-vpn-deutschland-2026`, `iptv-legal-deutschland-2026`. Erreichbar bleiben sie nur per direkter URL (Inhalt nicht gelöscht).
- Interne Links in veröffentlichten Artikeln auf die beiden Drafts (`/blog/iptv-vpn-deutschland-2026`, `/blog/iptv-legal-deutschland-2026`) → auf die echten Seiten `/iptv-vpn` bzw. `/iptv-legal-deutschland` umgestellt.
- Entfernt: Im Artikel-Layout wurden die **erfundenen Kommentare** („Jonas D.“, „Emily R.“) samt nicht speichernder Kommentarform ausgeblendet (`CommentSection` nicht mehr eingebunden).
- Entfernt: unbelegte Behauptung „über 8 Millionen Downloads / Bewertung 4,8/5“ zur App 9Xtream (3 Stellen in `lib/mongodb.ts`).
- Sitemap-Folge: Blog-Einträge 25 → 14; gesamt 235 URLs.
- unresolved:
  1. Unbekannte `/blog/<slug>` liefern **HTTP 200 + noindex + „nicht gefunden“-Inhalt** (Soft-404, verursacht durch das globale `app/loading.tsx`-Streaming). Alle anderen unbekannten Routen liefern korrekt 404. Echter 404 würde `dynamicParams = false` (neue DB-Artikel erst nach Rebuild) oder Umbau von `loading.tsx` erfordern – nicht ohne deine Entscheidung geändert.
  2. Die Blog-Autoren (Sarah Jenkins, Marcus Schmidt, Dave Miller …) mit Titeln/Bios und Avatare sind fiktive Personas → E-E-A-T-/Irreführungsrisiko; ersetzen durch echte Autoren oder neutrale Redaktion (Betreiberentscheidung).

## REVIEWS
- enabled/disabled: **disabled** – `SHOW_REVIEWS = false` (alte Testimonials, nicht verifizierbar) und `CustomerReviews` rendert nichts, solange `CUSTOMER_REVIEWS`/`RESELLER_REVIEWS` leer sind (Platzhalter nur mit lokalem Env-Flag).
- real data available: **NO**
- schema status: **kein `Review`/`AggregateRating`** irgendwo im Code (geprüft); Organization/Product ohne Bewertungswerte.
- Zum Aktivieren nötig: echte, zustimmende Kundenbewertungen (Name wie gewünscht angezeigt, Text, nur belegbare Sterne mit `ratingVerified`, echte Fotos oder Initialen – die `revriw`-Avatare sind Stockfotos). Eintragen in `lib/customer-reviews.ts`; kein Schema ohne Prüfung.

## QA (Produktions-Build, `next start`)
- TypeScript: **PASS**
- build: **PASS** (277 Seiten)
- route validation: 235 Sitemap-URLs → **alle 200**, genau 1 `<h1>`, 0 doppelte Titel
- canonical: **0 Abweichungen** (jede URL selbst-kanonisch)
- sitemap: 0 noindex-URLs in der Sitemap, keine Redirect-Ziele/Drafts enthalten
- broken links: 241 interne Linkziele aus allen Sitemap-Seiten → **0 defekt, 0 weitergeleitet**
- broken images: **0** (siehe `IMAGE_IMPLEMENTATION_REPORT.md`)
- soft-404: 5 von 6 unbekannten Routenfamilien korrekt 404; **`/blog/<unbekannt>` bleibt 200 (noindex)** – siehe oben
- Skripte: `scripts/qa-site.mjs`, `scripts/audit-blog.mjs`

## REMAINING BLOCKERS (benötigen Information/Aktion von dir)
1. **Rechtsangaben** laut Tabelle (Impressum, Datenschutz, Widerruf, AGB) + anwaltliche Prüfung der AGB.
2. **Bestätigung/Verträge:** AV-Verträge und Drittland-Grundlagen für Hosting, Google Analytics, Vercel; Zahlungsdienstleister/Checkout-System benennen.
3. **Bestätigung Urheberrechtsbeauftragter** (DMCA-Seite).
4. **Entscheidung Blog-Autoren:** fiktive Personas ersetzen.
5. **Entscheidung Soft-404 `/blog/<unbekannt>`** (siehe oben).
6. Echte Bewertungen (optional, zum Aktivieren des Review-Bereichs).
7. Offizielles Logo + Favicons (zurückgestellt, kein technischer Blocker).
