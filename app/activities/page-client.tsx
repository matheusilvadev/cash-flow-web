"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "@/lib/activities";
import {
  serverCreateActivity,
  serverDeleteActivity,
  serverChangeDescription,
  serverChangeValue,
} from "./actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SummaryCards } from "@/components/activities/summary-cards";
import { ActivityCreateDialog } from "@/components/activities/activity-form-dialog";
import { ActivityList } from "@/components/activities/activity-list";

export default function ActivitiesPageClient({
  initialActivities,
}: {
  initialActivities: Activity[];
}) {
  const router = useRouter();
  const [activities] = useState<Activity[]>(initialActivities);

  const active = useMemo(
    () => activities.filter((a) => !a.deletedAt),
    [activities]
  );
  const deleted = useMemo(
    () => activities.filter((a) => !!a.deletedAt),
    [activities]
  );

  async function reload() {
    router.refresh();
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Activities</h1>

        <ActivityCreateDialog
          onCreate={async (input) => {
            await serverCreateActivity(input);
            await reload();
          }}
        />
      </div>

      <SummaryCards activities={activities} />

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Ativas</TabsTrigger>
          <TabsTrigger value="deleted">Deletadas</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <ActivityList
            activities={active}
            onDelete={async (id) => {
              await serverDeleteActivity(id);
              await reload();
            }}
            onChangeDescription={async (id, description) => {
              await serverChangeDescription({ activityId: id, description });
              await reload();
            }}
            onChangeValue={async (id, value) => {
              await serverChangeValue({ activityId: id, value });
              await reload();
            }}
          />
        </TabsContent>

        <TabsContent value="deleted">
          <ActivityList
            activities={deleted}
            onDelete={async () => {}}
            onChangeDescription={async () => {}}
            onChangeValue={async () => {}}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
