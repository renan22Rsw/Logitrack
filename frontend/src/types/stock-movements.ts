import { Products } from "./products";
import { User } from "./user";

export interface StockMovements {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  type: StockMovementType;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;

  product: Products;
  user: User;
}

export interface StockMovementsByPage {
  data: StockMovements[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export enum StockMovementType {
  IN = "IN",
  OUT = "OUT",
}
