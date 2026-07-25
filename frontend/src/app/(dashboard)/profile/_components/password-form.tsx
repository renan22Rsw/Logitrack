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
import { Spinner } from "@/components/ui/spinner";
import { profilePasswordSchema } from "@/schemas/profile-schema";

import {
  Form,
  Field as FormischField,
  reset,
  SubmitHandler,
  useForm,
} from "@formisch/react";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const PasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    schema: profilePasswordSchema,
    initialInput: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit: SubmitHandler<typeof profilePasswordSchema> = async (
    output,
  ) => {
    try {
      setIsLoading(true);
      const { password } = output;

      const response = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ password: password }),

        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error ao alterar a senha do usuário");
      }

      toast.success("Senha alterada com sucesso", {
        description: `Sua senha foi alterada com sucesso`,
      });
      router.refresh();
      reset(form);
    } catch (err) {
      toast.error("Error ao Alterar senha", {
        description:
          err instanceof Error ? err.message : "Tente novamente mais tarde",
      });
    } finally {
      setIsLoading(false);
    }
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
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner />
                      Salvando...
                    </>
                  ) : (
                    "Salvar alterações"
                  )}
                </Button>
              </DialogFooter>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
    </Card>
  );
};
