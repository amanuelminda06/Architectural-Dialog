import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const supabase = await getSupabaseServerClient();

  if (supabase && code) {
    await supabase.auth.exchangeCodeForSession(code);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("registrations")
        .update({ email_confirmed_at: new Date().toISOString() })
        .eq("user_id", user.id);
    }
  }

  return NextResponse.redirect(new URL("/architect-portal", request.url));
}