import { Products } from "@/types/products";
import { calculateGrow } from "@/utils/calculate-grow";
import {
  ArrowUp,
  Layers,
  Package,
  PackageX,
  TriangleAlert,
} from "lucide-react";

export function mapProductsCards(products: Products[]) {
  const lowStock = products.filter((product) => product.currentStock < 10);
  const noStock = products.filter((products) => products.currentStock === 0);

  const totalStock = products.reduce(
    (acc, product) => acc + product.currentStock,
    0,
  );

  const now = new Date();

  const thisMonthProducts = products.filter(({ createdAt }) => {
    const data = new Date(createdAt);

    return (
      data.getMonth() === now.getMonth() &&
      data.getFullYear() === now.getFullYear()
    );
  });

  const lastMonthProducts = products.filter(({ createdAt }) => {
    const date = new Date(createdAt);

    const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;

    const prevYear =
      now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

    return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
  }).length;

  const grow = calculateGrow(thisMonthProducts.length, lastMonthProducts);

  return [
    {
      title: "Total de Produtos",
      stock: products.length,
      description: `+${thisMonthProducts.length} novos este mes`,
      arrowUp: <ArrowUp size={16} />,
      icon: Package,
      color: "#3B82F6",
      bgColor: "#BCD2FB",
    },

    {
      title: "Estoque Baixo",
      stock: lowStock.length,
      description: "requerem atenção",
      icon: TriangleAlert,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },

    {
      title: "Produtos Sem Estoque",
      stock: noStock.length,
      description: "produtos indisponiveis",
      icon: PackageX,
      color: "#E45858",
      bgColor: "#FCDAD6",
    },

    {
      title: "Valor Total em Estoque",
      stock: totalStock,
      description:
        grow < 0
          ? `-${Math.abs(grow)}% vs mês anterior`
          : `+${grow}% vs mês anterior`,
      arrowUp: <ArrowUp size={16} />,
      icon: Layers,
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },
  ];
}
