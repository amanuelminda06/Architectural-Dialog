import type { Architect, Post, Annotation, PostBlock } from "./types";
import { demoArchitects, demoPosts, demoAnnotations } from "./demo-data";
import { getSupabaseServerClient } from "./supabase-server";

function mapArchitectRow(row: Record<string, unknown>): Architect {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    portrait_url: (row.portrait_url as string) || "",
    bio: (row.bio as string) || "",
    curatorial_statement: (row.curatorial_statement as string) || "",
    era: (row.era as string) || "",
    location: (row.location as string) || "",
    keywords: Array.isArray(row.keywords) ? (row.keywords as string[]) : [],
  };
}

function mapPostRow(
  row: Record<string, unknown>,
  architect?: Architect
): Post {
  let body: PostBlock[] = [];
  if (typeof row.body === "string") {
    try {
      body = JSON.parse(row.body);
    } catch {
      body = [];
    }
  } else if (Array.isArray(row.body)) {
    body = row.body as PostBlock[];
  }

  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    excerpt: (row.excerpt as string) || "",
    body,
    category: (row.category as string) || "Monograph",
    read_time: (row.read_time as string) || "",
    published_at: (row.published_at as string) || "",
    cover_image_url: (row.cover_image_url as string) || "",
    architect_id: row.architect_id as string,
    architect,
  };
}

function mapAnnotationRow(row: Record<string, unknown>): Annotation {
  const created = (row.created_at as string) || new Date().toISOString();
  return {
    id: row.id as string,
    post_id: row.post_id as string,
    author_name: (row.author_name as string) || "Anonymous",
    author_initials: (row.author_initials as string) || "AN",
    author_affiliation: (row.author_affiliation as string) || "",
    body: row.body as string,
    likes: Number(row.likes ?? 0),
    created_at: created,
    created_date_label: formatRelativeDate(created),
  };
}

function formatRelativeDate(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const mins = Math.max(0, Math.floor((now - then) / 60000));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return days === 1 ? "Yesterday" : `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ---- Public read helpers (server components) -----------------------------

export async function listArchitects(): Promise<Architect[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return demoArchitects;

  const { data, error } = await supabase.from("architects").select("*");
  if (error || !data || data.length === 0) return demoArchitects;
  return data.map(mapArchitectRow);
}

export async function getArchitectBySlug(
  slug: string
): Promise<Architect | undefined> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return demoArchitects.find((a) => a.slug === slug);

  const { data, error } = await supabase
    .from("architects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return demoArchitects.find((a) => a.slug === slug);
  return mapArchitectRow(data);
}

export async function listPosts(): Promise<Post[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return demoPosts;

  const { data, error } = await supabase
    .from("posts")
    .select("*, architects(*)")
    .order("published_at", { ascending: false });
  if (error || !data || data.length === 0) return demoPosts;

  return data.map((row) =>
    mapPostRow(row, row.architects ? mapArchitectRow(row.architects) : undefined)
  );
}

export async function getPostBySlug(
  slug: string
): Promise<Post | undefined> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return demoPosts.find((p) => p.slug === slug);

  const { data, error } = await supabase
    .from("posts")
    .select("*, architects(*)")
    .eq("slug", slug)
    .single();
  if (error || !data)
    return demoPosts.find((p) => p.slug === slug);

  return mapPostRow(data, data.architects ? mapArchitectRow(data.architects) : undefined);
}

export async function getPostsByArchitectId(
  architectId: string
): Promise<Post[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase)
    return demoPosts.filter((p) => p.architect_id === architectId);

  const { data, error } = await supabase
    .from("posts")
    .select("*, architects(*)")
    .eq("architect_id", architectId);
  if (error || !data) return [];

  return data.map((row) =>
    mapPostRow(row, row.architects ? mapArchitectRow(row.architects) : undefined)
  );
}

export async function listAnnotations(
  postId: string
): Promise<Annotation[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase)
    return demoAnnotations.filter((a) => a.post_id === postId);

  const { data, error } = await supabase
    .from("annotations")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(mapAnnotationRow);
}