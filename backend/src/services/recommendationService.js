const tmdbService = require("./tmdbService");

// Movie Recommendations
const getMovieRecommendations = (movieId) =>
  tmdbService.fetchList(`/movie/${movieId}/recommendations`);

// TV Recommendations
const getTVRecommendations = (tvId) =>
  tmdbService.fetchList(`/tv/${tvId}/recommendations`);

// Similar Movies
const getSimilarMovies = (movieId) =>
  tmdbService.fetchList(`/movie/${movieId}/similar`);

// Similar TV Shows
const getSimilarTVShows = (tvId) =>
  tmdbService.fetchList(`/tv/${tvId}/similar`);

module.exports = {
  getMovieRecommendations,
  getTVRecommendations,
  getSimilarMovies,
  getSimilarTVShows,
};
