export interface AuditLogs {
  id: string;
  action: ACTION;
  entity: ENTITY;
  entityId: string;
  description: string;
  userId: string;
  createdAt: Date;
}

export type ACTION =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "STOCK_IN"
  | "STOCK_OUT";

export type ENTITY = "USER" | "PRODUCT" | "MOVEMENT" | "AUTH";
