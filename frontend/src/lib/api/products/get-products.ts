import { Products } from "@/types/products";
import { cookies } from "next/headers";

export const getProducts = async (): Promise<Products[]> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "json/application",
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
