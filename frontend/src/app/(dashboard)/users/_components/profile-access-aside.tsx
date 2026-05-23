import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, User, Users } from "lucide-react";

export const UserProfileAccessAside = () => {
  const profileAcess = [
    {
      role: "Administrador",
      description: "Acesso total ao sistema",
      quantity: 1,
      icon: Package,
      color: "#3B82F6",
      bgColor: "#BCD2FB",
    },

    {
      role: "Gerente",
      description: "Gerencia produtos e movimentações",
      quantity: 5,
      icon: Users,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },

    {
      role: "Operador",
      description: "Opera movimentações e consulta",
      quantity: 10,
      icon: User,
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil de acesso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {profileAcess.map((item, __index) => (
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
                  {item.quantity} usuarios
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
