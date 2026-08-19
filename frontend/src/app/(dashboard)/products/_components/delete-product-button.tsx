"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";

interface DeleteProductProps {
  currentUser: User;
  id: string;
}

export const DeleteProductButton = ({
  id,
  currentUser,
}: DeleteProductProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Algo deu errado ao deletar o produto");
      }

      toast.success("Produto deletado com sucesso", {
        description: "Seu produto foi deletado com sucesso",
      });
      router.refresh();
    } catch (err) {
      toast.error("Error ao deletar o produto", {
        description:
          err instanceof Error ? err.message : "Tente novamente mais tarde",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission =
    currentUser.role === "ADMIN" || currentUser.role === "MANAGER";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={!hasPermission}>
        <Button variant="outline" className="border-none">
          <Trash2 className="h-4 w-4" color="red" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Voce tem certeza que deseja deletar este produto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita, isso irá apagar permanentemente o
            produto.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(id)}>
            {isLoading ? (
              <>
                <Spinner />
                Deletando...
              </>
            ) : (
              "Deletar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
