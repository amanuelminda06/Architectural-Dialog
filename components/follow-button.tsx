"use client";

import { useState } from "react";
import { Icon } from "./icon";

export function FollowButton({ className = "" }: { className?: string }) {
  const [following, setFollowing] = useState(true);

  return (
    <button
      onClick={() => setFollowing((f) => !f)}
      className={`flex-1 min-h-[44px] px-space-md py-2.5 rounded flex items-center justify-center space-x-space-xs transition-all active:scale-[0.98] ${
        following
          ? "bg-primary-container text-on-primary-container shadow-sm"
          : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
      } ${className}`}
    >
      <Icon name={following ? "check" : "add"} className="text-[18px]" />
      <span className="font-label-md text-label-md font-semibold tracking-wide">
        {following ? "Following" : "Follow Architect"}
      </span>
    </button>
  );
}