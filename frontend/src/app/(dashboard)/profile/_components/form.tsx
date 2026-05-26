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
import { Textarea } from "@/components/ui/textarea";
import { profileSchema } from "@/schemas/profile-schema";
import { Form, Field as FormischField, useForm } from "@formisch/react";
import type { SubmitHandler } from "@formisch/react";

export const ProfileForm = () => {
  const form = useForm({
    schema: profileSchema,
    initialInput: {
      name: "John Doe",
      email: "K0ZqI@example.com",
      role: "administrator",
      phone: "123-456-7890",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  });

  const handleSubmit: SubmitHandler<typeof profileSchema> = (output) => {
    // Do something with the validated form values.
    console.log(output);
  };

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
                    htmlFor="form-formisch-role"
                    className="text-muted-foreground"
                  >
                    Cargo
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-role"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="Administrador"
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

            <FormischField of={form} path={["phone"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-role"
                    className="text-muted-foreground"
                  >
                    Telefone
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-role"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="(00) 00000-0000"
                    autoComplete="off"
                    type="tel"
                  />
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
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
          <Button type="submit">Salvar Alterações</Button>
        </CardFooter>
      </Form>
    </Card>
  );
};
