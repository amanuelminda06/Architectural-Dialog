import Link from "next/link";
import { Icon } from "./icon";
import { BookmarkButton } from "./bookmark-button";
import type { Post } from "@/lib/types";

export function ReaderFeaturedCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col bg-surface-container-low rounded overflow-hidden">
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
        <img
          alt={post.title}
          className="w-full h-full object-cover"
          src={post.cover_image_url}
        />
        <div className="absolute top-space-sm left-space-sm bg-surface/90 backdrop-blur-md px-2 py-1 rounded">
          <span className="font-meta-mono text-meta-mono uppercase tracking-wider text-on-surface">
            Plate 01
          </span>
        </div>
        <div className="absolute bottom-2 right-2 bg-inverse-surface/85 backdrop-blur-sm px-2 py-0.5 rounded">
          <span className="font-meta-mono text-meta-mono text-inverse-on-surface">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-space-md flex flex-col">
        <div className="flex items-center justify-between text-secondary mb-space-xs">
          <span className="font-meta-mono text-meta-mono tracking-wider uppercase text-primary font-medium">
            Monograph Focus
          </span>
          <span className="font-label-sm text-label-sm">{post.read_time} read</span>
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface mt-1 leading-snug">
          {post.title}
        </h2>
        <p className="font-caption text-caption text-secondary mt-1">
          By{" "}
          <Link
            href={`/architects/${post.architect?.slug}`}
            className="text-on-surface font-medium hover:text-primary transition-colors"
          >
            {post.architect?.name}
          </Link>
        </p>
        <p className="font-body-base text-body-base text-on-surface-variant mt-space-sm leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-space-md pt-space-sm flex items-center justify-between">
          <Link
            href={`/articles/${post.slug}`}
            className="inline-flex items-center gap-1 text-primary font-label-md text-label-md group"
          >
            <span className="underline decoration-primary underline-offset-4 decoration-1 font-medium">
              Read Monograph
            </span>
            <Icon
              name="arrow_forward"
              className="text-[18px] group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
          <BookmarkButton />
        </div>
      </div>
    </article>
  );
}

export function ReaderCard({ post }: { post: Post }) {
  const excerptQuote = post.excerpt;

  return (
    <article className="bg-surface-container-low p-space-md rounded flex flex-col gap-space-sm">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded bg-surface-container">
        <img
          alt={post.title}
          className="w-full h-full object-cover"
          src={post.cover_image_url}
        />
        <div className="absolute bottom-2 right-2 bg-inverse-surface/85 backdrop-blur-sm px-2 py-0.5 rounded">
          <span className="font-meta-mono text-meta-mono text-inverse-on-surface">
            {post.published_at}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-secondary pt-1">
        <span className="font-meta-mono text-meta-mono uppercase tracking-wider text-primary">
          {post.category}
        </span>
        <span className="font-label-sm text-label-sm">{post.read_time} read</span>
      </div>
      <h4 className="font-headline-md text-headline-md text-on-surface text-[22px] leading-tight">
        {post.title}
      </h4>
      <p className="font-caption text-caption text-secondary">
        By{" "}
        <Link
          href={`/architects/${post.architect?.slug}`}
          className="text-on-surface font-medium hover:text-primary transition-colors"
        >
          {post.architect?.name}
        </Link>
      </p>
      <blockquote className="font-body-base text-body-base text-on-surface-variant italic pl-space-sm bg-surface-container-high/40 py-2 pr-2 rounded line-clamp-2">
        {excerptQuote}
      </blockquote>
      <div className="flex items-center justify-between pt-space-xs">
        <Link
          href={`/articles/${post.slug}`}
          className="inline-flex items-center gap-1 text-primary font-label-md text-label-md group"
        >
          <span className="underline decoration-primary underline-offset-4 decoration-1 font-medium">
            Examine Record
          </span>
          <Icon
            name="arrow_forward"
            className="text-[16px] group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
        <BookmarkButton />
      </div>
    </article>
  );
}