"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { AuditLogList } from "./list";
import { AuditLogTable } from "./table";
import { AuditLogs, AuditLogsByPage } from "@/types/audit-logs";

interface AuditLogsMainProps {
  auditLogsPage: AuditLogsByPage;
  auditLogsList: AuditLogs[];
  auditLogSearch: AuditLogs[];
  searchTerm?: string;
}

export const AuditLogMain = ({
  auditLogsPage,
  auditLogsList,
  auditLogSearch,
  searchTerm,
}: AuditLogsMainProps) => {
  const isMobile = useIsMobile();

  return (
    <main className="px-4">
      {isMobile ? (
        <AuditLogList
          auditLogs={auditLogsList}
          search={auditLogSearch}
          searchTerm={searchTerm}
        />
      ) : (
        <AuditLogTable
          page={auditLogsPage}
          search={auditLogSearch}
          searchTerm={searchTerm}
        />
      )}
    </main>
  );
};
