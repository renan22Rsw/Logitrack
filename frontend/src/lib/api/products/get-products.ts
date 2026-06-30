import { Products, ProductsPage } from "@/types/products";
import { cookies } from "next/headers";

export const getProducts = async (): Promise<Products[]> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
      },
    );

    const data: Products[] = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
    throw new Error("Algo deu errado!");
  }
};

export const getSearchProducts = async (
  search: string,
): Promise<Products[] | undefined> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
      },
    );

    const data: Products[] = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
    throw new Error("Algo deu errado!");
  }
};

export const getProductsByPage = async (
  page: number,
): Promise<ProductsPage> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?page=${page}&limit=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
      },
    );

    const data: ProductsPage = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }

    throw new Error("Algo deu errado");
  }
};
