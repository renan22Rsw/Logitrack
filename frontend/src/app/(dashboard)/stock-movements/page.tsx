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

interface StockMovementsProps {
  searchParams: {
    search: string;
    page: number;
  };
}

const StockMovements = async ({ searchParams }: StockMovementsProps) => {
  const { search, page } = await searchParams;

  const stockMovements = await getStockMovements();
  const stockMovementsSearch = await getSearchStockMovements(search);

  const stockMovementsPage = await getStockMovementsByPage(page || 1);

  const products = await getProducts();

  return (
    <>
      <StockMovementsHeader
        title="Movimentações"
        description="Acompanhe todas as entradas e saídas de produtos do estoque"
        hasButton
        search={search}
        data={mapStockMovementsCards(stockMovements)}
        placeholder="Busque por movimentações"
      >
        <CreateStockMovementsButton products={products ?? []} />
      </StockMovementsHeader>

      <StockMovementsMain
        stockMovementsPage={stockMovementsPage ?? []}
        stockMovementsSearch={stockMovementsSearch ?? []}
        stockMovementsList={stockMovements ?? []}
      />
    </>
  );
};

export default StockMovements;
