import { StockMovements, StockMovementType } from "@/types/stock-movements";
import { ArrowDown, ArrowRightLeft, ArrowUp } from "lucide-react";
import { calculateGrow } from "@/utils/calculate-grow";

export const mapStockMovementsCards = (stockMovements: StockMovements[]) => {
  const now = new Date();

  const currentMonthMovements = stockMovements.filter(({ createdAt }) => {
    const date = new Date(createdAt);

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  const previousMonthMovements = stockMovements.filter(({ createdAt }) => {
    const date = new Date(createdAt);

    const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;

    const prevYear =
      now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

    return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
  });

  const totalStockMovements = stockMovements.length;

  const totalStockIn = stockMovements.filter(
    ({ type }) => type === StockMovementType.IN,
  ).length;

  const totalStockOut = stockMovements.filter(
    ({ type }) => type === StockMovementType.OUT,
  ).length;

  const currentMonthIn = currentMonthMovements.filter(
    ({ type }) => type === StockMovementType.IN,
  ).length;

  const previousMonthIn = previousMonthMovements.filter(
    ({ type }) => type === StockMovementType.IN,
  ).length;

  const currentMonthOut = currentMonthMovements.filter(
    ({ type }) => type === StockMovementType.OUT,
  ).length;

  const previousMonthOut = previousMonthMovements.filter(
    ({ type }) => type === StockMovementType.OUT,
  ).length;

  const differenceIn = currentMonthIn - previousMonthIn;
  const differenceOut = currentMonthOut - previousMonthOut;

  const grow = calculateGrow(
    currentMonthMovements.length,
    previousMonthMovements.length,
  );

  return [
    {
      title: "Total de Entradas",
      stock: totalStockIn,
      description: `${differenceIn > 0 ? "+" : ""}${differenceIn} entradas vs mês anterior`,
      arrowUp: <ArrowUp size={16} />,
      icon: ArrowUp,
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },

    {
      title: "Total de Saídas",
      stock: totalStockOut,
      description: `${differenceOut > 0 ? "+" : ""}${differenceOut} saidas vs mês anterior`,
      arrowUp: <ArrowUp size={16} />,
      icon: ArrowDown,
      color: "#E45858",
      bgColor: "#FCDAD6",
    },

    {
      title: "Movimentações totais",
      stock: totalStockMovements,
      description:
        grow < 0
          ? `sem movimentações no mês anterior`
          : `${grow}% vs mes anterior`,
      arrowUp: <ArrowUp size={16} />,
      icon: ArrowRightLeft,
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
    },
  ];
};
