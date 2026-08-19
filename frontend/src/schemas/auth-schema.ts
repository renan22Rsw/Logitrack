import * as v from "valibot";

export const SignUpSchema = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      v.nonEmpty("O nome é obrigatório"),
      v.minLength(3, "O nome é muito curto"),
      v.maxLength(20, "O nome é muito longo"),
    ),

    email: v.pipe(
      v.string(),
      v.nonEmpty("O email é obrigatório"),
      v.email("Email inválido"),
      v.maxLength(30, "O email deve ter no máximo 30 caracteres"),
    ),

    password: v.pipe(
      v.string(),
      v.nonEmpty("A senha é obrigatória"),
      v.minLength(8, "A senha deve ter no mínimo 8 caracteres"),
    ),

    confirmPassword: v.string(),
  }),

  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "As senhas não coincidem.",
    ),

    ["confirmPassword"],
  ),
);

export const SignInSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("O email é obrigatório"),
    v.email("Email inválido"),
    v.maxLength(30, "O email deve ter no máximo 30 caracteres"),
  ),

  password: v.pipe(
    v.string(),
    v.nonEmpty("A senha é obrigatória"),
    v.minLength(8, "A senha deve ter no mínimo 8 caracteres"),
  ),
});
