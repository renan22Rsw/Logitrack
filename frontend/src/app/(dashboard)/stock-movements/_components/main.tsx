"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { StockMovementsTable } from "./table";
import { StockMovementsList } from "./list";
import { StockMovements, StockMovementsByPage } from "@/types/stock-movements";

interface StockMovementsMainProps {
  stockMovementsPage: StockMovementsByPage;
  stockMovementsList: StockMovements[];
  stockMovementsSearch: StockMovements[];
  searchTerm?: string;
}

export const StockMovementsMain = ({
  stockMovementsPage,
  stockMovementsList,
  stockMovementsSearch,
  searchTerm,
}: StockMovementsMainProps) => {
  const isMobile = useIsMobile();

  return (
    <main className="px-4">
      {isMobile ? (
        <StockMovementsList
          stockMovements={stockMovementsList}
          search={stockMovementsSearch}
          searchTerm={searchTerm}
        />
      ) : (
        <StockMovementsTable
          page={stockMovementsPage}
          search={stockMovementsSearch}
          searchTerm={searchTerm}
        />
      )}
    </main>
  );
};
