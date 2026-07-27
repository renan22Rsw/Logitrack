import { PaginatedResponse } from '@/generics/paginated-response';
import { AuditLog } from '@prisma/client';

export type AuditLogsPaginated = PaginatedResponse<AuditLog[]>;
