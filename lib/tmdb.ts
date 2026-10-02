export interface TMDBMediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

/** Keep only what the UI renders – the raw TMDB objects (overview, genre ids, …) would bloat the page payload. */
const slim = (m: TMDBMediaItem): TMDBMediaItem => ({
  id: m.id,
  title: m.title,
  name: m.name,
  poster_path: m.poster_path,
  vote_average: m.vote_average,
  release_date: m.release_date,
  first_air_date: m.first_air_date,
});

const FALLBACK_MOVIES: TMDBMediaItem[] = [
  {
    id: 1,
    title: "Deadpool & Wolverine",
    poster_path: "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=500&auto=format&fit=crop&q=80",
    vote_average: 8.4,
    release_date: "2026-07-26"
  },
  {
    id: 2,
    title: "Dune: Part Two",
    poster_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
    vote_average: 8.7,
    release_date: "2024-03-01"
  },
  {
    id: 3,
    title: "Oppenheimer",
    poster_path: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=80",
    vote_average: 8.6,
    release_date: "2023-07-21"
  },
  {
    id: 4,
    title: "Inside Out 2",
    poster_path: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&auto=format&fit=crop&q=80",
    vote_average: 8.1,
    release_date: "2024-06-14"
  },
  {
    id: 5,
    title: "Spider-Man: Across the Spider-Verse",
    poster_path: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&auto=format&fit=crop&q=80",
    vote_average: 8.8,
    release_date: "2023-06-02"
  },
  {
    id: 6,
    title: "Gladiator II",
    poster_path: "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?w=500&auto=format&fit=crop&q=80",
    vote_average: 8.3,
    release_date: "2024-11-22"
  }
];

const FALLBACK_SERIES: TMDBMediaItem[] = [
  {
    id: 101,
    name: "House of the Dragon",
    poster_path: "https://images.unsplash.com/photo-1598149885212-c92671611588?w=500&auto=format&fit=crop&q=80",
    vote_average: 8.5,
    first_air_date: "2022-08-21"
  },
  {
    id: 102,
    name: "The Boys",
    poster_path: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=500&auto=format&fit=crop&q=80",
    vote_average: 8.4,
    first_air_date: "2019-07-26"
  },
  {
    id: 103,
    name: "Shōgun",
    poster_path: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=500&auto=format&fit=crop&q=80",
    vote_average: 8.9,
    first_air_date: "2024-02-27"
  },
  {
    id: 104,
    name: "Stranger Things",
    poster_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80",
    vote_average: 8.6,
    first_air_date: "2016-07-15"
  }
];

export async function getPopularMovies(): Promise<TMDBMediaItem[]> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return FALLBACK_MOVIES;
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
      { next: { revalidate: 3600 } } // 1h ISR cache as specified
    );
    if (!res.ok) throw new Error("TMDB Error");
    const data = await res.json();
    // TMDB may return items without a poster; drop them so the UI never
    // receives a null poster_path.
    const items = (data.results as TMDBMediaItem[]).filter((m) => m.poster_path).map(slim);
    return (items.length ? items : FALLBACK_MOVIES).slice(0, 18);
  } catch (error) {
    console.error("Failed to fetch TMDB movies, falling back:", error);
    return FALLBACK_MOVIES;
  }
}

export async function getPopularSeries(): Promise<TMDBMediaItem[]> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return FALLBACK_SERIES;
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`,
      { next: { revalidate: 3600 } } // 1h ISR cache as specified
    );
    if (!res.ok) throw new Error("TMDB Error");
    const data = await res.json();
    // Drop poster-less items to avoid a null poster_path reaching the UI.
    const items = (data.results as TMDBMediaItem[]).filter((m) => m.poster_path).map(slim);
    return (items.length ? items : FALLBACK_SERIES).slice(0, 18);
  } catch (error) {
    console.error("Failed to fetch TMDB series, falling back:", error);
    return FALLBACK_SERIES;
  }
}
