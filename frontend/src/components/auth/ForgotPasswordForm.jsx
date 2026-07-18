import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthCard from "./AuthCard";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

import { forgotPassword } from "../../services/authService";

function ForgotPasswordForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter your email.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email.");
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email.trim());

      toast.success(response.message);

      setTimeout(() => {
        navigate("/verify-otp", {
          state: {
            email: email.trim(),
          },
        });
      }, 800);
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

      <h2 className="mb-2 text-2xl font-semibold text-white">
        Forgot Password
      </h2>

      <p className="mb-6 text-sm text-gray-400">
        Enter your registered email address to receive an OTP.
      </p>

      <form onSubmit={handleForgotPassword}>
        <AuthInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          autoComplete="email"
        />

        <AuthButton text="Send OTP" type="submit" loading={loading} />

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
export default ForgotPasswordForm;
