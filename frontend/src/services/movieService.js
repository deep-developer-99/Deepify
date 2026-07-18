import axiosInstance from "../api/axios";

export const getMovieById = async (id) => {
  const response = await axiosInstance.get(`/movies/${id}`);
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await axiosInstance.get("/movies/search", {
    params: {
      query,
    },
  });

  return response.data;
};

export const getPopularMovies = async () => {
  const response = await axiosInstance.get("/movies/popular");
  return response.data;
};

export const getTopRatedMovies = async () => {
  const response = await axiosInstance.get("/movies/top-rated");
  return response.data;
};

export const getUpcomingMovies = async () => {
  const response = await axiosInstance.get("/movies/upcoming");
  return response.data;
};

export const getNowPlayingMovies = async () => {
  const response = await axiosInstance.get("/movies/now-playing");
  return response.data;
};

export const getMoviesByIds = async (ids) => {
  const movies = await Promise.all(
    ids.map(async (id) => {
      const response = await getMovieById(id);
      return response.movie;
    }),
  );

  return movies;
};
