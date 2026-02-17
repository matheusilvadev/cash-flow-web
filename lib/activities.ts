import { apiFetchServer } from "@/lib/api.server";

export type ActivityType = "REVENUE" | "EXPENSE";

export type Activity = {
  id: string;
  userId: string;
  description: string;
  value: string;
  type: ActivityType;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
};

export type CreateActivityInput = {
  description: string;
  value: string; // "10.50"
  type: ActivityType;
};

export type UpdateActivityDescriptionInput = {
  activityId: string;
  description: string;
};

export type UpdateActivityValueInput = {
  activityId: string;
  value: string;
};

export async function listActivities(includeDeleted = false) {
  return apiFetchServer<Activity[]>(
    `/api/v1/activities?includeDeleted=${includeDeleted}`
  );
}

export async function createActivity(input: CreateActivityInput) {
  return apiFetchServer<Activity>(`/api/v1/activities`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function changeDescription(input: UpdateActivityDescriptionInput) {
  return apiFetchServer<Activity>(`/api/v1/activities/${input.activityId}/description`, {
    method: "PATCH",
    body: JSON.stringify({ description: input.description }),
  });
}

export async function changeValue(input: UpdateActivityValueInput) {
  return apiFetchServer<Activity>(`/api/v1/activities/${input.activityId}/value`, {
    method: "PATCH",
    body: JSON.stringify({ value: input.value }),
  });
}

export async function deleteActivity(activityId: string) {
  return apiFetchServer<void>(`/api/v1/activities/${activityId}`, {
    method: "DELETE",
  });
}
