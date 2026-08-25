import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordForm } from "./password-form";
import { DeleteAccountDialog } from "./delete-account-dialog";

interface SecuritySectionProps {
  isDemo: boolean;
}

export const SecuritySection = ({ isDemo }: SecuritySectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Segurança da Conta</CardTitle>
        <CardDescription>Gerencie a segurança da sua conta</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <PasswordForm isDemo={isDemo} />
        <DeleteAccountDialog isDemo={isDemo} />
      </CardContent>
    </Card>
  );
};
