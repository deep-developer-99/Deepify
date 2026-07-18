import { useState } from "react";
import { FaPlay } from "react-icons/fa";

import TrailerModal from "../trailer/TrailerModal";

function TrailerSection({ videos }) {
  const [open, setOpen] = useState(false);

  if (!videos || videos.length === 0) return null;

  const trailer = videos.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  if (!trailer) return null;

  return (
    <section className="mx-auto max-w-7xl px-8 py-12">
      <h2 className="mb-6 text-3xl font-bold">Official Trailer</h2>

      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 rounded-lg bg-red-600 px-8 py-4 text-lg font-semibold transition hover:bg-red-700"
      >
        <FaPlay />
        Play Trailer
      </button>

      <TrailerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        trailerKey={trailer.key}
        title={trailer.name}
      />
    </section>
  );
}

export default TrailerSection;
