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

export const ChartLineCard = () => {
  const [timeRange, setTimeRange] = useState("90d");

  const stockMovementsData = [
    { date: "2026-04-14", entries: 32, outputs: 12, total: 44 },
    { date: "2026-04-15", entries: 40, outputs: 18, total: 58 },
    { date: "2026-04-16", entries: 28, outputs: 10, total: 38 },
    { date: "2026-04-17", entries: 52, outputs: 25, total: 77 },
    { date: "2026-04-18", entries: 36, outputs: 14, total: 50 },
    { date: "2026-04-19", entries: 48, outputs: 20, total: 68 },
    { date: "2026-04-20", entries: 60, outputs: 28, total: 88 },
    { date: "2026-04-21", entries: 42, outputs: 16, total: 58 },
    { date: "2026-04-22", entries: 55, outputs: 22, total: 77 },
    { date: "2026-04-23", entries: 38, outputs: 15, total: 53 },

    { date: "2026-04-24", entries: 64, outputs: 30, total: 94 },
    { date: "2026-04-25", entries: 50, outputs: 24, total: 74 },
    { date: "2026-04-26", entries: 44, outputs: 19, total: 63 },
    { date: "2026-04-27", entries: 70, outputs: 35, total: 105 },
    { date: "2026-04-28", entries: 58, outputs: 26, total: 84 },
    { date: "2026-04-29", entries: 62, outputs: 27, total: 89 },
    { date: "2026-04-30", entries: 46, outputs: 17, total: 63 },
    { date: "2026-05-01", entries: 68, outputs: 32, total: 100 },
    { date: "2026-05-02", entries: 54, outputs: 21, total: 75 },
    { date: "2026-05-03", entries: 72, outputs: 34, total: 106 },

    { date: "2026-05-04", entries: 66, outputs: 29, total: 95 },
    { date: "2026-05-05", entries: 49, outputs: 18, total: 67 },
    { date: "2026-05-06", entries: 75, outputs: 38, total: 113 },
    { date: "2026-05-07", entries: 57, outputs: 23, total: 80 },
    { date: "2026-05-08", entries: 80, outputs: 40, total: 120 },
    { date: "2026-05-09", entries: 63, outputs: 28, total: 91 },
    { date: "2026-05-10", entries: 77, outputs: 36, total: 113 },
    { date: "2026-05-11", entries: 59, outputs: 25, total: 84 },
    { date: "2026-05-12", entries: 83, outputs: 42, total: 125 },
    { date: "2026-05-13", entries: 71, outputs: 31, total: 102 },
  ];

  const filteredData = stockMovementsData.filter((item) => {
    const date = new Date(item.date);

    const now = new Date();

    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(now);

    startDate.setDate(now.getDate() - daysToSubtract);

    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <CardTitle>Entradas e Saidas</CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>

            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Ultimos 90 dias
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Ultimos 30 dias
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Ultimos 7 dias
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4 py-4">
          <span className="flex items-center gap-2">
            <GitCommitHorizontal color="#35A75D" /> Entrada
          </span>
          <span className="flex items-center gap-2">
            <GitCommitHorizontal color="#E45858" /> Saida
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={filteredData}
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
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                });
              }}
            />

            <YAxis width="auto" stroke="var(--color-text-3)" />

            <Tooltip
              cursor={{
                stroke: "var(--color-border-2)",
              }}
              contentStyle={{
                backgroundColor: "var(--color-surface-raised)",
                borderColor: "var(--color-border-2)",
              }}
            />

            <Line
              type="monotone"
              dataKey="entries"
              stroke="#35A75D"
              strokeWidth={3}
              dot={{
                fill: "var(--color-surface-base)",
              }}
              activeDot={{
                r: 8,
                stroke: "var(--color-surface-base)",
              }}
            />

            <Line
              type="monotone"
              dataKey="outputs"
              stroke="#E45858"
              strokeWidth={3}
              dot={{
                fill: "var(--color-surface-base)",
              }}
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
