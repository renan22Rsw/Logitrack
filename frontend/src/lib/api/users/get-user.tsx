import { cookies } from "next/headers";
import { User } from "@/types/user";

export const getUser = async (): Promise<User | undefined> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
      },
    );

    const data: User = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
    throw new Error("Algo deu errado!");
  }
};
