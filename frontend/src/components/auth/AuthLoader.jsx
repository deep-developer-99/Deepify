import { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";
import { setUser, logoutUser } from "../../features/auth/authSlice";
import useAppDispatch from "../../hooks/useAppDispatch";

function AuthLoader({ children }) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getProfile();

        dispatch(setUser(response.user));
      } catch (error) {
        console.log("Error:", error);
        dispatch(logoutUser());
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return children;
}

export default AuthLoader;
