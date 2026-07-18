function MoviesSkeleton() {
  return (
    <div className="animate-pulse bg-black px-8 pt-24">
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} className="mb-12">
          <div className="mb-6 h-8 w-52 rounded bg-zinc-800" />

          <div className="flex gap-5">
            {Array.from({ length: 5 }).map((_, card) => (
              <div key={card} className="h-72 w-52 rounded-lg bg-zinc-800" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MoviesSkeleton;
