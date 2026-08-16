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
import { ProductSchema } from "@/schemas/product-schema";
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
import { User } from "@/types/user";

interface CreateProductButtonProps {
  currentUser: User;
}

export const CreateProductButton = ({
  currentUser,
}: CreateProductButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    schema: ProductSchema,
    initialInput: {
      name: "",
      sku: "",
      description: "",
      price: 100,
      initialStock: 10,
    },
  });

  const handleSubmit: SubmitHandler<typeof ProductSchema> = async (output) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/products", {
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

      toast.success("Produto criado", {
        description: "Seu produto foi criado com sucesso",
      });

      router.refresh();
      reset(form);
    } catch (err) {
      toast.error("Erro ao criar produto", {
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
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" disabled={hasPermisson}>
          <Plus className="size-4" />
          Novo Produto
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar um novo produto</DialogTitle>
          <DialogDescription>
            Crie um novo produto preenchendo os campos abaixo
          </DialogDescription>
        </DialogHeader>

        <Form of={form} onSubmit={handleSubmit}>
          <FieldGroup>
            <FormischField of={form} path={["name"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-title"
                    className="text-muted-foreground"
                  >
                    Titulo do produto
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-product-title"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="Ex: Camiseta"
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

            <FormischField of={form} path={["sku"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-sku"
                    className="text-muted-foreground"
                  >
                    Sku do produto
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-product-sku"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="Ex: CAM-001"
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

            <FormischField of={form} path={["description"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-description"
                    className="text-muted-foreground"
                  >
                    Descricao do produto
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-product-description"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="Ex: Camiseta branca de algodão"
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

            <FormischField of={form} path={["price"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-price"
                    className="text-muted-foreground"
                  >
                    Preço do produto
                  </FieldLabel>

                  <Input
                    {...field.props}
                    id="form-formisch-product-price"
                    value={field.input ?? 0}
                    aria-invalid={field.errors !== null}
                    autoComplete="off"
                    type="number"
                    placeholder="ex: R$100,00"
                  />

                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>

            <FormischField of={form} path={["initialStock"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-stcok"
                    className="text-muted-foreground"
                  >
                    Stock inicial
                  </FieldLabel>

                  <Input
                    {...field.props}
                    id="form-formisch-product-stock"
                    value={field.input ?? 0}
                    aria-invalid={field.errors !== null}
                    autoComplete="off"
                    type="number"
                    placeholder="ex:"
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
