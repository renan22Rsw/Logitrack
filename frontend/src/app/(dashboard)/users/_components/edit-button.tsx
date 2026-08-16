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

import { EditUserSchema } from "@/schemas/user-schema";
import {
  Form,
  Field as FormischField,
  SubmitHandler,
  useForm,
} from "@formisch/react";
import { Pencil } from "lucide-react";

import { Role, User } from "@/types/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface EditUserButtonProps {
  id: string;
  name: string;
  email: string;
  role: Role;
  currentUser: User;
}

export const EditUserButton = ({
  id,
  name,
  email,
  role,
  currentUser,
}: EditUserButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    schema: EditUserSchema,
    initialInput: {
      name,
      email,
      role,
    },
  });

  const handleSubmit: SubmitHandler<typeof EditUserSchema> = async (output) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(output),

        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Eror ao editar usuário");
      }

      toast.success("Usuário editado", {
        description: `O usuário ${output.name} foi editado com sucesso`,
      });
      router.refresh();
    } catch (err) {
      toast.error("Error ao editar usuário", {
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
        <Button variant="outline" className="border-none">
          <Pencil className="h-4 w-4" />
        </Button>
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
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
