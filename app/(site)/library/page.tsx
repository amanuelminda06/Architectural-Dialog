import { Masthead } from "@/components/masthead";
import { Icon } from "@/components/icon";
import Link from "next/link";

export default function LibraryPage() {
  return (
    <>
      <Masthead />
      <div className="pt-20 px-margin pb-space-lg flex flex-col gap-space-md">
        <div className="pt-space-md flex flex-col gap-space-xs">
          <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
            Reading List
          </span>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
            The Library
          </h1>
        </div>

        <div className="mt-space-md p-space-lg bg-surface-container-low rounded-lg flex flex-col items-center text-center gap-space-sm">
          <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
            <Icon name="bookmark" className="text-[24px]" filled />
          </div>
          <p className="font-body-base text-body-base text-on-surface-variant max-w-[260px]">
            Saved monographs and marginalia gather here on your personal folio
            shelf.
          </p>
          <Link
            href="/"
            className="mt-1 inline-flex items-center gap-1 text-primary font-label-md text-label-md group"
          >
            <span className="underline decoration-primary underline-offset-4 decoration-1 font-medium">
              Browse the Index
            </span>
            <Icon
              name="arrow_forward"
              className="text-[16px] group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </>
  );
}