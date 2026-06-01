import { Badge } from "@/components/ui/badge";
import { GitCompare, Package, Settings, Users } from "lucide-react";

export const auditLogsRoles = (role: string) => {
  switch (role) {
    case "ADMIN":
      return (
        <Badge className="bg-blue-200 text-blue-600">
          {role.toUpperCase()}
        </Badge>
      );
    case "MANAGER":
      return (
        <Badge className="bg-yellow-200 text-yellow-600">
          {role.toUpperCase()}
        </Badge>
      );
    case "OPERATOR":
      return (
        <Badge className="bg-green-200 text-green-600">
          {role.toUpperCase()}
        </Badge>
      );
    default:
      return null;
  }
};

export const auditLogsActions = (action: string) => {
  switch (action) {
    case "Stock_In":
      return (
        <Badge className="bg-green-200 text-green-600">
          {action.toUpperCase()}
        </Badge>
      );

    case "Stock_Out":
      return (
        <Badge className="bg-red-200 text-red-600">
          {action.toUpperCase()}
        </Badge>
      );

    case "Create":
      return (
        <Badge className="bg-green-200 text-green-600">
          {action.toUpperCase()}
        </Badge>
      );

    case "Update":
      return (
        <Badge className="bg-blue-200 text-blue-600">
          {action.toUpperCase()}
        </Badge>
      );

    case "Delete":
      return (
        <Badge className="bg-red-200 text-red-600">
          {action.toUpperCase()}
        </Badge>
      );

    case "Login":
    case "Logout":
      return (
        <Badge className="bg-gray-200 text-gray-600">
          {action.toUpperCase()}
        </Badge>
      );

    default:
      return null;
  }
};

export const auditLogsEntities = (entity: string) => {
  switch (entity) {
    case "Produto":
      return (
        <Package
          size={32}
          className="rounded-lg bg-yellow-200 p-1 text-yellow-600"
        />
      );

    case "Usuário":
      return (
        <Users
          size={32}
          className="rounded-lg bg-purple-200 p-1 text-purple-600"
        />
      );

    case "Movimentação":
      return (
        <GitCompare
          size={32}
          className="rounded-lg bg-green-200 p-1 text-green-600"
        />
      );

    case "Sistema":
      return (
        <Settings
          size={32}
          className="rounded-lg bg-gray-200 p-1 text-gray-600"
        />
      );
    default:
      return null;
  }
};
