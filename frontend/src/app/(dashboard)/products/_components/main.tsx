"use client";

import { Products, ProductsPage } from "@/types/products";
import { ProductList } from "./list";
import { ProductTable } from "./table";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductsMainProps {
  productsPage: ProductsPage;
  productList: Products[];
}

export const ProductMain = ({
  productsPage,
  productList,
}: ProductsMainProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <ProductList products={productList} />
      ) : (
        <ProductTable products={productsPage} />
      )}
    </>
  );
};
