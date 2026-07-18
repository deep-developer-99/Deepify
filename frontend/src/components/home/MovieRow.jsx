import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function MovieRow({ title, movies, genres, category, type = "movies" }) {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const navigate = useNavigate();

  const scrollLeft = () => {
    rowRef.current.scrollBy({
      left: -800,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({
      left: 800,
      behavior: "smooth",
    });
  };

  const checkScroll = () => {
    const element = rowRef.current;

    if (!element) return;

    setShowLeftArrow(element.scrollLeft > 0);

    setShowRightArrow(
      element.scrollLeft < element.scrollWidth - element.clientWidth - 5,
    );
  };

  useEffect(() => {
    checkScroll();

    const element = rowRef.current;

    element.addEventListener("scroll", checkScroll);

    return () => {
      element.removeEventListener("scroll", checkScroll);
    };
  }, []);
  return (
    <section className="relative mb-16 px-8 lg:px-16">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>

        <button
          onClick={() => navigate(`/${type}/${category}`)}
          className="text-sm text-red-500 hover:underline"
        >
          View All
        </button>
      </div>

      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition hover:bg-black"
        >
          <FaChevronLeft />
        </button>
      )}

      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition hover:bg-black"
        >
          <FaChevronRight />
        </button>
      )}

      <div
        ref={rowRef}
        className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-4"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
