import * as v from "valibot";
import { ProductSchema } from "./product-schema";

export const stockMovementSchema = v.object({
  productId: v.string("Producto é obrigatório"),

  quantity: v.pipe(
    v.union([v.string(), v.number()]),
    v.transform((value) => Number(value)),
  ),

  type: v.pipe(
    v.string(),
    v.transform((val) => val.toUpperCase()),
    v.picklist(["IN", "OUT"], "tipo de movimentação é obrigatória"),
  ),

  reason: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(50, "Descrição deve ter menos que 50 characters"),
      v.minLength(10, "Descrição deve ter mais que 10 characters"),
    ),
  ),
});
