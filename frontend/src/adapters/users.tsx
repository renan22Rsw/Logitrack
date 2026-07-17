import { User } from "@/types/user";
import { ArrowUp, Shield, ShieldCheck, Users, UserX } from "lucide-react";

export const mapUsersCards = (users: User[]) => {
  const activeUsers = users.filter(
    ({ deletedAt }) => deletedAt === null,
  ).length;

  const inactiveUsers = users.filter(({ deletedAt }) => deletedAt).length;

  const now = new Date();

  const usersCreatedThisMonth = users.filter(({ createdAt }) => {
    const date = new Date(createdAt);

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;

  const activeUsersThisMonth = users.filter(({ createdAt, deletedAt }) => {
    const date = new Date(createdAt);

    return (
      deletedAt === null &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;

  const inactiveUsersThisMonth = users.filter(({ deletedAt }) => {
    if (!deletedAt) return false;

    const date = new Date(deletedAt);

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;

  return [
    {
      title: "Total de Usuarios",
      stock: users.length,
      description: `${usersCreatedThisMonth > 0 ? "+" : ""}${usersCreatedThisMonth} novos este mês`,
      arrowUp: <ArrowUp size={16} />,
      icon: Users,
      color: "#3B82F6",
      bgColor: "#BCD2FB",
    },

    {
      title: "Usuarios Ativos",
      stock: activeUsers,
      description: `${activeUsersThisMonth > 0 ? "+" : ""}${activeUsersThisMonth} novos este mês`,
      arrowUp: <ArrowUp size={16} />,
      icon: ShieldCheck,
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },

    {
      title: "Usuarios Inativos",
      stock: inactiveUsers,
      description: `${inactiveUsersThisMonth > 0 ? "+" : ""}${inactiveUsersThisMonth} novos estes mês `,
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
};
