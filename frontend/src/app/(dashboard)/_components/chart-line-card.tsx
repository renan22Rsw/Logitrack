"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { RechartsDevtools } from "@recharts/devtools";

import { GitCommitHorizontal } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

import { StockMovements } from "@/types/stock-movements";
import { formatDate } from "@/utils/format-date";

interface ChartLineCardProps {
  stockMovements: StockMovements[];
}

interface ChartData {
  date: string;
  entries: number;
  outputs: number;
}

export const ChartLineCard = ({ stockMovements }: ChartLineCardProps) => {
  const [timeRange, setTimeRange] = useState("7d");

  let daysToSubtract = 90;

  if (timeRange === "30d") {
    daysToSubtract = 30;
  }

  if (timeRange === "7d") {
    daysToSubtract = 7;
  }

  const today = new Date();

  const startDate = new Date(today);
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(today.getDate() - daysToSubtract);

  const chartMap = new Map<string, ChartData>();

  for (
    let date = new Date(startDate);
    date <= today;
    date.setDate(date.getDate() + 1)
  ) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const dateKey = `${year}-${month}-${day}`;

    chartMap.set(dateKey, {
      date: dateKey,
      entries: 0,
      outputs: 0,
    });
  }

  stockMovements.forEach((movement) => {
    const movementDate = new Date(movement.createdAt);

    if (movementDate < startDate || movementDate > today) {
      return;
    }
    const year = movementDate.getFullYear();
    const month = String(movementDate.getMonth() + 1).padStart(2, "0");
    const day = String(movementDate.getDate()).padStart(2, "0");

    const dateKey = `${year}-${month}-${day}`;

    const currentDay = chartMap.get(dateKey);

    if (!currentDay) {
      return;
    }

    if (movement.type === "IN") {
      currentDay.entries += movement.quantity;
    }

    if (movement.type === "OUT") {
      currentDay.outputs += movement.quantity;
    }
  });

  const chartData = Array.from(chartMap.values());

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <CardTitle>Entradas e Saídas</CardTitle>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>

            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 90 dias
              </SelectItem>

              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 dias
              </SelectItem>

              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 dias
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4 py-4">
          <span className="flex items-center gap-2">
            <GitCommitHorizontal color="#35A75D" />
            Entrada
          </span>

          <span className="flex items-center gap-2">
            <GitCommitHorizontal color="#E45858" />
            Saída
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            syncId="stockMovements"
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border-3)"
            />

            <XAxis
              dataKey="date"
              stroke="var(--color-text-3)"
              tickMargin={10}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
              tickFormatter={(value) => {
                return formatDate(new Date(value));
              }}
            />

            <YAxis
              width="auto"
              stroke="var(--color-text-3)"
              allowDecimals={false}
            />

            <Tooltip
              cursor={{
                stroke: "var(--color-border-2)",
              }}
              labelFormatter={(value) => {
                return formatDate(new Date(value));
              }}
              contentStyle={{
                backgroundColor: "var(--color-surface-raised)",
                borderColor: "var(--color-border-2)",
              }}
            />

            <Line
              type="monotone"
              dataKey="entries"
              name="Entrada"
              stroke="#35A75D"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 8,
                stroke: "var(--color-surface-base)",
              }}
            />

            <Line
              type="monotone"
              dataKey="outputs"
              name="Saída"
              stroke="#E45858"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 8,
                stroke: "var(--color-surface-base)",
              }}
            />

            <RechartsDevtools />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
