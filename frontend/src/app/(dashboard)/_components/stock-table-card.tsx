import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const StockTableCard = () => {
  const products = [
    {
      name: "Teclado Mecanico RGB",
      sku: "TECL-RGB-001",
      stock: 20,
      status: "Ok",
    },

    {
      name: "Mouse Gamer",
      sku: "MOUSE-GMR-001",
      stock: 10,
      status: "Baixo",
    },

    {
      name: "Monitor 24 Full HD",
      sku: "MON-24FHD-001",
      stock: 25,
      status: "Ok",
    },

    {
      name: "Cabo HDMI 2m",
      sku: "CAB-HDMI-2M-001",
      stock: 2,
      status: "Crítico",
    },

    {
      name: "Headset Gamer 7.1",
      sku: "HEAD-GMR-7.1-001",
      stock: 22,
      status: "Ok",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produto em Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="rounded-2xl bg-[#F8F9F9]">
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Estoque atual</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product.sku}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      product.status === "Ok" && "bg-green-100 text-green-600",
                      product.status === "Baixo" &&
                        "bg-amber-100 text-amber-600",
                      product.status === "Crítico" && "bg-red-100 text-red-600",
                    )}
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
