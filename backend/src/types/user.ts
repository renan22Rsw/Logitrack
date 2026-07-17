import { PaginatedResponse } from '@/generics/paginated-response';

export type User = {
  id: string;
  email: string;
  role: string;
};

export type PaginatedUser = PaginatedResponse<User[]>;
