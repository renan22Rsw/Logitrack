"use client";

import { Products, ProductsByPage } from "@/types/products";
import { ProductList } from "./list";
import { ProductTable } from "./table";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductsMainProps {
  productsPage: ProductsByPage;
  productList: Products[];
  productSearch: Products[];
  searchTerm: string;
}

export const ProductMain = ({
  productsPage,
  productList,
  productSearch,
  searchTerm,
}: ProductsMainProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <ProductList
          products={productList}
          search={productSearch}
          searchTerm={searchTerm}
        />
      ) : (
        <ProductTable
          page={productsPage}
          search={productSearch}
          searchTerm={searchTerm}
        />
      )}
    </>
  );
};
