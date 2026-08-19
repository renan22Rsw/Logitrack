import { PaginatedResponse } from "@/generics/response";
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

export type ProductsByPage = PaginatedResponse<Products[]>;

export interface ProductCard {
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
