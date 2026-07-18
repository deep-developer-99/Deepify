const { body, param } = require("express-validator");

// Update User Role
const updateUserRoleValidation = [
  param("id").isMongoId().withMessage("Invalid user ID."),

  body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isIn(["user", "admin"])
    .withMessage("Role must be either 'user' or 'admin'."),
];

// User Id Validation
const userIdValidation = [
  param("id").isMongoId().withMessage("Invalid user ID."),
];

module.exports = {
  updateUserRoleValidation,
  userIdValidation,
};
