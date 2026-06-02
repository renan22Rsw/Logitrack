import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AuditLogHeader = () => {
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
              <Input
                placeholder="Buscar por usuário"
                className="placeholder:text-xs xl:max-w-80"
              />
            </div>

            <Select>
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

            <Select>
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

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos as Entidades" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">Todos as Entidades</SelectItem>
                <SelectItem value="PRODUCT">Produto</SelectItem>
                <SelectItem value="MOVEMENT">Movimentação</SelectItem>
                <SelectItem value="USER">Usuário</SelectItem>
                <SelectItem value="SYSTEM">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
        </Card>
      </div>
    </header>
  );
};
