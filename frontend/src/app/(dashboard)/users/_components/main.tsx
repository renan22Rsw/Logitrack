"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { UsersTable } from "./table";
import { UserActivityAside } from "./aside-activity";
import { UserProfileAccessAside } from "./profile-access-aside";

export const UserMain = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-between gap-4 px-4">
      <div className="w-3/4">
        <UsersTable />
      </div>

      <div className="w-1/4 space-y-4">
        <UserActivityAside />
        <UserProfileAccessAside />
      </div>
    </div>
  );
};
