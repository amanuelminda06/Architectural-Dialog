import Link from "next/link";
import { redirect } from "next/navigation";
import { Icon } from "@/components/icon";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { PostRow } from "@/components/post-row";

export const dynamic = "force-dynamic";

export default async function PortalDashboard() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) redirect("/architect-portal");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?next=/architect-portal");

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("architect_id", user.id)
    .order("created_at", { ascending: false });

  const { data: architect } = await supabase
    .from("architects")
    .select("name, slug")
    .eq("id", user.id)
    .single();

  const mySlugs: string[] = (posts || []).map((p) => p.slug);

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-space-md">
      <div className="flex items-end justify-between pt-space-sm">
        <div className="flex flex-col gap-space-xs">
          <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
            Overview
          </span>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
            {architect?.name ? `${architect.name}’s Folio` : "Your Folio"}
          </h1>
          {architect?.slug && (
            <Link
              href={`/architects/${architect.slug}`}
              className="font-label-sm text-label-sm text-primary underline decoration-primary underline-offset-4 decoration-1"
            >
              View your public dossier →
            </Link>
          )}
        </div>
        <Link
          href="/architect-portal/posts/new"
          className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-2.5 rounded shadow-sm active:scale-[0.98] transition-all"
        >
          <Icon name="add" className="text-[18px]" />
          New Post
        </Link>
      </div>

      <div className="h-[1px] w-full bg-outline-variant/40" />

      {!posts || posts.length === 0 ? (
        <div className="mt-space-md bg-surface-container-low rounded-lg p-space-lg flex flex-col items-center text-center gap-space-sm">
          <Icon name="menu_book" className="text-[28px] text-primary" />
          <p className="font-body-base text-body-base text-on-surface-variant max-w-[280px]">
            Your folio is empty. Publish your first monograph to open a
            dialogue with readers.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-space-sm">
          {posts.map((post) => (
            <PostRow
              key={post.id}
              post={{
                id: post.id,
                slug: post.slug,
                title: post.title,
                category: post.category,
                read_time: post.read_time,
                published_at: post.published_at,
                excerpt: post.excerpt,
              }}
              publishedSlugs={mySlugs}
            />
          ))}
        </div>
      )}
    </div>
  );
}