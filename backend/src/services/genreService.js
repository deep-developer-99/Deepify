const tmdbService = require("../services/tmdbService");

// Get Movie Genres
const getMovieGenres = () => tmdbService.fetchGenres("/genre/movie/list");

// Get TV Genres
const getTVGenres = () => tmdbService.fetchGenres("/genre/tv/list");

// Get Movies by Genre
const getMoviesByGenre = (genreId) => {
  return tmdbService.fetchList("/discover/movie", { with_genres: genreId });
};

// Get TV Shows by Genre
const getTVShowsByGenre = (genreId) => {
  return tmdbService.fetchList("/discover/tv", { with_genres: genreId });
};

module.exports = {
  getMovieGenres,
  getTVGenres,
  getMoviesByGenre,
  getTVShowsByGenre,
};
