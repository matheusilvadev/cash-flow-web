import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

export async function apiFetchServer<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text}`);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
