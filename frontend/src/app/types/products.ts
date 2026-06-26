import { LucideProps } from "lucide-react";
import {
  ForwardRefExoticComponent,
  JSX,
  ReactNode,
  RefAttributes,
} from "react";

export type ProductHeaderTypes = {
  title: string;
  description: string;
  hasButton: boolean;
  data: ProductCardsTypes[];
  placeholder?: string;
  children?: ReactNode;
};

export interface ProductCardsTypes {
  title: string;
  stock: number | string;
  description: string;
  arrowUp?: JSX.Element | null;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color: string;
  bgColor: string;
}

export type productTableTypes = {
  name: string;
  sku: string;
  price: string;
  stock: number;
  status: string;
};
