import { StockMovements, StockMovementsByPage } from "@/types/stock-movements";
import { fetchApi } from "../api";

export const getStockMovements = (): Promise<StockMovements[]> =>
  fetchApi<StockMovements[]>("/stock-movements");

export const getSearchStockMovements = (
  search: string,
): Promise<StockMovements[]> =>
  fetchApi<StockMovements[]>(`/stock-movements?search=${search}`);

export const getStockMovementsByPage = (
  page: number,
): Promise<StockMovementsByPage> =>
  fetchApi<StockMovementsByPage>(`/stock-movements?page=${page}&limit=10`);
