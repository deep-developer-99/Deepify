import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

// Auth Pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyOTP from "../pages/Auth/VerifyOTP";
import ResetPassword from "../pages/Auth/ResetPassword";

// Main Pages
import Home from "../pages/Home/Home";
import Movies from "../pages/Movies/Movies";
import TV from "../pages/TV/TV";
import Search from "../pages/Search/Search";
import Profile from "../pages/Profile/Profile";
import MyList from "../pages/MyList/MyList";
import ContinueWatching from "../pages/ContinueWatching/ContinueWatching";
import WatchHistory from "../pages/WatchHistory/WatchHistory";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import TVDetails from "../pages/TVDetails/TVDetails";

// Admin
import Dashboard from "../pages/Admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import MoviesCategory from "../pages/MovieDetails/MoviesCategory";
import TVCategory from "../pages/TV/TVCategory";
import ScrollToTop from "../components/common/ScrollToTop";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Authentication */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Route>
        {/* Main App */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:category" element={<MoviesCategory />} />
            <Route path="/tv" element={<TV />} />
            <Route path="/tv/:category" element={<TVCategory />} />
            <Route path="/tv/details/:id" element={<TVDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/continue-watching" element={<ContinueWatching />} />
            <Route path="/watch-history" element={<WatchHistory />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Route>
        </Route>
        {/* Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<NotFound />} />{" "}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
