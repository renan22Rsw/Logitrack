import { mapProductsCards } from "@/adapters/products";
import { ProductContainer } from "./_components/container";
import { ProductsHeader } from "./_components/header";
import { ProductMain } from "./_components/main";
import {
  getProducts,
  getProductsByPage,
  getSearchProducts,
} from "@/lib/api/products/get-products";
import { CreateProductButton } from "./_components/create-product-button";
import { getCurrentUser } from "@/lib/api/users/get-user";
import { redirect } from "next/navigation";
import { Metadata } from "next";

interface ProductsProps {
  searchParams: {
    search: string;
    page: number;
  };
}

export const metadata: Metadata = {
  title: "Produtos",
};

const Products = async ({ searchParams }: ProductsProps) => {
  const { page, search } = await searchParams;

  const products = await getProducts();
  const productsSearch = search ? await getSearchProducts(search) : products;

  const productsPage = await getProductsByPage(page || 1);
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <ProductsHeader
        title="Produtos"
        description="Gerencie os produtos do estoque"
        hasButton
        data={mapProductsCards(products ?? [])}
        placeholder="Buscar Produtos"
        search={search}
      >
        <CreateProductButton currentUser={user} />
      </ProductsHeader>

      <ProductContainer>
        <ProductMain
          productsPage={productsPage ?? []}
          productList={products ?? []}
          productSearch={productsSearch ?? []}
          user={user ?? null}
          searchTerm={search}
        />
      </ProductContainer>
    </>
  );
};

export default Products;
