import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 pr-12 text-white outline-none transition focus:border-red-600"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthInput;
