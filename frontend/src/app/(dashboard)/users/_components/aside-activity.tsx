import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, ArrowUp, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export const UserActivityAside = () => {
  const recentActivities = [
    {
      title: "Novo usuário cadastrado",
      user: "Guilherme Silva",
      date: "20/05/2025",
      icon: ArrowUp,
      color: "#35A75D",
      bgColor: "#DCFCE7",
    },

    {
      title: "Usuario atualizado",
      user: "Maria Santos",
      date: "20/05/2025",
      icon: Pencil,
      color: "#3B82F6",
      bgColor: "#BCD2FB",
    },

    {
      title: "Usuário desativado",
      user: "Henrique Braga",
      date: "20/05/2025",
      icon: Trash2,
      color: "#E45858",
      bgColor: "#FCDAD6",
    },

    {
      title: "Usuario atualizado",
      user: "Luiz de Souza",
      date: "21/05/2025",
      icon: Pencil,
      color: "#3B82F6",
      bgColor: "#BCD2FB",
    },

    {
      title: "Usuário desativado",
      user: "Mathus Lima",
      date: "20/05/2025",
      icon: Trash2,
      color: "#E45858",
      bgColor: "#FCDAD6",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity, __index) => (
          <div className="flex gap-2" key={__index}>
            <activity.icon
              color={activity.color}
              className="size-6 h-8 w-8 rounded-full p-2"
              style={{ backgroundColor: activity.bgColor }}
            />

            <div className="w-full">
              <div className="flex items-center justify-between gap-2">
                <h6 className="text-sm font-semibold">{activity.title}</h6>
                <p className="text-muted-foreground text-xs">{activity.date}</p>
              </div>
              <p className="text-muted-foreground text-xs">{activity.user}</p>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex h-full items-end border-none bg-white">
        <Link href={"#"}>
          <div className="flex items-center font-semibold text-blue-500">
            Ver todas as atividades{" "}
            <ArrowRight size={16} className="mt-1 ml-2" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};
