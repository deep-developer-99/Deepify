import axiosInstance from "../api/axios";

// Get Trending TV Shows
export const getTrendingTVShows = async () => {
  const response = await axiosInstance.get("/tv/trending");
  return response.data;
};

// Get Popular TV Shows
export const getPopularTVShows = async () => {
  const response = await axiosInstance.get("/tv/popular");
  return response.data;
};

// Get Top Rated TV Shows
export const getTopRatedTVShows = async () => {
  const response = await axiosInstance.get("/tv/top-rated");
  return response.data;
};

// Get On The Air TV Shows
export const getOnTheAirTVShows = async () => {
  const response = await axiosInstance.get("/tv/on-the-air");
  return response.data;
};

// Get TV Show By ID
export const getTVShowById = async (id) => {
  const response = await axiosInstance.get(`/tv/${id}`);
  return response.data;
};

// Search TV Shows
export const searchTVShows = async (query) => {
  const response = await axiosInstance.get("/tv/search", {
    params: {
      query,
    },
  });

  return response.data;
};
