import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile-form";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) redirect("/architect-portal");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?next=/architect-portal/profile");

  const { data: architect } = await supabase
    .from("architects")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!architect) redirect("/architect-portal");

  return (
    <ProfileForm
      architect={{
        name: architect.name,
        bio: architect.bio || "",
        curatorial_statement: architect.curatorial_statement || "",
        era: architect.era || "",
        location: architect.location || "",
        portrait_url: architect.portrait_url || "",
      }}
    />
  );
}