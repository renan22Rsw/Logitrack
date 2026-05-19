import { productCards } from "@/utils/headers";
import { ProductContainer } from "./_components/container";
import { ProductsHeader } from "./_components/header";
import { ProductMain } from "./_components/main";

const Products = () => {
  return (
    <>
      <ProductsHeader
        title="Produtos"
        description="Gerencie os produtos do estoque"
        hasButton
        data={productCards}
      />
      <ProductContainer>
        <ProductMain />
      </ProductContainer>
    </>
  );
};

export default Products;
