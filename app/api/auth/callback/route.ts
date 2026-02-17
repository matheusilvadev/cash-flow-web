import { NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/auth/keycloak";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.redirect(new URL("/login?error=missing_code", req.url));

  try {
    const token = await exchangeCodeForToken(code);

    const res = NextResponse.redirect(new URL("/", req.url));

    res.cookies.set("access_token", token.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: token.expires_in,
    });

    if (token.refresh_token && token.refresh_expires_in) {
      res.cookies.set("refresh_token", token.refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: token.refresh_expires_in,
      });
    }

    return res;
  } catch (e: unknown) {
  const message =
    e instanceof Error ? e.message : "token_exchange_failed";

  return NextResponse.redirect(
    new URL(`/login?error=${encodeURIComponent(message)}`, req.url)
  );
}
}
