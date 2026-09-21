"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";
import { deletePostAdmin } from "@/lib/admin-actions";

export function AdminPosts({
  posts,
}: {
  posts: {
    id: string;
    title: string;
    slug: string;
    category: string;
    read_time: string;
    published_at: string;
    excerpt: string;
    architect_name: string;
  }[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  if (posts.length === 0) {
    return (
      <p className="font-caption text-caption text-secondary bg-surface-container-low rounded-lg p-space-md">
        No posts yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-outline-variant/30 bg-surface-container-low rounded-lg overflow-hidden">
      {posts.map((p) => (
        <div key={p.id} className="p-space-md flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-on-surface font-semibold leading-snug">
                {p.title}
              </span>
              <span className="font-meta-mono text-meta-mono text-secondary">
                {p.architect_name} · {p.category} · {p.read_time}
              </span>
            </div>
            <a
              href={`/articles/${p.slug}`}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 text-primary"
              aria-label="View post"
            >
              <Icon name="open_in_new" className="text-[18px]" />
            </a>
          </div>
          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => {
                if (!confirm(`Delete "${p.title}" permanently?`)) return;
                setBusyId(p.id);
                startTransition(async () => {
                  const res = await deletePostAdmin(p.id);
                  if (res.error) alert(res.error);
                  else router.refresh();
                  setBusyId(null);
                });
              }}
              disabled={pending && busyId === p.id}
              className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary hover:text-error transition-colors disabled:opacity-50"
            >
              <Icon name="delete" className="text-[16px]" />
              {pending && busyId === p.id ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}