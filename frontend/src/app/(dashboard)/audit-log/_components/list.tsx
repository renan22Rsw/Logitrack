import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auditLogsActions, auditLogsRoles } from "@/utils/audit-logs-table";

export const AuditLogList = () => {
  const auditLogs = [
    {
      date: "2024-05-30 09:15",
      user: "Helena",
      role: "OPERATOR",
      action: "Stock_In",
      description: "Entrada de 100 unidades do produto X no estoque.",
    },

    {
      date: "2024-05-30 09:20",
      user: "Maria",
      role: "MANAGER",
      action: "Stock_Out",
      description: "Entrada de 100 unidades do produto X no estoque.",
    },

    {
      date: "2024-05-30 09:15",
      user: "John Doe",
      role: "ADMIN",
      action: "Create",

      description: "Um novo produto foi criado.",
    },

    {
      date: "2024-05-30 10:02",
      user: "Carlos",
      role: "MANAGER",
      action: "Update",
      description: "Os detalhes de preço do produto foram atualizados.",
    },

    {
      date: "2024-05-30 11:20",
      user: "Paulo",
      role: "OPERATOR",
      action: "Delete",
      description: "Um produto foi removido do estoque.",
    },

    {
      date: "2024-05-30 12:45",
      user: "Roberto",
      role: "MANAGER",
      action: "Create",
      description: "Uma nova conta de usuário foi criada.",
    },

    {
      date: "2024-05-30 13:30",
      user: "Emily",
      role: "ADMIN",
      action: "Login",
      description: "O usuário entrou no sistema.",
    },

    {
      date: "2024-05-30 14:05",
      user: "John Doe",
      role: "OPERATOR",
      action: "Delete",
      description: "Uma conta de usuário foi excluída.",
    },

    {
      date: "2024-05-30 14:05",
      user: "John Doe",
      role: "OPERATOR",
      action: "Logout",
      description: "O usuário saiu do sistema.",
    },

    {
      date: "2024-05-30 14:05",
      user: "Carlos",
      role: "MANAGER",
      action: "Logout",
      description: "O usuário saiu do sistema.",
    },
  ];

  return (
    <div className="space-y-4">
      {auditLogs.map((log, __index) => (
        <Card key={__index}>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 space-y-2">
                <Avatar>
                  <AvatarFallback>{log.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{log.user}</CardTitle>
              </div>
              {auditLogsRoles(log.role)}
            </div>

            <div className="space-y-2">
              {auditLogsActions(log.action)}
              <p className="text-muted-foreground">{log.date}</p>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground px-6">{log.description}</p>
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-col items-center gap-4 py-4">
        <span className="text-muted-foreground font-semibold">
          1 a 10 de {auditLogs.length} registros
        </span>

        <Button variant={"outline"} className="w-full py-5 text-sm">
          Carregar Mais
        </Button>
      </div>
    </div>
  );
};
