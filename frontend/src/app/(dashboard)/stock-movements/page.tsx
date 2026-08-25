import { ProductsHeader as StockMovementsHeader } from "../products/_components/header";
import { StockMovementsMain } from "./_components/main";
import {
  getSearchStockMovements,
  getStockMovements,
  getStockMovementsByPage,
} from "@/lib/api/stock-movements/get-stock-movements";

import { mapStockMovementsCards } from "@/adapters/stock-movements";
import { CreateStockMovementsButton } from "./_components/create-stock-movements-button";
import { getProducts } from "@/lib/api/products/get-products";
import { getCurrentUser } from "@/lib/api/users/get-user";
import { redirect } from "next/navigation";

interface StockMovementsProps {
  searchParams: {
    search: string;
    page: number;
  };
}

const StockMovements = async ({ searchParams }: StockMovementsProps) => {
  const { search, page } = await searchParams;

  const stockMovements = await getStockMovements();
  const stockMovementsSearch = search
    ? await getSearchStockMovements(search)
    : stockMovements;

  const stockMovementsPage = await getStockMovementsByPage(page || 1);

  const products = await getProducts();

  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <StockMovementsHeader
        title="Movimentações"
        description="Acompanhe todas as entradas e saídas de produtos do estoque"
        hasButton
        search={search}
        data={mapStockMovementsCards(stockMovements ?? [])}
        placeholder="Busque por movimentações"
      >
        <CreateStockMovementsButton
          products={products ?? []}
          currentUser={user ?? null}
        />
      </StockMovementsHeader>

      <StockMovementsMain
        stockMovementsPage={stockMovementsPage ?? []}
        stockMovementsSearch={stockMovementsSearch ?? []}
        stockMovementsList={stockMovements ?? []}
        searchTerm={search}
      />
    </>
  );
};

export default StockMovements;
