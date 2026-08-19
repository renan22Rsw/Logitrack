import * as v from "valibot";

export const ProductSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty("O título é obrigatório"),
    v.minLength(3, "O título deve ter no mínimo 3 caracteres"),
  ),

  sku: v.pipe(
    v.string(),
    v.nonEmpty("O SKU é obrigatório"),
    v.regex(
      /^[A-Z0-9-]+$/,
      "O SKU deve conter apenas letras maiusculas e números",
    ),
  ),

  description: v.optional(
    v.pipe(
      v.string(),
      v.minLength(10, "A descrição deve ter no mínimo 10 caracteres"),
      v.maxLength(100, "A descrição deve ter no máximo 100 caracteres"),
    ),
  ),

  price: v.pipe(
    v.union([v.string(), v.number()]),
    v.transform((value) => Number(value)),
    v.gtValue(0),
  ),

  initialStock: v.optional(
    v.pipe(
      v.union([v.string(), v.number()]),
      v.transform((value) => Number(value)),
      v.gtValue(0, "O estoque inicial deve ser maior que zero"),
    ),
  ),
});
