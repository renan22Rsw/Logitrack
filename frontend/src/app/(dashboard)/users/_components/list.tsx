import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const UsersList = () => {
  const users = [
    {
      id: 1,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "ADMIN",
      status: "ativo",
      color: "#3B82F6",
      bgColor: "#BCD2FB",
    },

    {
      id: 2,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "OPERATOR",
      status: "inativo",
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },

    {
      id: 3,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "MANAGER",
      status: "ativo",
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },

    {
      id: 4,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "OPERATOR",
      status: "inativo",
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },

    {
      id: 5,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "MANAGER",
      status: "ativo",
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },

    {
      id: 6,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "MANAGER",
      status: "ativo",
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },

    {
      id: 7,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "OPERATOR",
      status: "inativo",
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },

    {
      id: 8,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "OPERATOR",
      status: "ativo",
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },

    {
      id: 9,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "MANAGER",
      status: "ativo",
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },

    {
      id: 10,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "OPERATOR",
      status: "ativo",
      lastAccess: "20/05/2023",
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Usuários</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {users.map((user) => (
          <div
            className="flex justify-between rounded-lg border p-4"
            key={user.id}
          >
            <div className="flex gap-3">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div>
                <h6 className="text-sm font-semibold">{user.user}</h6>
                <p className="text-muted-foreground text-xs">{user.email}</p>
                <div className="flex items-center gap-2 py-2">
                  <Badge
                    style={{ backgroundColor: user.bgColor, color: user.color }}
                  >
                    {user.type}
                  </Badge>
                  {user.status === "ativo" && (
                    <Badge className="bg-green-200 text-green-600">Ativo</Badge>
                  )}
                  {user.status === "inativo" && (
                    <Badge className="bg-red-200 text-red-600">Inativo</Badge>
                  )}
                </div>
              </div>
            </div>
            <ArrowRight className="size-5" />
          </div>
        ))}
      </CardContent>

      <CardFooter className="border-none bg-white">
        <Link href={"#"}>
          <div className="flex items-center font-semibold text-blue-500">
            Ver todas as atividades{" "}
            <ArrowRight size={16} className="mt-1 ml-2" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};
