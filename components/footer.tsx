import Link from "next/link";
import { Icon } from "./icon";

export function FooterColophon() {
  return (
    <footer className="p-margin my-space-lg text-center flex flex-col items-center">
      <div className="w-8 h-8 flex items-center justify-center text-secondary mb-space-xs">
        <Icon name="architecture" className="text-[20px]" />
      </div>
      <p className="font-meta-mono text-meta-mono uppercase tracking-widest text-secondary">
        End of Issue № 42
      </p>
      <p className="font-caption text-caption text-secondary mt-1">
        Published fortnightly under archival preservation standards.{" "}
        <Link href="/colophon" className="underline decoration-primary underline-offset-4 decoration-1 text-on-surface-variant hover:text-primary transition-colors">
          Read the colophon
        </Link>
        .
      </p>
    </footer>
  );
}