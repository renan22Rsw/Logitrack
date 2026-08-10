import { PaginatedResponse } from '@/generics/paginated-response';
import { StockMovement } from '@prisma/client';

export type StockMovementsPaginated = PaginatedResponse<StockMovement[]>;
