"use server";

import {
  CreateActivityInput,
  UpdateActivityDescriptionInput,
  UpdateActivityValueInput,
} from "@/lib/activities";
import {
  listActivities,
  createActivity,
  deleteActivity,
  changeDescription,
  changeValue,
} from "@/lib/activities";

export async function serverListActivities(includeDeleted = false) {
  return await listActivities(includeDeleted);
}

export async function serverCreateActivity(input: CreateActivityInput) {
  return await createActivity(input);
}

export async function serverDeleteActivity(activityId: string) {
  return await deleteActivity(activityId);
}

export async function serverChangeDescription(
  input: UpdateActivityDescriptionInput
) {
  return await changeDescription(input);
}

export async function serverChangeValue(input: UpdateActivityValueInput) {
  return await changeValue(input);
}
