const tmdbService = require("./tmdbService");

const getTrendingMovies = () => tmdbService.fetchList("/trending/movie/week");

const getPopularMovies = () => tmdbService.fetchList("/movie/popular");

const getTopRatedMovies = () => tmdbService.fetchList("/movie/top_rated");

const getUpcomingMovies = () => tmdbService.fetchList("/movie/upcoming");

const getNowPlayingMovies = () => tmdbService.fetchList("/movie/now_playing");

const searchMovies = (query) =>
  tmdbService.fetchList("/search/movie", {
    query,
  });

const getMovieById = (movieId) =>
  tmdbService.fetchOne(`/movie/${movieId}`, {
    append_to_response: "videos,credits,images,recommendations,similar",
  });

module.exports = {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieById,
  searchMovies,
};
