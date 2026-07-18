import { startTransition } from "react";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

import { logout } from "../../services/authService";
import { logoutUser } from "../../features/auth/authSlice";

function NavProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close dropdown whenever route changes

  useEffect(() => {
    startTransition(() => {
      setOpen(false);
    });
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const response = await logout();

      setOpen(false);

      dispatch(logoutUser());

      toast.success(response.message);

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout Failed");
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded bg-red-600 font-semibold text-white">
            {user?.name ? user.name.charAt(0).toUpperCase() : <FaUserCircle />}
          </div>
        )}

        <FaChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-56 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl">
          <div className="border-b border-zinc-800 p-4">
            <h3 className="font-semibold text-white">{user?.name}</h3>

            <p className="mt-1 text-sm text-gray-400">{user?.email}</p>
          </div>

          <div className="flex flex-col">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-gray-300 transition hover:bg-zinc-800 hover:text-white"
            >
              Profile
            </Link>

            <Link
              to="/my-list"
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-gray-300 transition hover:bg-zinc-800 hover:text-white"
            >
              My List
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-3 text-left text-red-500 transition hover:bg-zinc-800"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavProfile;
