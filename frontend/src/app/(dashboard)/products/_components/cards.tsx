import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  Layers,
  TriangleAlert,
  PackageX,
  ArrowUp,
} from "lucide-react";

export const ProductCards = () => {
  const productsDatas = [
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

  return (
    <>
      {productsDatas.map((product, __index) => (
        <Card className="py-8 shadow xl:max-w-92" key={__index}>
          <CardHeader className="flex items-center gap-4">
            <product.icon
              color={product.color}
              style={{ backgroundColor: product.bgColor }}
              className="size-10 rounded-full py-2"
            />
            <div>
              <CardTitle className="text-muted-foreground text-sm font-bold">
                {product.title}
              </CardTitle>
              <p className="text-xl font-bold">{product.value}</p>
              <p
                className="flex items-center gap-1 font-semibold"
                style={{ color: product.color }}
              >
                {product.description} {product.arrowUp}
              </p>
            </div>
          </CardHeader>
        </Card>
      ))}
    </>
  );
};
