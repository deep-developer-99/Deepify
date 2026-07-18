import { useEffect, useState } from "react";

import MovieCard from "../../components/home/MovieCard";
import MoviesSkeleton from "../../components/movie/MoviesSkeleton";

import { getMyList } from "../../services/userService";

import { getTVShowById } from "../../services/tvService";
import { getMovieById } from "../../services/movieService";

function MyList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const removeMovie = (id) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  useEffect(() => {
    const fetchMyList = async () => {
      try {
        const response = await getMyList();

        if (response.myList.length === 0) {
          setMovies([]);
          return;
        }

        const mediaDetails = await Promise.all(
          response.myList.map(async (item) => {
            if (item.mediaType === "movie") {
              const response = await getMovieById(item.tmdbId);
              return response.movie;
            }

            const response = await getTVShowById(item.tmdbId);
            return response.tvShow;
          }),
        );

        setMovies(mediaDetails);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyList();
  }, []);

  if (loading) {
    return <MoviesSkeleton />;
  }

  return (
    <div className="min-h-screen bg-black px-8 py-28 text-white lg:px-16">
      <h1 className="mb-10 text-5xl font-bold">My List</h1>

      {movies.length === 0 ? (
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold">Your My List is Empty</h2>

          <p className="mt-4 text-gray-400">
            Add movies or TV shows to watch later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              genres={[]}
              isInMyList
              onRemove={removeMovie}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyList;
