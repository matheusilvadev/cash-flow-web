import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "@/lib/activities";

function toNumber(v: string) {
  // suporta "10.50" e "10,50"
  const normalized = v.replace(",", ".");
  return Number(normalized);
}

export function SummaryCards({ activities }: { activities: Activity[] }) {
  const active = activities.filter((a) => !a.deletedAt);

  const revenue = active
    .filter((a) => a.type === "REVENUE")
    .reduce((acc, a) => acc + toNumber(a.value), 0);

  const expense = active
    .filter((a) => a.type === "EXPENSE")
    .reduce((acc, a) => acc + toNumber(a.value), 0);

  const total = revenue - expense;

  const totalClass =
    total >= 0 ? "text-blue-600" : "text-red-600";

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Receitas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-blue-600">
            {revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Despesas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-red-600">
            {expense.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Saldo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-semibold ${totalClass}`}>
            {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
