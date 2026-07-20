"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UserSchema } from "@/schemas/user-schema";
import {
  Form,
  Field as FormischField,
  SubmitHandler,
  useForm,
} from "@formisch/react";
import { Pencil } from "lucide-react";

import { Role } from "@/types/user";

export const EditUserButton = () => {
  const form = useForm({
    schema: UserSchema,
    initialInput: {
      name: "John Doe",
      email: "john.doe@me.com",
      role: "OPERATOR",
      status: "ACTIVE",
    },
  });

  const handleSubmit: SubmitHandler<typeof UserSchema> = (output) => {
    // Do something with the validated form values.
    console.log(output);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
          <DialogDescription>Altere os dados do usuário.</DialogDescription>
        </DialogHeader>

        <Form of={form} onSubmit={handleSubmit}>
          <FieldGroup>
            <FormischField of={form} path={["name"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-name"
                    className="text-muted-foreground"
                  >
                    Nome do usuário
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-product-name"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="Ex: Camiseta"
                    autoComplete="off"
                  />
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>

            <FormischField of={form} path={["email"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-email"
                    className="text-muted-foreground"
                  >
                    E-mail do usuário
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-product-email"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="Ex: Camiseta"
                    autoComplete="off"
                    type="email"
                  />
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>

            <FormischField of={form} path={["role"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-role"
                    className="text-muted-foreground"
                  >
                    Cargo do usuário
                  </FieldLabel>

                  <Select
                    value={field.input}
                    onValueChange={(value: Role) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Cargos</SelectLabel>
                        <SelectItem value="ADMIN">Administrador</SelectItem>
                        <SelectItem value="MANAGER">Gerente</SelectItem>
                        <SelectItem value="OPERATOR">Operador</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>

            <FormischField of={form} path={["status"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-email"
                    className="text-muted-foreground"
                  >
                    {field.input === "ACTIVE" ? "Ativo" : "Inativo"}
                  </FieldLabel>

                  <Switch
                    id="form-formisch-user-role"
                    checked={field.input === "ACTIVE"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "ACTIVE" : "INACTIVE")
                    }
                  />

                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>
          </FieldGroup>

          <DialogFooter className="border-none bg-white">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
