"use client";

import { CitationButton } from "./citation-button";
import type { PostBlock } from "@/lib/types";

export function ReadingBody({
  blocks,
  category,
}: {
  blocks: PostBlock[];
  category: string;
}) {
  if (blocks.length === 0) {
    return (
      <p className="font-body-lg text-body-lg leading-relaxed text-on-surface text-secondary">
        Full text forthcoming in the folio edition.
      </p>
    );
  }

  return (
    <div
      className="flex flex-col gap-space-md text-on-surface font-body-lg text-body-lg leading-relaxed"
    >
      {blocks.map((block, i) => {
        if (block.type === "figure") {
          return (
            <figure
              key={i}
              className="my-space-md bg-surface-container-low rounded-lg p-space-xs"
            >
              <img
                className="w-full h-64 object-cover rounded shadow-sm"
                alt={block.image_alt || block.figure_caption || category}
                src={block.image_url}
              />
              <div className="pt-space-xs px-1 flex justify-between items-baseline">
                <span className="font-caption text-caption text-secondary">
                  {block.figure_caption}
                </span>
                {block.figure_year && (
                  <span className="font-meta-mono text-meta-mono text-secondary">
                    {block.figure_year}
                  </span>
                )}
              </div>
            </figure>
          );
        }

        if (block.type === "pull_quote") {
          return (
            <div
              key={i}
              className="-mx-2 sm:-mx-6 my-space-lg bg-surface-container rounded-xl p-space-lg relative shadow-sm"
            >
              <div className="absolute -top-3 left-6 bg-primary text-on-primary w-7 h-7 rounded-full flex items-center justify-center font-subhead text-subhead shadow-sm select-none">
                &ldquo;
              </div>
              <blockquote className="font-headline-md text-[24px] sm:text-headline-md italic leading-snug text-on-surface pt-1">
                {block.quote_text}
              </blockquote>
              <div className="pt-space-sm flex items-center justify-between">
                <cite className="font-caption text-caption text-secondary not-italic flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  {block.quote_author}
                </cite>
                <CitationButton
                  citation={`"${block.quote_text}" — ${block.quote_author}`}
                />
              </div>
            </div>
          );
        }

        if (block.type === "subheading") {
          return (
            <h3
              key={i}
              className="font-headline-md text-headline-md text-on-surface font-medium leading-snug pt-2"
            >
              {block.heading}
            </h3>
          );
        }

        const isFirstParagraph =
          block.type === "paragraph" &&
          i === 0 &&
          (block.content || "")?.length > 0;

        return (
          <p key={i} className="font-body-lg text-body-lg leading-relaxed text-on-surface">
            {isFirstParagraph && (
              <span className="float-left text-headline-lg font-headline-lg text-primary leading-none pr-space-xs pt-1 font-normal select-none">
                {(block.content || "").charAt(0)}
              </span>
            )}
            {(block.content || "").slice(isFirstParagraph ? 1 : 0)}
          </p>
        );
      })}
    </div>
  );
}