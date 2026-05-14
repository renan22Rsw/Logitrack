import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const StockAlertsCard = () => {
  const alertsProducts = [
    {
      name: "Teclado Mecanico RGB",
      sku: "TECL-RGB-001",
      stock: 3,
    },

    {
      name: "Mouse Gamer",
      sku: "MOUSE-GMR-001",
      stock: 2,
    },

    {
      name: "Monitor 24 Full HD",
      sku: "MON-24FHD-001",
      stock: 1,
    },

    {
      name: "Cabo HDMI 2m",
      sku: "CAB-HDMI-2M-001",
      stock: 4,
      status: "Crítico",
    },

    {
      name: "Headset Gamer 7.1",
      sku: "HEAD-GMR-7.1-001",
      stock: 5,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerta de Estoque</CardTitle>
      </CardHeader>

      <CardContent className="h-full py-6">
        <div className="space-y-4">
          {alertsProducts.map((product, __index) => (
            <div
              className="flex items-center justify-between border-b"
              key={__index}
            >
              <div>
                <h6 className="font-bold">{product.name}</h6>
                <p className="text-muted-foreground font-semibold">
                  {product.sku}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <h6 className="font-bold">{product.stock} unidades</h6>
                  <p className="text-muted-foreground">Mínimo: 10</p>
                </div>
                <TriangleAlert color="#D97706" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-none bg-white">
        <Link href={"#"}>
          <div className="flex items-center font-semibold text-blue-500">
            Ver todos os produtos <ArrowRight size={16} className="mt-1 ml-2" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};
