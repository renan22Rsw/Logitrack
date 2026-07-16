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

interface ProductsProps {
  searchParams: {
    search: string;
    page: number;
  };
}

const Products = async ({ searchParams }: ProductsProps) => {
  const { page, search } = await searchParams;

  const products = await getProducts();
  const productsSearch = await getSearchProducts(search);

  const productsPage = await getProductsByPage(page || 1);

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
        <CreateProductButton />
      </ProductsHeader>

      <ProductContainer>
        <ProductMain
          productsPage={productsPage ?? []}
          productList={products ?? []}
          productSearch={productsSearch ?? []}
          searchTerm={search}
        />
      </ProductContainer>
    </>
  );
};

export default Products;
