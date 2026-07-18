const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  updateUserRoleValidation,
  userIdValidation,
} = require("../validators/adminValidator");

const validate = require("../validators/validate");

const {
  getDashboard,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} = require("../controllers/adminController");

// Dashboard
router.get("/dashboard", protect, admin, getDashboard);

// Users
router.get("/users", protect, admin, getAllUsers);
router.get(
  "/users/:id",
  protect,
  admin,
  userIdValidation,
  validate,
  getUserById,
);
router.patch(
  "/users/:id/role",
  protect,
  admin,
  userIdValidation,
  validate,
  updateUserRole,
);
router.delete(
  "/users/:id",
  protect,
  admin,
  userIdValidation,
  validate,
  deleteUser,
);

const adminRoutes = router;
module.exports = adminRoutes;
