import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { listActivities } from "@/lib/activities";
import ActivitiesPageClient from "./page-client";

export default async function ActivitiesPage() {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const activities = await listActivities(true).catch(() => []);

  return <ActivitiesPageClient initialActivities={activities} />;
}
