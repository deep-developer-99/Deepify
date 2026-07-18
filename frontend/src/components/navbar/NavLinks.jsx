import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Movies",
    path: "/movies",
  },
  {
    name: "TV Shows",
    path: "/tv",
  },
  {
    name: "My List",
    path: "/my-list",
  },
];

function NavLinks() {
  return (
    <div className="hidden items-center gap-8 md:flex">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `transition ${
              isActive
                ? "font-semibold text-white"
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}

export default NavLinks;
