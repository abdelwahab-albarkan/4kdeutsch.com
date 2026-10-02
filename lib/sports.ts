/**
 * Audit 2026-09: these competitions already have a dedicated, older landing page with the same
 * search intent. The /live/ variant is noindex to avoid cannibalisation.
 */
export const SPORTS_NOINDEX = new Set(['bundesliga', 'champions-league', 'laliga', 'serie-a']);
// laliga / serie-a: ~0.8 similarity to premier-league (same format facts, no distinct angle yet).

/** Where internal links should point for a competition (legacy page for the noindex ones). */
const LEGACY_SPORT_PAGES: Record<string, string> = {
  bundesliga: '/bundesliga-live-stream',
  'champions-league': '/champions-league-live-stream',
};
export const sportHref = (slug: string) => LEGACY_SPORT_PAGES[slug] ?? `/live/${slug}`;

/** Avoid internal links to noindex pages that have no indexable replacement. */
export const isLinkableSport = (slug: string) => !SPORTS_NOINDEX.has(slug) || slug in LEGACY_SPORT_PAGES;

export interface SportEvent {
  slug: string;
  name: string;
  /** e.g. "Fußball", "Motorsport" */
  sport: string;
  /** Verifiable format facts only – no rights or availability claims. */
  facts: string[];
  blurb: string;
  related: string[];
}

export const SPORTS: SportEvent[] = [
  {
    slug: 'bundesliga',
    name: 'Bundesliga',
    sport: 'Fußball',
    facts: ['18 Vereine', '34 Spieltage pro Saison', 'Oberste deutsche Spielklasse'],
    blurb: 'Die Bundesliga ist die höchste deutsche Fußballliga.',
    related: ['2-bundesliga', 'dfb-pokal', 'champions-league'],
  },
  {
    slug: '2-bundesliga',
    name: '2. Bundesliga',
    sport: 'Fußball',
    facts: ['18 Vereine', '34 Spieltage pro Saison', 'Zweithöchste deutsche Spielklasse'],
    blurb: 'Die 2. Bundesliga ist bekannt für enge Tabellen und spannende Auf- und Abstiegskämpfe.',
    related: ['bundesliga', 'dfb-pokal'],
  },
  {
    slug: 'dfb-pokal',
    name: 'DFB-Pokal',
    sport: 'Fußball',
    facts: ['K.-o.-Wettbewerb', 'Finale im Berliner Olympiastadion', 'Amateure treffen auf Profis'],
    blurb: 'Im DFB-Pokal sorgen Überraschungen und Pokalsensationen regelmäßig für besondere Fußballmomente.',
    related: ['bundesliga', '2-bundesliga', 'champions-league'],
  },
  {
    slug: 'champions-league',
    name: 'UEFA Champions League',
    sport: 'Fußball',
    facts: ['Europas wichtigster Vereinswettbewerb', 'Ligaphase mit anschließender K.-o.-Runde', 'Finale als Einzelspiel'],
    blurb: 'Die Champions League bringt die besten Vereinsmannschaften Europas gegeneinander an.',
    related: ['europa-league', 'bundesliga', 'premier-league'],
  },
  {
    slug: 'europa-league',
    name: 'UEFA Europa League',
    sport: 'Fußball',
    facts: ['Zweiter großer UEFA-Vereinswettbewerb', 'Ligaphase mit anschließender K.-o.-Runde'],
    blurb: 'Die Europa League bietet europäischen Fußball mit vielen spannenden Duellen abseits der Champions League.',
    related: ['champions-league', 'bundesliga'],
  },
  {
    slug: 'premier-league',
    name: 'Premier League',
    sport: 'Fußball',
    facts: ['20 Vereine', '38 Spieltage pro Saison', 'Höchste englische Spielklasse'],
    blurb: 'Die Premier League ist die höchste englische Fußballliga und wird international stark beachtet.',
    related: ['laliga', 'serie-a', 'champions-league'],
  },
  {
    slug: 'laliga',
    name: 'LaLiga',
    sport: 'Fußball',
    facts: ['20 Vereine', '38 Spieltage pro Saison', 'Höchste spanische Spielklasse'],
    blurb: 'LaLiga steht für technischen Fußball und legendäre Duelle wie den Clásico.',
    related: ['premier-league', 'serie-a', 'champions-league'],
  },
  {
    slug: 'serie-a',
    name: 'Serie A',
    sport: 'Fußball',
    facts: ['20 Vereine', '38 Spieltage pro Saison', 'Höchste italienische Spielklasse'],
    blurb: 'Die Serie A verbindet taktische Raffinesse mit großer Fußballtradition.',
    related: ['premier-league', 'laliga', 'champions-league'],
  },
  {
    slug: 'formel-1',
    name: 'Formel 1',
    sport: 'Motorsport',
    facts: ['Grand-Prix-Kalender weltweit', 'Training, Qualifying und Rennen an jedem Wochenende'],
    blurb: 'Die Formel 1 ist die Königsklasse des Motorsports mit Rennen auf allen Kontinenten.',
    related: ['bundesliga', 'champions-league'],
  },
];

export const getSport = (slug: string) => SPORTS.find((s) => s.slug === slug);
