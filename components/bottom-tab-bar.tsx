"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";

const TABS = [
  { path: "/", label: "Index", icon: "menu_book" },
  { path: "/architects", label: "Architects", icon: "architecture" },
  { path: "/library", label: "Library", icon: "bookmark" },
  { path: "/colophon", label: "Colophon", icon: "newspaper" },
] as const;

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-around h-16 px-space-sm">
        {TABS.map((tab) => {
          const active =
            tab.path === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.path);
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
                active ? "text-primary font-medium" : "text-secondary"
              }`}
            >
              <Icon name={tab.icon} className="text-[20px]" />
              <span className="font-label-sm text-label-sm tracking-wide">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}