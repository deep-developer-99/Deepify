import axiosInstance from "../api/axios";

// Profile
export const getProfile = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data;
};

// Update Profile
export const updateProfile = async (data) => {
  const response = await axiosInstance.put("/user/profile", data);
  return response.data;
};

// Change Password
export const changePassword = async (data) => {
  const response = await axiosInstance.put("/user/change-password", data);

  return response.data;
};

// My List
export const getMyList = async () => {
  const response = await axiosInstance.get("/user/my-list");
  return response.data;
};

// Add to my list
export const addToMyList = async (tmdbId, mediaType) => {
  const response = await axiosInstance.post("/user/my-list", {
    tmdbId,
    mediaType,
  });

  return response.data;
};

// Remove from my List
export const removeFromMyList = async (tmdbId) => {
  const response = await axiosInstance.delete(`/user/my-list/${tmdbId}`);

  return response.data;
};

// Watch History
export const getWatchHistory = async () => {
  const response = await axiosInstance.get("/user/watch-history");

  return response.data;
};

// Add to watch history
export const addWatchHistory = async (tmdbId, mediaType) => {
  const response = await axiosInstance.post("/user/watch-history", {
    tmdbId,
    mediaType,
  });

  return response.data;
};

// Continue Watching
export const getContinueWatching = async () => {
  const response = await axiosInstance.get("/user/continue-watching");

  return response.data;
};

// Save Continue Watching
export const saveContinueWatching = async (tmdbId, mediaType, progress) => {
  const response = await axiosInstance.post("/user/continue-watching", {
    tmdbId,
    mediaType,
    progress,
  });

  return response.data;
};
