"use client";

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
import { DeleteProductButton } from "./delete-product-button";
import { EditProductButton } from "./edit-product-button";
import { ProductsPage } from "@/types/products";

interface ProductsTableProps {
  products: ProductsPage;
}

export const ProductTable = ({ products }: ProductsTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="h-full bg-[#F8F9F9]">
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Preço(R$)</TableHead>
              <TableHead>Estoque atual</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.currentStock}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      product.currentStock > 5 && "bg-green-100 text-green-600",
                      product.currentStock <= 5 &&
                        product.currentStock > 3 &&
                        "bg-amber-100 text-amber-600",
                      product.currentStock < 3 && "bg-red-100 text-red-600",
                    )}
                  >
                    {product.currentStock > 5 && "Ok"}
                    {product.currentStock <= 5 &&
                      product.currentStock > 3 &&
                      "Baixo"}
                    {product.currentStock < 3 && "Critico"}
                  </Badge>
                </TableCell>

                <TableCell className="flex items-center gap-4">
                  <EditProductButton
                    id={product.id}
                    name={product.name}
                    sku={product.sku}
                    description={product.description as string}
                    price={product.price}
                  />
                  <DeleteProductButton id={product.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex w-full items-center justify-between">
        <span className="text-muted-foreground w-full text-sm font-semibold">
          Mostrando {(products.meta.page - 1) * products.meta.limit + 1} a{" "}
          {Math.min(
            products.meta.page * products.meta.limit,
            products.meta.total,
          )}{" "}
          de {products.meta.total} produtos
        </span>
        <ProductPagination meta={products.meta} />
      </CardFooter>
    </Card>
  );
};
