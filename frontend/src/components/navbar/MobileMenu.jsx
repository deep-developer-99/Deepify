import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/home" },
  { name: "Movies", path: "/movies" },
  { name: "TV Shows", path: "/tv" },
  { name: "My List", path: "/my-list" },
];

function MobileMenu({ open, setOpen }) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-2xl font-bold text-red-600">NETFLIX</h2>
        </div>

        <div className="flex flex-col py-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-6 py-4 transition ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-gray-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
