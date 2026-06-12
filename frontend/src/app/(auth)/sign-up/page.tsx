import { AuthCard } from "../_components/auth-card";
import { AuthContainer } from "../_components/auth-container";
import { SignUpForm } from "./_components/sign-up-form";

const SignUp = () => {
  return (
    <AuthContainer>
      <AuthCard
        title="Criar Conta"
        description="Preencha seus dados para criar sua conta"
        footerLabel="Já possui uma conta?"
        footerLink="/sign-in"
      >
        <SignUpForm />
      </AuthCard>
    </AuthContainer>
  );
};

export default SignUp;
