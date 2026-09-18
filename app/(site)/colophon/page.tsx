import { Masthead } from "@/components/masthead";
import Link from "next/link";
import { Icon } from "@/components/icon";

export default function ColophonPage() {
  return (
    <>
      <Masthead />
      <div className="pt-20 px-margin pb-space-lg flex flex-col gap-space-md">
        <div className="pt-space-md flex flex-col gap-space-xs">
          <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
            Colophon
          </span>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
            Architecture Dialogue
          </h1>
        </div>

        <p className="font-body-base text-body-base text-on-surface-variant leading-relaxed max-w-[38rem]">
          Architecture Dialogue is a fortnightly monograph devoted to sustained
          reading, spatial contemplation, and serious architectural discourse.
          Each issue gathers essays, lectures, and marginalia in the spirit of
          the architectural monograph — an archival folio rendered for the
          present day.
        </p>

        <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
          <span className="font-meta-mono text-meta-mono uppercase tracking-wider text-primary">
            Set in Type
          </span>
          <p className="font-caption text-caption text-secondary leading-relaxed">
            Narrative bodies are set in Newsreader; structural commentary and
            interface chrome in Work Sans. Ink on warm archival stock
            (referenced as surface #fcf9f5). Interactive emphasis is reserved
            for terracotta.
          </p>
        </div>

        <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
          <span className="font-meta-mono text-meta-mono uppercase tracking-wider text-primary">
            Editorial Directorate
          </span>
          <p className="font-caption text-caption text-secondary leading-relaxed">
            Curated selections compiled from public archival collections,
            including the Louis I. Kahn Collection at the Architectural
            Archives, University of Pennsylvania.
          </p>
        </div>

        <div className="mt-space-md flex items-center justify-center gap-3 text-secondary">
          <span className="w-8 h-0.5 bg-secondary-fixed-dim" />
          <Icon name="architecture" className="text-[18px] text-primary" />
          <span className="w-8 h-0.5 bg-secondary-fixed-dim" />
        </div>

        <p className="text-center font-meta-mono text-meta-mono text-secondary">
          <Link href="/" className="underline decoration-primary underline-offset-4 decoration-1 hover:text-primary transition-colors">
            Return to the Index
          </Link>
        </p>
      </div>
    </>
  );
}