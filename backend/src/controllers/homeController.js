const movieService = require("../services/movieService");
const genreService = require("../services/genreService");

const getHomePage = async (req, res) => {
  try {
    const [
      trendingMovies,
      popularMovies,
      topRatedMovies,
      upcomingMovies,
      nowPlayingMovies,
      genres,
    ] = await Promise.all([
      movieService.getTrendingMovies(),
      movieService.getPopularMovies(),
      movieService.getTopRatedMovies(),
      movieService.getUpcomingMovies(),
      movieService.getNowPlayingMovies(),
      genreService.getMovieGenres(),
    ]);

    const heroMovie =
      trendingMovies[Math.floor(Math.random() * trendingMovies.length)];

    return res.status(200).json({
      success: true,
      data: {
        heroMovie,
        trendingMovies,
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        nowPlayingMovies,
        genres,
      },
    });
  } catch (error) {
    console.error("Home Page Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch home page data.",
    });
  }
};

module.exports = {
  getHomePage,
};
