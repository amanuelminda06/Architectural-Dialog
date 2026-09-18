import { Masthead } from "@/components/masthead";
import { ReaderFeaturedCard, ReaderCard } from "@/components/reader-cards";
import { listPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ReaderPage() {
  const posts = await listPosts();
  const featured = posts.find((p) => p.slug === "atmospheres-architectural-environments") || posts[0];
  const writings = posts.filter((p) => p.id !== featured?.id).slice(0, 3);

  return (
    <>
      <Masthead />
      <div className="pt-20 flex flex-col gap-space-lg">
        <div className="px-margin pt-space-md pb-space-lg flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-meta-mono text-meta-mono uppercase tracking-[0.12em] text-primary">
              Current Edition
            </span>
            <span className="font-meta-mono text-meta-mono text-secondary">
              Autumn / Winter
            </span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight mt-1">
            The Poetics of Stone &amp; Light
          </h1>
          <div className="flex items-center gap-space-sm text-secondary mt-0.5">
            <span className="font-caption text-caption">Volume IV, No. 2</span>
            <span className="text-outline-variant">·</span>
            <span className="font-caption text-caption">
              Curated by The Editorial Directorate
            </span>
          </div>
        </div>

        <div className="px-margin mb-space-xl">
          <ReaderFeaturedCard post={featured} />
        </div>

        <div className="px-margin mb-space-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-meta-mono text-meta-mono uppercase tracking-[0.14em] text-secondary font-medium">
              Archival Papers
            </span>
            <h3 className="font-subhead text-subhead text-on-surface font-semibold">
              Critical Dialogues
            </h3>
          </div>
          <span className="font-meta-mono text-meta-mono text-primary font-medium">
            {String(writings.length).padStart(2, "0")} Writings
          </span>
        </div>

        <div className="flex flex-col px-margin gap-space-lg mb-space-xl">
          {writings.map((post) => (
            <ReaderCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mx-margin mb-space-xl p-space-lg bg-surface-container flex flex-col items-center text-center rounded">
          <span className="material-symbols-outlined text-primary text-[32px] mb-space-xs">menu_book</span>
          <span className="font-meta-mono text-meta-mono uppercase tracking-[0.14em] text-secondary">
            The Archival Print Edition
          </span>
          <h4 className="font-headline-md text-headline-md text-on-surface text-[22px] mt-1 mb-space-xs">
            Limited Folio No. 04
          </h4>
          <p className="font-caption text-caption text-secondary max-w-[280px] mb-space-md">
            Cloth-bound, letterpress printed on archival mould-made paper with
            foldout lithographic plates.
          </p>
          <button className="w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 px-space-md rounded shadow-sm active:scale-[0.99] transition-transform">
            Order Monograph Folio
          </button>
        </div>
      </div>
    </>
  );
}