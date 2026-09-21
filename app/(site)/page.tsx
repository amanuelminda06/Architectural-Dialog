import { Masthead } from "@/components/masthead";
import { PlateBand } from "@/components/plate-band";
import { IssueHeader, FeedPostCard } from "@/components/feed";
import { FooterColophon } from "@/components/footer";
import { listPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await listPosts();

  return (
    <>
      <Masthead />
      <PlateBand />
      <div className="pt-20">
        <IssueHeader
          label="Dispatches & Monographs"
          title="Issue № 42 — Silence, Light, and Gravity"
        />
        <div className="h-[1px] w-full bg-outline-variant/40" />
        <section className="flex flex-col divide-y divide-outline-variant/30">
          {posts.map((post) => (
            <FeedPostCard key={post.id} post={post} />
          ))}
        </section>
        <FooterColophon />
      </div>
    </>
  );
}