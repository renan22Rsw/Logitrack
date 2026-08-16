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
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { User } from "@/types/user";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteUsersProps {
  id: string;
  currentUser: User;
}

export const DeleteUserButton = ({ id, currentUser }: DeleteUsersProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);

      if (currentUser.id === id) {
        toast.error("Você não pode se auto deletar");
        return;
      }

      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Algo deu errado o usuário");
      }

      toast.success("Usuário deletado com sucesso", {
        description: "O usuário foi deletado com sucesso",
      });
      router.refresh();
    } catch (err) {
      toast.error("Error ao deletar o usuário", {
        description:
          err instanceof Error ? err.message : "Tente novamente mais tarde",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = currentUser.role !== "ADMIN";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="border-none"
          variant="outline"
          disabled={hasPermission}
        >
          <Trash2 className="h-4 w-4 cursor-pointer" color="red" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Voce tem certeza que deseja deletar este usuário?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita, isso irá apagar permanentemente o
            usuário.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => handleDelete(id)}
            disabled={isLoading}
          >
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
