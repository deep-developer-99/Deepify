const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getMovieRecommendations,
  getTVRecommendations,
  getSimilarMovies,
  getSimilarTVShows,
} = require("../controllers/recommendationController");

// Movie
router.get("/movie/:movieId", protect, getMovieRecommendations);
router.get("/movie/:movieId/similar", protect, getSimilarMovies);

// TV
router.get("/tv/:tvId", protect, getTVRecommendations);
router.get("/tv/:tvId/similar", protect, getSimilarTVShows);

const recommendationRoutes = router;
module.exports = recommendationRoutes;
