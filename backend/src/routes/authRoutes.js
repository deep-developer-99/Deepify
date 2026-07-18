const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const {
  loginLimiter,
  forgotPasswordLimiter,
} = require("../middleware/rateLimiter");
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  verifyOTPValidation,
  resetPasswordValidation,
} = require("../validators/authValidator");
const validate = require("../validators/validate");

const {
  registerUser,
  loginUser,
  googleAuth,
  logoutUser,
  profile,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginLimiter, loginValidation, validate, loginUser);
router.post("/google", googleAuth);
router.post("/logout", logoutUser);
router.get("/me", protect, profile);
router.post(
  "/forgot-password",
  forgotPasswordValidation,
  validate,
  forgotPasswordLimiter,
  forgotPassword,
);
router.post("/verify-otp", verifyOTPValidation, validate, verifyOtp);
router.post(
  "/reset-password",
  resetPasswordValidation,
  validate,
  resetPassword,
);

const authRoutes = router;
module.exports = authRoutes;
