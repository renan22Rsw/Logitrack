import { User, UsersByPage } from "@/types/user";
import { fetchApi } from "../api";

export const getUser = (): Promise<User> => fetchApi<User>("/users/me");

export const getAllUsers = (): Promise<User[]> =>
  fetchApi<User[]>("/admin/users");

export const getSearchUsers = (search: string): Promise<User[]> =>
  fetchApi<User[]>(`/admin/users?search=${search}`);

export const getUsersByPage = (page: number): Promise<UsersByPage> =>
  fetchApi(`/admin/users?page=${page}&limit=10`);
