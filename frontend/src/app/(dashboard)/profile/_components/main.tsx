import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "./form";
import { SecuritySection } from "./section";
export const ProfileMain = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="flex flex-col items-center gap-4 py-8">
        <Avatar className="h-28 w-28 border-4 border-blue-100">
          <AvatarFallback className="bg-blue-600 text-3xl font-bold text-white">
            US
          </AvatarFallback>
        </Avatar>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Usuário</h2>

          <p className="text-muted-foreground">usuario@email.com</p>

          <Badge className="mt-2 bg-blue-100 text-blue-700">ADMIN</Badge>

          <p className="text-muted-foreground mt-2 text-sm">
            Membro desde 22/05/2025
          </p>
        </div>
      </CardContent>

      <CardContent className="space-y-6">
        <ProfileForm />
        <SecuritySection />

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas</CardTitle>
          </CardHeader>

          <CardContent className="mx-auto grid w-full max-w-3xl items-center gap-4 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-sm">Movimentações</p>
              <p className="text-2xl font-bold">156</p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Produtos criados</p>
              <p className="text-2xl font-bold">24</p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Último acesso</p>
              <p className="text-2xl font-bold">Hoje</p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
