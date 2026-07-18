import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CastSection from "../../components/movie/CastSection";
import DetailInfo from "../../components/movie/DetailInfo";
import LoadingSkeleton from "../../components/movie/MovieLoadingSkeleton";
import MovieHero from "../../components/movie/MovieHero";
import RecommendationRow from "../../components/movie/RecommendationRow";
import TrailerSection from "../../components/movie/TrailerSection";
import { getTVShowById } from "../../services/tvService";

const TVDetails = () => {
  const { id } = useParams();

  const [tvShow, setTVShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        const response = await getTVShowById(id);

        setTVShow(response.tvShow);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShow();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!tvShow) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        TV Show Not Found
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <MovieHero movie={tvShow} showMoreInfo={false} />
      <DetailInfo movie={tvShow} />
      <CastSection cast={tvShow.credits?.cast} />
      <TrailerSection videos={tvShow.videos?.results} />
      <RecommendationRow movies={tvShow.recommendations?.results} />
    </div>
  );
};

export default TVDetails;
