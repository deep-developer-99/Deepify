import axiosInstance from "../api/axios";

export const getHomeData = async () => {
  const response = await axiosInstance.get("/home");

  return response.data.data;
};
