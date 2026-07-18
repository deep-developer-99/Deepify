const tmdbService = require("./tmdbService");

const getTrendingTVShows = () => tmdbService.fetchList("/trending/tv/week");

const getPopularTVShows = () => tmdbService.fetchList("/tv/popular");

const getTopRatedTVShows = () => tmdbService.fetchList("/tv/top_rated");

const getOnTheAirTVShows = () => tmdbService.fetchList("/tv/on_the_air");

const searchTVShows = (query) =>
  tmdbService.fetchList("/search/tv", {
    query,
  });

const getTVShowById = (tvId) =>
  tmdbService.fetchOne(`/tv/${tvId}`, {
    append_to_response: "videos,credits,images,recommendations,similar",
  });

module.exports = {
  getTrendingTVShows,
  getPopularTVShows,
  getTopRatedTVShows,
  getOnTheAirTVShows,
  getTVShowById,
  searchTVShows,
};
