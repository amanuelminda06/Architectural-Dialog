"use client";

import { useState } from "react";
import { Icon } from "./icon";

export function BookmarkButton({
  label = true,
  size = "md",
}: {
  label?: boolean;
  size?: "sm" | "md";
}) {
  const [saved, setSaved] = useState(false);

  if (size === "sm") {
    return (
      <button
        aria-label={saved ? "Saved Post" : "Save Post"}
        onClick={() => setSaved((s) => !s)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors duration-150 ${
          saved
            ? "bg-primary text-on-primary"
            : "bg-surface-container text-primary hover:bg-primary hover:text-on-primary"
        }`}
      >
        <Icon
          name={saved ? "bookmark" : "bookmark_border"}
          filled={saved}
          className="text-[16px] leading-none"
        />
        {label && (
          <span className="font-label-sm text-label-sm tracking-normal">
            {saved ? "Saved" : "Save"}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      aria-label="Save Monograph"
      onClick={() => setSaved((s) => !s)}
      className={`p-2 -mr-2 flex items-center justify-center transition-colors ${
        saved ? "text-primary" : "text-secondary hover:text-primary"
      }`}
    >
      <Icon name={saved ? "bookmark" : "bookmark_border"} filled={saved} className="text-[22px]" />
    </button>
  );
}