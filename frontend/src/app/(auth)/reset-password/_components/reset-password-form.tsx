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
import {
  SubmitHandler,
  useForm,
  Form,
  Field as FormischField,
} from "@formisch/react";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { profilePasswordSchema as resetPasswordSchama } from "@/schemas/profile-schema";

export const ResetPasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    schema: resetPasswordSchama,
    initialInput: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit: SubmitHandler<typeof resetPasswordSchama> = async (
    output,
  ) => {
    setServerError(null);
    try {
      const { password } = output;
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
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
    <Form of={form} onSubmit={handleSubmit}>
      <FieldGroup>
        <FormischField of={form} path={["password"]}>
          {(field) => (
            <Field data-invalid={field.errors !== null}>
              <FieldLabel
                htmlFor="form-formisch-name"
                className="text-muted-foreground"
              >
                Senha
              </FieldLabel>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  {...field.props}
                  id="form-formisch-name"
                  value={field.input ?? ""}
                  aria-invalid={field.errors !== null}
                  placeholder="********"
                  autoComplete="off"
                  className="pl-10"
                  type="password"
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
                htmlFor="form-formisch-name"
                className="text-muted-foreground"
              >
                Confirme sua senha
              </FieldLabel>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  {...field.props}
                  id="form-formisch-name"
                  value={field.input ?? ""}
                  aria-invalid={field.errors !== null}
                  placeholder="********"
                  autoComplete="off"
                  className="pl-10"
                  type="password"
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
              Criando nova senha...
            </>
          ) : (
            "Criar Senha"
          )}
        </Button>
      </div>
    </Form>
  );
};
