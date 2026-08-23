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

import { ProductPagination as UsersPagination } from "../../products/_components/pagination";
import { Badge } from "@/components/ui/badge";
import { DeleteUserButton } from "./delete-button";
import { EditUserButton } from "./edit-button";
import { User, UsersByPage } from "@/types/user";
import { usersRoles } from "@/utils/users.table";
import { formatDate } from "@/utils/format-date";

interface UsersTableProps {
  page: UsersByPage;
  search: User[];
  searchTerm?: string;
  currentUser: User;
}

export const UsersTable = ({
  page,
  search,
  searchTerm,
  currentUser,
}: UsersTableProps) => {
  const hasSearch = searchTerm?.trim() !== "" && searchTerm !== undefined;

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
              <TableHead>Criado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!hasSearch ? (
              page.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-2 font-bold">
                    <Avatar>
                      <AvatarFallback>
                        {user.name.charAt(0) + user.name.charAt(1)}
                      </AvatarFallback>
                    </Avatar>
                    {user.name}
                  </TableCell>
                  {user.isDemo ? (
                    <TableCell className="text-muted-foreground">
                      guest email
                    </TableCell>
                  ) : (
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                  )}
                  {user.isDemo ? (
                    <TableCell>
                      {
                        <Badge className="bg-purple-200 text-purple-600">
                          Guest
                        </Badge>
                      }
                    </TableCell>
                  ) : (
                    <TableCell>{usersRoles(user.role)}</TableCell>
                  )}
                  <TableCell>
                    <Badge
                      className={cn(
                        user.deletedAt === null
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600",
                      )}
                    >
                      {user.deletedAt === null ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground font-semibold">
                    {formatDate(user.createdAt)}
                  </TableCell>

                  <TableCell className="flex items-center gap-4">
                    <EditUserButton
                      id={user.id}
                      name={user.name}
                      email={user.email}
                      role={user.role}
                      currentUser={currentUser}
                    />
                    <DeleteUserButton id={user.id} currentUser={currentUser} />
                  </TableCell>
                </TableRow>
              ))
            ) : search.length > 0 ? (
              search.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-2 font-bold">
                    <Avatar>
                      <AvatarFallback>
                        {user.name.charAt(0) + user.name.charAt(1)}
                      </AvatarFallback>
                    </Avatar>
                    {user.name}
                  </TableCell>

                  {user.isDemo ? (
                    <TableCell className="text-muted-foreground">
                      guest email
                    </TableCell>
                  ) : (
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                  )}

                  {user.isDemo ? (
                    <TableCell>
                      {
                        <Badge className="bg-purple-200 text-purple-600">
                          Guest
                        </Badge>
                      }
                    </TableCell>
                  ) : (
                    <TableCell>{usersRoles(user.role)}</TableCell>
                  )}

                  <TableCell>
                    <Badge
                      className={cn(
                        user.deletedAt === null
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600",
                      )}
                    >
                      {user.deletedAt === null ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground font-semibold">
                    {formatDate(user.createdAt)}
                  </TableCell>

                  <TableCell className="flex items-center gap-4">
                    <EditUserButton
                      id={user.id}
                      name={user.name}
                      email={user.email}
                      role={user.role}
                      currentUser={currentUser}
                    />
                    <DeleteUserButton id={user.id} currentUser={currentUser} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex w-full items-center justify-between">
        <span className="text-muted-foreground w-full text-sm font-semibold">
          Mostrando {(page.meta.page - 1) * page.meta.limit + 1} a{" "}
          {Math.min(page.meta.page * page.meta.limit, page.meta.total)} de{" "}
          {page.meta.total} usuários
        </span>
        <UsersPagination meta={page.meta} />
      </CardFooter>
    </Card>
  );
};
