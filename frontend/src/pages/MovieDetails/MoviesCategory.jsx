import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieCard from "../../components/home/MovieCard";
import MoviesSkeleton from "../../components/movie/MoviesSkeleton";

import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "../../services/movieService";

function MoviesCategory() {
  const { category } = useParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        let response;

        switch (category) {
          case "popular":
            response = await getPopularMovies();
            break;

          case "top-rated":
            response = await getTopRatedMovies();
            break;

          case "upcoming":
            response = await getUpcomingMovies();
            break;

          case "now-playing":
            response = await getNowPlayingMovies();
            break;

          default:
            response = { movies: [] };
        }

        setMovies(response.movies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const pageTitle = {
    popular: "Popular Movies",
    "top-rated": "Top Rated Movies",
    upcoming: "Upcoming Movies",
    "now-playing": "Now Playing Movies",
  };

  if (loading) {
    return <MoviesSkeleton />;
  }

  return (
    <div className="min-h-screen bg-black px-8 pb-20 pt-28 text-white lg:px-16">
      <h1 className="mb-10 text-5xl font-bold">{pageTitle[category]}</h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={[]} />
        ))}
      </div>
    </div>
  );
}

export default MoviesCategory;
