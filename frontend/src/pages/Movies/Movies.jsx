import { useEffect, useState } from "react";

import MovieRow from "../../components/home/MovieRow";

import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "../../services/movieService";
import MoviesHeader from "../../components/movie/MoviesHeader";
import MoviesSkeleton from "../../components/movie/MoviesSkeleton";
import MovieHero from "../../components/movie/MovieHero";

function Movies() {
  const [data, setData] = useState({
    popular: [],
    topRated: [],
    upcoming: [],
    nowPlaying: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
          getNowPlayingMovies(),
        ]);

        setData({
          popular: popular.movies,
          topRated: topRated.movies,
          upcoming: upcoming.movies,
          nowPlaying: nowPlaying.movies,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <MoviesSkeleton />;
  }

  return (
    <div className="min-h-screen bg-black pb-20 text-white">
      {data.popular.length > 0 && <MovieHero movie={data.popular[0]} />}

      <MoviesHeader />

      <MovieRow
        title="Popular Movies"
        category="popular"
        type="movies"
        movies={data.popular}
      />

      <MovieRow
        title="Top Rated"
        category="top-rated"
        type="movies"
        movies={data.topRated}
      />

      <MovieRow
        title="Upcoming"
        category="upcoming"
        type="movies"
        movies={data.upcoming}
      />

      <MovieRow
        title="Now Playing"
        category="now-playing"
        type="movies"
        movies={data.nowPlaying}
      />
    </div>
  );
}

export default Movies;
