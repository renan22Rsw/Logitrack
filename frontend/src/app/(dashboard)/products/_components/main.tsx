"use client";

import { Products, ProductsByPage } from "@/types/products";
import { ProductList } from "./list";
import { ProductTable } from "./table";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductsMainProps {
  productsPage: ProductsByPage;
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
        <ProductTable page={productsPage} search={productList} />
      )}
    </>
  );
};
