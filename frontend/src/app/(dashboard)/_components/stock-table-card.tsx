import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Products } from "@/types/products";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface StockTableCardProps {
  products: Products[];
}

export const StockTableCard = ({ products }: StockTableCardProps) => {
  const slicedProducts = products.slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produto em Estoque</CardTitle>
      </CardHeader>
      <CardContent className="py-6">
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
            {slicedProducts.map((product) => (
              <TableRow key={product.sku}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
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
                    {product.currentStock < 3 && "Crítico"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex h-full items-end border-none bg-white">
        <Link href={"/products"}>
          <div className="flex items-center font-semibold text-blue-500">
            Ver todos os produtos <ArrowRight size={16} className="mt-1 ml-2" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};
