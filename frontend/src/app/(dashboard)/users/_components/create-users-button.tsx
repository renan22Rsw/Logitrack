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

import { UserSchema } from "@/schemas/user-schema";
import {
  Form,
  Field as FormischField,
  SubmitHandler,
  useForm,
} from "@formisch/react";
import { Plus } from "lucide-react";

import { Role, User } from "@/types/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface CreateUsersButtonProps {
  currentUser: User;
}

export const CreateUsersButton = ({ currentUser }: CreateUsersButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    schema: UserSchema,
    initialInput: {
      name: "",
      email: "",
      role: "OPERATOR",
    },
  });

  const handleSubmit: SubmitHandler<typeof UserSchema> = async (output) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(output),

        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Eror ao editar usuário");
      }

      toast.success("Novo usuário criado", {
        description: `O usuário ${output.name} foi criado com sucesso`,
      });
      router.refresh();
    } catch (err) {
      toast.error("Error ao criar usuário", {
        description:
          err instanceof Error ? err.message : "Tente novamente mais tarde",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermisson = currentUser.role !== "ADMIN";

  return (
    <Dialog>
      <DialogTrigger asChild disabled={hasPermisson}>
        <Button className="flex items-center gap-2">
          <Plus className="size-4" />
          Novo Usuário
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar usuário</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar o usuário.
          </DialogDescription>
        </DialogHeader>

        <Form of={form} onSubmit={handleSubmit}>
          <FieldGroup>
            <FormischField of={form} path={["name"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-user-name"
                    className="text-muted-foreground"
                  >
                    Nome do usuário
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-user-name"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="Nome de usuário"
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
                    htmlFor="form-formisch-user-email"
                    className="text-muted-foreground"
                  >
                    E-mail do usuário
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-user-email"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="E-mail"
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
                    htmlFor="form-formisch-user-role"
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
          </FieldGroup>

          <DialogFooter className="border-none bg-white">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner />
                  Criando...
                </>
              ) : (
                "Criar"
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
