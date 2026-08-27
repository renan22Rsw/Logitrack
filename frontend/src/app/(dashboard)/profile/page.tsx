import { getCurrentUser } from "@/lib/api/users/get-user";
import { ProfileHeader } from "./_components/header";
import { ProfileMain } from "./_components/main";
import { redirect } from "next/navigation";
import { getAllAuditLogs } from "@/lib/api/audit-logs/get-audit-logs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil",
};

const Profile = async () => {
  const user = await getCurrentUser();
  const auditLog = await getAllAuditLogs();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <div className="p-4">
        <ProfileHeader />
        <ProfileMain user={user ?? []} lastAcess={auditLog} />
      </div>
    </>
  );
};

export default Profile;
