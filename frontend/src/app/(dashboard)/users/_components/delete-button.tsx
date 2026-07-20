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

  const hasPermission = currentUser.role !== "ADMIN";

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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="h-4 w-4 cursor-pointer" color="red" />
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
            disabled={isLoading || hasPermission}
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
