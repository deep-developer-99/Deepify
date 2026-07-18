const recommendationService = require("../services/recommendationService");

// Movie Recommendations
const getMovieRecommendations = async (req, res) => {
  try {
    const { movieId } = req.params;

    const recommendations =
      await recommendationService.getMovieRecommendations(movieId);

    return res.status(200).json({
      success: true,
      items: recommendations,
    });
  } catch (error) {
    console.error("Movie Recommendations Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch movie recommendations",
    });
  }
};

// TV Recommendations
const getTVRecommendations = async (req, res) => {
  try {
    const { tvId } = req.params;

    const recommendations =
      await recommendationService.getTVRecommendations(tvId);

    return res.status(200).json({
      success: true,
      items: recommendations,
    });
  } catch (error) {
    console.error("TV Recommendations Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch TV recommendations.",
    });
  }
};

// Similar Movies
const getSimilarMovies = async (req, res) => {
  try {
    const { movieId } = req.params;

    const similarMovies = await recommendationService.getSimilarMovies(movieId);

    return res.status(200).json({
      success: true,
      items: similarMovies,
    });
  } catch (error) {
    console.error("Similar Movies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch similar movies.",
    });
  }
};

// Similar TV Shows
const getSimilarTVShows = async (req, res) => {
  try {
    const { tvId } = req.params;

    const similarTVShows = await recommendationService.getSimilarTVShows(tvId);

    return res.status(200).json({
      success: true,
      items: similarTVShows,
    });
  } catch (error) {
    console.error("Similar TV Shows Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch similar TV shows.",
    });
  }
};

module.exports = {
  getMovieRecommendations,
  getTVRecommendations,
  getSimilarMovies,
  getSimilarTVShows,
};
