import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "./form";
import { SecuritySection } from "./section";
import { User } from "@/types/user";
import { usersRoles } from "@/utils/users.table";
import { formatDate } from "@/utils/format-date";
import { Badge } from "@/components/ui/badge";
import { AuditLogs } from "@/types/audit-logs";

interface ProfileMainProps {
  user: User;
  lastAcess: AuditLogs[];
}

export const ProfileMain = ({ user, lastAcess }: ProfileMainProps) => {
  const createdProducts = user.auditLogs?.filter(
    (products) => products.entity === "PRODUCT" && products.action === "CREATE",
  );

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="flex flex-col items-center gap-4 py-8">
        <Avatar className="h-28 w-28 border-4 border-blue-100">
          <AvatarFallback className="bg-blue-600 text-3xl font-bold text-white">
            {user.name.charAt(0) + user.name.charAt(1)}
          </AvatarFallback>
        </Avatar>

        <div className="text-center">
          <h2 className="text-2xl font-bold">{user.name}</h2>

          {user.isDemo ? (
            ""
          ) : (
            <p className="text-muted-foreground">{user.email}</p>
          )}

          {user.isDemo ? (
            <Badge className="bg-purple-200 text-purple-600">Guest</Badge>
          ) : (
            <>{usersRoles(user.role)}</>
          )}

          {user.isDemo ? (
            ""
          ) : (
            <p className="text-muted-foreground mt-2 text-sm">
              {formatDate(user.createdAt)}
            </p>
          )}
        </div>
      </CardContent>

      <CardContent className="space-y-6">
        <ProfileForm
          name={user.name}
          email={user.email}
          role={user.role}
          about={user.about as string}
          isDemo={user.isDemo as boolean}
        />
        <SecuritySection isDemo={user.isDemo as boolean} />

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas</CardTitle>
          </CardHeader>

          <CardContent className="mx-auto grid w-full max-w-3xl items-center gap-4 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-sm">Movimentações</p>
              <p className="text-2xl font-bold">{user.movements?.length}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Produtos criados</p>
              <p className="text-2xl font-bold">{createdProducts?.length}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Último acesso</p>
              <p className="text-2xl font-bold">
                {formatDate(lastAcess[0].createdAt)}
              </p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
