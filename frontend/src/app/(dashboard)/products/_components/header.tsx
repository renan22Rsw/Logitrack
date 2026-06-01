import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProductCards } from "./cards";
import { ProductHeaderTypes } from "@/app/types/products";
import { CreateProductButton } from "./create-product-button";

export const ProductsHeader = ({
  title,
  description,
  hasButton,
  data,
  placeholder,
}: ProductHeaderTypes) => {
  return (
    <header className="px-6 py-8">
      <div className="items-center justify-between xl:flex">
        <div className="py-4">
          <h1 className="text-xl font-bold xl:text-2xl">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="relative flex items-center gap-4">
          <Search className="text-muted-foreground absolute top-2.5 left-3 size-4" />

          <Input
            placeholder={placeholder}
            className="max-w-80 rounded-lg py-4.5 pl-10 placeholder:text-xs"
          />

          {hasButton && <CreateProductButton />}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 py-6 xl:grid-cols-4">
        <ProductCards products={data} />
      </div>
    </header>
  );
};
