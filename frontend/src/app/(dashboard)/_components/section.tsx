import { ChartLineCard } from "./chart-line-card";
import { DonutChartCard } from "./dounut-chart-card";

export const DashBoardSection = () => {
  return (
    <section className="px-4 py-8">
      <div className="grid gap-4 xl:grid-cols-3">
        <ChartLineCard />
        <DonutChartCard />
      </div>
    </section>
  );
};
