"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { profilePasswordSchema } from "@/schemas/profile-schema";

import {
  Form,
  Field as FormischField,
  SubmitHandler,
  useForm,
} from "@formisch/react";

import { Lock } from "lucide-react";

export const PasswordForm = () => {
  const form = useForm({
    schema: profilePasswordSchema,
    initialInput: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit: SubmitHandler<typeof profilePasswordSchema> = (
    output,
  ) => {
    // Do something with the validated form values.
    console.log(output);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between xl:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Lock size={16} />
            <CardTitle>Senha</CardTitle>
          </div>
          <CardDescription className="ml-5">
            Altere sua senha reguarmente para manter sua conta segura.
          </CardDescription>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Alterar Senha</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Alterar Senha</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para alterar sua senha
              </DialogDescription>
            </DialogHeader>

            <Form of={form} onSubmit={handleSubmit}>
              <FieldGroup>
                <FormischField of={form} path={["password"]}>
                  {(field) => (
                    <Field data-invalid={field.errors !== null}>
                      <FieldLabel
                        htmlFor="form-formisch-passowrd"
                        className="text-muted-foreground"
                      >
                        Nova Senha
                      </FieldLabel>
                      <Input
                        {...field.props}
                        id="form-formisch-password"
                        value={field.input ?? ""}
                        aria-invalid={field.errors !== null}
                        placeholder="********"
                        autoComplete="off"
                        type="password"
                      />
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
                        htmlFor="form-formisch-confirm-password"
                        className="text-muted-foreground"
                      >
                        Confirmar Senha
                      </FieldLabel>
                      <Input
                        {...field.props}
                        id="form-formisch-confirm-password"
                        value={field.input ?? ""}
                        aria-invalid={field.errors !== null}
                        placeholder="********"
                        autoComplete="off"
                        type="password"
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
                <Button type="submit">Salvar Alterações</Button>
              </DialogFooter>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
    </Card>
  );
};
