import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPlus, FaCheck, FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";

import TrailerModal from "../trailer/TrailerModal";

import { addToMyList, removeFromMyList } from "../../services/userService";

import { getMovieById } from "../../services/movieService";
import { getTVShowById } from "../../services/tvService";

import { posterUrl } from "../../utils/imageUrl";
import { getGenres, getRating, getYear } from "../../utils/movieHelpers";

function MovieCard({ movie, genres = [], isInMyList = false, onRemove }) {
  const navigate = useNavigate();

  const [openTrailer, setOpenTrailer] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const title = movie.title || movie.name;

  const releaseDate = movie.release_date || movie.first_air_date;

  const rating = getRating(movie.vote_average);

  const year = getYear(releaseDate);

  const movieGenres = movie.genre_ids ? getGenres(movie.genre_ids, genres) : [];

  const isMovie = movie.mediaType === "movie" || !!movie.title;

  // ================= Add To My List =================

  const handleAddToMyList = async (e) => {
    e.stopPropagation();

    try {
      await addToMyList(movie.id, isMovie ? "movie" : "tv");

      toast.success("Added to My List");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  // ================= Remove From My List =================

  const handleRemoveFromMyList = async (e) => {
    e.stopPropagation();

    try {
      await removeFromMyList(movie.id);

      toast.success("Removed from My List");

      onRemove?.(movie.id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  // ================= Play Trailer =================

  const handlePlayTrailer = async (e) => {
    e.stopPropagation();

    try {
      setLoadingTrailer(true);

      let trailerVideo = null;

      if (isMovie) {
        const response = await getMovieById(movie.id);

        trailerVideo = response.movie.videos?.results?.find(
          (video) => video.site === "YouTube" && video.type === "Trailer",
        );
      } else {
        const response = await getTVShowById(movie.id);

        trailerVideo = response.tvShow.videos?.results?.find(
          (video) => video.site === "YouTube" && video.type === "Trailer",
        );
      }

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
      <div
        onClick={() =>
          navigate(isMovie ? `/movie/${movie.id}` : `/tv/details/${movie.id}`)
        }
        className="
          group
          relative
          min-w-42.5
          sm:min-w-47.5
          lg:min-w-55
          cursor-pointer
          overflow-hidden
          rounded-lg
          transition-all
          duration-300
          hover:z-30
          hover:scale-110
        "
      >
        {/* Poster */}

        <img
          src={posterUrl(movie.poster_path)}
          alt={title}
          className="h-65 w-full rounded-lg object-cover shadow-lg lg:h-82.5"
        />

        {/* Overlay */}

        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            justify-end
            bg-linear-to-t
            from-black
            via-black/70
            to-transparent
            p-4
            opacity-0
            transition-all
            duration-300
            group-hover:opacity-100
          "
        >
          <h3 className="line-clamp-1 text-lg font-bold">{title}</h3>

          <div className="mt-2 flex items-center gap-3 text-sm text-gray-300">
            <span>⭐ {rating}</span>

            <span>📅 {year}</span>
          </div>

          {movieGenres.length > 0 && (
            <p className="mt-2 line-clamp-1 text-xs text-gray-300">
              {movieGenres.join(" • ")}
            </p>
          )}

          <div className="mt-4 flex items-center gap-3">
            {/* Play */}

            <button
              onClick={handlePlayTrailer}
              className="rounded-full bg-white p-3 text-black transition hover:scale-110"
            >
              {loadingTrailer ? "..." : <FaPlay />}
            </button>

            {/* My List */}

            {isInMyList ? (
              <button
                onClick={handleRemoveFromMyList}
                className="rounded-full bg-green-600 p-3 transition hover:bg-red-600"
              >
                <FaCheck />
              </button>
            ) : (
              <button
                onClick={handleAddToMyList}
                className="rounded-full border border-white p-3 transition hover:bg-white hover:text-black"
              >
                <FaPlus />
              </button>
            )}

            {/* More Info */}

            <button
              onClick={(e) => {
                e.stopPropagation();

                navigate(
                  isMovie ? `/movie/${movie.id}` : `/tv/details/${movie.id}`,
                );
              }}
              className="rounded-full border border-white p-3 transition hover:bg-white hover:text-black"
            >
              <FaInfoCircle />
            </button>
          </div>
        </div>
      </div>

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

export default MovieCard;
