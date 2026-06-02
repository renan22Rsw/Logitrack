"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { AuditLogList } from "./list";
import { AuditLogTable } from "./table";

export const AuditLogMain = () => {
  const isMobile = useIsMobile();

  return (
    <main className="px-4">
      {isMobile ? <AuditLogList /> : <AuditLogTable />}
    </main>
  );
};
