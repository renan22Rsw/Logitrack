import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, JSX, RefAttributes } from "react";

export interface Products {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  currentStock: number;
  initialStock: number;
  createdAt: Date;
}

export interface ProductsByPage {
  data: Products[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type productTableTypes = {
  name: string;
  sku: string;
  price: string;
  stock: number;
  status: string;
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
