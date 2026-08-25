import { getCurrentUser } from "@/lib/api/users/get-user";
import { ProfileHeader } from "./_components/header";
import { ProfileMain } from "./_components/main";
import { redirect } from "next/navigation";

const Profile = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <div className="p-4">
        <ProfileHeader />
        <ProfileMain user={user ?? []} />
      </div>
    </>
  );
};

export default Profile;
