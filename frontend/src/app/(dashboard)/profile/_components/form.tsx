"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { profileSchema } from "@/schemas/profile-schema";
import { Role } from "@/types/user";
import { Form, Field as FormischField, useForm } from "@formisch/react";
import type { SubmitHandler } from "@formisch/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileFormProps {
  name: string;
  email: string;
  role: Role;
  about: string;
}

export const ProfileForm = ({ name, email, role, about }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    schema: profileSchema,
    initialInput: {
      name,
      email,
      role,
      about,
    },
  });

  const handleSubmit: SubmitHandler<typeof profileSchema> = async (output) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(output),

        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error ao alterar a senha do usuário");
      }

      toast.success("Dados alterados com sucesso", {
        description: `Seus dodos foram alterada com sucesso`,
      });
      router.refresh();
    } catch (err) {
      toast.error("Error ao alterar dados", {
        description:
          err instanceof Error ? err.message : "Tente novamente mais tarde",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermisson = role !== "ADMIN";

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Informações pessoais</CardTitle>
        <CardDescription>Atualize suas informações pessoais.</CardDescription>
      </CardHeader>
      <Form of={form} onSubmit={handleSubmit}>
        <CardContent className="mx-auto w-full max-w-250 space-y-6">
          <FieldGroup className="grid gap-4 xl:grid-cols-2">
            <FormischField of={form} path={["name"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-name"
                    className="text-muted-foreground"
                  >
                    Nome Completo
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-name"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="John Doe"
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
                    htmlFor="form-formisch-email"
                    className="text-muted-foreground"
                  >
                    E-mail
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-email"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="K0ZqI@example.com"
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
                    disabled={hasPermisson}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Selecione um cargo"
                        defaultValue={role}
                      />
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

            <div className="xl:col-span-2">
              <FormischField of={form} path={["about"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel
                      htmlFor="form-formisch-role"
                      className="text-muted-foreground"
                    >
                      Sobre Você
                    </FieldLabel>
                    <Textarea
                      {...field.props}
                      id="form-formisch-about"
                      value={field.input ?? ""}
                      aria-invalid={field.errors !== null}
                      placeholder="Adicione sua bio..."
                      autoComplete="off"
                      rows={6}
                      className="resize-none"
                    />
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>
            </div>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex justify-end border-none bg-white">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner />
                Salvando...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
};
