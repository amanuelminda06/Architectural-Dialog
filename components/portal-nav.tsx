"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";
import { signOut } from "@/lib/actions";

const LINKS = [
  { href: "/architect-portal", label: "Overview", icon: "space_dashboard" },
  { href: "/architect-portal/posts/new", label: "New Post", icon: "edit_note" },
  { href: "/architect-portal/profile", label: "Profile", icon: "person" },
] as const;

export function PortalNav({
  name,
  compact = false,
}: {
  name: string;
  compact?: boolean;
}) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className={`${compact ? "h-14" : "h-auto"} px-margin flex flex-col`}>
        <div className="h-14 flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Icon name="architecture" className="text-[20px] text-primary" />
            <span className="font-headline-md text-subhead text-on-surface italic font-normal leading-none truncate">
              Architect Portal
            </span>
          </div>
          <span className="font-meta-mono text-meta-mono text-secondary uppercase tracking-wider hidden sm:block">
            {name}
          </span>
          <form action={signOut}>
            <button
              className="flex items-center gap-1 text-secondary hover:text-primary font-label-sm text-label-sm min-h-[44px] px-2 transition-colors"
              aria-label="Sign out"
            >
              <Icon name="logout" className="text-[18px]" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </div>
        {!compact && (
          <div className="flex items-center gap-1 pb-2 overflow-x-auto no-scrollbar">
            {LINKS.map((link) => {
              const active =
                link.href === "/architect-portal"
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors font-label-sm text-label-sm font-medium ${
                    active
                      ? "bg-primary text-on-primary"
                      : "text-secondary hover:text-on-surface"
                  }`}
                >
                  <Icon name={link.icon} className="text-[16px]" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}