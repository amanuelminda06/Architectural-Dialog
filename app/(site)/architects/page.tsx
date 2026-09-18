import { Masthead } from "@/components/masthead";
import { ArchitectRowCard } from "@/components/architect-cards";
import { Icon } from "@/components/icon";
import { listArchitects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ArchitectsPage() {
  const architects = await listArchitects();

  return (
    <>
      <Masthead />
      <div className="pt-20 flex flex-col gap-space-lg pb-space-lg">
        <div className="px-margin pt-space-md flex flex-col gap-space-xs">
          <div className="flex items-center gap-2">
            <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
              The Architects Index
            </span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight mt-1">
            Practitioners &amp; Theorists
          </h1>
          <p className="font-caption text-caption text-secondary max-w-[320px]">
            Curated dossiers of the practitioners and theorists gathered in the
            current folio.
          </p>
        </div>

        <div className="flex flex-col px-margin gap-space-md">
          {architects.map((architect) => (
            <ArchitectRowCard key={architect.id} architect={architect} />
          ))}
        </div>

        <div className="mx-margin p-space-md bg-surface-container rounded flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
            <Icon name="account_balance" className="text-[20px]" />
          </div>
          <p className="font-caption text-caption text-secondary leading-snug">
            Additional dossiers are archived on physical folio under the
            Architectural Archives, University of Pennsylvania.
          </p>
        </div>
      </div>
    </>
  );
}