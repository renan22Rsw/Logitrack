import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordForm } from "./password-form";

export const SecuritySection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Segurança da Conta</CardTitle>
        <CardDescription>Gerencie a segurança da sua conta</CardDescription>
      </CardHeader>

      <CardContent>
        <PasswordForm />
      </CardContent>
    </Card>
  );
};
