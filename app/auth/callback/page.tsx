import { redirect } from "next/navigation";

export default function AuthCallbackPage({
  searchParams,
}: {
  searchParams: { code?: string; state?: string; error?: string };
}) {
  if (searchParams?.error) {
    redirect(`/login?error=${encodeURIComponent(searchParams.error)}`);
  }
  if (!searchParams?.code) {
    redirect("/login?error=missing_code");
  }

  redirect(`/api/auth/callback?code=${encodeURIComponent(searchParams.code)}`);
}
