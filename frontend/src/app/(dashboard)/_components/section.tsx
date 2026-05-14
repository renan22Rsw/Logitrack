import { AcitivityFeedCard } from "./acitivity-feed-card";
import { ChartLineCard } from "./chart-line-card";
import { DonutChartCard } from "./dounut-chart-card";
import { StockAlertsCard } from "./stock-alerts-card";
import { StockMovementContainer } from "./stock-movement-container";
import { StockTableCard } from "./stock-table-card";

export const DashBoardSection = () => {
  return (
    <section className="px-4 py-8">
      <StockMovementContainer>
        <ChartLineCard />
        <DonutChartCard />
        <AcitivityFeedCard />
      </StockMovementContainer>

      <div className="grid gap-4 py-8 xl:grid-cols-2">
        <StockTableCard />
        <StockAlertsCard />
      </div>
    </section>
  );
};
