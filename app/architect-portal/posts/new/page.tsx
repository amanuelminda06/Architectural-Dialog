import { redirect } from "next/navigation";
import { PostEditor } from "@/components/post-editor";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) redirect("/architect-portal");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?next=/architect-portal/posts/new");

  return <PostEditor architectId={user.id} />;
}