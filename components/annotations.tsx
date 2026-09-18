"use client";

import { useState, useTransition } from "react";
import { Icon } from "./icon";
import { useToast } from "./toast";
import { createAnnotation, toggleAnnotationLike } from "@/lib/actions";
import type { Annotation } from "@/lib/types";

export function Annotations({
  postId,
  initial,
}: {
  postId: string;
  initial: Annotation[];
}) {
  const [items, setItems] = useState<Annotation[]>(initial);
  const [draft, setDraft] = useState("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const submitNote = () => {
    if (draft.trim().length === 0) {
      showToast("Please type an annotation first");
      return;
    }
    startTransition(async () => {
      const result = await createAnnotation(postId, draft.trim());
      if (result.error) {
        showToast(result.error);
        return;
      }
      setDraft("");
      showToast("Note published to archival dialogue");
    });
  };

  const like = (id: string) => {
    setItems((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, likes: a.likes + 1, liked: true }
          : a
      )
    );
    toggleAnnotationLike(id);
  };

  return (
    <>
      <div className="space-y-space-sm pt-space-xs">
        {items.map((a) => (
          <div key={a.id} className="bg-surface-container-low rounded-lg p-space-sm">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                  {a.author_name}
                </span>
                {a.author_affiliation && (
                  <span className="bg-surface-variant text-on-surface-variant text-[10px] font-meta-mono uppercase px-1.5 py-0.5 rounded">
                    {a.author_affiliation}
                  </span>
                )}
              </div>
              <span className="font-meta-mono text-meta-mono text-secondary">
                {a.created_date_label || "Just now"}
              </span>
            </div>
            <p className="font-body-base text-body-base text-on-surface-variant pt-0.5">
              {a.body}
            </p>
            <div className="flex items-center gap-4 pt-2 text-secondary">
              <button
                onClick={() => like(a.id)}
                className={`flex items-center gap-1 font-label-sm text-label-sm active:scale-95 transition-colors ${
                  a.liked ? "text-primary" : "hover:text-primary"
                }`}
              >
                <Icon
                  name={a.liked ? "thumb_up" : "thumb_up_off_alt"}
                  filled={a.liked}
                  className="text-[16px]"
                />
                <span>{a.likes}</span>
              </button>
              <button className="flex items-center gap-1 font-label-sm text-label-sm hover:text-primary transition-colors">
                <Icon name="reply" className="text-[16px]" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-space-md">
        <label
          className="block font-label-sm text-label-sm text-secondary pb-1 font-medium"
          htmlFor="marginaliaInput"
        >
          Contribute to the Marginalia
        </label>
        <div className="bg-surface-container-low rounded-lg p-space-xs shadow-inner">
          <textarea
            className="w-full bg-transparent p-space-xs text-on-surface placeholder:text-secondary font-body-base text-body-base outline-none resize-none"
            id="marginaliaInput"
            placeholder="Annotate Kahn’s thesis or cite relevant structural precedent..."
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="flex items-center justify-between pt-space-xs px-space-xs">
            <div className="flex items-center gap-2 text-secondary">
              <button aria-label="Attach drawing or citation" className="p-1 hover:text-primary transition-colors" title="Attach Archival Reference">
                <Icon name="attachment" className="text-[18px]" />
              </button>
              <button aria-label="Format quote" className="p-1 hover:text-primary transition-colors" title="Format Serif Quote">
                <Icon name="format_quote" className="text-[18px]" />
              </button>
            </div>
            <button
              onClick={submitNote}
              disabled={isPending}
              className="bg-primary text-on-primary hover:bg-primary-container px-space-md py-1.5 rounded font-label-md text-label-md font-medium active:scale-95 transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-60"
            >
              <Icon name="send" className="text-[18px]" />
              <span>{isPending ? "Posting…" : "Submit Note"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}