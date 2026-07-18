const movieService = require("../services/movieService");

// Get Trending Movies
const getTrendingMovies = async (req, res) => {
  try {
    const movies = await movieService.getTrendingMovies();

    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error("Trending Movies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch trending movies.",
    });
  }
};

// Get Popular Movies
const getPopularMovies = async (req, res) => {
  try {
    const movies = await movieService.getPopularMovies();

    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.log("Popular Movies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch popular movies.",
    });
  }
};

// Get Top Rated Movies
const getTopRatedMovies = async (req, res) => {
  try {
    const movies = await movieService.getTopRatedMovies();

    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error("Top Rated Movies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch top rated movies.",
    });
  }
};

// Get Upcoming Movies
const getUpcomingMovies = async (req, res) => {
  try {
    const movies = await movieService.getUpcomingMovies();

    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error("Upcoming Movies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch upcoming movies.",
    });
  }
};

// Get Now Playing Movies
const getNowPlayingMovies = async (req, res) => {
  try {
    const movies = await movieService.getNowPlayingMovies();

    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error("Now Playing Movies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch now playing movies.",
    });
  }
};

// Get Movie By ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await movieService.getMovieById(id);

    return res.status(200).json({
      success: true,
      movie,
    });
  } catch (error) {
    console.error("Movie Details Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch movie details.",
    });
  }
};

// Search Movies
const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    const movies = await movieService.searchMovies(query);

    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error("Search Movies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search movies.",
    });
  }
};

module.exports = {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieById,
  searchMovies,
};
