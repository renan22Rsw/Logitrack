import { ProfileHeader } from "./_components/header";
import { ProfileMain } from "./_components/main";

const Profile = () => {
  return (
    <>
      <div className="p-4">
        <ProfileHeader />
        <ProfileMain />
      </div>
    </>
  );
};

export default Profile;
