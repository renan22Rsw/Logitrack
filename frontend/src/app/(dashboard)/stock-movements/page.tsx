import { ProductsHeader as StockMovementsHeader } from "../products/_components/header";
import { stockMovementsCards } from "@/utils/headers";
import { StockMovementsMain } from "./_components/main";
import {
  getSearchStockMovements,
  getStockMovements,
  getStockMovementsByPage,
} from "@/lib/api/stock-movements/get-stock-movements";

interface StockMovementsProps {
  searchParams: {
    search: string;
    page: number;
  };
}

const StockMovements = async ({ searchParams }: StockMovementsProps) => {
  const { search, page } = await searchParams;

  const stockMovements = search
    ? await getSearchStockMovements(search)
    : await getStockMovements();

  const stockMovementsPage = await getStockMovementsByPage(page || 1);

  return (
    <>
      <StockMovementsHeader
        title="Movimentações"
        description="Acompanhe todas as entradas e saídas de produtos do estoque"
        hasButton
        search={search}
        data={stockMovementsCards}
        placeholder="Busque por movimentações"
      />
      <StockMovementsMain
        stockMovementsPage={stockMovementsPage ?? []}
        stockMovementsList={stockMovements ?? []}
      />
    </>
  );
};

export default StockMovements;
