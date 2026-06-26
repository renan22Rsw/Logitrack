"use client";

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
import { Products } from "@/types/products";
import { useState } from "react";
import { EditProductButton } from "./edit-product-button";
import { DeleteProductButton } from "./delete-product-button";

interface ProductListProps {
  products: Products[];
}

export const ProductList = ({ products }: ProductListProps) => {
  const ITEMS_PER_PAGE = 10;
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <Card className="bg-[#F8F9F9]">
      <CardHeader>
        <CardTitle className="font-bold">Lista de Produtos</CardTitle>
        <CardDescription>{products.length} Produtos</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        {visibleProducts.map((product, __index) => (
          <div
            className="flex justify-between gap-4 rounded-lg bg-white p-2"
            key={__index}
          >
            <div>
              <h6 className="font-semibold">{product.name}</h6>
              <p className="text-muted-foreground text-sm">{product.sku}</p>

              <div className="flex items-center gap-4 py-2">
                <p className="text-muted-foreground text-sm">
                  Estoque{" "}
                  <span className="font-bold">{product.currentStock}</span>
                </p>
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
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <EditProductButton
                id={product.id}
                name={product.name}
                sku={product.sku}
                description={product.description as string}
                price={product.price}
              />
              <DeleteProductButton id={product.id} />
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex flex-col gap-4 border-none">
        <span className="text-muted-foreground font-semibold">
          1 a {visibleProducts.length} de {products.length} produtos
        </span>

        {hasMore && (
          <Button
            variant="outline"
            className="w-full py-5 text-sm"
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
          >
            Carregar Mais
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
