import * as v from "valibot";

export const UserSchema = v.object({
  name: v.string(),
  email: v.pipe(
    v.string(),
    v.nonEmpty("O email é obrigatório"),
    v.email("email invalido"),
    v.maxLength(30, "O email deve ter no máximo 30 caracteres"),
  ),

  role: v.picklist(["ADMIN", "MANAGER", "OPERATOR"], "O papel é obrigatório"),
});

export const EditUserSchema = v.partial(UserSchema);
