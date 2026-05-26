import * as v from "valibot";

export const profileSchema = v.object({
  name: v.string(),
  email: v.pipe(
    v.string(),
    v.nonEmpty("O email é obrigatório"),
    v.email(),
    v.maxLength(30, "O email deve ter no máximo 30 caracteres"),
  ),

  role: v.string(),

  phone: v.pipe(
    v.string(),
    v.regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number format."),
    v.minLength(1, "Phone number is required."),
  ),

  about: v.pipe(
    v.string(),
    v.minLength(10, "A descrição deve ter no mínimo 10 caracteres"),
    v.maxLength(100, "A descrição deve ter no máximo 100 caracteres"),
  ),
});

export const profilePasswordSchema = v.pipe(
  v.object({
    password: v.pipe(
      v.string(),
      v.nonEmpty("A senha é obrigatória."),
      v.minLength(8, "A senha deve ter no mínimo 8 caracteres."),
    ),
    confirmPassword: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "As senhas não coincidem.",
    ),
    ["confirmPassword"],
  ),
);
