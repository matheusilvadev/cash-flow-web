"use client";

import { useState } from "react";
import { ActivityType, CreateActivityInput } from "@/lib/activities";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function ActivityCreateDialog({
  onCreate,
}: {
  onCreate: (input: CreateActivityInput) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<ActivityType>("REVENUE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      await onCreate({ description, value, type });
      setOpen(false);
      setDescription("");
      setValue("");
      setType("REVENUE");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao criar activity");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nova activity</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar activity</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Valor (ex: 10.50)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="flex gap-2">
            <Button
              type="button"
              variant={type === "REVENUE" ? "default" : "outline"}
              onClick={() => setType("REVENUE")}
              className={type === "REVENUE" ? "bg-blue-600 hover:bg-blue-600/90" : ""}
            >
              Receita
            </Button>
            <Button
              type="button"
              variant={type === "EXPENSE" ? "default" : "outline"}
              onClick={() => setType("EXPENSE")}
              className={type === "EXPENSE" ? "bg-red-600 hover:bg-red-600/90" : ""}
            >
              Despesa
            </Button>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button disabled={loading} onClick={submit} className="w-full">
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
