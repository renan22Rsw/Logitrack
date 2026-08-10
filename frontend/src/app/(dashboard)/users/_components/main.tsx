"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { UsersTable } from "./table";
import { UserActivityAside } from "./aside-activity";
import { UserProfileAccessAside } from "./profile-access-aside";
import { UsersList } from "./list";
import { User, UsersByPage } from "@/types/user";
import { AuditLogs } from "@/types/audit-logs";

interface UserMainProps {
  usersPage: UsersByPage;
  usersList: User[];
  userSearch: User[];
  currentUser: User;
  searchTerm: string;
  auditLogs?: AuditLogs[];
}

export const UserMain = ({
  usersPage,
  usersList,
  userSearch,
  currentUser,
  searchTerm,
  auditLogs,
}: UserMainProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="justify-between gap-4 space-y-4 px-4 xl:flex">
      {isMobile ? (
        <UsersList
          users={usersList}
          search={userSearch}
          searchTerm={searchTerm}
          currentUser={currentUser}
        />
      ) : (
        <div className="w-3/4">
          <UsersTable
            page={usersPage}
            search={userSearch}
            searchTerm={searchTerm}
            currentUser={currentUser}
          />
        </div>
      )}

      <div className="space-y-4 xl:w-1/4">
        <UserActivityAside auditLogs={auditLogs || []} />
        <UserProfileAccessAside users={usersList} />
      </div>
    </div>
  );
};
