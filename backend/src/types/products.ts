import { Product } from '@prisma/client';

export type FindAllProductsResponse = {
  data: Product[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
