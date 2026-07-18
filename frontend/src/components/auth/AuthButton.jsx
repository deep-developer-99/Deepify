function AuthButton({
  text,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className="mt-1 w-full rounded-md bg-red-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}

export default AuthButton;
