import { ProductContainer } from "./_components/container";
import { ProductsHeader } from "./_components/header";
import { ProductMain } from "./_components/main";

const Products = () => {
  return (
    <>
      <ProductsHeader />
      <ProductContainer>
        <ProductMain />
      </ProductContainer>
    </>
  );
};

export default Products;
