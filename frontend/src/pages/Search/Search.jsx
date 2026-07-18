import { useEffect, useMemo, useState } from "react";
import { searchMovies } from "../../services/movieService";
import MovieCard from "../../components/home/MovieCard";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    return savedSearches ? JSON.parse(savedSearches) : [];
  });
  const [loading, setLoading] = useState(false);

  const trendingSearches = [
    "Avengers",
    "Batman",
    "Spider-Man",
    "John Wick",
    "Interstellar",
    "Oppenheimer",
    "Joker",
    "Dune",
  ];

  const displayMovies = useMemo(() => {
    return query.trim().length < 2 ? [] : movies;
  }, [query, movies]);

  useEffect(() => {
    if (query.trim().length < 2) {
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await searchMovies(query);

        setMovies(response.movies || []);

        setRecentSearches((prev) => {
          const updated = [
            query,
            ...prev.filter((item) => item !== query),
          ].slice(0, 10);

          localStorage.setItem("recentSearches", JSON.stringify(updated));

          return updated;
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="min-h-screen bg-black px-8 py-28 text-white">
      <h1 className="mb-8 text-4xl font-bold">Search Movies</h1>

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="mb-10 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-4 outline-none focus:border-red-600"
      />

      {!loading && query.trim() === "" && (
        <div className="mt-16">
          <h2 className="mb-4 text-3xl font-bold">Search Movies & TV Shows</h2>

          <p className="mb-8 text-gray-400">
            Start typing or choose a trending search.
          </p>

          <h3 className="mb-4 text-xl font-semibold text-red-500">
            🔥 Trending Searches
          </h3>

          <div className="flex flex-wrap gap-4">
            {trendingSearches.map((item) => (
              <button
                key={item}
                onClick={() => setQuery(item)}
                className="rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3 transition hover:border-red-600 hover:bg-red-600"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {recentSearches.length > 0 && (
        <>
          <div className="mt-10 mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold">🕒 Recent Searches</h3>

            <button
              onClick={() => {
                localStorage.removeItem("recentSearches");
                setRecentSearches([]);
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            {recentSearches.map((item) => (
              <button
                key={item}
                onClick={() => setQuery(item)}
                className="rounded-full bg-zinc-800 px-5 py-3 transition hover:bg-red-600"
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )}

      {loading && (
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
        </div>
      )}

      {!loading && query.trim() !== "" && displayMovies.length === 0 && (
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold">No Results Found</h2>

          <p className="mt-4 text-gray-400">
            Try searching with another keyword.
          </p>
        </div>
      )}

      {displayMovies.length > 0 && (
        <p className="mb-8 text-gray-400">
          Found {displayMovies.length} movies
        </p>
      )}

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {displayMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={[]} />
        ))}
      </div>
    </div>
  );
}

export default Search;
