import { FaGithub, FaLinkedin, FaHeart, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-6 px-6 py-8 text-center md:flex-row md:text-left">
        {/* Left */}
        <div>
          <h2 className="text-2xl font-bold text-red-600">NETFLIX</h2>

          <p className="mt-2 max-w-md text-sm text-gray-400">
            Discover trending movies and TV shows powered by TMDB. Built using
            React, Node.js, Express and MongoDB.
          </p>
        </div>

        {/* Center */}
        <div className="flex gap-6 text-sm text-gray-400">
          <Link to="/home" className="transition hover:text-red-500">
            Home
          </Link>

          <Link to="/movies" className="transition hover:text-red-500">
            Movies
          </Link>

          <Link to="/tv" className="transition hover:text-red-500">
            TV Shows
          </Link>

          <Link to="/my-list" className="transition hover:text-red-500">
            My List
          </Link>
        </div>

        {/* Right */}
        <div className="flex gap-5 text-xl text-gray-400">
          <a
            href="https://github.com/deep-developer-99"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/deepanshu-rawat-69b795261"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-blue-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/hey.deep_"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-orange-400"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="border-t border-zinc-800 py-4 text-center text-sm text-gray-500">
        © {year} Netflix • Made with{" "}
        <FaHeart className="mx-1 inline text-red-500" />
        by Deepanshu Rawat
      </div>
    </footer>
  );
}

export default Footer;
