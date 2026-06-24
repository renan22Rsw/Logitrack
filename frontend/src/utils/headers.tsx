import { ProductCardsTypes } from "@/app/types/products";
import {
  ArrowDown,
  ArrowRightLeft,
  ArrowUp,
  Layers,
  Package,
  PackageX,
  Shield,
  ShieldCheck,
  TriangleAlert,
  Users,
  UserX,
} from "lucide-react";

export const stockMovementsCards: ProductCardsTypes[] = [
  {
    title: "Total de Entradas",
    stock: 1248,
    description: `+18 vs mes anterior`,
    arrowUp: <ArrowUp size={16} />,
    icon: ArrowUp,
    color: "#35A75D",
    bgColor: "#DCFCE7",
  },

  {
    title: "Total de Saídas",
    stock: 1089,
    description: `+18 vs mes anterior`,
    arrowUp: <ArrowUp size={16} />,
    icon: ArrowDown,
    color: "#E45858",
    bgColor: "#FCDAD6",
  },

  {
    title: "Movimentações totais",
    stock: 2337,
    description: `+15% vs mes anterior`,
    arrowUp: <ArrowUp size={16} />,
    icon: ArrowRightLeft,
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
  },

  {
    title: "Produtos Movimentados",
    stock: 156,
    description: "+9% vs mes anterior",
    arrowUp: <ArrowUp size={16} />,
    icon: Package,
    color: "#F59E0B",
    bgColor: "#FEF3C7",
  },
];

export const usersCards: ProductCardsTypes[] = [
  {
    title: "Total de Usuarios",
    stock: 24,
    description: `+3 novos este mes`,
    arrowUp: <ArrowUp size={16} />,
    icon: Users,
    color: "#3B82F6",
    bgColor: "#BCD2FB",
  },

  {
    title: "Usuarios Ativos",
    stock: 21,
    description: "+3 novos este mes",
    arrowUp: <ArrowUp size={16} />,
    icon: ShieldCheck,
    color: "#35A75D",
    bgColor: "#DCFCE7",
  },

  {
    title: "Usuarios Inativos",
    stock: 10,
    description: `+3 novos este mes`,
    arrowUp: <ArrowUp size={16} />,
    icon: UserX,
    color: "#F59E0B",
    bgColor: "#FEF3C7",
  },

  {
    title: "Perfil de Acesso",
    stock: 3,
    description: `Perfil Cadastrado`,
    icon: Shield,
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
  },
];
