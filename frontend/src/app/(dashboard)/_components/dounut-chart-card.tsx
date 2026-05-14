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

const chartData = [
  { movementType: "entrada", quantity: 89, fill: "#35A75D" },
  { movementType: "saida", quantity: 67, fill: "#E45858" },
];
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

export const DonutChartCard = () => {
  const totalMovements = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.quantity, 0);
  }, []);

  return (
    <Card className="flex flex-col xl:max-w-100">
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
              <span className="text-muted-foreground">(57%)</span>
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
              <span className="text-muted-foreground">(43%)</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
