import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Products } from "@/types/products";
import { TriangleAlert } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface StockAlertsCardProps {
  products: Products[];
}

export const StockAlertsCard = ({ products }: StockAlertsCardProps) => {
  const slicedProducts = products
    .filter((product) => product.currentStock < 10)
    .slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerta de Estoque</CardTitle>
      </CardHeader>

      <CardContent className="h-full py-6">
        <div className="space-y-4">
          {slicedProducts.map((product, __index) => (
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
                  <h6 className="font-bold">{product.currentStock} unidades</h6>
                  <p className="text-muted-foreground">Mínimo: 10</p>
                </div>
                <TriangleAlert color="#D97706" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-none bg-white">
        <Link href={"/products"}>
          <div className="flex items-center font-semibold text-blue-500">
            Ver todos os produtos <ArrowRight size={16} className="mt-1 ml-2" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};
