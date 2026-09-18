import Link from "next/link";
import { Icon } from "@/components/icon";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-margin">
      <div className="w-full max-w-sm bg-surface-container-low rounded-lg p-space-lg flex flex-col items-center text-center gap-space-sm">
        <Icon name="search_off" className="text-[32px] text-primary" />
        <h1 className="font-headline-md text-headline-md text-on-surface">
          Folio not found
        </h1>
        <p className="font-caption text-caption text-secondary">
          This page has not been indexed in the current edition.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-primary font-label-md text-label-md group"
        >
          <span className="underline decoration-primary underline-offset-4 decoration-1 font-medium">
            Return to the Index
          </span>
          <Icon
            name="arrow_forward"
            className="text-[16px] group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}