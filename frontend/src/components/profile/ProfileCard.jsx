import { FaUserCircle } from "react-icons/fa";
import useAppSelector from "../../hooks/useAppSelector";

function ProfileCard() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="rounded-xl bg-zinc-900 p-8 shadow-lg">
      <div className="flex flex-col items-center">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-28 w-28 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-600 text-5xl text-white">
            {user?.name ? user.name.charAt(0).toUpperCase() : <FaUserCircle />}
          </div>
        )}

        <h2 className="mt-6 text-3xl font-bold">{user?.name}</h2>

        <p className="mt-2 text-gray-400">{user?.email}</p>

        <span className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm">
          {user?.provider === "google" ? "Google Account" : "Local Account"}
        </span>

        <p className="mt-6 text-sm text-gray-500">
          Joined {new Date(user?.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
