"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const GuestSignInButton = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignInAsGuest = async () => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: process.env.NEXT_PUBLIC_GUEST_EMAIL,
          password: process.env.NEXT_PUBLIC_GUEST_PASS,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message ?? "Ocorreu um erro. Tente novamente.");
      }

      router.refresh();
    } catch (err) {
      setServerError("Não foi possível conectar ao servidor. Tente novamente.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={handleSignInAsGuest}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando
            </>
          ) : (
            "Entrar como conviado"
          )}
        </Button>
      </div>

      {serverError && (
        <p className="text-destructive mt-2 text-sm">{serverError}</p>
      )}
    </div>
  );
};
