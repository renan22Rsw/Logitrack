import { PaginatedResponse } from '@/generics/paginated-response';
import { Product } from '@prisma/client';

export type ProductsPaginated = PaginatedResponse<Product[]>;
