import { ProductCards } from "./cards";
import { ProductHeaderTypes } from "@/app/types/products";
import { InputSearch } from "./input-search";

export const ProductsHeader = ({
  title,
  description,
  hasButton,
  data,
  placeholder,
  children,
  search,
}: ProductHeaderTypes) => {
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
