import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavSearch from "./NavSearch";
import NavProfile from "./NavProfile";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-linear-to-b from-black via-black/80 to-transparent">
        <nav className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 lg:px-12">
          {/* Left */}
          <div className="flex items-center gap-8">
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="text-white text-3xl md:hidden"
            >
              <HiMenu />
            </button>

            <NavLogo />
            <NavLinks />
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <NavSearch />
            <NavProfile />
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />

      {/* Close Button */}
      {menuOpen && (
        <button
          onClick={() => setMenuOpen(false)}
          className="fixed top-5 left-60 z-60 text-3xl text-white"
        >
          <HiX />
        </button>
      )}
    </>
  );
}

export default Navbar;
