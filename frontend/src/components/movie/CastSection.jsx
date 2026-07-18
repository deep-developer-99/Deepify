import { profileUrl } from "../../utils/imageUrl";

function CastSection({ cast }) {
  if (!cast || cast.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-8 py-10">
      <h2 className="mb-6 text-3xl font-bold">Top Cast</h2>

      <div className="hide-scrollbar flex gap-6 overflow-x-auto">
        {cast.slice(0, 20).map((actor) => (
          <div key={actor.id} className="min-w-35 text-center">
            <img
              src={profileUrl(actor.profile_path)}
              alt={actor.name}
              className="mx-auto h-32 w-32 rounded-full object-cover"
            />

            <h3 className="mt-3 font-semibold">{actor.name}</h3>

            <p className="text-sm text-gray-400">{actor.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CastSection;
