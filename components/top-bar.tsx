import Link from "next/link";
import { Icon } from "./icon";

export function ArticleTopBar({
  title,
  category,
  backHref,
}: {
  title: string;
  category: string;
  backHref?: string;
}) {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-14 px-margin flex items-center justify-between gap-space-sm">
        <Link
          href={backHref || "/reader"}
          aria-label="Back to reader"
          className="flex items-center gap-1 text-secondary min-w-[44px] min-h-[44px] -ml-2 px-2 transition-colors"
        >
          <Icon name="arrow_back" className="text-[20px]" />
        </Link>
        <div className="flex flex-col items-center text-center flex-1 min-w-0">
          <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary font-semibold truncate max-w-full">
            {category}
          </span>
          <span className="font-meta-mono text-meta-mono text-secondary uppercase tracking-wider text-[10px]">
            {title}
          </span>
        </div>
        <span className="min-w-[44px]" />
      </div>
    </header>
  );
}

export function ArchitectTopBar({ name }: { name: string }) {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-14 px-margin flex items-center justify-between gap-space-sm">
        <Link
          href="/architects"
          aria-label="Back to architects"
          className="flex items-center gap-1 text-secondary min-w-[44px] min-h-[44px] -ml-2 px-2 transition-colors"
        >
          <Icon name="arrow_back" className="text-[20px]" />
        </Link>
        <div className="flex flex-col items-center text-center flex-1 min-w-0">
          <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary font-semibold truncate max-w-full">
            ARCHIVE DOSSIER
          </span>
          <span className="font-meta-mono text-meta-mono text-secondary uppercase tracking-wider text-[10px] truncate max-w-full">
            {name}
          </span>
        </div>
        <span className="min-w-[44px]" />
      </div>
    </header>
  );
}

export function SimpleTopBar({ title }: { title: string }) {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-14 px-margin flex items-center justify-between gap-space-sm">
        <Link
          href="/"
          className="flex items-center gap-1 text-secondary min-w-[44px] min-h-[44px] -ml-2 px-2 transition-colors"
        >
          <Icon name="arrow_back" className="text-[20px]" />
        </Link>
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-on-surface font-semibold">
          {title}
        </span>
        <span className="min-w-[44px]" />
      </div>
    </header>
  );
}