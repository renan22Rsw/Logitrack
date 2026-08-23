import { cookies } from "next/headers";

export const fetchApi = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },

        ...options?.headers,
      },
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("Algo deu errado");
  }
};
