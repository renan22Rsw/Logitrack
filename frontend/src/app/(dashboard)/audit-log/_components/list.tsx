import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditLogs } from "@/types/audit-logs";
import { auditLogsActions, auditLogsRoles } from "@/utils/audit-logs";
import { formatDate } from "@/utils/format-date";
import { useState } from "react";

interface AuditLogsListProps {
  auditLogs: AuditLogs[];
  search: AuditLogs[];
  searchTerm?: string;
}

export const AuditLogList = ({
  auditLogs,
  search,
  searchTerm,
}: AuditLogsListProps) => {
  const ITEMS_PER_PAGE = 10;
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  const visibleAuditLogs = auditLogs.slice(0, visibleCount);
  const hasMore = visibleCount < auditLogs.length;
  const hasSearch = searchTerm?.trim() !== "" && searchTerm !== undefined;

  return (
    <div className="space-y-4">
      {!hasSearch ? (
        <>
          {visibleAuditLogs.map((auditLog) => (
            <Card key={auditLog.id}>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 space-y-2">
                    <Avatar>
                      <AvatarFallback>
                        {auditLog.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{auditLog.user.name}</CardTitle>
                  </div>
                  {auditLogsRoles(auditLog.user.role)}
                </div>

                <div className="space-y-2">
                  {auditLogsActions(auditLog.action)}
                  <p className="text-muted-foreground">
                    {formatDate(auditLog.createdAt)}
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground px-6">
                  {auditLog.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </>
      ) : search.length > 0 ? (
        search.map((auditLog) => (
          <Card key={auditLog.id}>
            <CardHeader className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 space-y-2">
                  <Avatar>
                    <AvatarFallback>
                      {auditLog.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{auditLog.user.name}</CardTitle>
                </div>
                {auditLogsRoles(auditLog.user.role)}
              </div>

              <div className="space-y-2">
                {auditLogsActions(auditLog.action)}
                <p className="text-muted-foreground">
                  {formatDate(auditLog.createdAt)}
                </p>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground px-6">
                {auditLog.description}
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-muted-foreground text-center">
          Nenhum log encontrado.
        </p>
      )}

      <div className="flex flex-col items-center gap-4 py-4">
        <span className="text-muted-foreground font-semibold">
          1 a 10 de {auditLogs.length} registros
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
      </div>
    </div>
  );
};
