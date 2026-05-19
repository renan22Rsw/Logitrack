import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductPagination } from "../../products/_components/pagination";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const StockMovementsTable = () => {
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
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="h-full bg-[#F8F9F9]">
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Responsável</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {stockMovements.map((stockMovement) => (
              <TableRow key={stockMovement.sku}>
                <TableCell>{stockMovement.date}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      stockMovement.type === "entrada"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600",
                    )}
                  >
                    {stockMovement.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground font-semibold">
                  {stockMovement.product}
                </TableCell>
                <TableCell className="text-muted-foreground font-semibold">
                  {stockMovement.sku}
                </TableCell>
                <TableCell
                  className={cn(
                    stockMovement.type === "entrada"
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-600",
                  )}
                >
                  {stockMovement.type === "entrada"
                    ? `+${stockMovement.quantity}`
                    : `-${stockMovement.quantity}`}
                </TableCell>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-semibold">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  {stockMovement.user}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex w-full items-center justify-between">
        <span className="text-muted-foreground w-full text-sm font-semibold">
          Mostrando 1 a 10 de {stockMovements.length} Movimentações
        </span>
        <ProductPagination />
      </CardFooter>
    </Card>
  );
};
