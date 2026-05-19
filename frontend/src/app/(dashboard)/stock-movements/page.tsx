import { ProductsHeader as StockMovementsHeader } from "../products/_components/header";
import { stockMovementsCards } from "@/utils/headers";
import { StockMovementsMain } from "./_components/main";

const StockMovements = () => {
  return (
    <>
      <StockMovementsHeader
        title="Movimentações"
        description="Acompanhe todas as entradas e saídas de produtos do estoque"
        hasButton={false}
        data={stockMovementsCards}
      />
      <StockMovementsMain />
    </>
  );
};

export default StockMovements;
