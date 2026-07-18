import { useState } from "react";
import AuthCard from "./AuthCard";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login, getProfile } from "../../services/authService";
import useAppDispatch from "../../hooks/useAppDispatch";
import { setUser } from "../../features/auth/authSlice";
import GoogleLoginButton from "./GoogleLoginButton";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Empty Validation
    if (!email.trim() || !password.trim()) {
      return toast.error("Please fill all fields.");
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email.");
    }

    // Password Validation
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      setLoading(true);

      const response = await login({ email: email.trim(), password });
      toast.success(response.message);

      const profile = await getProfile();

      dispatch(setUser(profile.user));
      console.log(profile.user);

      console.log(response);
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthCard>
      <h1 className="mb-8 text-center text-4xl font-bold text-red-600">
        Netflix Clone
      </h1>

      <h2 className="mb-6 text-2xl font-semibold text-white">Sign In</h2>

      <form onSubmit={handleLogin}>
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
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <div className="mb-6 flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" className="h-4 w-4 accent-red-600" />{" "}
            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            {" "}
            Forgot Password?
          </Link>
        </div>

        <AuthButton text="Sign In" type="submit" loading={loading} />

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-zinc-700"></div>

          <span className="mx-4 text-sm text-gray-400">OR</span>

          <div className="h-px flex-1 bg-zinc-700"></div>
        </div>

        <GoogleLoginButton />

        <p className="mt-6 flex gap-2 text-center justify-center text-sm text-gray-400">
          <span>New to Netflix-Clone?</span>
          <Link
            to="/register"
            className="font-medium text-white hover:text-red-500"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}

export default LoginForm;
