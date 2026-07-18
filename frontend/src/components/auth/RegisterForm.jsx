import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthCard from "./AuthCard";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

import { register } from "../../services/authService";
import GoogleLoginButton from "./GoogleLoginButton";

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // Empty Validation
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      return toast.error("Please fill all fields.");
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email.");
    }

    // Password Length
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    // Password Match
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const response = await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      toast.success(response.message);
      setTimeout(() => {
        navigate("/login");
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

      <h2 className="mb-6 text-2xl font-semibold text-white">Create Account</h2>

      <form onSubmit={handleRegister}>
        <AuthInput
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
        />
        <AuthInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <AuthInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <AuthButton text="Create Account" type="submit" loading={loading} />

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-zinc-700"></div>

          <span className="mx-4 text-sm text-gray-400">OR</span>

          <div className="h-px flex-1 bg-zinc-700"></div>
        </div>

        <GoogleLoginButton />

        <p className="mt-6 flex justify-center gap-2 text-sm text-gray-400">
          <span>Already have an account?</span>

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

export default RegisterForm;
