import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { ArrowDown, ArrowUp } from "lucide-react";

export const StockMovementsList = () => {
  const stockMovements = [
    {
      date: "20/05/2023",
      type: "entrada",
      product: "Teclado Mecanico RGB",
      sku: "TECL-RGB-001",
      quantity: 20,
      user: "Joaquin",
    },

    {
      date: "20/05/2023",
      type: "saida",
      product: "Mouse Gamer",
      sku: "MOUSE-GMR-001",
      quantity: 10,
      user: "Joaquin",
    },

    {
      date: "20/05/2023",
      type: "saida",
      product: "Monitor 24 Full HD",
      sku: "MON-24FHD-001",
      quantity: 25,
      user: "Joaquin",
    },

    {
      date: "20/05/2023",
      type: "Entrada",
      product: "Cabo HDMI 2m",
      sku: "CAB-HDMI-2M-001",
      quantity: 2,
      user: "Joaquin",
    },

    {
      date: "20/05/2023",
      type: "saida",
      product: "Headset Gamer 7.1",
      sku: "HEAD-GMR-7.1-001",
      quantity: 22,
      user: "Joaquin",
    },

    {
      date: "20/05/2023",
      type: "saida",
      product: "Webcam Gamer",
      sku: "WEB-GMR-001",
      quantity: 20,
      user: "Joaquin",
    },

    {
      date: "20/05/2023",
      type: "entrada",
      product: "Cadeira Gamer",
      sku: "CAD-GMR-001",
      quantity: 2,
      user: "Joaquin",
    },

    {
      date: "20/05/2023",
      type: "saida",
      product: "Controle Gamer",
      sku: "CON-GMR-001",
      quantity: 6,
      user: "Joaquin",
    },

    {
      date: "20/05/2023",
      type: "entrada",
      product: "Mouse pad Gamer",
      sku: "MOU-GMR-001",
      quantity: 10,
      user: "Joaquin",
    },

    {
      date: "20/05/2023",
      type: "saida",
      product: "Playstation 5",
      sku: "PS5-001",
      quantity: 10,
      user: "Joaquin",
    },
  ];

  return (
    <div className="space-y-4 py-4">
      {stockMovements.map((stockMovement, __index) => (
        <Card key={__index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {stockMovement.type === "entrada" ? (
                  <ArrowUp
                    size={16}
                    color="#35A75D"
                    className="h-8 w-8 rounded-2xl bg-[#DCFCE7] p-1"
                  />
                ) : (
                  <ArrowDown
                    size={16}
                    color="#E45858"
                    className="h-8 w-8 rounded-2xl bg-[#FCDAD6] p-1"
                  />
                )}

                <span className="text-muted-foreground text-sm">
                  {stockMovement.date}
                </span>
              </div>
              <div>
                <Badge
                  className={cn(
                    stockMovement.type === "entrada"
                      ? "bg-green-200 text-green-600"
                      : "bg-red-200 text-red-600",
                  )}
                >
                  {stockMovement.type}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <CardTitle>{stockMovement.product}</CardTitle>
            <div className="flex items-center justify-between">
              <CardDescription>{stockMovement.sku}</CardDescription>
              <span
                className={cn(
                  stockMovement.type === "entrada"
                    ? "font-semibold text-green-600"
                    : "font-semibold text-red-600",
                )}
              >
                {stockMovement.type === "entrada"
                  ? `+${stockMovement.quantity}`
                  : `-${stockMovement.quantity}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium">
                  AD
                </AvatarFallback>
              </Avatar>

              <span className="text-muted-foreground font-semibold">
                {stockMovement.user}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-col items-center gap-4">
        <span className="text-muted-foreground font-semibold">
          1 a 10 de {stockMovements.length} movimentações
        </span>

        <Button variant={"outline"} className="w-full py-5 text-sm">
          Carregar Mais
        </Button>
      </div>
    </div>
  );
};
