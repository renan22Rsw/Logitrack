import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, JSX, RefAttributes } from "react";

type ProductCardsProps = {
  products: {
    title: string;
    stock: number | string;
    description: string;
    arrowUp?: JSX.Element | null;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    color: string;
    bgColor: string;
  }[];
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
