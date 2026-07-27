"use client";

import { Card, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputSearch } from "../../products/_components/input-search";
import { Role } from "@/types/user";
import { ACTION, ENTITY } from "@/types/audit-logs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AuditHeaderProps {
  search: string;
  roles: Role;
  actions: ACTION;
  entities: ENTITY;
}

export const AuditLogHeader = ({
  search,
  roles,
  actions,
  entities,
}: AuditHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "ALL") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="px-6 py-8">
      <h1 className="text-xl font-bold xl:text-2xl">Audit Log</h1>
      <p className="text-muted-foreground">
        Acompanhe todas as ações do seu sistema
      </p>

      <div className="py-8">
        <Card>
          <CardHeader className="grid grid-cols-2 items-center gap-4 xl:flex">
            <div className="col-span-2">
              <InputSearch
                initialSearch={search}
                placeholder="Buscar por usuário"
              />
            </div>

            <Select
              defaultValue={roles || "ALL"}
              onValueChange={(value) => updateParam("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os Usuários" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">Todos os Usuários</SelectItem>
                <SelectItem value="ADMIN">Administrador</SelectItem>
                <SelectItem value="MANAGER">Gerente</SelectItem>
                <SelectItem value="OPERATOR">Operador</SelectItem>
              </SelectContent>
            </Select>

            <Select
              defaultValue={actions || "ALL"}
              onValueChange={(value) => updateParam("action", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos as Ações" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">Todos as Ações</SelectItem>
                <SelectItem value="CREATE">Criar</SelectItem>
                <SelectItem value="UPDATE">Atualizar</SelectItem>
                <SelectItem value="DELETE">Deletar</SelectItem>
              </SelectContent>
            </Select>

            <Select
              defaultValue={entities || "ALL"}
              onValueChange={(value) => updateParam("entity", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos as Entidades" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">Todos as Entidades</SelectItem>
                <SelectItem value="PRODUCT">Produto</SelectItem>
                <SelectItem value="MOVEMENT">Movimentação</SelectItem>
                <SelectItem value="USER">Usuário</SelectItem>
                <SelectItem value="AUTH">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
        </Card>
      </div>
    </header>
  );
};
