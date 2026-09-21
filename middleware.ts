import { type NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase-config";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const { url, key } = getSupabaseConfig();

  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  // Refresh the auth token if it exists (no-op if anonymous).
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/architect-portal/:path*", "/auth/:path*", "/articles/:path*"],
};