const tvService = require("../services/tvService");

// Get trending TV shows
const getTrendingTVShows = async (req, res) => {
  try {
    const tvShows = await tvService.getTrendingTVShows();

    return res.status(200).json({
      success: true,
      tvShows,
    });
  } catch (error) {
    console.error("Trending TV Shows Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch trending TV shows.",
    });
  }
};

// Get popular TV shows
const getPopularTVShows = async (req, res) => {
  try {
    const tvShows = await tvService.getPopularTVShows();

    return res.status(200).json({
      success: true,
      tvShows,
    });
  } catch (error) {
    console.error("Popular TV Shows Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch popular TV shows.",
    });
  }
};

// Get top-rated TV shows
const getTopRatedTVShows = async (req, res) => {
  try {
    const tvShows = await tvService.getTopRatedTVShows();

    return res.status(200).json({
      success: true,
      tvShows,
    });
  } catch (error) {
    console.error("Top Rated TV Shows Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch top-rated TV shows.",
    });
  }
};

// Get on-the-air TV shows
const getOnTheAirTVShows = async (req, res) => {
  try {
    const tvShows = await tvService.getOnTheAirTVShows();

    return res.status(200).json({
      success: true,
      tvShows,
    });
  } catch (error) {
    console.error("On The Air TV Shows Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch on-the-air TV shows.",
    });
  }
};

// Get TV show by ID
const getTVShowById = async (req, res) => {
  try {
    const { tvId } = req.params;
    const tvShow = await tvService.getTVShowById(tvId);

    return res.status(200).json({
      success: true,
      tvShow,
    });
  } catch (error) {
    console.error("Get TV Show By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch TV show details.",
    });
  }
};

// Search TV shows
const searchTVShows = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query parameter is required.",
      });
    }

    const tvShows = await tvService.searchTVShows(query);

    return res.status(200).json({
      success: true,
      tvShows,
    });
  } catch (error) {
    console.error("Search TV Shows Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search TV shows.",
    });
  }
};

module.exports = {
  getTrendingTVShows,
  getPopularTVShows,
  getTopRatedTVShows,
  getOnTheAirTVShows,
  getTVShowById,
  searchTVShows,
};
