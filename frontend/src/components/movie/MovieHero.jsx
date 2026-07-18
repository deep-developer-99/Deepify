import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";

import TrailerModal from "../trailer/TrailerModal";

import { getMovieById } from "../../services/movieService";
import { getTVShowById } from "../../services/tvService";

import { backdropUrl, posterUrl } from "../../utils/imageUrl";
import { getRating, getYear } from "../../utils/movieHelpers";

function MovieHero({ movie, showMoreInfo = true }) {
  const navigate = useNavigate();

  const [openTrailer, setOpenTrailer] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [trailer, setTrailer] = useState(null);

  if (!movie) return null;

  const handlePlayTrailer = async () => {
    try {
      setLoadingTrailer(true);

      const response = movie.title
        ? await getMovieById(movie.id)
        : await getTVShowById(movie.id);

      const data = response.movie || response.tvShow;

      const trailerVideo = data.videos?.results?.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      );

      if (!trailerVideo) {
        toast.error("Trailer not available.");
        return;
      }

      setTrailer(trailerVideo);
      setOpenTrailer(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load trailer.");
    } finally {
      setLoadingTrailer(false);
    }
  };

  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        {/* Backdrop */}

        <img
          src={backdropUrl(movie.backdrop_path)}
          alt={movie.title || movie.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlays */}

        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

        {/* Content */}

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center gap-10 px-6 py-24 lg:px-10">
          {/* Poster */}

          <img
            src={posterUrl(movie.poster_path)}
            alt={movie.title || movie.name}
            className="hidden w-72 rounded-xl shadow-2xl lg:block"
          />

          {/* Details */}

          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold md:text-6xl lg:text-7xl">
              {movie.title || movie.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-300 md:text-base">
              <span>⭐ {getRating(movie.vote_average)}</span>

              <span>
                📅 {getYear(movie.release_date || movie.first_air_date)}
              </span>

              {movie.runtime && <span>{movie.runtime} min</span>}
            </div>

            {movie.genres?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-red-600 px-3 py-1 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-8 max-w-3xl text-base leading-7 text-gray-300 md:text-lg">
              {movie.overview}
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={handlePlayTrailer}
                disabled={loadingTrailer}
                className="flex items-center gap-2 rounded bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FaPlay />

                {loadingTrailer ? "Loading..." : "Play Trailer"}
              </button>

              {showMoreInfo && (
                <button
                  onClick={() =>
                    navigate(
                      movie.title
                        ? `/movie/${movie.id}`
                        : `/tv/details/${movie.id}`,
                    )
                  }
                  className="flex items-center gap-2 rounded bg-gray-700/70 px-8 py-3 font-semibold text-white transition hover:bg-gray-600"
                >
                  <FaInfoCircle />
                  More Info
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <TrailerModal
        isOpen={openTrailer}
        onClose={() => setOpenTrailer(false)}
        trailerKey={trailer?.key}
        title={trailer?.name}
      />
    </>
  );
}

export default MovieHero;
