"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { UsersTable } from "./table";
import { UserActivityAside } from "./aside-activity";
import { UserProfileAccessAside } from "./profile-access-aside";
import { UsersList } from "./list";

export const UserMain = () => {
  const isMobile = useIsMobile();

  return (
    <div className="justify-between gap-4 space-y-4 px-4 xl:flex">
      {isMobile ? (
        <UsersList />
      ) : (
        <div className="w-3/4">
          <UsersTable />
        </div>
      )}

      <div className="space-y-4 xl:w-1/4">
        <UserActivityAside />
        <UserProfileAccessAside />
      </div>
    </div>
  );
};
