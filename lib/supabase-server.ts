import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./supabase-config";

export async function getSupabaseServerClient() {
  const cookieStore = await cookies();

  const { url, key } = getSupabaseConfig();

  if (!url || !key) return null;

  return createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Server component — ignore
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        } catch {
          // Server component — ignore
        }
      },
    },
  });
}

export async function getCurrentUser() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentArchitect() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("architects")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}
