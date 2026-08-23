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
} from "@/utils/audit-logs";
import { AuditLogs, AuditLogsByPage } from "@/types/audit-logs";
import { formatDate } from "@/utils/format-date";
import { Badge } from "@/components/ui/badge";

interface AuditLogsTableProps {
  page: AuditLogsByPage;
  search: AuditLogs[];
  searchTerm?: string;
}

export const AuditLogTable = ({
  page,
  search,
  searchTerm,
}: AuditLogsTableProps) => {
  const hasSearch = searchTerm?.trim() !== "" && searchTerm !== undefined;

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
            {!hasSearch ? (
              page.data.map((auditLog) => (
                <TableRow key={auditLog.id}>
                  <TableCell className="text-muted-foreground">
                    {formatDate(auditLog.createdAt)}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>
                        {auditLog.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {auditLog.user.name}

                    {auditLog.user.isDemo ? (
                      <Badge className="bg-purple-200 text-purple-600">
                        Guest
                      </Badge>
                    ) : (
                      auditLogsRoles(auditLog.user.role)
                    )}
                  </TableCell>
                  <TableCell>{auditLogsActions(auditLog.action)}</TableCell>

                  <TableCell>{auditLogsEntities(auditLog.entity)}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {auditLog.description}
                  </TableCell>
                </TableRow>
              ))
            ) : search.length > 0 ? (
              search.map((auditLog) => (
                <TableRow key={auditLog.id}>
                  <TableCell className="text-muted-foreground">
                    {formatDate(auditLog.createdAt)}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>
                        {auditLog.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {auditLog.user.name}

                    {auditLog.user.isDemo ? (
                      <Badge className="bg-purple-200 text-purple-600">
                        Guest
                      </Badge>
                    ) : (
                      auditLogsRoles(auditLog.user.role)
                    )}
                  </TableCell>
                  <TableCell>{auditLogsActions(auditLog.action)}</TableCell>

                  <TableCell>{auditLogsEntities(auditLog.entity)}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {auditLog.description}
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
      <CardFooter>
        <span className="text-muted-foreground w-full text-sm font-semibold">
          Mostrando {(page.meta.page - 1) * page.meta.limit + 1} a{" "}
          {Math.min(page.meta.page * page.meta.limit, page.meta.total)} de{" "}
          {page.meta.total} produtos
        </span>
      </CardFooter>
      <AuditLogPagination meta={page.meta} />
    </Card>
  );
};
