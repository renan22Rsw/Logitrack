import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuditLogs } from "@/types/audit-logs";
import { auditLogsEntities } from "@/utils/audit-logs";
import { formatDate } from "@/utils/format-date";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface UserActivityAsideProps {
  auditLogs: AuditLogs[];
}

export const UserActivityAside = ({ auditLogs }: UserActivityAsideProps) => {
  const slicedAuditLogs = auditLogs.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {slicedAuditLogs.map((log) => (
          <div className="flex gap-2" key={log.id}>
            {auditLogsEntities(log.entity)}

            <div className="w-full">
              <div className="flex items-center justify-between gap-2">
                <h6 className="text-sm font-semibold">{log.description}</h6>
                <p className="text-muted-foreground text-xs">
                  {formatDate(log.createdAt)}
                </p>
              </div>
              <p className="text-muted-foreground text-xs">{log.user.name}</p>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex h-full items-end border-none bg-white">
        <Link href={"/audit-log"}>
          <div className="flex items-center font-semibold text-blue-500">
            Ver todas as atividades{" "}
            <ArrowRight size={16} className="mt-1 ml-2" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};
