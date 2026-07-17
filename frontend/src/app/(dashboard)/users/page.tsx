// import { usersCards } from "@/utils/headers";
import { mapUsersCards } from "@/adapters/users";
import { ProductsHeader as UsersHeader } from "../products/_components/header";
import { UserMain } from "./_components/main";
import { getAllUsers } from "@/lib/api/users/get-user";

interface UsersProps {
  searchParams: {
    search: string;
    page: number;
  };
}

const Users = async ({ searchParams }: UsersProps) => {
  const { search, page } = await searchParams;

  const users = await getAllUsers();

  return (
    <>
      <UsersHeader
        title="Usuários"
        description="Gerencie os usuários"
        data={mapUsersCards(users)}
        hasButton={false}
        placeholder="Buscar Usuário"
        search=""
      />
      <UserMain />
    </>
  );
};

export default Users;
