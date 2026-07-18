import { Link } from "react-router-dom";

function NavLogo() {
  return (
    <Link
      to="/home"
      className="text-3xl font-extrabold tracking-widest text-red-600"
    >
      NETFLIX
    </Link>
  );
}

export default NavLogo;
