import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { ProductPagination } from "../../products/_components/pagination";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

export const UsersTable = () => {
  const users = [
    {
      id: 1,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "ADMIN",
      status: "ativo",
      lastAccess: "20/05/2023",
    },

    {
      id: 2,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "OPERATOR",
      status: "inativo",
      lastAccess: "20/05/2023",
    },

    {
      id: 3,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "MANAGER",
      status: "ativo",
      lastAccess: "20/05/2023",
    },

    {
      id: 4,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "OPERATOR",
      status: "inativo",
      lastAccess: "20/05/2023",
    },

    {
      id: 5,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "MANAGER",
      status: "ativo",
      lastAccess: "20/05/2023",
    },

    {
      id: 6,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "MANAGER",
      status: "ativo",
      lastAccess: "20/05/2023",
    },

    {
      id: 7,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "OPERATOR",
      status: "inativo",
      lastAccess: "20/05/2023",
    },

    {
      id: 8,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "OPERATOR",
      status: "ativo",
      lastAccess: "20/05/2023",
    },

    {
      id: 9,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "MANAGER",
      status: "ativo",
      lastAccess: "20/05/2023",
    },

    {
      id: 10,
      user: "John Doe",
      email: "K0ZqI@example.com",
      type: "OPERATOR",
      status: "ativo",
      lastAccess: "20/05/2023",
    },
  ];

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="h-full bg-[#F8F9F9]">
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Acesso</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-2 font-bold">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  {user.user}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      user.type === "ADMIN" && "bg-blue-200 text-blue-600",
                      user.type === "OPERATOR" && "bg-green-200 text-green-600",
                      user.type === "MANAGER" &&
                        "bg-yellow-200 text-yellow-600",
                    )}
                  >
                    {user.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      user.status === "ativo" && "bg-green-200 text-green-600",
                      user.status === "inativo" && "bg-red-200 text-red-600",
                    )}
                  >
                    {user.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-muted-foreground font-semibold">
                  {user.lastAccess}
                </TableCell>

                <TableCell className="flex items-center gap-4">
                  <Pencil className="h-4 w-4" />
                  <Trash2 className="h-4 w-4" color="red" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex w-full items-center justify-between">
        <span className="text-muted-foreground w-full text-sm font-semibold">
          Mostrando 1 a 10 de {users.length} de usuários
        </span>
        <ProductPagination />
      </CardFooter>
    </Card>
  );
};
