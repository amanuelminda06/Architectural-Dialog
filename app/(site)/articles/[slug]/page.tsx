import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleTopBar } from "@/components/top-bar";
import { ArticleControls } from "@/components/article-controls";
import { ReadingBody } from "@/components/reading-body";
import { Annotations } from "@/components/annotations";
import { Icon } from "@/components/icon";
import { getPostBySlug, listAnnotations, listPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const architect = post.architect;
  const annotations = await listAnnotations(post.id);
  const allPosts = await listPosts();
  const nextPost =
    allPosts.find((p) => p.id !== post.id && p.architect_id === post.architect_id) ||
    allPosts.find((p) => p.id !== post.id);

  return (
    <>
      <ArticleTopBar title={post.title} category={post.category} backHref="/reader" />
      <article className="w-full max-w-xl mx-auto px-margin pt-16 pb-space-xl">
        <div className="flex items-center justify-between pb-space-xs">
          <span className="font-meta-mono text-meta-mono text-primary font-medium tracking-widest uppercase">
            Monographs &amp; Tectonics
          </span>
          <span className="font-meta-mono text-meta-mono text-secondary tracking-wider uppercase">
            Folio No. 04
          </span>
        </div>

        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-medium pt-space-xs leading-tight tracking-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-space-sm pt-space-md pb-space-md">
          {architect && (
            <Link href={`/architects/${architect.slug}`}>
              <img
                alt={architect.name}
                className="w-11 h-11 rounded-full object-cover shadow-sm flex-shrink-0"
                src={architect.portrait_url}
              />
            </Link>
          )}
          <div className="flex flex-col min-w-0">
            <Link
              href={architect ? `/architects/${architect.slug}` : "#"}
              className="font-label-md text-label-md text-on-surface font-semibold tracking-normal hover:text-primary transition-colors truncate"
            >
              {architect?.name || "Anonymous"}
            </Link>
            <div className="flex items-center gap-space-xs font-meta-mono text-meta-mono text-secondary pt-0.5">
              <span>{post.published_at}</span>
              <span>•</span>
              <span>{post.read_time} read</span>
            </div>
          </div>
        </div>

        <ArticleControls durationLabel={post.read_time.replace(" min", "m")} />

        <div className="h-space-lg" />

        <ReadingBody blocks={post.body} category={post.category} />

        <div className="flex items-center justify-center py-space-xl">
          <div className="flex items-center gap-3 text-secondary">
            <span className="w-8 h-0.5 bg-secondary-fixed-dim" />
            <span className="font-meta-mono text-meta-mono text-primary font-medium tracking-widest uppercase">
              § FINIS
            </span>
            <span className="w-8 h-0.5 bg-secondary-fixed-dim" />
          </div>
        </div>

        <section className="bg-surface-container-lowest rounded-xl p-space-md shadow-md mt-space-md">
          <div className="flex items-center justify-between pb-space-sm">
            <div className="flex items-center gap-2">
              <Icon name="chat_bubble" className="text-primary text-[20px]" />
              <h2 className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider">
                Marginalia &amp; Dialogue{" "}
                <span className="text-secondary font-normal">
                  ({annotations.length})
                </span>
              </h2>
            </div>
            <span className="font-meta-mono text-meta-mono text-secondary">
              Annotated Folio
            </span>
          </div>
          <Annotations postId={post.id} initial={annotations} />
        </section>

        {nextPost && (
          <div className="mt-space-lg bg-surface-container rounded-xl p-space-md shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-meta-mono text-meta-mono uppercase text-primary font-semibold">
                Continuum
              </span>
              <span className="font-meta-mono text-meta-mono text-secondary">
                Folio 05
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-medium leading-snug">
              {nextPost.title}
            </h3>
            <p className="font-body-base text-body-base text-on-surface-variant pt-1 pb-space-sm line-clamp-2">
              {nextPost.excerpt}
            </p>
            <div className="flex items-center justify-between pt-space-xs">
              <div className="flex items-center gap-2">
                <span className="font-meta-mono text-meta-mono text-secondary">
                  By {nextPost.architect?.name}
                </span>
                <span className="text-secondary">•</span>
                <span className="font-meta-mono text-meta-mono text-secondary">
                  {nextPost.read_time} read
                </span>
              </div>
              <Link
                href={`/articles/${nextPost.slug}`}
                className="text-primary hover:text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1"
              >
                <span>Read Folio</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </Link>
            </div>
          </div>
        )}
      </article>
    </>
  );
}