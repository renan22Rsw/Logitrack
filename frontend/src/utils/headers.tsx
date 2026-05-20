import { ProductCardsTypes } from "@/app/types/products";
import {
  ArrowDown,
  ArrowRightLeft,
  ArrowUp,
  Layers,
  Package,
  PackageX,
  TriangleAlert,
} from "lucide-react";

export const productCards: ProductCardsTypes[] = [
  {
    title: "Total de Produtos",
    value: 248,
    description: `+3 novos este mes`,
    arrowUp: <ArrowUp size={16} />,
    icon: Package,
    color: "#3B82F6",
    bgColor: "#BCD2FB",
  },

  {
    title: "Estoque Baixo",
    value: 18,
    description: "requerem atenção",
    icon: TriangleAlert,
    color: "#F59E0B",
    bgColor: "#FEF3C7",
  },

  {
    title: "Produtos Sem Estoque",
    value: 12,
    description: "produtos indisponiveis",
    icon: PackageX,
    color: "#E45858",
    bgColor: "#FCDAD6",
  },

  {
    title: "Valor Total em Estoque",
    description: "+8% vs mes anterior",
    arrowUp: <ArrowUp size={16} />,
    icon: Layers,
    color: "#35A75D",
    bgColor: "#DCFCE7",
    value: 1224,
  },
];

export const stockMovementsCards: ProductCardsTypes[] = [
  {
    title: "Total de Entradas",
    value: 1248,
    description: `+18 vs mes anterior`,
    arrowUp: <ArrowUp size={16} />,
    icon: ArrowUp,
    color: "#35A75D",
    bgColor: "#DCFCE7",
  },

  {
    title: "Total de Saídas",
    value: 1089,
    description: `+18 vs mes anterior`,
    arrowUp: <ArrowUp size={16} />,
    icon: ArrowDown,
    color: "#E45858",
    bgColor: "#FCDAD6",
  },

  {
    title: "Movimentações totais",
    value: 2337,
    description: `+15% vs mes anterior`,
    arrowUp: <ArrowUp size={16} />,
    icon: ArrowRightLeft,
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
  },

  {
    title: "Produtos Movimentados",
    value: 156,
    description: "+9% vs mes anterior",
    arrowUp: <ArrowUp size={16} />,
    icon: Package,
    color: "#F59E0B",
    bgColor: "#FEF3C7",
  },
];
