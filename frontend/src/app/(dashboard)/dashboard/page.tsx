import { getProducts } from "@/lib/api/products/get-products";
import { DashboardHeader } from "../_components/header";
import { DashBoardMain } from "../_components/section";
import { mapProductsCards } from "@/adapters/products";
import { getStockMovements } from "@/lib/api/stock-movements/get-stock-movements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashBoard = async () => {
  const products = await getProducts();
  const stockMovements = await getStockMovements();

  return (
    <>
      <DashboardHeader products={mapProductsCards(products)} />
      <DashBoardMain stockMovements={stockMovements} products={products} />
    </>
  );
};

export default DashBoard;
