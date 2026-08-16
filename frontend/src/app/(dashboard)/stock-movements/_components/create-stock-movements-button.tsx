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
  Form,
  Field as FormischField,
  reset,
  SubmitHandler,
  useForm,
} from "@formisch/react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { stockMovementSchema } from "@/schemas/stock-movements";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Products } from "@/types/products";
import { User } from "@/types/user";

interface CreateStockMovementsButtonProps {
  products: Products[];
  currentUser: User;
}

export const CreateStockMovementsButton = ({
  products,
  currentUser,
}: CreateStockMovementsButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    schema: stockMovementSchema,
    initialInput: {
      productId: "",
      quantity: 10,
      type: "IN",
      reason: "",
    },
  });

  const handleSubmit: SubmitHandler<typeof stockMovementSchema> = async (
    output,
  ) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/stock-movements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(output),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message) ? data.message.join(", ") : data.message,
        );
      }

      toast.success("movimentação criada", {
        description: "Sua movimentação foi criada com sucesso",
      });

      router.refresh();
      reset(form);
    } catch (err) {
      toast.error("Erro ao criar movimentação", {
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
        <Button className="flex items-center gap-2">
          <Plus className="size-4" />
          Nova Movimentação
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar uma nova movimentação</DialogTitle>
          <DialogDescription>
            Crie uma nova movimentação preenchendo os campos abaixo
          </DialogDescription>
        </DialogHeader>

        <Form of={form} onSubmit={handleSubmit}>
          <FormischField of={form} path={["productId"]}>
            {(field) => (
              <Field data-invalid={field.errors !== null}>
                <FieldLabel
                  htmlFor="form-formisch-product-stcok"
                  className="text-muted-foreground"
                >
                  Tipo de Movimentação
                </FieldLabel>

                <Select
                  value={String(field.input)}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de Movimentação" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Produtos</SelectLabel>
                      {products.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
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

          <FieldGroup>
            <FormischField of={form} path={["quantity"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-stock-quantity"
                    className="text-muted-foreground"
                  >
                    Quantidade
                  </FieldLabel>

                  <Input
                    {...field.props}
                    id="form-formisch-stock"
                    value={field.input ?? 0}
                    aria-invalid={field.errors !== null}
                    autoComplete="off"
                    type="number"
                    placeholder="ex:100"
                  />

                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>

            <FormischField of={form} path={["type"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-stcok"
                    className="text-muted-foreground"
                  >
                    Tipo de Movimentação
                  </FieldLabel>

                  <Select value={field.input} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de Movimentação" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="IN">IN</SelectItem>
                      <SelectItem value="OUT">OUT</SelectItem>
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

            <FormischField of={form} path={["reason"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-stcok"
                    className="text-muted-foreground"
                  >
                    Descrição da Movimentação
                  </FieldLabel>

                  <Textarea
                    {...field.props}
                    placeholder="Preencha a descrição de sua atual movimentação"
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
          </FieldGroup>

          <DialogFooter className="border-none bg-white">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner />
                  Criando...
                </>
              ) : (
                "Criar"
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
