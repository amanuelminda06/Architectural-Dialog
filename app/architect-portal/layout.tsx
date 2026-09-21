import { redirect } from "next/navigation";
import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { PortalNav } from "@/components/portal-nav";
import { Icon } from "@/components/icon";

export const metadata = { title: "Architect Portal · Architecture Dialogue" };

export default async function PortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-margin">
        <div className="w-full max-w-sm bg-surface-container-low rounded-lg p-space-lg text-center flex flex-col gap-space-sm">
          <p className="font-headline-md text-headline-md text-on-surface">
            Supabase not configured
          </p>
          <p className="font-caption text-caption text-secondary">
            Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or
            NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) to .env.local, then run the
            migrations in /supabase/migrations.
          </p>
          <a
            href="/"
            className="text-primary font-label-md text-label-md underline underline-offset-4 decoration-1"
          >
            Return to the Index
          </a>
        </div>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?next=/architect-portal");

  const { data: architect } = await supabase
    .from("architects")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!architect) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <PortalNav name="New Architect" compact />
        <main className="px-margin pt-space-md pb-space-xl">
          <div className="max-w-lg mx-auto flex flex-col gap-space-md">
            <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
              <Icon name="hourglass_top" className="text-[24px]" />
            </div>
            <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
              Application Pending
            </span>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
              Your account awaits editorial approval
            </h1>
            <p className="font-body-base text-body-base text-on-surface-variant leading-relaxed">
              Your sign-up is confirmed but your dossier has not been approved
              by the editorial office yet. As soon as an administrator approves
              your account, publishing tools will open here.
            </p>
            <div className="bg-surface-container-low rounded-lg p-space-md font-caption text-caption text-secondary leading-relaxed">
              If you believe this is an error, contact the editorial
              directorate. Approved architects can also reach the{" "}
              <Link
                href="/admin"
                className="text-primary underline decoration-primary underline-offset-4"
              >
                admin console
              </Link>
              .
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <PortalNav name={architect.name} />
      <main className="px-margin pt-16 pb-space-xl flex-1">{children}</main>
    </div>
  );
}