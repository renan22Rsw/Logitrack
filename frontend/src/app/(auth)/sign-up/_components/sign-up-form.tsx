"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignUpSchema } from "@/schemas/auth-schema";
import {
  SubmitHandler,
  useForm,
  Form,
  Field as FormischField,
} from "@formisch/react";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    schema: SignUpSchema,
    initialInput: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit: SubmitHandler<typeof SignUpSchema> = async (output) => {
    setServerError(null);

    try {
      const { name, email, password } = output;

      const response = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data?.message ?? "Ocorreu um erro. Tente novamente.");
      }

      router.push("/sign-in");
    } catch (err) {
      setServerError("Não foi possível conectar ao servidor. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <Form of={form} onSubmit={handleSubmit}>
      <FieldGroup>
        <FormischField of={form} path={["name"]}>
          {(field) => (
            <Field data-invalid={field.errors !== null}>
              <FieldLabel
                htmlFor="form-formisch-name"
                className="text-muted-foreground"
              >
                Nome Completo
              </FieldLabel>
              <div className="relative">
                <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  {...field.props}
                  id="form-formisch-name"
                  value={field.input ?? ""}
                  aria-invalid={field.errors !== null}
                  placeholder="Username"
                  autoComplete="off"
                  className="pl-10"
                />
              </div>
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
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  {...field.props}
                  id="form-formisch-email"
                  value={field.input ?? ""}
                  aria-invalid={field.errors !== null}
                  placeholder="user@example.com"
                  autoComplete="off"
                  type="email"
                  className="pl-10"
                />
              </div>
              {field.errors && (
                <FieldError
                  errors={field.errors.map((message) => ({ message }))}
                />
              )}
            </Field>
          )}
        </FormischField>

        <FormischField of={form} path={["password"]}>
          {(field) => (
            <Field data-invalid={field.errors !== null}>
              <FieldLabel
                htmlFor="form-formisch-password"
                className="text-muted-foreground"
              >
                Senha
              </FieldLabel>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  {...field.props}
                  id="form-formisch-password"
                  value={field.input ?? ""}
                  aria-invalid={field.errors !== null}
                  placeholder="********"
                  autoComplete="off"
                  type="password"
                  className="pl-10"
                />
              </div>
              {field.errors && (
                <FieldError
                  errors={field.errors.map((message) => ({ message }))}
                />
              )}
            </Field>
          )}
        </FormischField>

        <FormischField of={form} path={["confirmPassword"]}>
          {(field) => (
            <Field data-invalid={field.errors !== null}>
              <FieldLabel
                htmlFor="form-formisch-confirmPassword"
                className="text-muted-foreground"
              >
                Confirmar Senha
              </FieldLabel>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  {...field.props}
                  id="form-formisch-confirmPassword"
                  value={field.input ?? ""}
                  aria-invalid={field.errors !== null}
                  placeholder="********"
                  autoComplete="off"
                  type="password"
                  className="pl-10"
                />
              </div>
              {field.errors && (
                <FieldError
                  errors={field.errors.map((message) => ({ message }))}
                />
              )}
            </Field>
          )}
        </FormischField>
      </FieldGroup>

      {serverError && (
        <p className="text-destructive mt-2 text-sm">{serverError}</p>
      )}

      <div className="py-4">
        <Button
          type="submit"
          disabled={form.isSubmitting}
          className="w-full bg-blue-600 text-white"
        >
          {form.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando conta...
            </>
          ) : (
            "Criar Conta"
          )}
        </Button>
      </div>
    </Form>
  );
};
