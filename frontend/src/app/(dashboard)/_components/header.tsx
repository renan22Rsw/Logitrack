import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductCard } from "@/types/products";

interface DashboardHeaderProps {
  products: ProductCard[];
}

export const DashboardHeader = ({ products }: DashboardHeaderProps) => {
  return (
    <header className="w-full gap-8 px-4 py-8">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {products.map((item, __index) => (
          <Card className="shadow-md xl:w-96" key={__index}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm">{item.title}</CardTitle>
              <item.icon
                color={item.color}
                style={{ backgroundColor: item.bgColor }}
                className="size-10 rounded-full py-2"
              />
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {item.stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </CardContent>
            <CardFooter className="bg-white">
              <p className="text-muted-foreground">{item.description}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </header>
  );
};
