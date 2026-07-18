function LoadingSkeleton() {
  return (
    <div className="animate-pulse bg-black">
      <div className="h-[90vh] bg-zinc-900" />

      <div className="mx-auto max-w-7xl space-y-8 px-8 py-10">
        <div className="h-10 w-80 rounded bg-zinc-800" />

        <div className="h-6 w-full rounded bg-zinc-800" />

        <div className="h-6 w-5/6 rounded bg-zinc-800" />

        <div className="flex gap-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-64 w-44 rounded bg-zinc-800" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
