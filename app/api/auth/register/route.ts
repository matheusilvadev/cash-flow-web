import { NextResponse } from "next/server";

async function adminToken() {
  const base = process.env.KEYCLOAK_BASE_URL!;
  const realm = "master";
  const tokenUrl = `${base}/realms/${realm}/protocol/openid-connect/token`;

  const body = new URLSearchParams();
  body.set("grant_type", "password");
  body.set("client_id", process.env.KEYCLOAK_ADMIN_CLIENT_ID ?? "admin-cli");
  body.set("username", process.env.KEYCLOAK_ADMIN_USERNAME!);
  body.set("password", process.env.KEYCLOAK_ADMIN_PASSWORD!);

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) throw new Error("Cannot get admin token");
  const json = await res.json();
  return json.access_token as string;
}

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const base = process.env.KEYCLOAK_BASE_URL!;
  const realm = process.env.KEYCLOAK_REALM!;
  const token = await adminToken();

  const createUrl = `${base}/admin/realms/${realm}/users`;

  const payload = {
    username: email,
    email,
    enabled: true,
    firstName: name,
    credentials: [{ type: "password", value: password, temporary: false }],
  };

  const res = await fetch(createUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text();
    return NextResponse.json({ error: "cannot_create_user", detail: txt }, { status: 400 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
