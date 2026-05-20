"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { StockMovementsTable } from "./table";
import { StockMovementsList } from "./list";

export const StockMovementsMain = () => {
  const isMobile = useIsMobile();

  return (
    <main className="px-4">
      {isMobile ? <StockMovementsList /> : <StockMovementsTable />}
    </main>
  );
};
