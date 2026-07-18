function DetailInfo({ movie }) {
  const formatCurrency = (amount) => `$${amount.toLocaleString()}`;

  const details = [
    {
      label: "Original Language",
      value: movie.original_language?.toUpperCase(),
    },
    {
      label: "Status",
      value: movie.status,
    },
    {
      label: "Budget",
      value: typeof movie.budget === "number" ? formatCurrency(movie.budget) : null,
    },
    {
      label: "Revenue",
      value:
        typeof movie.revenue === "number" ? formatCurrency(movie.revenue) : null,
    },
    {
      label: "Type",
      value: movie.type,
    },
    {
      label: "Seasons",
      value: movie.number_of_seasons,
    },
    {
      label: "Episodes",
      value: movie.number_of_episodes,
    },
    {
      label: "Network",
      value: movie.networks?.map((network) => network.name).join(", "),
    },
  ].filter((detail) => detail.value !== null && detail.value !== undefined && detail.value !== "");

  return (
    <section className="mx-auto max-w-7xl px-8 py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-3xl font-bold">Overview</h2>

          <p className="leading-8 text-gray-300">{movie.overview}</p>
        </div>

        {/* Right */}
        <div className="space-y-5">
          {details.map((detail) => (
            <div key={detail.label}>
              <h3 className="font-semibold text-white">{detail.label}</h3>

              <p className="text-gray-400">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DetailInfo;
