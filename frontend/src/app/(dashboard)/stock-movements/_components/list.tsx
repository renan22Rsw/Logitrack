"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StockMovements, StockMovementType } from "@/types/stock-movements";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/utils/format-date";
interface StockMovementsListProps {
  stockMovements: StockMovements[];
}

export const StockMovementsList = ({
  stockMovements,
}: StockMovementsListProps) => {
  const ITEMS_PER_PAGE = 10;
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  const visibleStockMovements = stockMovements.slice(0, visibleCount);
  const hasMore = visibleCount < stockMovements.length;

  return (
    <div className="space-y-4 py-4">
      {visibleStockMovements.map((stockMovement) => (
        <Card key={stockMovement.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {stockMovement.type === StockMovementType.IN ? (
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
                  {formatDate(stockMovement.createdAt)}
                </span>
              </div>
              <div>
                <Badge
                  className={cn(
                    stockMovement.type === StockMovementType.IN
                      ? "bg-green-200 text-green-600"
                      : "bg-red-200 text-red-600",
                  )}
                >
                  {stockMovement.type === StockMovementType.IN
                    ? "Entrada"
                    : "Saida"}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <CardTitle>{stockMovement.product.name}</CardTitle>
            <div className="flex items-center justify-between">
              <CardDescription>{stockMovement.product.sku}</CardDescription>
              <span
                className={cn(
                  stockMovement.type === StockMovementType.IN
                    ? "font-semibold text-green-600"
                    : "font-semibold text-red-600",
                )}
              >
                {stockMovement.type === StockMovementType.IN
                  ? `+${stockMovement.quantity}`
                  : `-${stockMovement.quantity}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium">
                  {stockMovement.user.name.charAt(0) +
                    stockMovement.user.name.charAt(1)}
                </AvatarFallback>
              </Avatar>

              <span className="text-muted-foreground font-semibold">
                {stockMovement.user.name}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-col items-center gap-4">
        <span className="text-muted-foreground font-semibold">
          1 a 10 de {stockMovements.length} movimentações
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
      </div>
    </div>
  );
};
