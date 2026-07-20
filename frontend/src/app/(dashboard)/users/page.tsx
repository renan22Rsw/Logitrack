// import { usersCards } from "@/utils/headers";
import { mapUsersCards } from "@/adapters/users";
import { ProductsHeader as UsersHeader } from "../products/_components/header";
import { UserMain } from "./_components/main";
import {
  getAllUsers,
  getSearchUsers,
  getUsersByPage,
} from "@/lib/api/users/get-user";

interface UsersProps {
  searchParams: {
    search: string;
    page: number;
  };
}

const Users = async ({ searchParams }: UsersProps) => {
  const { search, page } = await searchParams;

  const users = await getAllUsers();
  const usersSearch = await getSearchUsers(search);
  const usersPage = await getUsersByPage(page || 1);

  return (
    <>
      <UsersHeader
        title="Usuários"
        description="Gerencie os usuários"
        data={mapUsersCards(users)}
        hasButton={false}
        placeholder="Buscar Usuário"
        search={search ?? ""}
      />
      <UserMain
        usersPage={usersPage ?? []}
        userSearch={usersSearch ?? []}
        usersList={users ?? []}
        searchTerm={search}
      />
    </>
  );
};

export default Users;
