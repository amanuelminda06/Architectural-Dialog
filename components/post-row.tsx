"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";
import { deletePost } from "@/lib/actions";

export function PostRow({
  post,
  publishedSlugs,
}: {
  post: {
    id: string;
    slug: string;
    title: string;
    category: string;
    read_time: string;
    published_at: string;
    excerpt: string;
  };
  publishedSlugs: string[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const live = publishedSlugs.includes(post.slug);

  return (
    <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
          {post.category} · {post.read_time}
        </span>
        <span
          className={`font-meta-mono text-meta-mono uppercase tracking-wider px-2 py-0.5 rounded ${
            live ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-variant text-on-surface-variant"
          }`}
        >
          {live ? "Published" : "Draft"}
        </span>
      </div>
      <h3 className="font-subhead text-subhead text-on-surface font-medium leading-snug">
        {post.title}
      </h3>
      <p className="font-caption text-caption text-secondary line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-space-sm pt-1">
        <Link
          href={`/architect-portal/posts/${post.id}/edit`}
          className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm"
        >
          <Icon name="edit" className="text-[16px]" />
          Edit
        </Link>
        {live && (
          <Link
            href={`/articles/${post.slug}`}
            className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm"
          >
            <Icon name="open_in_new" className="text-[16px]" />
            View
          </Link>
        )}
        <button
          onClick={() => {
            if (!confirm("Delete this post permanently?")) return;
            startTransition(async () => {
              const res = await deletePost(post.id);
              if (!res.error) router.refresh();
            });
          }}
          disabled={pending}
          className="inline-flex items-center gap-1 text-secondary hover:text-error font-label-sm text-label-sm ml-auto disabled:opacity-50"
        >
          <Icon name="delete" className="text-[16px]" />
          Delete
        </button>
      </div>
    </div>
  );
}