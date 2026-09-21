import Link from "next/link";
import { Icon } from "./icon";
import { SafeImage } from "./safe-image";
import type { Architect, Post } from "@/lib/types";

const PORTRAIT_FALLBACK = "/plates/mark-480.png";

export function ArchitectAvatar({ architect }: { architect: Architect }) {
  return (
    <div className="relative w-20 h-24 bg-surface-container-highest shrink-0 overflow-hidden rounded">
      <SafeImage
        className="w-full h-full object-cover grayscale contrast-110"
        alt={architect.name}
        src={architect.portrait_url}
        fallbackSrc={PORTRAIT_FALLBACK}
      />
      <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
    </div>
  );
}

export function WritingCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className="bg-surface-container-low p-space-md rounded flex flex-col gap-space-xs hover:bg-surface-container transition-colors active:scale-[0.99]"
    >
      <div className="flex items-center justify-between">
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
          {post.published_at} · Monograph Essay
        </span>
        <span className="font-caption text-caption text-secondary flex items-center gap-1">
          <Icon name="schedule" className="text-[14px]" /> {post.read_time}
        </span>
      </div>
      <h4 className="font-subhead text-subhead text-on-surface font-medium">
        {post.title}
      </h4>
      <p className="font-caption text-caption text-on-surface-variant line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-1 text-primary pt-1">
        <span className="font-label-sm text-label-sm">Read Monograph Transcript</span>
        <Icon name="arrow_forward" className="text-[16px]" />
      </div>
    </Link>
  );
}

export function ArchitectRowCard({ architect }: { architect: Architect }) {
  return (
    <Link
      href={`/architects/${architect.slug}`}
      className="bg-surface-container-low p-space-md rounded flex items-start gap-space-md hover:bg-surface-container transition-colors active:scale-[0.99]"
    >
      <div className="relative w-16 h-20 bg-surface-container-highest shrink-0 overflow-hidden rounded">
        <SafeImage
          className="w-full h-full object-cover grayscale contrast-110"
          alt={architect.name}
          src={architect.portrait_url}
          fallbackSrc={PORTRAIT_FALLBACK}
        />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-meta-mono text-meta-mono uppercase tracking-[0.08em] text-secondary">
          {architect.era}
        </span>
        <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight">
          {architect.name}
        </h3>
        <p className="font-caption text-caption text-secondary italic line-clamp-1">
          {architect.location}
        </p>
        <p className="font-caption text-caption text-on-surface-variant line-clamp-2 mt-1">
          {architect.bio}
        </p>
      </div>
    </Link>
  );
}
/**
 * SignatureBuildingBand — a quiet, full-width plate of the architect's
 * signature work, mounted only on the monograph dossier (never on cards).
 * Grayscale, low contrast, no overlay text, no borders, no rounded corners.
 */

const PLAQUES: Record<string, string> = {
  "louis-i-kahn": "/plates/salk-band.jpg",
  "peter-zumthor": "/plates/vals-band.jpg",
  "juhani-pallasmaa": "/plates/brick-band.jpg",
  "lina-bo-bardi": "/plates/brick-band.jpg",
};

export function SignatureBuildingBand({
  slug,
}: {
  slug: string;
}) {
  const src = PLAQUES[slug] ?? "/plates/brick-band.jpg";
  return (
    <div className="w-full h-32 overflow-hidden bg-surface-container-low" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover object-center grayscale contrast-[0.92]"
        loading="lazy"
      />
    </div>
  );
}
