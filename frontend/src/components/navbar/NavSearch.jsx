import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function NavSearch() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/search")}
      className="text-2xl text-white transition hover:text-red-500"
    >
      <FiSearch />
    </button>
  );
}

export default NavSearch;
