"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateArchitectProfile } from "@/lib/actions";

const inputCls =
  "w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors";

export function ProfileForm({
  architect,
}: {
  architect: {
    name: string;
    bio: string;
    curatorial_statement: string;
    era: string;
    location: string;
    portrait_url: string;
  };
}) {
  const [name, setName] = useState(architect.name);
  const [bio, setBio] = useState(architect.bio);
  const [curatorial, setCuratorial] = useState(architect.curatorial_statement);
  const [era, setEra] = useState(architect.era);
  const [location, setLocation] = useState(architect.location);
  const [portrait, setPortrait] = useState(architect.portrait_url);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await updateArchitectProfile({
        name: name.trim(),
        bio: bio.trim(),
        curatorial_statement: curatorial.trim(),
        era: era.trim(),
        location: location.trim(),
      });
      if (res.error) {
        setError(res.error);
        return;
      }
      setSaved(true);
      router.refresh();
    });
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-xs pt-space-sm">
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
          Profile
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
          Edit your dossier
        </h1>
        <p className="font-caption text-caption text-secondary">
          This content appears on your public architect page.
        </p>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container rounded p-space-sm font-caption text-caption">
          {error}
        </div>
      )}
      {saved && (
        <div className="bg-primary-fixed text-on-primary-fixed rounded p-space-sm font-caption text-caption">
          Dossier updated.
        </div>
      )}

      <form onSubmit={submit} className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary font-medium">Name</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary font-medium">Portrait URL</span>
          <input type="url" value={portrait} onChange={(e) => setPortrait(e.target.value)} placeholder="https://…" className={inputCls} />
        </label>
        <div className="grid grid-cols-2 gap-space-sm">
          <label className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-secondary font-medium">Era</span>
            <input type="text" value={era} onChange={(e) => setEra(e.target.value)} className={inputCls} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-secondary font-medium">Location</span>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} />
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary font-medium">Bio</span>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className={`${inputCls} resize-none`} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary font-medium">Curatorial statement</span>
          <textarea value={curatorial} onChange={(e) => setCuratorial(e.target.value)} rows={3} className={`${inputCls} resize-none`} />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="mt-1 w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm active:scale-[0.99] transition-all disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}