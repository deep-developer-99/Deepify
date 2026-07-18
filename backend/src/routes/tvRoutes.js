const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getTrendingTVShows,
  getPopularTVShows,
  getTopRatedTVShows,
  getOnTheAirTVShows,
  getTVShowById,
  searchTVShows,
} = require("../controllers/tvController");

router.get("/trending", protect, getTrendingTVShows);
router.get("/popular", protect, getPopularTVShows);
router.get("/top-rated", protect, getTopRatedTVShows);
router.get("/on-the-air", protect, getOnTheAirTVShows);
router.get("/search", protect, searchTVShows);
router.get("/:tvId", protect, getTVShowById);

const tvRoutes = router;
module.exports = tvRoutes;
