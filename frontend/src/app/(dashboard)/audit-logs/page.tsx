import { ACTION, ENTITY } from "@/types/audit-logs";
import { AuditLogHeader } from "./_components/header";
import { AuditLogMain } from "./_components/main";
import { Role } from "@/types/user";
import {
  getAllAuditLogsList,
  getAuditLogsByPage,
  getSearchAuditLogs,
} from "@/lib/api/audit-logs/get-audit-logs";
import { Metadata } from "next";

interface AuditLogsProps {
  searchParams: {
    search: string;
    page: number;
    action: ACTION;
    entity: ENTITY;
    role: Role;
  };
}

export const metadata: Metadata = {
  title: "Registros",
};

const AuditLogs = async ({ searchParams }: AuditLogsProps) => {
  const { search, page, action, entity, role } = await searchParams;

  const auditLogs = await getAllAuditLogsList(
    action ?? "",
    entity ?? "",
    role ?? "",
  );

  const auditLogsSearch = search ? await getSearchAuditLogs(search) : auditLogs;

  const auditLogsPage = await getAuditLogsByPage(
    page || 1,
    action ?? "",
    entity ?? "",
    role ?? "",
  );

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

export default AuditLogs;
