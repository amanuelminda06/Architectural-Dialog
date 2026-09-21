"use server";

import { getSupabaseAdminClient } from "./supabase-admin";
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
  if (!(await verifyAdminSession()))
    return { error: "not_authenticated", data: null };

  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "not_configured", data: null };

  const { data: auth } = await supabase.auth.admin.listUsers();

  const { data: architects } = await supabase
    .from("architects")
    .select("id");

  const approvedIds = new Set((architects || []).map((a: { id: string }) => a.id));

  const users = (auth?.users || []).map((u) => {
    const meta = u.user_metadata || {};
    return {
      id: u.id,
      email: u.email || "",
      name: String(meta.name || (u.email || "").split("@")[0] || "Unknown"),
      confirmed: Boolean(u.email_confirmed_at),
      approved: approvedIds.has(u.id),
      created_at: u.created_at,
    };
  });

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
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Admin credentials not configured" };

  const { data: authUser, error: authError } =
    await supabase.auth.admin.getUserById(userId);
  if (authError || !authUser.user) return { error: "User not found" };

  const meta = authUser.user.user_metadata || {};
  const name = String(
    meta.name || authUser.user.email?.split("@")[0] || "Unnamed Architect"
  );
  const slug = slugify(name);

  const { error } = await supabase.from("architects").upsert(
    {
      id: userId,
      name,
      slug,
      bio: "",
      curatorial_statement: "",
      era: "",
      location: "",
      keywords: [],
    },
    { onConflict: "id" }
  );

  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function unapproveArchitect(userId: string) {
  if (!(await verifyAdminSession())) return { error: "Unauthorized" };
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Admin credentials not configured" };

  const { error } = await supabase.from("architects").delete().eq("id", userId);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteAuthUserAdmin(userId: string) {
  if (!(await verifyAdminSession())) return { error: "Unauthorized" };
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Admin credentials not configured" };

  await supabase.from("posts").delete().eq("architect_id", userId);
  await supabase.from("architects").delete().eq("id", userId);

  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function deletePostAdmin(postId: string) {
  if (!(await verifyAdminSession())) return { error: "Unauthorized" };
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Admin credentials not configured" };

  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}