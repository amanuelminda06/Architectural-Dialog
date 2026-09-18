"use client";

import { useState } from "react";
import { Icon } from "./icon";
import { useToast } from "./toast";

export function ArticleControls({
  durationLabel = "14m",
}: {
  durationLabel?: string;
}) {
  const [saved, setSaved] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [scale, setScale] = useState<"standard" | "comfortable">("standard");
  const { showToast } = useToast();

  return (
    <div className="flex flex-col">
      <div className="bg-surface-container-low rounded-lg p-space-xs px-space-sm flex items-center justify-between shadow-sm">
        <button
          aria-label="Save Article"
          onClick={() => setSaved((s) => !s)}
          className={`flex items-center gap-1.5 py-1.5 px-2 rounded active:bg-surface-container transition-colors ${
            saved ? "text-primary" : "text-on-surface-variant"
          }`}
        >
          <Icon name={saved ? "bookmark" : "bookmark_border"} filled={saved} className="text-[18px]" />
          <span className="font-label-sm text-label-sm font-medium">
            {saved ? "Saved" : "Save"}
          </span>
        </button>

        <button
          aria-label="Listen to Audio Essay"
          onClick={() => {
            setAudioOpen((o) => !o);
            showToast(audioOpen ? "Audio tray closed" : "Archival tape queued");
          }}
          className={`flex items-center gap-1.5 py-1.5 px-2 rounded active:bg-surface-container transition-colors ${
            audioOpen ? "text-primary" : "text-on-surface-variant"
          }`}
        >
          <Icon name="headphones" className="text-[18px]" />
          <span className="font-label-sm text-label-sm font-medium">
            Audio Essay{" "}
            <span className="text-secondary font-normal">({durationLabel})</span>
          </span>
        </button>

        <div className="flex items-center gap-1 bg-surface rounded px-1.5 py-1 shadow-sm">
          <button
            aria-label="Standard font scale"
            onClick={() => {
              setScale("standard");
              showToast("Type scale set to standard");
            }}
            className={`font-meta-mono text-[11px] px-1.5 py-0.5 rounded font-semibold transition-colors ${
              scale === "standard"
                ? "text-primary"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            A
          </button>
          <span className="text-secondary-fixed-dim text-[10px]">|</span>
          <button
            aria-label="Comfortable font scale"
            onClick={() => {
              setScale("comfortable");
              showToast("Type scale set to comfortable");
            }}
            className={`font-meta-mono text-[13px] px-1.5 py-0.5 rounded font-semibold transition-colors ${
              scale === "comfortable"
                ? "text-primary"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            A+
          </button>
        </div>
      </div>

      {audioOpen && (
        <div className="mt-space-xs bg-surface-container-high rounded-lg p-space-sm shadow-sm transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon name="graphic_eq" className="text-primary text-[20px]" />
              <span className="font-meta-mono text-meta-mono uppercase text-on-surface font-medium">
                Archival Tape • Kahn Lecture Series
              </span>
            </div>
            <span className="font-meta-mono text-meta-mono text-secondary">
              04:18 / 14:02
            </span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-1.5 rounded-full w-[31%]" />
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <button aria-label="Rewind 10 seconds" className="text-secondary hover:text-on-surface active:scale-95 flex items-center">
              <Icon name="replay_10" className="text-[20px]" />
            </button>
            <button
              aria-label="Play or pause audio"
              onClick={() => setPlaying((p) => !p)}
              className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center active:scale-90 shadow-sm"
            >
              <Icon name={playing ? "pause" : "play_arrow"} filled className="text-[18px]" />
            </button>
            <button aria-label="Forward 10 seconds" className="text-secondary hover:text-on-surface active:scale-95 flex items-center">
              <Icon name="forward_10" className="text-[20px]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}