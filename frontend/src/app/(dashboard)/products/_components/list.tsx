import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export const ProductList = () => {
  const products = [
    {
      name: "Teclado Mecanico RGB",
      sku: "TECL-RGB-001",
      price: "R$ 100,00",
      stock: 20,
      status: "Ok",
    },

    {
      name: "Mouse Gamer",
      sku: "MOUSE-GMR-001",
      price: "R$ 50,00",
      stock: 10,
      status: "Baixo",
    },

    {
      name: "Monitor 24 Full HD",
      sku: "MON-24FHD-001",
      price: "R$ 500,00",
      stock: 25,
      status: "Ok",
    },

    {
      name: "Cabo HDMI 2m",
      sku: "CAB-HDMI-2M-001",
      price: "R$ 20,00",
      stock: 2,
      status: "Crítico",
    },

    {
      name: "Headset Gamer 7.1",
      sku: "HEAD-GMR-7.1-001",
      price: "R$ 300,00",
      stock: 22,
      status: "Ok",
    },

    {
      name: "Webcam Gamer",
      sku: "WEB-GMR-001",
      price: "R$ 150,00",
      stock: 20,
      status: "Ok",
    },

    {
      name: "Cadeira Gamer",
      sku: "CAD-GMR-001",
      price: "R$ 500,00",
      stock: 2,
      status: "Crítico",
    },

    {
      name: "Controle Gamer",
      sku: "CON-GMR-001",
      price: "R$ 300,00",
      stock: 6,
      status: "Baixo",
    },

    {
      name: "Mouse pad Gamer",
      sku: "MOU-GMR-001",
      price: "R$ 150",
      stock: 10,
      status: "Ok",
    },

    {
      name: "Playstation 5",
      sku: "PS5-001",
      price: "R$ 3000,00",
      stock: 0,
      status: "Crítico",
    },
  ];

  return (
    <Card className="bg-[#F8F9F9]">
      <CardHeader>
        <CardTitle className="font-bold">Lista de Produtos</CardTitle>
        <CardDescription>{products.length} Produtos</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        {products.map((product, __index) => (
          <div
            className="flex justify-between gap-4 rounded-lg bg-white p-2"
            key={__index}
          >
            <div>
              <h6 className="font-semibold">{product.name}</h6>
              <p className="text-muted-foreground text-sm">{product.sku}</p>

              <div className="flex items-center gap-4 py-2">
                <p className="text-muted-foreground text-sm">
                  Estoque <span className="font-bold">{product.stock}</span>
                </p>
                <Badge
                  className={cn(
                    product.status === "Ok" && "bg-green-100 text-green-600",
                    product.status === "Baixo" && "bg-amber-100 text-amber-600",
                    product.status === "Crítico" && "bg-red-100 text-red-600",
                  )}
                >
                  {product.status}
                </Badge>
              </div>
            </div>

            <ChevronRight />
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex flex-col gap-4 border-none">
        <span className="text-muted-foreground font-semibold">
          1 a 10 de {products.length} produtos
        </span>

        <Button variant={"outline"} className="w-full py-5 text-sm">
          Carregar Mais
        </Button>
      </CardFooter>
    </Card>
  );
};
