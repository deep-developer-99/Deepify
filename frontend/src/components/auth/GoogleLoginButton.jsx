import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { googleLogin } from "../../services/authService";
import useAppDispatch from "../../hooks/useAppDispatch";
import { setUser } from "../../features/auth/authSlice";

function GoogleLoginButton() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await googleLogin(credentialResponse.credential);

      dispatch(setUser(response.user));
      toast.success(response.message);

      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Google Login Failed.");
    }
  };

  const handleError = () => {
    toast.error("Google Sign In Failed.");
  };

  return (
    <div className="mt-6 flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="filled_black"
        shape="pill"
        size="large"
        width="330"
      />
    </div>
  );
}

export default GoogleLoginButton;
