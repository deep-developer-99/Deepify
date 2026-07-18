import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieById } from "../../services/movieService";
import CastSection from "../../components/movie/CastSection";
import MovieHero from "../../components/movie/MovieHero";
import TrailerSection from "../../components/movie/TrailerSection";
import RecommendationRow from "../../components/movie/RecommendationRow";
import DetailInfo from "../../components/movie/DetailInfo";
import LoadingSkeleton from "../../components/movie/MovieLoadingSkeleton";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);

        setMovie(response.movie);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Movie Not Found
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <MovieHero movie={movie} showMoreInfo={false} />
      <DetailInfo movie={movie} />
      <CastSection cast={movie.credits.cast} />
      <TrailerSection videos={movie.videos.results} />
      <RecommendationRow movies={movie.recommendations.results} />
    </div>
  );
}

export default MovieDetails;
