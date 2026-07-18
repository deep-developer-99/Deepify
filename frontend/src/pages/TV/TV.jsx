import { useEffect, useState } from "react";

import MovieRow from "../../components/home/MovieRow";
import MovieHero from "../../components/movie/MovieHero";
import MoviesSkeleton from "../../components/movie/MoviesSkeleton";
import TVHeader from "../../components/tv/TVHeader";

import {
  getPopularTVShows,
  getTopRatedTVShows,
  getTrendingTVShows,
  getOnTheAirTVShows,
} from "../../services/tvService";

function TV() {
  const [data, setData] = useState({
    trending: [],
    popular: [],
    topRated: [],
    onTheAir: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const [trending, popular, topRated, onTheAir] = await Promise.all([
          getTrendingTVShows(),
          getPopularTVShows(),
          getTopRatedTVShows(),
          getOnTheAirTVShows(),
        ]);

        setData({
          trending: trending.tvShows,
          popular: popular.tvShows,
          topRated: topRated.tvShows,
          onTheAir: onTheAir.tvShows,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  if (loading) {
    return <MoviesSkeleton />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {data.trending.length > 0 && <MovieHero movie={data.trending[0]} />}

      <TVHeader />

      <MovieRow
        title="Trending TV Shows"
        category="trending"
        type="tv"
        movies={data.trending}
      />

      <MovieRow
        title="Popular TV Shows"
        category="popular"
        type="tv"
        movies={data.popular}
      />

      <MovieRow
        title="Top Rated TV Shows"
        category="top-rated"
        type="tv"
        movies={data.topRated}
      />

      <MovieRow
        title="On The Air"
        category="on-the-air"
        type="tv"
        movies={data.onTheAir}
      />
    </div>
  );
}

export default TV;
