import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const base = process.env.KEYCLOAK_BASE_URL!;
  const realm = process.env.KEYCLOAK_REALM!;
  const clientId = process.env.KEYCLOAK_CLIENT_ID!;
  const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

  const tokenUrl = `${base}/realms/${realm}/protocol/openid-connect/token`;
  const body = new URLSearchParams();
  body.set("grant_type", "password");
  body.set("client_id", clientId);
  body.set("username", email);
  body.set("password", password);
  body.set("scope", "openid profile email");

  if (clientSecret) body.set("client_secret", clientSecret);

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const txt = await res.text();
    return NextResponse.json({ error: "invalid_credentials", detail: txt }, { status: 401 });
  }

  const token = (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    refresh_expires_in?: number;
  };

  const response = NextResponse.json({ ok: true });

  response.cookies.set("access_token", token.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: token.expires_in,
  });

  if (token.refresh_token && token.refresh_expires_in) {
    response.cookies.set("refresh_token", token.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: token.refresh_expires_in,
    });
  }

  return response;
}

