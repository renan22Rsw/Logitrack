import { mapProductsCards } from "@/adapters/products";
import { ProductContainer } from "./_components/container";
import { ProductsHeader } from "./_components/header";
import { ProductMain } from "./_components/main";
import { getProducts } from "@/lib/api/products/get-products";

const Products = async () => {
  const products = await getProducts();

  return (
    <>
      <ProductsHeader
        title="Produtos"
        description="Gerencie os produtos do estoque"
        hasButton
        data={mapProductsCards(products)}
        placeholder="Buscar Produtos"
      />
      <ProductContainer>
        <ProductMain products={products} />
      </ProductContainer>
    </>
  );
};

export default Products;
