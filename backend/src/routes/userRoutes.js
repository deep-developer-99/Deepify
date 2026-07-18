const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  updateProfileValidation,
  changePasswordValidation,
  addToMyListValidation,
  addWatchHistoryValidation,
  continueWatchingValidation,
  movieIdParamValidation,
} = require("../validators/userValidator");

const validate = require("../validators/validate");

const {
  getProfile,
  updateProfile,
  changePassword,
  getMyList,
  addToMyList,
  removeFromMyList,
  getWatchHistory,
  addWatchHistory,
  getContinueWatching,
  saveContinueWatching,
} = require("../controllers/userController");

router
  .route("/profile")
  .get(protect, getProfile)
  .put(protect, updateProfileValidation, validate, updateProfile);
router.put(
  "/change-password",
  protect,
  changePasswordValidation,
  validate,
  changePassword,
);
router
  .route("/my-list")
  .get(protect, getMyList)
  .post(protect, addToMyListValidation, validate, addToMyList);
router.delete(
  "/my-list/:tmdbId",
  protect,
  movieIdParamValidation,
  validate,
  removeFromMyList,
);
router
  .route("/watch-history")
  .get(protect, getWatchHistory)
  .post(protect, addWatchHistoryValidation, validate, addWatchHistory);
router
  .route("/continue-watching")
  .get(protect, getContinueWatching)
  .post(protect, continueWatchingValidation, validate, saveContinueWatching);

const userRoutes = router;
module.exports = userRoutes;
