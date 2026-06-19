import { ProductCardsTypes } from "@/app/types/products";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type ProductCardsProps = {
  products: ProductCardsTypes[];
};

export const ProductCards = ({ products }: ProductCardsProps) => {
  return (
    <>
      {products.map((product, __index) => (
        <Card className="py-8 shadow xl:max-w-92" key={__index}>
          <CardHeader className="flex items-center gap-4">
            <product.icon
              color={product.color}
              style={{ backgroundColor: product.bgColor }}
              className="size-10 rounded-full py-2"
            />
            <div>
              <CardTitle className="text-muted-foreground text-sm font-bold">
                {product.title}
              </CardTitle>
              <p className="text-xl font-bold">{product.stock}</p>
              <p
                className="flex items-center gap-1 font-semibold"
                style={{ color: product.color }}
              >
                {product.description} {product.arrowUp}
              </p>
            </div>
          </CardHeader>
        </Card>
      ))}
    </>
  );
};
