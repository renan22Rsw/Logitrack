"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "@/schemas/auth-schema";
import {
  SubmitHandler,
  useForm,
  Form,
  Field as FormischField,
} from "@formisch/react";

import { Mail, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignInForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    schema: SignInSchema,
    initialInput: {
      email: "",
      password: "",
    },
  });

  const handleSubmit: SubmitHandler<typeof SignInSchema> = async (output) => {
    setServerError(null);

    try {
      const { email, password } = output;

      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message ?? "Ocorreu um erro. Tente novamente.");
      }

      router.refresh();
    } catch (err) {
      setServerError("Não foi possível conectar ao servidor. Tente novamente.");
      console.log(err);
    }
  };

  return (
    <Form of={form} onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup>
        <FormischField of={form} path={["email"]}>
          {(field) => (
            <Field data-invalid={field.errors !== null}>
              <FieldLabel
                htmlFor="form-formisch-name"
                className="text-muted-foreground"
              >
                E-mail
              </FieldLabel>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  {...field.props}
                  id="form-formisch-name"
                  value={field.input ?? ""}
                  aria-invalid={field.errors !== null}
                  placeholder="user@exmaple.com"
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
                htmlFor="form-formisch-passwrord"
                className="text-muted-foreground"
              >
                Senha
              </FieldLabel>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  {...field.props}
                  id="form-formisch-passwrord"
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
              Entrar
            </>
          ) : (
            "Criar Conta"
          )}
        </Button>
      </div>
    </Form>
  );
};
