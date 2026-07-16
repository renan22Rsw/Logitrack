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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StockMovements, StockMovementsByPage } from "@/types/stock-movements";
import { ProductPagination } from "../../products/_components/pagination";

import { formatDate } from "@/utils/format-date";

interface StockMovementsTableProps {
  page: StockMovementsByPage;
  search: StockMovements[];
  searchTerm?: string;
}

export const StockMovementsTable = ({
  page,
  search,
  searchTerm,
}: StockMovementsTableProps) => {
  const hasSearch = searchTerm?.trim() !== "" && searchTerm !== undefined;

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
            {!hasSearch ? (
              page.data.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{formatDate(movement.createdAt)}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        movement.type === "IN"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600",
                      )}
                    >
                      {movement.type}
                      {/* function here */}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-semibold">
                    {movement.product.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-semibold">
                    {movement.product.sku}
                  </TableCell>
                  <TableCell
                    className={cn(
                      movement.type === "IN"
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-600",
                    )}
                  >
                    {movement.type === "IN"
                      ? `+${movement.quantity}`
                      : `-${movement.quantity}`}
                  </TableCell>
                  <TableCell className="text-muted-foreground flex items-center gap-2 font-semibold">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium">
                        {movement.user.name.charAt(0) +
                          movement.user.name.charAt(1)}
                      </AvatarFallback>
                    </Avatar>
                    {movement.user.name}
                  </TableCell>
                </TableRow>
              ))
            ) : search.length > 0 ? (
              search.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{formatDate(movement.createdAt)}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        movement.type === "IN"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600",
                      )}
                    >
                      {movement.type}
                      {/* function here */}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-semibold">
                    {movement.product.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-semibold">
                    {movement.product.sku}
                  </TableCell>
                  <TableCell
                    className={cn(
                      movement.type === "IN"
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-600",
                    )}
                  >
                    {movement.type === "IN"
                      ? `+${movement.quantity}`
                      : `-${movement.quantity}`}
                  </TableCell>
                  <TableCell className="text-muted-foreground flex items-center gap-2 font-semibold">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium">
                        {movement.user.name.charAt(0) +
                          movement.user.name.charAt(1)}
                      </AvatarFallback>
                    </Avatar>
                    {movement.user.name}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex w-full items-center justify-between">
        <span className="text-muted-foreground w-full text-sm font-semibold">
          Mostrando {(page.meta.page - 1) * page.meta.limit + 1} a{" "}
          {Math.min(page.meta.page * page.meta.limit, page.meta.total)} de{" "}
          {page.meta.total} produtos
        </span>
        <ProductPagination meta={page.meta} />
      </CardFooter>
    </Card>
  );
};
