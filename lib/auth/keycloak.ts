import crypto from "crypto";

export function baseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL!;
}

export function keycloakAuthUrl(params: { screenHint?: "login" | "signup" } = {}) {
  const authEndpoint = process.env.KEYCLOAK_AUTHORIZATION_ENDPOINT!;
  const clientId = process.env.KEYCLOAK_CLIENT_ID!;
  const redirectUri = `${baseUrl()}/auth/callback`;

  const state = crypto.randomBytes(16).toString("hex");

  const url = new URL(authEndpoint);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid profile email");

 
  if (params.screenHint === "signup") {
    url.searchParams.set("kc_action", "register");
  }

  url.searchParams.set("state", state);

  return { url: url.toString(), state };
}

export async function exchangeCodeForToken(code: string) {
  const tokenEndpoint = process.env.KEYCLOAK_TOKEN_ENDPOINT!;
  const clientId = process.env.KEYCLOAK_CLIENT_ID!;
  const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;
  const redirectUri = `${baseUrl()}/auth/callback`;

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("client_id", clientId);
  body.set("code", code);
  body.set("redirect_uri", redirectUri);

  if (clientSecret) body.set("client_secret", clientSecret);

  const res = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${txt}`);
  }

  return res.json() as Promise<{
    access_token: string;
    refresh_token?: string;
    id_token?: string;
    expires_in: number;
    refresh_expires_in?: number;
    token_type: "Bearer";
  }>;
}
