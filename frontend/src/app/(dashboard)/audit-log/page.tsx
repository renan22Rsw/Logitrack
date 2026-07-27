import { ACTION, ENTITY } from "@/types/audit-logs";
import { AuditLogHeader } from "./_components/header";
import { AuditLogMain } from "./_components/main";
import { Role } from "@/types/user";
import {
  getAllAuditLogs,
  getAuditLogsByPage,
  getSearchAuditLogs,
} from "@/lib/api/audit-logs/get-audit-logs";

interface AuditLogsProps {
  searchParams: {
    search: string;
    page: number;
    action: ACTION;
    entity: ENTITY;
    role: Role;
  };
}

const AuditLog = async ({ searchParams }: AuditLogsProps) => {
  const { search, page, action, entity, role } = await searchParams;

  const auditLogs = await getAllAuditLogs(
    action ?? "",
    entity ?? "",
    role ?? "",
  );

  const auditLogsPage = await getAuditLogsByPage(
    page || 1,
    action ?? "",
    entity ?? "",
    role ?? "",
  );

  const auditLogsSearch = await getSearchAuditLogs(search);

  return (
    <>
      <AuditLogHeader
        search={search ?? ""}
        actions={action ?? ""}
        entities={entity ?? ""}
        roles={role ?? ""}
      />
      <AuditLogMain
        auditLogsPage={auditLogsPage}
        auditLogSearch={auditLogsSearch}
        auditLogsList={auditLogs}
        searchTerm={search}
      />
    </>
  );
};

export default AuditLog;
