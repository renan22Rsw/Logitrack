import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Package, Layers, ArrowLeftRight, TriangleAlert } from "lucide-react";

export const DashboardHeader = () => {
  const datas = [
    {
      title: "Total de Produtos",
      description: "+3 novos este mes",
      icon: Package,
      color: "#3B82F6",
      bgColor: "#BCD2FB",
      value: 24,
    },

    {
      title: "Estoque Total",
      description: "unidade de estoque",
      icon: Layers,
      color: "#35A75D",
      bgColor: "#DCFCE7",
      value: 1224,
    },

    {
      title: "Movimentações (Mes)",
      description: "entradas e saidas",
      icon: ArrowLeftRight,
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
      value: 156,
    },

    {
      title: "Produtos Baixos",
      description: "requerem atenção",
      icon: TriangleAlert,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
      value: 5,
    },
  ];

  return (
    <header className="w-full gap-8 px-4 py-8">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {datas.map((item, __index) => (
          <Card className="shadow-md xl:w-96" key={__index}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm">{item.title}</CardTitle>
              <item.icon
                color={item.color}
                style={{ backgroundColor: item.bgColor }}
                className="size-10 rounded-full py-2"
              />
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </CardContent>
            <CardFooter className="bg-white">
              <p className="text-muted-foreground">{item.description}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </header>
  );
};
