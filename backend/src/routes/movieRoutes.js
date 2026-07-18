const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  searchMovies,
  getMovieById,
} = require("../controllers/movieController");
const router = express.Router();

router.get("/trending", protect, getTrendingMovies);
router.get("/popular", protect, getPopularMovies);
router.get("/top-rated", protect, getTopRatedMovies);
router.get("/upcoming", protect, getUpcomingMovies);
router.get("/now-playing", protect, getNowPlayingMovies);
router.get("/search", protect, searchMovies);
router.get("/:id", protect, getMovieById);

const movieRoutes = router;
module.exports = movieRoutes;
