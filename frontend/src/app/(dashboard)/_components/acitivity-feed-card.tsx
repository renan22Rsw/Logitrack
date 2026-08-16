import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StockMovements } from "@/types/stock-movements";
import { formatDate } from "@/utils/format-date";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ActivityFeedProps {
  stockMovements: StockMovements[];
}

export const AcitivityFeedCard = ({ stockMovements }: ActivityFeedProps) => {
  const slicedActivitiesFeed = stockMovements.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
      </CardHeader>

      <CardContent className="h-full py-6">
        {slicedActivitiesFeed.length > 0 ? (
          <>
            {slicedActivitiesFeed.map((activity, __index) => (
              <div className="flex gap-4" key={__index}>
                {activity.type === "IN" ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCFCE7]">
                    <ArrowUp color="green" size={24} />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCDAD6]">
                    <ArrowDown color="red" size={24} />
                  </div>
                )}

                <div className="flex w-full justify-between space-y-2">
                  <div>
                    <h6 className="font-bold">
                      {activity.type === "IN"
                        ? `Entrada de ${activity.quantity} unidades`
                        : `Saida de ${activity.quantity} unidades`}
                    </h6>
                    <p className="text-muted-foreground font-semibold">
                      {activity.product.name}
                    </p>
                    <p className="text-muted-foreground">
                      Por{" "}
                      <span className="font-semibold text-blue-950/80">
                        {activity.user.name}
                      </span>
                    </p>
                  </div>

                  <span className="text-muted-foreground">
                    {formatDate(activity.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-muted-foreground py-10 text-center text-lg font-medium">
            Nenhuma movimentação encontrada.
          </p>
        )}
      </CardContent>
      <CardFooter className="bg-white">
        <Link href={"/stock-movements"}>
          <div className="flex items-center font-semibold text-blue-500">
            Ver todas as movimentações{" "}
            <ArrowRight size={16} className="mt-1 ml-2" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};
