"use server";

import { getSupabaseServerClient } from "./supabase-server";
import { revalidatePath } from "next/cache";

export async function createAnnotation(postId: string, body: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication required" };

  const { error } = await supabase.from("annotations").insert({
    post_id: postId,
    user_id: user.id,
    body,
  });

  if (error) return { error: error.message };

  revalidatePath(`/articles/[slug]`, "page");
  return { success: true };
}

export async function toggleAnnotationLike(annotationId: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  const { error } = await supabase.rpc("increment_annotation_likes", {
    p_annotation_id: annotationId,
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  body: PostBlock[];
  category: string;
  cover_image_url: string;
  read_time: string;
  architect_id: string;
}) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication required" };
  if (user.id !== data.architect_id)
    return { error: "Can only publish under your own name" };

  const { error } = await supabase.from("posts").insert({
    ...data,
    body: JSON.stringify(data.body),
    published_at: new Date().toISOString(),
  });

  if (error) return { error: error.message };
  revalidatePath("/architect-portal");
  return { success: true };
}

export async function updatePost(
  postId: string,
  data: {
    title: string;
    excerpt: string;
    body: PostBlock[];
    category: string;
    cover_image_url: string;
    read_time: string;
  }
) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication required" };

  const { error } = await supabase
    .from("posts")
    .update({ ...data, body: JSON.stringify(data.body) })
    .eq("id", postId)
    .eq("architect_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/architect-portal");
  return { success: true };
}

export async function updateArchitectProfile(data: {
  name: string;
  bio: string;
  curatorial_statement: string;
  location: string;
  era: string;
}) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication required" };

  const { error } = await supabase
    .from("architects")
    .update(data)
    .eq("id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/architect-portal");
  return { success: true };
}

export async function createArchitectProfile(data: {
  name: string;
  slug: string;
  bio: string;
  curatorial_statement: string;
  era: string;
  location: string;
}) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication required" };

  const { error } = await supabase.from("architects").insert({
    id: user.id,
    ...data,
  });

  if (error) return { error: error.message };
  revalidatePath("/architect-portal");
  return { success: true };
}

export async function signOut() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;
  await supabase.auth.signOut();
  revalidatePath("/");
}

export async function deletePost(postId: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication required" };

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .eq("architect_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/architect-portal");
  return { success: true };
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

export async function signUp(data: {
  email: string;
  password: string;
  name: string;
}) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Database not configured" };

  const { data: signUpResult, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { role: "architect", name: data.name },
    },
  });
  if (error) return { error: error.message };

  const needsConfirmation =
    !signUpResult.session &&
    signUpResult.user != null &&
    signUpResult.user.email_confirmed_at == null;

  revalidatePath("/");
  return {
    success: true,
    needsConfirmation,
    userId: signUpResult.user?.id ?? null,
  };
}

type PostBlock = import("./types").PostBlock;
