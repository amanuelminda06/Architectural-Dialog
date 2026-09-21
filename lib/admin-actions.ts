"use server";

import { getSupabaseServerClient } from "./supabase-server";
import { revalidatePath } from "next/cache";
import {
  verifyAdminSession,
  createAdminSession,
  destroyAdminSession,
  getAdminPassword,
} from "./admin-auth";

export async function isAdminAuthenticated() {
  return verifyAdminSession();
}

export async function loginAdmin(password: string) {
  if (password === getAdminPassword()) {
    await createAdminSession();
    revalidatePath("/admin");
    return { success: true };
  }
  return { error: "Incorrect password" };
}

export async function logoutAdmin() {
  await destroyAdminSession();
  revalidatePath("/admin");
}

export async function getAdminDashboard() {
  if (!(await verifyAdminSession())) return { error: "not_authenticated", data: null };

  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "not_configured", data: null };

  const { data: registrations } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: architects } = await supabase.from("architects").select("id");
  const approvedIds = new Set((architects || []).map((a: { id: string }) => a.id));

  const users = (registrations || []).map((r: Record<string, unknown>) => ({
    id: r.user_id as string,
    email: (r.email as string) || "",
    name: (r.name as string) || "Unknown",
    confirmed: Boolean(r.email_confirmed_at),
    approved: approvedIds.has(r.user_id as string),
    status: (r.status as string) || "pending",
    created_at: (r.created_at as string) || "",
  }));

  const { data: posts } = await supabase
    .from("posts")
    .select(
      "id, title, slug, category, read_time, published_at, excerpt, architects(name, slug)"
    )
    .order("created_at", { ascending: false });

  return {
    error: null,
    data: {
      users,
      posts: (posts || []).map((p: Record<string, unknown>) => ({
        id: p.id as string,
        title: p.title as string,
        slug: p.slug as string,
        category: p.category as string,
        read_time: p.read_time as string,
        published_at: p.published_at as string,
        excerpt: (p.excerpt as string) || "",
        architect_name:
          (p.architects as { name: string } | null)?.name || "Unknown",
      })),
    },
  };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function approveArchitect(userId: string) {
  if (!(await verifyAdminSession())) return { error: "Unauthorized" };
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  const { data: reg } = await supabase
    .from("registrations")
    .select("*")
    .eq("user_id", userId)
    .single();

  const name = (reg?.name as string) || "Unnamed Architect";

  const { error } = await supabase.from("architects").upsert(
    {
      id: userId,
      name,
      slug: slugify(name),
      bio: "",
      curatorial_statement: "",
      era: "",
      location: "",
      keywords: [],
    },
    { onConflict: "id" }
  );

  if (error) return { error: error.message };

  await supabase
    .from("registrations")
    .update({ status: "approved", updated_at: new Date().toISOString() })
    .eq("user_id", userId);

  revalidatePath("/admin");
  return { success: true };
}

export async function unapproveArchitect(userId: string) {
  if (!(await verifyAdminSession())) return { error: "Unauthorized" };
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  await supabase.from("posts").delete().eq("architect_id", userId);
  const { error } = await supabase.from("architects").delete().eq("id", userId);
  if (error) return { error: error.message };

  await supabase
    .from("registrations")
    .update({ status: "pending", updated_at: new Date().toISOString() })
    .eq("user_id", userId);

  revalidatePath("/admin");
  return { success: true };
}

export async function deleteRegistrationAdmin(userId: string) {
  if (!(await verifyAdminSession())) return { error: "Unauthorized" };
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  await supabase.from("posts").delete().eq("architect_id", userId);
  await supabase.from("architects").delete().eq("id", userId);
  const { error } = await supabase
    .from("registrations")
    .delete()
    .eq("user_id", userId);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  return { success: true };
}

export async function deletePostAdmin(postId: string) {
  if (!(await verifyAdminSession())) return { error: "Unauthorized" };
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}