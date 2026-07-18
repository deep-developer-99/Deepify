const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { getHomePage } = require("../controllers/homeController");

router.get("/", protect, getHomePage);

const homeRoutes = router;
module.exports = homeRoutes;
