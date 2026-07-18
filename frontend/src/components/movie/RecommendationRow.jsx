import MovieCard from "../home/MovieCard";

function RecommendationRow({ movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-8 py-10">
      <h2 className="mb-6 text-3xl font-bold">More Like This</h2>

      <div className="hide-scrollbar flex gap-5 overflow-x-auto">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={[]} />
        ))}
      </div>
    </section>
  );
}

export default RecommendationRow;
