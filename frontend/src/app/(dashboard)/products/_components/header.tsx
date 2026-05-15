import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { ProductCards } from "./cards";

export const ProductsHeader = () => {
  return (
    <header className="px-6 py-8">
      <div className="items-center justify-between xl:flex">
        <div className="py-4">
          <h1 className="text-xl font-bold xl:text-2xl">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie os produtos em seu estoque
          </p>
        </div>

        <div className="relative flex items-center gap-4">
          <Search className="text-muted-foreground absolute top-2.5 left-3 size-4" />

          <Input
            placeholder="Buscar produto ou SKU..."
            className="max-w-80 rounded-lg py-4.5 pl-10 placeholder:text-xs"
          />

          <Button className="px-4 py-4.5">
            {" "}
            {/* Dialog will be implement soon */}
            <Plus />
            Novo Produto
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 py-6 xl:grid-cols-4">
        <ProductCards />
      </div>
    </header>
  );
};
