import { User } from "@/types/user";
import { fetchApi } from "../api";

export const getUser = (): Promise<User> => fetchApi<User>("/users/me");
