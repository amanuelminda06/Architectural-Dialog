import { redirect, notFound } from "next/navigation";
import { PostEditor } from "@/components/post-editor";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import type { PostBlock } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) redirect("/architect-portal");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?next=/architect-portal");

  // RLS restricts this to the architect's own posts.
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .eq("architect_id", user.id)
    .single();

  if (!post) notFound();

  let body: PostBlock[] = [];
  if (typeof post.body === "string") {
    try {
      body = JSON.parse(post.body);
    } catch {
      body = [];
    }
  } else if (Array.isArray(post.body)) {
    body = post.body as PostBlock[];
  }

  return (
    <PostEditor
      architectId={user.id}
      initial={{
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "",
        category: post.category || "Monograph",
        cover_image_url: post.cover_image_url || "",
        read_time: post.read_time || "",
        body,
      }}
    />
  );
}