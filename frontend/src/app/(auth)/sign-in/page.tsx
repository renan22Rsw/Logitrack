import { AuthCard } from "../_components/auth-card";
import { AuthContainer } from "../_components/auth-container";
import { GuestSignInButton } from "./_components/guest-signIn-button";
import { SignInForm } from "./_components/sign-in-form";

const SignIn = () => {
  return (
    <AuthContainer>
      <AuthCard
        title="Acessar Conta"
        description="Preencha os campos abaixo com suas informações"
        footerLabel="Não possui conta?"
        footerLink="/sign-up"
      >
        <SignInForm />
        <GuestSignInButton />
      </AuthCard>
    </AuthContainer>
  );
};

export default SignIn;
