import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthCard from "./AuthCard";
import AuthButton from "./AuthButton";

import { verifyOTP } from "../../services/authService";

function VerifyOTPForm() {
  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(pastedData)) return;

    const otpArray = pastedData.split("");

    setOtp(otpArray);

    otpArray.forEach((digit, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = digit;
      }
    });

    inputRefs.current[5].focus();
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      return toast.error("Please enter the complete OTP.");
    }

    try {
      setLoading(true);

      const response = await verifyOTP({
        email,
        otp: otpValue,
      });

      toast.success(response.message);

      setTimeout(() => {
        navigate("/reset-password", {
          state: {
            email,
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

      <h2 className="mb-2 text-2xl font-semibold text-white">Verify OTP</h2>

      <p className="mb-6 text-sm text-gray-400">
        Enter the 6-digit OTP sent to
      </p>

      <p className="mb-8 text-center text-sm font-medium text-white">{email}</p>

      <form onSubmit={handleVerifyOTP}>
        <div className="mb-8 flex justify-center gap-3" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-14 w-14 rounded-lg border border-zinc-700 bg-zinc-800 text-center text-2xl font-bold text-white outline-none transition focus:border-red-600"
            />
          ))}
        </div>

        <AuthButton text="Verify OTP" type="submit" loading={loading} />
        <p className="mt-6 text-center text-sm text-gray-400">
          Didn't receive the OTP?
        </p>

        <button
          type="button"
          className="mt-2 w-full font-medium text-red-500 hover:text-red-400"
        >
          Resend OTP
        </button>

        <p className="mt-6 flex justify-center gap-2 text-sm text-gray-400">
          <span>Back to</span>

          <Link
            to="/login"
            className="font-medium text-white hover:text-red-500"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}

export default VerifyOTPForm;
