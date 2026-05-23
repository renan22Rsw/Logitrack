import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, JSX, RefAttributes } from "react";

export type ProductHeaderTypes = {
  title: string;
  description: string;
  hasButton: boolean;
  data: ProductCardsTypes[];
  placeholder?: string;
};

export type ProductCardsTypes = {
  title: string;
  value: number;
  description: string;
  arrowUp?: JSX.Element | null;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color: string;
  bgColor: string;
};

export type productTableTypes = {
  name: string;
  sku: string;
  price: string;
  stock: number;
  status: string;
};
