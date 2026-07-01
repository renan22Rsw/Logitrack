import { StockMovement } from '@prisma/client';

export interface FindAllStockMovementsResponse {
  data: StockMovement[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
