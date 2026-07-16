import { ProductCards } from "./cards";
import { InputSearch } from "./input-search";
import { ProductCardsTypes } from "@/types/products";
import { ReactNode } from "react";

interface ProductHeaderProps {
  title: string;
  description: string;
  hasButton: boolean;
  data: ProductCardsTypes[];
  placeholder?: string;
  children?: ReactNode;
  search: string;
}

export const ProductsHeader = ({
  title,
  description,
  hasButton,
  data,
  placeholder,
  children,
  search,
}: ProductHeaderProps) => {
  return (
    <header className="px-6 py-8">
      <div className="items-center justify-between xl:flex">
        <div className="py-4">
          <h1 className="text-xl font-bold xl:text-2xl">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="items-center gap-4 space-y-4 xl:flex xl:space-y-0">
          <InputSearch
            placeholder={placeholder as string}
            initialSearch={search}
          />

          {hasButton && children}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 py-6 xl:grid-cols-4">
        <ProductCards products={data} />
      </div>
    </header>
  );
};
