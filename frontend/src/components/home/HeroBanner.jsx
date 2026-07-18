import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";

import TrailerModal from "../trailer/TrailerModal";

import { getMovieById } from "../../services/movieService";

import { backdropUrl } from "../../utils/imageUrl";
import { getGenres, getRating, getYear } from "../../utils/movieHelpers";

function HeroBanner({ movie, genres }) {
  const navigate = useNavigate();

  const [openTrailer, setOpenTrailer] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [trailer, setTrailer] = useState(null);

  if (!movie) return null;

  const movieGenres = getGenres(movie.genre_ids, genres);
  const rating = getRating(movie.vote_average);
  const year = getYear(movie.release_date);

  // ================= Play Trailer =================

  const handlePlayTrailer = async () => {
    try {
      setLoadingTrailer(true);

      const response = await getMovieById(movie.id);

      const trailerVideo = response.movie.videos?.results?.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      );

      if (!trailerVideo) {
        toast.error("Trailer not available.");
        return;
      }

      setTrailer(trailerVideo);
      setOpenTrailer(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load trailer.");
    } finally {
      setLoadingTrailer(false);
    }
  };

  return (
    <>
      <section className="relative h-[90vh] w-full overflow-hidden">
        {/* Background */}

        <img
          src={backdropUrl(movie.backdrop_path)}
          alt={movie.title || movie.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Left Gradient */}

        <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />

        {/* Bottom Gradient */}

        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

        {/* Content */}

        <div className="relative z-10 flex h-full max-w-3xl flex-col justify-center px-8 lg:px-16">
          {/* Title */}

          <h1 className="text-4xl font-extrabold md:text-6xl lg:text-7xl">
            {movie.title || movie.name}
          </h1>

          {/* Rating */}

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-300 md:text-base">
            <span>⭐ {rating}</span>

            <span>📅 {year}</span>

            {movieGenres.length > 0 && <span>{movieGenres.join(" • ")}</span>}
          </div>

          {/* Overview */}

          <p className="mt-6 line-clamp-4 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
            {movie.overview}
          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handlePlayTrailer}
              className="flex items-center gap-2 rounded bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-300"
            >
              {loadingTrailer ? (
                "Loading..."
              ) : (
                <>
                  <FaPlay />
                  Play
                </>
              )}
            </button>

            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="flex items-center gap-2 rounded bg-gray-700/70 px-8 py-3 font-semibold text-white transition hover:bg-gray-600"
            >
              <FaInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </section>

      {/* Trailer Modal */}

      <TrailerModal
        isOpen={openTrailer}
        onClose={() => setOpenTrailer(false)}
        trailerKey={trailer?.key}
        title={trailer?.name}
      />
    </>
  );
}

export default HeroBanner;
