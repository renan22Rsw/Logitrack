import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductsPage } from "@/types/products";

interface ProductPaginationProps {
  meta: ProductsPage["meta"];
}

export const ProductPagination = ({ meta }: ProductPaginationProps) => {
  const { page, totalPages } = meta;

  const getPages = () => {
    const pages: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <Pagination className="h-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={page > 1 ? `?page=${page - 1}` : "#"}
            aria-disabled={page === 1}
          />
        </PaginationItem>

        {getPages()[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href="?page=1">1</PaginationLink>
            </PaginationItem>
            {getPages()[0] > 2 && <PaginationEllipsis />}
          </>
        )}

        {getPages().map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href={`?page=${p}`} isActive={p === page}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {getPages().at(-1)! < totalPages && (
          <>
            {getPages().at(-1)! < totalPages - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink href={`?page=${totalPages}`}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={page < totalPages ? `?page=${page + 1}` : "#"}
            aria-disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
