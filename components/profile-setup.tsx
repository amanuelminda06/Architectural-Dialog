"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createArchitectProfile } from "@/lib/actions";

export function ProfileSetup({ defaultName }: { defaultName: string }) {
  const [name, setName] = useState(defaultName || "");
  const [bio, setBio] = useState("");
  const [curatorial, setCuratorial] = useState("");
  const [era, setEra] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) {
      setError("Please provide a name to generate a slug.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const res = await createArchitectProfile({
        name,
        slug,
        bio,
        curatorial_statement: curatorial,
        era,
        location,
      });
      if (res.error) setError(res.error);
      else router.refresh();
    });
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-xs">
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
          Welcome, Architect
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
          Complete your dossier
        </h1>
        <p className="font-caption text-caption text-secondary">
          Your portal profile is also your public architect page. It is the
          first thing readers encounter before your monographs.
        </p>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container rounded p-space-sm font-caption text-caption">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
        <Label text="Full name">
          <Input value={name} onChange={setName} placeholder="Louis I. Kahn" required />
        </Label>
        <div className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary font-medium">
            Slug
          </span>
          <div className="bg-surface rounded p-2.5 border border-outline-variant font-meta-mono text-meta-mono text-secondary">
            /architects/{slug || "…"}
          </div>
        </div>
        <Label text="Era">
          <Input value={era} onChange={setEra} placeholder="1901–1974" />
        </Label>
        <Label text="Location">
          <Input value={location} onChange={setLocation} placeholder="Philadelphia, USA" />
        </Label>
        <Label text="Bio">
          <Textarea value={bio} onChange={setBio} placeholder="A short biography for the architects index." rows={3} />
        </Label>
        <Label text="Curatorial statement">
          <Textarea value={curatorial} onChange={setCuratorial} placeholder="A sentence or two on the soul of your practice." rows={3} />
        </Label>
        <button
          type="submit"
          disabled={pending}
          className="mt-1 w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm active:scale-[0.99] transition-all disabled:opacity-60"
        >
          {pending ? "Saving…" : "Create Portfolio"}
        </button>
      </form>
    </div>
  );
}

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-label-sm text-label-sm text-secondary font-medium">
        {text}
      </span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors"
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows || 3}
      className="w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors resize-none"
    />
  );
}