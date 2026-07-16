import { PaginatedResponse } from "@/generics/response";
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

export type StockMovementsByPage = PaginatedResponse<StockMovements>;

type StockMovementType = "IN" | "OUT";
