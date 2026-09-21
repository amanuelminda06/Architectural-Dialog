import Link from "next/link";
import { Icon } from "./icon";
import { BookmarkButton } from "./bookmark-button";
import { SafeImage } from "./safe-image";
import type { Post } from "@/lib/types";

export function FeedPostCard({ post }: { post: Post }) {
  return (
    <article className="p-margin py-space-lg transition-colors duration-150 hover:bg-surface-container-low/60 flex flex-col">
      <Link className="group block" href={`/articles/${post.slug}`}>
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded bg-surface-container-highest">
          <SafeImage
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover grayscale contrast-[0.95] transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
          <span className="absolute top-2 left-2 bg-surface/90 backdrop-blur-md px-2 py-1 rounded font-meta-mono text-meta-mono uppercase tracking-wider text-on-surface">
            Plate
          </span>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-space-md mb-space-sm">
        <div className="flex items-center gap-space-sm">
          <SafeImage
            src={post.architect?.portrait_url}
            fallbackSrc="/plates/mark-480.png"
            alt={post.architect?.name || ""}
            className="w-7 h-7 rounded-full object-cover"
          />
          <Link
            href={`/architects/${post.architect?.slug}`}
            className="font-label-md text-label-md text-on-surface font-medium hover:text-primary transition-colors"
          >
            {post.architect?.name}
          </Link>
        </div>
        <span className="font-meta-mono text-meta-mono text-secondary tracking-wide">
          {post.category} · {post.read_time}
        </span>
      </div>
      <Link className="group block mb-space-sm" href={`/articles/${post.slug}`}>
        <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="font-body-base text-body-base text-on-surface-variant mt-space-xs line-clamp-3">
          {post.excerpt}
        </p>
      </Link>
      <div className="flex items-center justify-between mt-space-xs pt-space-xs">
        <div className="flex items-center gap-2">
          <span className="font-meta-mono text-meta-mono text-secondary">
            {post.published_at}
          </span>
          <span className="text-secondary/50 text-[10px]">•</span>
          <span className="font-meta-mono text-meta-mono text-secondary">
            {post.read_time} read
          </span>
        </div>
        <BookmarkButton />
      </div>
    </article>
  );
}

export function IssueHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <section className="px-margin pt-space-md pb-space-lg">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-meta-mono text-meta-mono tracking-widest uppercase text-secondary">
            {label}
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight mt-space-xs italic font-normal">
            {title}
          </h2>
        </div>
        <div
          className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary"
          title="Curated Edition"
        >
          <Icon name="auto_stories" className="text-[20px]" />
        </div>
      </div>
      <div className="mt-space-md flex items-center gap-space-xs overflow-x-auto no-scrollbar py-space-xs">
        <span className="px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm rounded-full transition-colors shrink-0">
          All Essays
        </span>
        <span className="px-3 py-1 bg-surface-container text-secondary font-label-sm text-label-sm rounded-full transition-colors shrink-0">
          Phenomenology
        </span>
        <span className="px-3 py-1 bg-surface-container text-secondary font-label-sm text-label-sm rounded-full transition-colors shrink-0">
          Tectonics
        </span>
        <span className="px-3 py-1 bg-surface-container text-secondary font-label-sm text-label-sm rounded-full transition-colors shrink-0">
          Materiality
        </span>
      </div>
    </section>
  );
}