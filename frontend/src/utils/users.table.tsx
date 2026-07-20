import { Badge } from "@/components/ui/badge";
import { Role } from "@/types/user";

export const usersRoles = (role: Role) => {
  switch (role) {
    case "ADMIN":
      return <Badge className="bg-blue-200 text-blue-600">Administrador</Badge>;

    case "MANAGER":
      return <Badge className="bg-yellow-200 text-yellow-600">Gerente</Badge>;

    case "OPERATOR":
      return <Badge className="bg-green-200 text-green-600">Operador</Badge>;

    default:
      return null;
  }
};
