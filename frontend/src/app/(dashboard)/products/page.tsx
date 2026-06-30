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

const Products = async ({
  searchParams,
}: {
  searchParams: { page?: number; search?: string };
}) => {
  const { page, search } = await searchParams;
  const products = search
    ? await getSearchProducts(search)
    : await getProducts();

  const productsPage = await getProductsByPage(page || 1);

  return (
    <>
      <ProductsHeader
        title="Produtos"
        description="Gerencie os produtos do estoque"
        hasButton
        data={mapProductsCards(products ?? [])}
        placeholder="Buscar Produtos"
        search={search ?? ""}
      >
        <CreateProductButton />
      </ProductsHeader>

      <ProductContainer>
        <ProductMain
          productsPage={productsPage ?? []}
          productList={products ?? []}
        />
      </ProductContainer>
    </>
  );
};

export default Products;
