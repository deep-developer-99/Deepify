const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const posterUrl = (path) => {
  return path
    ? `${IMAGE_BASE_URL}/w500${path}`
    : "https://placehold.co/500x750?text=No+Image";
};

export const backdropUrl = (path) => {
  return path
    ? `${IMAGE_BASE_URL}/original${path}`
    : "https://placehold.co/1280x720?text=No+Image";
};

export const profileUrl = (path) =>
  path
    ? `https://image.tmdb.org/t/p/w185${path}`
    : "https://placehold.co/185x278?text=No+Image";
