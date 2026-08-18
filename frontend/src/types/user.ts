import { PaginatedResponse } from "@/generics/response";
import { StockMovements } from "./stock-movements";
import { AuditLogs } from "./audit-logs";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  about?: string;
  mustChangePassword: boolean;
  createdAt: Date;
  deletedAt: Date;

  movements?: StockMovements[];
  auditLogs?: AuditLogs[];
}

export type Role = "ADMIN" | "MANAGER" | "OPERATOR";

export type UsersByPage = PaginatedResponse<User>;
