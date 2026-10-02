export interface City {
  slug: string;
  name: string;
  state: string;
  /** Public regional broadcaster serving the city (real, verifiable). */
  broadcaster: string;
  /** Well-known local football clubs (no league claims – those change yearly). */
  clubs: string[];
  /** One unique, factual sentence about the city for the intro. */
  blurb: string;
  /** Nearby cities to interlink. */
  nearby: string[];
}

export const CITIES: City[] = [
  {
    slug: 'berlin',
    name: 'Berlin',
    state: 'Berlin',
    broadcaster: 'rbb',
    clubs: ['1. FC Union Berlin', 'Hertha BSC'],
    blurb: 'Als Hauptstadt und größte Stadt Deutschlands hat Berlin eine besonders vielfältige Mischung aus Kabel-, DSL- und Glasfaseranschlüssen.',
    nearby: ['hamburg', 'leipzig'],
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    state: 'Hamburg',
    broadcaster: 'NDR',
    clubs: ['Hamburger SV', 'FC St. Pauli'],
    blurb: 'Hamburg ist ein wichtiger Medienstandort im Norden – hier sitzen unter anderem große Rundfunk- und Verlagshäuser.',
    nearby: ['bremen', 'berlin'],
  },
  {
    slug: 'muenchen',
    name: 'München',
    state: 'Bayern',
    broadcaster: 'BR',
    clubs: ['FC Bayern München', 'TSV 1860 München'],
    blurb: 'München ist Heimat des FC Bayern und einer der bekanntesten Fußballstandorte Europas.',
    nearby: ['stuttgart', 'frankfurt'],
  },
  {
    slug: 'koeln',
    name: 'Köln',
    state: 'Nordrhein-Westfalen',
    broadcaster: 'WDR',
    clubs: ['1. FC Köln'],
    blurb: 'In Köln sitzt der WDR, und die Stadt ist bekannt für ihre Fußball- und Karnevalsbegeisterung.',
    nearby: ['duesseldorf', 'dortmund'],
  },
  {
    slug: 'frankfurt',
    name: 'Frankfurt am Main',
    state: 'Hessen',
    broadcaster: 'hr',
    clubs: ['Eintracht Frankfurt'],
    blurb: 'Frankfurt ist Deutschlands Finanzmetropole und ein zentraler Internet-Knotenpunkt mit einem der größten Austauschpunkte der Welt (DE-CIX).',
    nearby: ['stuttgart', 'koeln'],
  },
  {
    slug: 'stuttgart',
    name: 'Stuttgart',
    state: 'Baden-Württemberg',
    broadcaster: 'SWR',
    clubs: ['VfB Stuttgart'],
    blurb: 'Stuttgart ist Landeshauptstadt von Baden-Württemberg und Sitz des SWR-Studios.',
    nearby: ['muenchen', 'frankfurt'],
  },
  {
    slug: 'duesseldorf',
    name: 'Düsseldorf',
    state: 'Nordrhein-Westfalen',
    broadcaster: 'WDR',
    clubs: ['Fortuna Düsseldorf'],
    blurb: 'Düsseldorf ist Landeshauptstadt von Nordrhein-Westfalen und ein bedeutender Messe- und Wirtschaftsstandort.',
    nearby: ['koeln', 'dortmund'],
  },
  {
    slug: 'dortmund',
    name: 'Dortmund',
    state: 'Nordrhein-Westfalen',
    broadcaster: 'WDR',
    clubs: ['Borussia Dortmund'],
    blurb: 'Dortmund ist die Heimat von Borussia Dortmund und dem Signal Iduna Park, einem der größten Stadien Deutschlands.',
    nearby: ['duesseldorf', 'koeln'],
  },
  {
    slug: 'leipzig',
    name: 'Leipzig',
    state: 'Sachsen',
    broadcaster: 'MDR',
    clubs: ['RB Leipzig'],
    blurb: 'Leipzig ist Sitz des MDR und eine der am schnellsten wachsenden Städte Deutschlands.',
    nearby: ['berlin', 'dortmund'],
  },
  {
    slug: 'bremen',
    name: 'Bremen',
    state: 'Bremen',
    broadcaster: 'Radio Bremen',
    clubs: ['SV Werder Bremen'],
    blurb: 'Bremen ist die Heimat von Werder Bremen und ein traditionsreicher Hafenstandort im Norden.',
    nearby: ['hamburg', 'dortmund'],
  },
];

/**
 * Audit 2026-09: rendered city pages were ~87–90% identical (only one blurb, the club and the
 * broadcaster differ), with no distinct search intent beyond the city name. Until real local
 * content exists, city pages are noindex and left out of the sitemap. Flip this to true only
 * after adding genuinely local information.
 */
export const CITY_PAGES_INDEXABLE = false;

export const getCity =(slug: string) => CITIES.find((c) => c.slug === slug);
