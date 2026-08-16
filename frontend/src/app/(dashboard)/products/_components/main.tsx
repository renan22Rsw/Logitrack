"use client";

import { Products, ProductsByPage } from "@/types/products";
import { ProductList } from "./list";
import { ProductTable } from "./table";
import { useIsMobile } from "@/hooks/use-mobile";
import { User } from "@/types/user";

interface ProductsMainProps {
  productsPage: ProductsByPage;
  productList: Products[];
  productSearch: Products[];
  searchTerm: string;
  user: User;
}

export const ProductMain = ({
  productsPage,
  productList,
  productSearch,
  searchTerm,
  user,
}: ProductsMainProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <ProductList
          user={user}
          products={productList}
          search={productSearch}
          searchTerm={searchTerm}
        />
      ) : (
        <ProductTable
          user={user}
          page={productsPage}
          search={productSearch}
          searchTerm={searchTerm}
        />
      )}
    </>
  );
};
