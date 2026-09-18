import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { PortalNav } from "@/components/portal-nav";
import { ProfileSetup } from "@/components/profile-setup";

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
            Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to
            .env.local, then run the migrations in /supabase/migrations.
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
            <ProfileSetup
              defaultName={String((user.user_metadata && user.user_metadata.name) || "")}
            />
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