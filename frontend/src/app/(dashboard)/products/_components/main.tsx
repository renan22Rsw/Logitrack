"use client";

import { ProductList } from "./list";
import { ProductTable } from "./table";
import { useIsMobile } from "@/hooks/use-mobile";

export const ProductMain = () => {
  const isMobile = useIsMobile();

  return <>{isMobile ? <ProductList /> : <ProductTable />}</>;
};
