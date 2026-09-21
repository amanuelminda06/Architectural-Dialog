import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectTopBar } from "@/components/top-bar";
import { ArchitectAvatar, SignatureBuildingBand, WritingCard } from "@/components/architect-cards";
import { FollowButton } from "@/components/follow-button";
import { CitationButton } from "@/components/citation-button";
import { Icon } from "@/components/icon";
import { getArchitectBySlug, getPostsByArchitectId } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ArchitectPage({
  params,
}: {
  params: { slug: string };
}) {
  const architect = await getArchitectBySlug(params.slug);
  if (!architect) notFound();

  const writings = await getPostsByArchitectId(architect.id);

  return (
    <>
      <ArchitectTopBar name={architect.name} />
      <div className="pt-14">
        <div className="px-margin pt-space-md flex flex-col gap-space-md">
          <div className="flex items-center justify-between pt-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="font-meta-mono text-meta-mono uppercase tracking-[0.14em] text-primary">
                Monograph Dossier
              </span>
              <span className="text-secondary text-caption">/</span>
              <span className="font-meta-mono text-meta-mono uppercase tracking-[0.08em] text-secondary">
                No. 08
              </span>
            </div>
            <span className="font-meta-mono text-meta-mono text-secondary bg-surface-container-high px-space-sm py-1 rounded">
              Archival Folio
            </span>
          </div>

          <div className="flex items-start gap-space-md">
            <ArchitectAvatar architect={architect} />
            <div className="flex flex-col min-w-0">
              <span className="font-meta-mono text-meta-mono uppercase tracking-[0.08em] text-secondary">
                Architect &amp; Educator
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight mt-0.5 mb-1">
                {architect.name}
              </h2>
              <p className="font-subhead text-subhead text-on-surface-variant italic leading-snug">
                {architect.era} · {architect.location}
              </p>
            </div>
          </div>

          <SignatureBuildingBand slug={architect.slug} />

          <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs">
            <div className="flex items-center gap-2">
              <Icon name="auto_stories" className="text-[16px] text-primary" />
              <span className="font-meta-mono text-meta-mono uppercase tracking-wider text-primary">
                Curatorial Note
              </span>
            </div>
            <p className="font-body-base text-body-base text-on-surface-variant leading-relaxed">
              {architect.curatorial_statement}
            </p>
          </div>

          <div className="flex items-center gap-space-sm pt-space-xs">
            <FollowButton />
            <button className="bg-surface-container-high text-on-surface py-2.5 px-space-md rounded flex items-center gap-1.5 hover:bg-surface-container-highest transition-colors active:scale-[0.98]">
              <Icon name="share" className="text-[18px] text-secondary" />
              <span className="font-label-md text-label-md">Share</span>
            </button>
            <CitationButton
              citation={`${architect.name} (${architect.era}). Monograph Dossier No. 08. Architecture Dialogue.`}
            />
          </div>
        </div>

        <section className="px-margin pt-space-lg pb-space-xs flex items-baseline justify-between">
          <div>
            <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary block">
              Tracts &amp; Transcripts
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Chronological Writings
            </h3>
          </div>
          <span className="font-caption text-caption text-secondary">
            Curated Index
          </span>
        </section>

        <div className="px-margin pb-space-xl flex flex-col gap-space-sm">
          {writings.length === 0 && (
            <p className="font-caption text-caption text-secondary">
              Pursuing the folio records — writings forthcoming.
            </p>
          )}
          {writings.map((post) => (
            <WritingCard key={post.id} post={post} />
          ))}
        </div>

        <footer className="px-margin py-space-lg bg-surface-container flex flex-col items-center justify-center gap-space-xs text-center">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary mb-1">
            <Icon name="architecture" className="text-[18px]" />
          </div>
          <span className="font-meta-mono text-meta-mono uppercase tracking-[0.15em] text-secondary">
            Curated by Architecture Dialogue
          </span>
          <p className="font-caption text-caption text-secondary max-w-[280px]">
            Physical print monograph plates archived in cooperation with the
            Architectural Archives of the University of Pennsylvania.
          </p>
        </footer>

        <div className="px-margin py-space-lg text-center">
          <Link
            href="/architects"
            className="inline-flex items-center gap-1 text-primary font-label-md text-label-md group"
          >
            <Icon name="arrow_back" className="text-[16px]" />
            <span className="underline decoration-primary underline-offset-4 decoration-1 font-medium">
              All Architects
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}