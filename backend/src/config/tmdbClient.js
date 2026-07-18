const axios = require("axios");

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    return Promise.reject(error);
  },
);

module.exports = tmdbClient;
