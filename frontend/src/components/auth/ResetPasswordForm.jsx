import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthCard from "./AuthCard";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

import { resetPassword } from "../../services/authService";

function ResetPasswordForm() {
  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = formData;

    if (!newPassword.trim() || !confirmPassword.trim()) {
      return toast.error("Please fill all fields.");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const response = await resetPassword({
        email,
        newPassword,
      });

      toast.success(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <h1 className="mb-8 text-center text-4xl font-bold text-red-600">
        Netflix Clone
      </h1>

      <h2 className="mb-2 text-2xl font-semibold text-white">Reset Password</h2>

      <p className="mb-6 text-sm text-gray-400">
        Create a new password for your account.
      </p>

      <form onSubmit={handleResetPassword}>
        <AuthInput
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your new password"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <AuthButton text="Reset Password" type="submit" loading={loading} />

        <p className="mt-6 flex justify-center gap-2 text-sm text-gray-400">
          <span>Remember your password?</span>

          <Link
            to="/login"
            className="font-medium text-white transition hover:text-red-500"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}

export default ResetPasswordForm;
