import { StockMovements, StockMovementsByPage } from "@/types/stock-movements";
import { cookies } from "next/headers";

export const getStockMovements = async (): Promise<StockMovements[]> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/stock-movements`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
      },
    );
    const data: StockMovements[] = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Erro ao buscar movimentações de estoque");
  }
};

export const getSearchStockMovements = async (
  search: string,
): Promise<StockMovements[]> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/stock-movements?search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
      },
    );
    const data: StockMovements[] = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Erro ao buscar movimentações de estoque");
  }
};

export const getStockMovementsByPage = async (
  page: number,
): Promise<StockMovementsByPage> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/stock-movements?page=${page}&limit=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
      },
    );
    const data: StockMovementsByPage = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Erro ao buscar movimentações de estoque");
  }
};
