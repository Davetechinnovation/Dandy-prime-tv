import { NextResponse } from "next/server";
import redis from "@/lib/redis";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const ASIAN_COUNTRIES = [
  "KR", // South Korea
  "JP", // Japan
  "CN", // China
  "IN", // India
  "HK", // Hong Kong
  "TW", // Taiwan
  "TH", // Thailand
  "PH", // Philippines
  "SG", // Singapore
  "MY", // Malaysia
  "VN", // Vietnam
  "ID", // Indonesia
];

// General map function for both movies and TV shows
function mapContent(item: any) {
  return {
    id: item.id,
    title: item.title || item.name || "", // 'name' for TV shows
    image: item.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
      : null,
    year: item.release_date // for movies
      ? item.release_date.slice(0, 4)
      : item.first_air_date // for TV shows
      ? item.first_air_date.slice(0, 4)
      : null,
    rating: item.vote_average,
    media_type: item.media_type || (item.title ? 'movie' : 'tv'), // Added to distinguish if needed
  };
}

const ASIAN_TOPRATED_CACHE_KEY = "asian:toprated";
const ASIAN_NEWRELEASE_CACHE_KEY = "asian:newreleases";
const ASIAN_CACHE_TTL = 3600; // 1 hour

export async function GET(req: Request) {

  // Helper function to fetch and merge results for both movies and TV shows
  const fetchAndMergeContent = async (
    sortBy: string,
    filters: string,
    page: number = 1
  ) => {
    let allContent: any[] = [];
    for (const country of ASIAN_COUNTRIES) {
      // Fetch movies
      const movieRes = await fetch(
        `${TMDB_BASE_URL}/discover/movie?sort_by=${sortBy}&language=en-US&page=${page}&api_key=${TMDB_API_KEY}&with_origin_country=${country}${filters}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const movieData = await movieRes.json();
      if (Array.isArray(movieData.results)) {
        allContent.push(...movieData.results.map((item: any) => ({ ...item, media_type: 'movie' })));
      }

      // Fetch TV shows
      const tvRes = await fetch(
        `${TMDB_BASE_URL}/discover/tv?sort_by=${sortBy}&language=en-US&page=${page}&api_key=${TMDB_API_KEY}&with_origin_country=${country}${filters}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const tvData = await tvRes.json();
      if (Array.isArray(tvData.results)) {
        allContent.push(...tvData.results.map((item: any) => ({ ...item, media_type: 'tv' })));
      }
    }

    // Deduplicate by id and filter out items with no image
    const seen = new Set();
    return allContent.filter((m) => {
      if (seen.has(m.id) || !m.backdrop_path) return false;
      seen.add(m.id);
      return true;
    });
  };

  // 1. Top Rated Asian Content (Movies & TV) - 12 random, cache 1 hour
  let topRated: any[] = [];
  const cachedTopRated = await redis.get(ASIAN_TOPRATED_CACHE_KEY);
  if (cachedTopRated) {
    try {
      topRated = JSON.parse(cachedTopRated);
    } catch (e) {
      // ignore and fetch fresh
    }
  }
  if (!topRated || topRated.length === 0) {
    let allTopRated = await fetchAndMergeContent(
      "vote_average.desc",
      "&vote_count.gte=50" // You might lower this if needed
    );
    // Sort randomly only if you want varied results on each refresh
    topRated = allTopRated
      .sort(() => 0.5 - Math.random())
      .slice(0, 12)
      .map(mapContent);
    await redis.set(
      ASIAN_TOPRATED_CACHE_KEY,
      JSON.stringify(topRated),
      "EX",
      ASIAN_CACHE_TTL
    );
  }

  // 2. New Released Asian Content (Movies & TV) - 12 random, from last year to this year, cache 1 hour
  let newReleases: any[] = [];
  const cachedNewReleases = await redis.get(ASIAN_NEWRELEASE_CACHE_KEY);
  if (cachedNewReleases) {
    try {
      newReleases = JSON.parse(cachedNewReleases);
    } catch (e) {
      // ignore and fetch fresh
    }
    }
  if (!newReleases || newReleases.length === 0) {
    const thisYear = new Date().getFullYear();
    const lastYear = thisYear - 1;
    let allNewReleases = await fetchAndMergeContent(
      "primary_release_date.desc", // This sorts movies by release_date and TV by first_air_date
      `&primary_release_date.gte=${lastYear}-01-01&primary_release_date.lte=${thisYear}-12-31`
    );
    newReleases = allNewReleases
      .sort(() => 0.5 - Math.random())
      .slice(0, 12)
      .map(mapContent);
    await redis.set(
      ASIAN_NEWRELEASE_CACHE_KEY,
      JSON.stringify(newReleases),
      "EX",
      ASIAN_CACHE_TTL
    );
  }

  // 3. Popular Asian Content (Movies & TV) - infinite scroll, supports ?page= - always live
  const url = new URL(req.url);
  const pageParam = url.searchParams.get("page");
  const pageNum = pageParam ? parseInt(pageParam) : 1;
  let popular: any[] = [];

  // Fetch and merge for popular items. No random sort or slice here for proper pagination.
  let allPopular = await fetchAndMergeContent("popularity.desc", "", pageNum);
  popular = allPopular.map(mapContent); // Map all fetched results for the current page

  return NextResponse.json({
    topRated,
    newReleases,
    popular,
    page: pageNum,
    totalPages: 1000, // Still a high number, as merging results makes true total_pages hard to calculate accurately
  });
}