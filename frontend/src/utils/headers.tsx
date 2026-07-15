import { ProductCardsTypes } from "@/app/types/products";
import {
  ArrowDown,
  ArrowRightLeft,
  ArrowUp,
  Package,
  Shield,
  ShieldCheck,
  Users,
  UserX,
} from "lucide-react";

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
