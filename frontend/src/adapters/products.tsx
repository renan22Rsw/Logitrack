import { ProductCardsTypes } from "@/app/types/products";
import { Products } from "@/types/products";
import { calculateGrow } from "@/utils/calculate-products-grow";
import {
  ArrowUp,
  Layers,
  Package,
  PackageX,
  TriangleAlert,
} from "lucide-react";

export function mapProductsCards(products: Products[]): ProductCardsTypes[] {
  const lowStock = products.filter((product) => product.currentStock < 10);
  const noStock = products.filter((products) => products.currentStock === 0);

  const totalStock = products.reduce(
    (acc, product) => acc + product.currentStock,
    0,
  );

  const now = new Date();
  const createdThisMonth = products.filter((product) => {
    const created = new Date(product.createdAt);

    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    );
  }).length;

  const previousMonth = products.filter((product) => {
    const date = new Date(product.createdAt);

    const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;

    const prevYear =
      now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

    return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
  }).length;

  const grow = calculateGrow(createdThisMonth, previousMonth);

  return [
    {
      title: "Total de Produtos",
      stock: products.length,
      description: `+${createdThisMonth} novos este mes`,
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
      description: `+${grow}% vs mes anterior`,
      arrowUp: <ArrowUp size={16} />,
      icon: Layers,
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },
  ];
}
