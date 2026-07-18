const tmdbClient = require("../config/tmdbClient");

// Fetch list endpoints
const fetchList = async (endpoint, params = {}) => {
  try {
    const response = await tmdbClient.get(endpoint, { params });
    return response.data.results;
  } catch (error) {
    console.error(
      `TMDB Error (${endpoint}):`,
      error.response?.data || error.message,
    );
    throw new Error("Failed to fetch data from TMDB.");
  }
};

// Fetch single resource
const fetchOne = async (endpoint, params = {}) => {
  try {
    const response = await tmdbClient.get(endpoint, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      `TMDB Error (${endpoint}):`,
      error.response?.data || error.message,
    );
    throw new Error("Failed to fetch data from TMDB.");
  }
};

// Fetch Genres
const fetchGenres = async (endpoint) => {
  try {
    const response = await tmdbClient.get(endpoint);
    return response.data.genres;
  } catch (error) {
    console.error(
      `TMDB Error (${endpoint}):`,
      error.response?.data || error.message,
    );

    throw new Error("Failed to fetch genres.");
  }
};

module.exports = {
  fetchList,
  fetchOne,
  fetchGenres,
};
