function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-[85vh] w-full bg-zinc-900" />

      <div className="space-y-10 px-8 py-10">
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row}>
            <div className="mb-5 h-7 w-48 rounded bg-zinc-800" />

            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((card) => (
                <div key={card} className="h-65 w-45 rounded bg-zinc-800" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingSkeleton;
