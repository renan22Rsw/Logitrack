import { usersCards } from "@/utils/headers";
import { ProductsHeader as UsersHeader } from "../products/_components/header";
import { UserMain } from "./_components/main";

const Users = () => {
  return (
    <>
      <UsersHeader
        title="Usuários"
        description="Gerencie os usuários"
        data={usersCards}
        hasButton={false}
        placeholder="Buscar Usuário"
      />
      <UserMain />
    </>
  );
};

export default Users;
