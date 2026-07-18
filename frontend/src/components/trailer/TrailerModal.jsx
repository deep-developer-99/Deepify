import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function TrailerModal({ isOpen, onClose, trailerKey, title }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !trailerKey) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[95%] max-w-5xl overflow-hidden rounded-xl bg-black shadow-2xl"
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full bg-black/70 p-3 transition hover:bg-red-600"
        >
          <FaTimes />
        </button>

        {/* Trailer */}

        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default TrailerModal;
