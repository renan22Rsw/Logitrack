import { mapUsersCards } from "@/adapters/users";
import { ProductsHeader as UsersHeader } from "../products/_components/header";
import { UserMain } from "./_components/main";
import {
  getAllUsers,
  getCurrentUser,
  getSearchUsers,
  getUsersByPage,
} from "@/lib/api/users/get-user";
import { CreateUsersButton } from "./_components/create-users-button";

interface UsersProps {
  searchParams: {
    search: string;
    page: number;
  };
}

const Users = async ({ searchParams }: UsersProps) => {
  const { search, page } = await searchParams;

  const currentUser = await getCurrentUser();
  const users = await getAllUsers();
  const usersSearch = await getSearchUsers(search);
  const usersPage = await getUsersByPage(page || 1);

  return (
    <>
      <UsersHeader
        title="Usuários"
        description="Gerencie os usuários"
        data={mapUsersCards(users)}
        hasButton={true}
        placeholder="Buscar Usuário"
        search={search ?? ""}
      >
        <CreateUsersButton currentUser={currentUser} />
      </UsersHeader>
      <UserMain
        usersPage={usersPage ?? []}
        userSearch={usersSearch ?? []}
        usersList={users ?? []}
        currentUser={currentUser}
        searchTerm={search}
      />
    </>
  );
};

export default Users;
