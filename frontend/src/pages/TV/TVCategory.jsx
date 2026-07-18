import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieCard from "../../components/home/MovieCard";
import MoviesSkeleton from "../../components/movie/MoviesSkeleton";

import {
  getTrendingTVShows,
  getPopularTVShows,
  getTopRatedTVShows,
  getOnTheAirTVShows,
} from "../../services/tvService";

function TVCategory() {
  const { category } = useParams();

  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        let response;

        switch (category) {
          case "trending":
            response = await getTrendingTVShows();
            break;

          case "popular":
            response = await getPopularTVShows();
            break;

          case "top-rated":
            response = await getTopRatedTVShows();
            break;

          case "on-the-air":
            response = await getOnTheAirTVShows();
            break;

          default:
            response = { tvShows: [] };
        }

        setTVShows(response.tvShows);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [category]);

  const pageTitle = {
    trending: "Trending TV Shows",
    popular: "Popular TV Shows",
    "top-rated": "Top Rated TV Shows",
    "on-the-air": "On The Air",
  };

  if (loading) {
    return <MoviesSkeleton />;
  }

  return (
    <div className="min-h-screen bg-black px-8 pb-20 pt-28 text-white lg:px-16">
      <h1 className="mb-10 text-5xl font-bold">{pageTitle[category]}</h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {tvShows.map((show) => (
          <MovieCard key={show.id} movie={show} genres={[]} />
        ))}
      </div>
    </div>
  );
}

export default TVCategory;
