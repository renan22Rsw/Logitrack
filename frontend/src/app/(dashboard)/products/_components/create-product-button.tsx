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
import { Plus } from "lucide-react";
import { MoneyInput } from "./money-input";

export const CreateProductButton = () => {
  const form = useForm({
    schema: ProductSchema,
    initialInput: {
      title: "",
      sku: "",
      description: "",
      price: 100,
      initialStock: 10,
    },
  });

  const handleSubmit: SubmitHandler<typeof ProductSchema> = (output) => {
    // Do something with the validated form values.
    console.log(output);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
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
            <FormischField of={form} path={["title"]}>
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
                  <MoneyInput
                    {...field.props}
                    id="form-formisch-product-price"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="Ex: R$ 19,99"
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

            <FormischField of={form} path={["initialStock"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel
                    htmlFor="form-formisch-product-stock"
                    className="text-muted-foreground"
                  >
                    Inicial Stock
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-product-stock"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="Ex: 10"
                    autoComplete="off"
                    type="number"
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
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
