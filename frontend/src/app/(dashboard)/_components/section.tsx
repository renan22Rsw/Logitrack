import { ChartLineCard } from "./chart-line-card";

export const DashBoardSection = () => {
  return (
    <section className="px-4 py-8">
      <div className="grid xl:grid-cols-3">
        <ChartLineCard />
      </div>
    </section>
  );
};
