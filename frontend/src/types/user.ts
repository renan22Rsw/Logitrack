import { PaginatedResponse } from "@/generics/response";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  deletedAt: Date;
}

type Role = "ADMIN" | "MANAGER" | "OPERATOR";
export type UsersByPage = PaginatedResponse<User[]>;
