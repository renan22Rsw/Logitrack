import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Role, User as UserTypes } from "@/types/user";
import { LucideIcon, Package, User, Users } from "lucide-react";

interface ProfileAccessItem {
  role: Role;
  label: string;
  description: string;
  quantity: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const UserProfileAccessAside = ({ users }: { users: UserTypes[] }) => {
  const adminUsers = users.filter((user) => user.role === "ADMIN").length;
  const managerUsers = users.filter((user) => user.role === "MANAGER").length;
  const operatorUser = users.filter((user) => user.role === "OPERATOR").length;

  const PROFILE_ACCESS: ProfileAccessItem[] = [
    {
      label: "Administrador",
      role: "ADMIN",
      description: "Acesso total ao sistema",
      quantity: adminUsers,
      icon: Package,
      color: "#3B82F6",
      bgColor: "#BCD2FB",
    },

    {
      label: "Gerente",
      role: "MANAGER",
      description: "Gerencia produtos e movimentações",
      quantity: managerUsers,
      icon: Users,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },

    {
      label: "Operador",
      role: "OPERATOR",
      description: "Opera movimentações e consulta",
      quantity: operatorUser,
      icon: User,
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },
  ];

  const countUsers = (count: number) => {
    return count > 1 ? `${count} Usuários` : `${count} Usuário`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil de acesso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {PROFILE_ACCESS.map((item, __index) => (
          <div className="flex gap-2" key={__index}>
            <item.icon
              color={item.color}
              style={{ backgroundColor: item.bgColor }}
              className="size-6 h-8 w-8 rounded-full p-2"
            />
            <div className="w-full">
              <div className="flex items-center justify-between gap-2">
                <h6 className="text-sm font-semibold">{item.role}</h6>
                <p className="text-xs font-semibold">
                  {countUsers(item.quantity)}
                </p>
              </div>
              <p className="text-muted-foreground text-xs">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
