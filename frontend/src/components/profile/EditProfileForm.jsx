import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import useAppSelector from "../../hooks/useAppSelector";

import { updateProfile } from "../../services/userService";
import { setUser } from "../../features/auth/authSlice";

function EditProfileForm() {
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Name is required.");
    }

    try {
      setLoading(true);

      const response = await updateProfile({
        name,
        avatar,
      });

      dispatch(setUser(response.user));

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-zinc-900 p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm text-gray-300">Full Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-red-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Avatar URL</label>

          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-red-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditProfileForm;
