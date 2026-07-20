"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import { usersRoles } from "@/utils/users.table";

import { useState } from "react";
import { EditUserButton } from "./edit-button";
import { DeleteUserButton } from "./delete-button";

interface UsersListProps {
  users: User[];
  search: User[];
  searchTerm?: string;
}

export const UsersList = ({ users, search, searchTerm }: UsersListProps) => {
  const ITEMS_PER_PAGE = 10;
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  const visibleUsers = users.slice(0, visibleCount);
  const hasMore = visibleCount < users.length;
  const hasSearch = searchTerm?.trim() !== "" && searchTerm !== undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Usuários</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!hasSearch ? (
          <>
            {visibleUsers.map((user) => (
              <div
                className="flex justify-between rounded-lg border p-4"
                key={user.id}
              >
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {user.name.charAt(0) + user.name.charAt(1)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h6 className="text-sm font-semibold">{user.name}</h6>
                    <p className="text-muted-foreground text-xs">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-2 py-2">
                      {usersRoles(user.role)}

                      <Badge
                        className={cn(
                          user.deletedAt === null
                            ? "bg-green-200 text-green-600"
                            : "bg-red-200 text-red-600",
                        )}
                      >
                        {user.deletedAt === null ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <EditUserButton />
                  <DeleteUserButton />
                </div>
              </div>
            ))}
          </>
        ) : search.length > 0 ? (
          search.map((user) => (
            <div
              className="flex justify-between rounded-lg border p-4"
              key={user.id}
            >
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>
                    {user.name.charAt(0) + user.name.charAt(1)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h6 className="text-sm font-semibold">{user.name}</h6>
                  <p className="text-muted-foreground text-xs">{user.email}</p>
                  <div className="flex items-center gap-2 py-2">
                    {usersRoles(user.role)}

                    <Badge
                      className={cn(
                        user.deletedAt === null
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600",
                      )}
                    >
                      {user.deletedAt === null ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <EditUserButton />
                <DeleteUserButton />
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center">
            Nenhum usuário encontrado.
          </p>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-4 border-none bg-white">
        <span className="text-muted-foreground font-semibold">
          1 a 10 de {users.length} movimentações
        </span>

        {hasMore && (
          <Button
            variant="outline"
            className="w-full py-5 text-sm"
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
          >
            Carregar Mais
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
