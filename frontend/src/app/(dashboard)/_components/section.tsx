import { StockMovements } from "@/types/stock-movements";
import { AcitivityFeedCard } from "./acitivity-feed-card";
import { ChartLineCard } from "./chart-line-card";
import { DonutChartCard } from "./dounut-chart-card";
import { StockAlertsCard } from "./stock-alerts-card";
import { StockMovementContainer } from "./stock-movement-container";
import { StockTableCard } from "./stock-table-card";
import { Products } from "@/types/products";

interface DashBoardMainProps {
  stockMovements: StockMovements[];
  products: Products[];
}

export const DashBoardMain = ({
  stockMovements,
  products,
}: DashBoardMainProps) => {
  return (
    <section className="px-4 py-8">
      <StockMovementContainer>
        <ChartLineCard stockMovements={stockMovements ?? []} />
        <DonutChartCard stockMovements={stockMovements ?? []} />
        <AcitivityFeedCard stockMovements={stockMovements ?? []} />
      </StockMovementContainer>

      <div className="grid gap-4 py-8 xl:grid-cols-2">
        <StockTableCard products={products ?? []} />
        <StockAlertsCard products={products ?? []} />
      </div>
    </section>
  );
};
