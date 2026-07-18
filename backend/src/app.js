const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const app = express();
const helmet = require("helmet");
const { apiLimiter } = require("./middleware/rateLimiter");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");
const tvRoutes = require("./routes/tvRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const genreRoutes = require("./routes/genreRoutes");
const adminRoutes = require("./routes/adminRoutes");

// CORS
const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(apiLimiter);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/tv", tvRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
