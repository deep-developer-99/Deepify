import ProfileCard from "../../components/profile/ProfileCard";
import EditProfileForm from "../../components/profile/EditProfileForm";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";

function Profile() {
  return (
    <div className="min-h-screen bg-black px-8 py-28 text-white lg:px-16">
      <h1 className="mb-12 text-center text-5xl font-bold">My Profile</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <div>
          <ProfileCard />
        </div>

        <div className="space-y-10 lg:col-span-2">
          <EditProfileForm />

          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default Profile;
