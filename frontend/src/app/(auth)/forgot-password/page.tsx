import { ForgotPasswordForm } from "./_components/forget-password-form";
import { Package } from "lucide-react";

const ForgotPassword = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <Package width={100} height={100} />
        </div>
        <h1 className="text-foreground text-center text-2xl font-bold">
          Esqueceu sua senha?
        </h1>
        <p className="text-muted-foreground">
          Insira seu endereço de email para recuperar sua senha.
        </p>

        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
