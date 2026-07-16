import { Products, ProductsByPage } from "@/types/products";
import { fetchApi } from "../api";

export const getProducts = (): Promise<Products[]> =>
  fetchApi<Products[]>("/products");

export const getSearchProducts = (search: string): Promise<Products[]> =>
  fetchApi<Products[]>(`/products?search=${search}`);

export const getProductsByPage = (page: number): Promise<ProductsByPage> =>
  fetchApi<ProductsByPage>(`/products?page=${page}&limit=10`);
