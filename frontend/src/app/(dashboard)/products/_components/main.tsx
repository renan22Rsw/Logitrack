import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ProductPagination } from "./pagination";

export const ProductMain = () => {
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
  ];

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="h-full bg-[#F8F9F9]">
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque atual</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product.sku}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.price}</TableCell>
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

      <CardFooter>
        <ProductPagination />
      </CardFooter>
    </Card>
  );
};
