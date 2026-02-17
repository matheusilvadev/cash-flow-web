"use client";

import { Activity } from "@/lib/activities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ActivityList({
  activities,
  onDelete,
  onChangeDescription,
  onChangeValue,
}: {
  activities: Activity[];
  onDelete: (id: string) => Promise<void>;
  onChangeDescription: (id: string, description: string) => Promise<void>;
  onChangeValue: (id: string, value: string) => Promise<void>;
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {activities.map((a) => {
            const isRevenue = a.type === "REVENUE";
            const badgeClass = isRevenue ? "bg-blue-600" : "bg-red-600";
            return (
              <TableRow key={a.id} className={a.deletedAt ? "opacity-60" : ""}>
                <TableCell>
                  <Badge className={badgeClass}>
                    {isRevenue ? "REVENUE" : "EXPENSE"}
                  </Badge>
                </TableCell>

                <TableCell>{a.description}</TableCell>

                <TableCell className={`text-right font-medium ${isRevenue ? "text-blue-600" : "text-red-600"}`}>
                  {Number(a.value.replace(",", ".")).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>

                <TableCell className="text-right space-x-2">
                  {!a.deletedAt ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          const desc = prompt("Nova descrição:", a.description);
                          if (desc && desc.trim()) await onChangeDescription(a.id, desc.trim());
                        }}
                      >
                        Editar desc
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          const val = prompt("Novo valor (ex: 10.50):", a.value);
                          if (val && val.trim()) await onChangeValue(a.id, val.trim());
                        }}
                      >
                        Editar valor
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(a.id)}
                      >
                        Deletar
                      </Button>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">Deletada</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}

          {activities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                Nenhuma activity
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}
