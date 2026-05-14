import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const acitivityFeed = [
  {
    title: "Entrada de 20 unidades",
    description: "Teclado Mecanico",
    icon: ArrowUp,
    iconColor: "#35A75D",
    bgColor: "#DCFCE7",
    author: "Joaquin",
    date: "20/05/2023",
  },
  {
    title: "Saida de 10 unidades",
    description: "Mouse Gamer",
    icon: ArrowDown,
    iconColor: "#E45858",
    bgColor: "#FCDAD6",
    author: "Maria",
    date: "21/05/2023",
  },
  {
    title: "Entrada de 10 unidades",
    description: "Mouse pad",
    icon: ArrowUp,
    iconColor: "#35A75D",
    bgColor: "#DCFCE7",
    author: "Renan",
    date: "22/05/2023",
  },

  {
    title: "Saida de 5 unidades",
    description: "Headset Gamer",
    icon: ArrowDown,
    iconColor: "#E45858",
    bgColor: "#FCDAD6",
    author: "Ana",
    date: "23/05/2023",
  },
];

export const AcitivityFeedCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
      </CardHeader>

      <CardContent className="h-full py-6">
        {acitivityFeed.map((activity, __index) => (
          <div className="flex gap-4" key={__index}>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: activity.bgColor }}
            >
              <activity.icon color={activity.iconColor} />
            </div>
            <div className="flex w-full justify-between space-y-2">
              <div>
                <h6 className="font-bold">{activity.title}</h6>
                <p className="text-muted-foreground font-semibold">
                  {activity.description}
                </p>
                <p className="text-muted-foreground">
                  Por{" "}
                  <span className="font-semibold text-blue-950/80">
                    {activity.author}
                  </span>
                </p>
              </div>

              <span className="text-muted-foreground">{activity.date}</span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="bg-white">
        <Link href={"#"}>
          <div className="flex items-center font-semibold text-blue-500">
            Ver todas as movimentações{" "}
            <ArrowRight size={16} className="mt-1 ml-2" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};
