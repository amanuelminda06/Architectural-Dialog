"use client";

import { useRef, useState } from "react";
import { Icon } from "./icon";
import { useToast } from "./toast";

export function CitationButton({ citation }: { citation: string }) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (
    <button
      aria-label="Copy quote citation"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(citation);
        } catch {
          /* clipboard unavailable */
        }
        setCopied(true);
        showToast("Citation copied to clipboard");
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1800);
      }}
      className="flex items-center gap-1.5 font-meta-mono text-label-sm text-primary hover:text-on-primary-container transition-colors"
    >
      <Icon name={copied ? "check" : "content_copy"} className="text-[15px]" filled={copied} />
      <span>{copied ? "Copied" : "Cite"}</span>
    </button>
  );
}