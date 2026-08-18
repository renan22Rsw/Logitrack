import { Package } from "lucide-react";
import { ResetPasswordForm } from "./_components/reset-password-form";
import { getCurrentUser } from "@/lib/api/users/get-user";
import { redirect } from "next/navigation";

const ResetPassword = async () => {
  const user = await getCurrentUser();

  if (!user.mustChangePassword) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <Package width={100} height={100} />
        </div>
        <h1 className="text-foreground text-center text-2xl font-bold">
          Crie sua senha
        </h1>
        <p className="text-muted-foreground">
          Insira sua nova senha no campo abaixo
        </p>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
