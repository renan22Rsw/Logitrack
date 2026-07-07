"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { StockMovementsTable } from "./table";
import { StockMovementsList } from "./list";
import { StockMovements, StockMovementsByPage } from "@/types/stock-movements";

interface StockMovementsMainProps {
  stockMovementsPage: StockMovementsByPage;
  stockMovementsList: StockMovements[];
}

export const StockMovementsMain = ({
  stockMovementsPage,
  stockMovementsList,
}: StockMovementsMainProps) => {
  const isMobile = useIsMobile();

  return (
    <main className="px-4">
      {isMobile ? (
        <StockMovementsList stockMovements={stockMovementsList} />
      ) : (
        <StockMovementsTable
          page={stockMovementsPage}
          search={stockMovementsList}
        />
      )}
    </main>
  );
};
