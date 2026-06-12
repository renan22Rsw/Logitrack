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

import { User, Mail, Lock } from "lucide-react";

export const SignInForm = () => {
  const form = useForm({
    schema: SignInSchema,
    initialInput: {
      email: "",
      password: "",
    },
  });

  const handleSubmit: SubmitHandler<typeof SignInSchema> = (output) => {
    // Do something with the validated form values.
    console.log(output);
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

      <div className="py-4">
        <Button type="submit" className="w-full bg-blue-600 text-white">
          Entrar
        </Button>
      </div>
    </Form>
  );
};
