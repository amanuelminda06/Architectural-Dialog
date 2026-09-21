import Link from "next/link";
import { Icon } from "@/components/icon";
import { getAdminDashboard, claimFirstAdminForm } from "@/lib/admin-actions";
import { AdminUsers } from "@/components/admin-users";
import { AdminPosts } from "@/components/admin-posts";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin Console · Architecture Dialogue" };

export default async function AdminPage() {
  const result = await getAdminDashboard();

  if (!result.error && result.data && result.data.admins > 0) {
    return (
      <div className="min-h-screen bg-surface max-w-2xl mx-auto px-margin pt-16 pb-space-xl flex flex-col gap-space-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
              Editorial Control
            </span>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
              Admin Console
            </h1>
          </div>
          <Link
            href="/"
            className="text-primary font-label-sm text-label-sm underline decoration-primary underline-offset-4"
          >
            Public site →
          </Link>
        </div>

        <section className="flex flex-col gap-space-sm">
          <SectionTitle
            icon="how_to_reg"
            title="Architect Applications"
            note="Email-confirmed users awaiting or holding approval."
          />
          <AdminUsers users={result.data.users} />
        </section>

        <section className="flex flex-col gap-space-sm">
          <SectionTitle
            icon="library_books"
            title="Published Posts"
            note="Every monograph across the publication. Delete removes it everywhere."
          />
          <AdminPosts posts={result.data.posts} />
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-margin">
      <div className="w-full max-w-sm bg-surface-container-low rounded-lg p-space-lg flex flex-col gap-space-md text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
          <Icon name="admin_panel_settings" className="text-[24px]" />
        </div>
        <h1 className="font-headline-md text-headline-md text-on-surface">
          Admin Console
        </h1>

        {result.error === "Admin credentials not configured" && (
          <p className="font-caption text-caption text-secondary">
            Set <span className="font-mono">SUPABASE_SERVICE_ROLE_KEY</span> and{" "}
            <span className="font-mono">NEXT_PUBLIC_SUPABASE_URL</span> to power
            the admin console.
          </p>
        )}

        {result.error === "Authentication required" && (
          <div className="flex flex-col gap-space-sm">
            <p className="font-caption text-caption text-secondary">
              Sign in to access the editorial control room.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center gap-1 bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm"
            >
              Go to Sign In
            </Link>
          </div>
        )}

        {result.error === "Unauthorized" && (
          <p className="font-caption text-caption text-secondary">
            This account does not hold an editorial role. Only approved
            administrators may enter.
          </p>
        )}

        {!result.error && result.data && result.data.admins === 0 && (
          <div className="flex flex-col gap-space-sm">
            <p className="font-caption text-caption text-secondary">
              No administrator exists on this project yet. The first signed-in
              user may claim the role.
            </p>
            <form action={claimFirstAdminForm}>
              <button
                type="submit"
                className="w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm active:scale-[0.99] transition-all"
              >
                Claim Admin (first user)
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  note,
}: {
  icon: string;
  title: string;
  note: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon name={icon} className="text-[18px] text-primary" />
        <h2 className="font-subhead text-subhead text-on-surface font-medium">
          {title}
        </h2>
      </div>
      <p className="font-caption text-caption text-secondary pt-0.5">{note}</p>
    </div>
  );
}