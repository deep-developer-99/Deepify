const genreService = require("../services/genreService");

// Get Movie Genres
const getMovieGenres = async (req, res) => {
  try {
    const genres = await genreService.getMovieGenres();

    return res.status(200).json({
      success: true,
      data: genres,
    });
  } catch (error) {
    console.error("Movie Genres error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch movie genres",
    });
  }
};

// Get TV Genres
const getTVGenres = async (req, res) => {
  try {
    const genres = await genreService.getTVGenres();

    return res.status(200).json({
      success: true,
      data: genres,
    });
  } catch (error) {
    console.error("TV Genres error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch TV genres",
    });
  }
};

// Get Movies by Genre
const getMoviesByGenre = async (req, res) => {
  try {
    const { genreId } = req.params;

    const movies = await genreService.getMoviesByGenre(genreId);

    return res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    console.error("Movies by Genre error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch movies by genre",
    });
  }
};

// Get TV Shows by Genre
const getTVShowsByGenre = async (req, res) => {
  try {
    const { genreId } = req.params;

    const tvShows = await genreService.getTVShowsByGenre(genreId);

    return res.status(200).json({
      success: true,
      data: tvShows,
    });
  } catch (error) {
    console.error("TV Shows by Genre error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch TV shows by genre",
    });
  }
};

module.exports = {
  getMovieGenres,
  getTVGenres,
  getMoviesByGenre,
  getTVShowsByGenre,
};
