export interface Products {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  currentStock: number;
  initialStock: number;
  createdAt: Date;
}
