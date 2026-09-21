"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./supabase-config";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (client) return client;

  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  client = createBrowserClient(url, key);
  return client;
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseConfig();
  return Boolean(url && key);
}
