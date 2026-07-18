export const getYear = (date) => {
  if (!date) return "";

  return date.split("-")[0];
};

export const getRating = (rating) => {
  return rating?.toFixed(1);
};

export const getGenres = (genreIds, genres) => {
  if (!genreIds || !genres) return [];

  return genreIds
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean);
};
