"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/lib/actions";
import type { PostBlock } from "@/lib/types";

const CATEGORIES = [
  "Monograph",
  "Phenomenology",
  "Tectonics",
  "Materiality",
  "Modernism",
  "Atmosphere",
  "Civic Tectonics",
];

interface PostEditorProps {
  architectId: string;
  initial?: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    cover_image_url: string;
    read_time: string;
    body: PostBlock[];
  };
}

const inputCls =
  "w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors";

export function PostEditor({ architectId, initial }: PostEditorProps) {
  const editing = Boolean(initial);
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [category, setCategory] = useState(initial?.category || "Monograph");
  const [cover, setCover] = useState(initial?.cover_image_url || "");
  const [readTime, setReadTime] = useState(initial?.read_time || "5 min");
  const [body, setBody] = useState(
    initial?.body?.find((b) => b.type === "paragraph")?.content || ""
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const bodyBlocks: PostBlock[] = body.trim()
    ? [{ type: "paragraph", content: body.trim() }]
    : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    startTransition(async () => {
      let res;
      if (initial) {
        res = await updatePost(initial.id, {
          title: title.trim(),
          excerpt: excerpt.trim(),
          body: bodyBlocks,
          category,
          cover_image_url: cover.trim(),
          read_time: readTime.trim(),
        });
      } else {
        const autoSlug =
          slug.trim() ||
          title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        if (!autoSlug) {
          setError("A slug is required.");
          return;
        }
        res = await createPost({
          architect_id: architectId,
          title: title.trim(),
          slug: autoSlug,
          excerpt: excerpt.trim(),
          body: bodyBlocks,
          category,
          cover_image_url: cover.trim(),
          read_time: readTime.trim(),
        });
      }

      if (res.error) {
        setError(res.error);
        return;
      }
      router.push("/architect-portal");
      router.refresh();
    });
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-xs pt-space-sm">
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
          {editing ? "Edit Monograph" : "New Monograph"}
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
          {editing ? "Revise your writing" : "Publish to the folio"}
        </h1>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container rounded p-space-sm font-caption text-caption">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
        <Field label="Title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Order is: What a Brick Wants to Be"
            className={inputCls}
          />
        </Field>

        {!editing && (
          <Field
            label="Slug (optional — generated from title if blank)"
            hint="Lowercase, hyphenated; appears in /articles/[slug]."
          >
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="order-is-what-a-brick-wants-to-be"
              className={inputCls}
            />
          </Field>
        )}

        <div className="grid grid-cols-2 gap-space-sm">
          <Field label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${inputCls} appearance-none`}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Read time">
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="6 min"
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Cover image URL">
          <input
            type="url"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="https://…"
            className={inputCls}
          />
        </Field>

        <Field label="Excerpt">
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            placeholder="A short pull for the index and reader."
            className={`${inputCls} resize-none`}
          />
        </Field>

        <Field label="Body" hint="Rendered as running essay prose on the reading view.">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            placeholder="The full monograph text…"
            className={`${inputCls} resize-none`}
          />
        </Field>

        <div className="flex items-center gap-space-sm pt-1">
          <button
            type="submit"
            disabled={pending}
            className="flex-1 bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm active:scale-[0.99] transition-all disabled:opacity-60"
          >
            {pending ? "Saving…" : editing ? "Save Changes" : "Publish Post"}
          </button>
          <a
            href="/architect-portal"
            className="font-label-md text-label-md text-secondary hover:text-on-surface py-3 px-4 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-label-sm text-label-sm text-secondary font-medium">
        {label}
      </span>
      {children}
      {hint && (
        <span className="font-meta-mono text-meta-mono text-secondary text-[11px]">
          {hint}
        </span>
      )}
    </label>
  );
}