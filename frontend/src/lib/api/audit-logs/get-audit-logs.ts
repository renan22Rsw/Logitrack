import { AuditLogsByPage, ACTION, ENTITY, AuditLogs } from "@/types/audit-logs";
import { fetchApi } from "../api";
import { Role } from "@/types/user";

export const getAllAuditLogs = (): Promise<AuditLogs[]> =>
  fetchApi<AuditLogs[]>("/audit-logs");

export const getAllAuditLogsList = (
  action?: ACTION,
  entity?: ENTITY,
  role?: Role,
): Promise<AuditLogs[]> =>
  fetchApi<AuditLogs[]>(
    `/audit-logs?action=${action}&entity=${entity}&role=${role}`,
  );

export const getSearchAuditLogs = (search: string): Promise<AuditLogs[]> =>
  fetchApi<AuditLogs[]>(`/audit-logs?search=${search}`);

export const getAuditLogsByPage = (
  page: number,
  action?: ACTION,
  entity?: ENTITY,
  role?: Role,
): Promise<AuditLogsByPage> =>
  fetchApi<AuditLogsByPage>(
    `/audit-logs?page=${page}&limit=10&action=${action}&entity=${entity}&role=${role}`,
  );
