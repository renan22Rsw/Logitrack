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
import { Spinner } from "@/components/ui/spinner";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteAccountProps {
  isDemo: boolean;
}

export const DeleteAccountDialog = ({ isDemo }: DeleteAccountProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("api/users/me", {
        method: "DELETE",

        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error ao deletar usuário");
      }

      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between xl:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Trash2 size={16} />
            <CardTitle>Deletar Conta</CardTitle>
          </div>
          <CardDescription className="ml-5">
            Sua conta ficará inativa caso você a delete
          </CardDescription>
        </div>

        <Dialog>
          <DialogTrigger asChild disabled={isDemo}>
            <Button variant={"destructive"}>
              <Trash2 />
              Deletar Conta
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deseja deletar sua conta?</DialogTitle>
              <DialogDescription>
                Essa ação não poderá ser desfeita ao clicar no botão de deletar
                abaixo
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="border-none bg-white">
              <DialogClose asChild>
                <Button variant={"outline"}>Cancelar</Button>
              </DialogClose>

              <Button
                variant={"destructive"}
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Deletando...
                  </>
                ) : (
                  <>
                    <Trash2 />
                    Deletar
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
    </Card>
  );
};
