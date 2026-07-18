import axiosInstance from "../api/axios";

// Login
export const login = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

// Register
export const register = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

// Google Auth
export const googleLogin = async (credential) => {
  const response = await axiosInstance.post("/auth/google", {
    credential,
  });

  return response.data;
};

// Logout
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

// Profile
export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

// Verify OTP
export const verifyOTP = async (data) => {
  const response = await axiosInstance.post("/auth/verify-otp", data);

  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await axiosInstance.post("/auth/reset-password", data);

  return response.data;
};
