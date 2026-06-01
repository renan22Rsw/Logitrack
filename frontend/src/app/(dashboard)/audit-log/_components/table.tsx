import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductPagination as AuditLogPagination } from "@/app/(dashboard)/products/_components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  auditLogsActions,
  auditLogsEntities,
  auditLogsRoles,
} from "@/utils/audit-logs-table";

export const AuditLogTable = () => {
  const auditLogs = [
    {
      date: "2024-05-30 09:15",
      user: "Helena",
      role: "OPERATOR",
      action: "Stock_In",
      entity: "Movimentação",
      description: "Entrada de 100 unidades do produto X no estoque.",
    },

    {
      date: "2024-05-30 09:20",
      user: "Maria",
      role: "MANAGER",
      action: "Stock_Out",
      entity: "Movimentação",
      description: "Entrada de 100 unidades do produto X no estoque.",
    },

    {
      date: "2024-05-30 09:15",
      user: "John Doe",
      role: "ADMIN",
      action: "Create",
      entity: "Produto",
      description: "Um novo produto foi criado.",
    },

    {
      date: "2024-05-30 10:02",
      user: "Carlos",
      role: "MANAGER",
      action: "Update",
      entity: "Produto",
      description: "Os detalhes de preço do produto foram atualizados.",
    },

    {
      date: "2024-05-30 11:20",
      user: "Paulo",
      role: "OPERATOR",
      action: "Delete",
      entity: "Produto",
      description: "Um produto foi removido do estoque.",
    },

    {
      date: "2024-05-30 12:45",
      user: "Roberto",
      role: "MANAGER",
      action: "Create",
      entity: "Usuário",
      description: "Uma nova conta de usuário foi criada.",
    },

    {
      date: "2024-05-30 13:30",
      user: "Emily",
      role: "ADMIN",
      action: "Login",
      entity: "Sistema",
      description: "O usuário entrou no sistema.",
    },

    {
      date: "2024-05-30 14:05",
      user: "John Doe",
      role: "OPERATOR",
      action: "Delete",
      entity: "Usuário",
      description: "Uma conta de usuário foi excluída.",
    },

    {
      date: "2024-05-30 14:05",
      user: "John Doe",
      role: "OPERATOR",
      action: "Logout",
      entity: "Sistema",
      description: "O usuário saiu do sistema.",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logs de Auditoria</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date and Time</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log, __index) => (
              <TableRow key={__index}>
                <TableCell className="text-muted-foreground">
                  {log.date}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{log.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {log.user}
                  {auditLogsRoles(log.role)}
                </TableCell>
                <TableCell>{auditLogsActions(log.action)}</TableCell>

                <TableCell>{auditLogsEntities(log.entity)}</TableCell>

                <TableCell className="text-muted-foreground">
                  {log.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <AuditLogPagination />
      <CardFooter></CardFooter>
    </Card>
  );
};
