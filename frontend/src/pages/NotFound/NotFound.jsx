import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
      <h1 className="text-8xl font-bold text-red-600">404</h1>

      <h2 className="mt-6 text-3xl font-semibold">Page Not Found</h2>

      <p className="mt-3 text-gray-400">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-8 rounded bg-red-600 px-8 py-3 font-semibold transition hover:bg-red-700"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
