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
    case "STOCK_IN":
      return (
        <Badge className="bg-green-200 text-green-600">
          {action.toUpperCase()}
        </Badge>
      );

    case "STOCK_OUT":
      return (
        <Badge className="bg-red-200 text-red-600">
          {action.toUpperCase()}
        </Badge>
      );

    case "CREATE":
      return (
        <Badge className="bg-green-200 text-green-600">
          {action.toUpperCase()}
        </Badge>
      );

    case "UPDATE":
      return (
        <Badge className="bg-blue-200 text-blue-600">
          {action.toUpperCase()}
        </Badge>
      );

    case "DELETE":
      return (
        <Badge className="bg-red-200 text-red-600">
          {action.toUpperCase()}
        </Badge>
      );

    case "LOGIN":
    case "LOGOUT":
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
    case "PRODUCT":
      return (
        <Package
          size={32}
          className="rounded-lg bg-yellow-200 p-1 text-yellow-600"
        />
      );

    case "USER":
      return (
        <Users
          size={32}
          className="rounded-lg bg-purple-200 p-1 text-purple-600"
        />
      );

    case "MOVEMENT":
      return (
        <GitCompare
          size={32}
          className="rounded-lg bg-green-200 p-1 text-green-600"
        />
      );

    case "AUTH":
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
