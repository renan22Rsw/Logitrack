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
import { Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import * as v from "valibot";

export const ForgotPasswordForm = () => {
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

  const emailSchema = v.object({
    email: v.pipe(
      v.string(),
      v.nonEmpty("O email é obrigatório"),
      v.email("email invalido"),
      v.maxLength(30, "O email deve ter no máximo 30 caracteres"),
    ),
  });

  const form = useForm({
    schema: emailSchema,
    initialInput: {
      email: "",
    },
  });

  const handleSubmit: SubmitHandler<typeof emailSchema> = async (output) => {
    setServerError(null);

    try {
      const { email } = output;

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      const data = await response.json();

      setServerSuccess(data.message);

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
                  placeholder="email"
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
      </FieldGroup>

      {serverSuccess && (
        <p className="mt-2 text-sm text-green-600">{serverSuccess}</p>
      )}

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
              Enviando...
            </>
          ) : (
            "Enviar"
          )}
        </Button>
      </div>
    </Form>
  );
};
