const { body, param } = require("express-validator");

// Update Profile
const updateProfileValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters."),

  body("avatar")
    .optional()
    .trim()
    .isURL()
    .withMessage("Avatar must be a valid URL."),
];

// Change Password
const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required."),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required.")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long.")
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error(
          "New password must be different from current password.",
        );
      }
      return true;
    }),
];

// Add to My List
const addToMyListValidation = [
  body("tmdbId")
    .notEmpty()
    .withMessage("TMDB ID is required.")
    .isInt({ min: 1 })
    .withMessage("Invalid TMDB ID."),

  body("mediaType")
    .notEmpty()
    .withMessage("Media type is required.")
    .isIn(["movie", "tv"])
    .withMessage("Media type must be either movie or tv."),
];

// Add to Watch History
const addWatchHistoryValidation = [
  body("tmdbId")
    .notEmpty()
    .withMessage("TMDB ID is required.")
    .isInt({ min: 1 })
    .withMessage("Invalid TMDB ID."),

  body("mediaType")
    .notEmpty()
    .withMessage("Media type is required.")
    .isIn(["movie", "tv"])
    .withMessage("Media type must be either movie or tv."),
];

// Continue Watching
const continueWatchingValidation = [
  body("tmdbId")
    .notEmpty()
    .withMessage("TMDB ID is required.")
    .isInt({ min: 1 })
    .withMessage("Invalid TMDB ID."),

  body("mediaType")
    .notEmpty()
    .withMessage("Media type is required.")
    .isIn(["movie", "tv"])
    .withMessage("Media type must be either movie or tv."),

  body("progress")
    .notEmpty()
    .withMessage("Progress is required.")
    .isNumeric()
    .withMessage("Progress must be a number.")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Progress must be between 0 and 100."),
];

// Remove from My List
const movieIdParamValidation = [
  param("tmdbId").isInt({ min: 1 }).withMessage("Invalid TMDB ID."),
];

module.exports = {
  updateProfileValidation,
  changePasswordValidation,
  addToMyListValidation,
  addWatchHistoryValidation,
  continueWatchingValidation,
  movieIdParamValidation,
};
