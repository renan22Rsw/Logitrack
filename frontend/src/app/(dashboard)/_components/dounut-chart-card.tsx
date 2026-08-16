"use client";

import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useMemo } from "react";

export const description = "A donut chart with text";

import { Diamond } from "lucide-react";
import { StockMovements, StockMovementType } from "@/types/stock-movements";

const chartConfig = {
  quantity: {
    label: "Quantidade",
  },
  entrada: {
    label: "Entrada",
    color: "#35A75D",
  },
  saida: {
    label: "Saída",
    color: "#E45858",
  },
} satisfies ChartConfig;

interface DonutChartCardProps {
  stockMovements: StockMovements[];
}

export const DonutChartCard = ({ stockMovements }: DonutChartCardProps) => {
  const chartData = useMemo(() => {
    const totals = stockMovements.reduce(
      (acc, stockMovement) => {
        if (stockMovement.type === "IN") {
          acc.entrada += stockMovement.quantity ?? 0;
        } else if (stockMovement.type === "OUT") {
          acc.saida += stockMovement.quantity ?? 0;
        }
        return acc;
      },
      { entrada: 0, saida: 0 },
    );

    return [
      {
        movementType: "IN" as StockMovementType,
        quantity: totals.entrada,
        fill: "#35A75D",
      },
      {
        movementType: "OUT" as StockMovementType,
        quantity: totals.saida,
        fill: "#E45858",
      },
    ];
  }, [stockMovements]);

  const totalMovements = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [chartData]);

  const stockInPercentage = totalMovements
    ? Math.round((chartData[0].quantity / totalMovements) * 100)
    : 0;

  const stockOutPercentage = totalMovements
    ? Math.round((chartData[1].quantity / totalMovements) * 100)
    : 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Movimentações por Tipo</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-72"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="quantity"
              nameKey="movementType"
              innerRadius={70}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalMovements.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="mt-4 flex justify-between">
          <div>
            <div className="flex items-center">
              <Diamond
                color="#35A75D"
                size={14}
                fill="#35A75D"
                className="mr-2"
              />
              <h6 className="text-muted-foreground font-semibold">Entradas</h6>
            </div>
            <p className="font-bold">
              {chartData[0].quantity}{" "}
              <span className="text-muted-foreground">
                ({stockInPercentage}%)
              </span>
            </p>
          </div>

          <div>
            <div className="flex items-center">
              <Diamond
                color="#E45858"
                size={14}
                fill="#E45858"
                className="mr-2"
              />
              <h6 className="text-muted-foreground font-semibold">Saidas</h6>
            </div>
            <p className="font-bold">
              {" "}
              {chartData[1].quantity}{" "}
              <span className="text-muted-foreground">
                ({stockOutPercentage}%)
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
