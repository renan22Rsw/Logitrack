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
  SubmitHandler,
  useForm,
} from "@formisch/react";
import { Pencil } from "lucide-react";

import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

interface EditProductsButtonProps {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
}

export const EditProductButton = ({
  id,
  name,
  sku,
  description,
  price,
}: EditProductsButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    schema: ProductSchema,
    initialInput: {
      name,
      sku,
      description,
      price,
    },
  });

  const handleSubmit: SubmitHandler<typeof ProductSchema> = async (output) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(output),

        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erro ao editar produto");
      }

      toast("Produto editado", {
        description: "Seu produto foi editado com sucesso",
      });

      router.refresh();
    } catch (err) {
      toast("Erro ao editar produto", {
        description:
          err instanceof Error ? err.message : "Tente novamente mais tarde",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
          <DialogDescription>Altere os dados do produto.</DialogDescription>
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
                    id="form-formisch-product-name"
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
          </FieldGroup>

          <DialogFooter className="border-none bg-white">
            <DialogClose asChild disabled={isLoading}>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner />
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
