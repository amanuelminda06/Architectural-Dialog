"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";
import { loginAdmin, logoutAdmin } from "@/lib/admin-actions";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await loginAdmin(password);
      if (res.error) setError(res.error);
      else router.refresh();
    });
  };

  return (
    <div className="w-full max-w-sm bg-surface-container-low rounded-lg p-space-lg flex flex-col gap-space-md">
      <div className="w-12 h-12 mx-auto rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
        <Icon name="admin_panel_settings" className="text-[24px]" />
      </div>
      <h1 className="font-headline-md text-headline-md text-on-surface text-center">
        Editorial Admin Console
      </h1>
      <p className="font-caption text-caption text-secondary text-center">
        Enter the editorial password to manage architect approvals and posts.
      </p>

      {error && (
        <div className="bg-error-container text-on-error-container rounded p-space-sm font-caption text-caption">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="flex flex-col gap-space-sm">
        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary font-medium">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="mt-1 w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm active:scale-[0.99] transition-all disabled:opacity-60"
        >
          {pending ? "Verifying…" : "Enter Console"}
        </button>
      </form>

      <p className="font-caption text-caption text-secondary text-center">
        Default password: <span className="font-mono">admin123</span> (override
        with the <span className="font-mono">ADMIN_PASSWORD</span> env var).
      </p>
    </div>
  );
}

export function AdminLogout() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await logoutAdmin();
          router.refresh();
        })
      }
      disabled={pending}
      className="flex items-center gap-1 text-secondary hover:text-error font-label-sm text-label-sm transition-colors disabled:opacity-50"
    >
      <Icon name="logout" className="text-[16px]" />
      Sign out
    </button>
  );
}