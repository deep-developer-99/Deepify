const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getMovieGenres,
  getTVGenres,
  getMoviesByGenre,
  getTVShowsByGenre,
} = require("../controllers/genreController");

// Genres
router.get("/movies", protect, getMovieGenres);
router.get("/tv", protect, getTVGenres);

// Discover
router.get("/movies/:genreId", protect, getMoviesByGenre);
router.get("/tv/:genreId", protect, getTVShowsByGenre);

const genreRoutes = router;
module.exports = genreRoutes;
