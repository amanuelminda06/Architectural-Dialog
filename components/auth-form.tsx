"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
import { signInWithPassword, signUp } from "@/lib/actions";

export default function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      if (mode === "signin") {
        const res = await signInWithPassword(email, password);
        if (res.error) setError(res.error);
        else router.push("/architect-portal");
      } else {
        const res = await signUp({ email, password, name });
        if (res.error) setError(res.error);
        else if (res.needsConfirmation) {
          setCheckEmail(true);
          setError(null);
        } else {
          router.push("/architect-portal");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-margin">
      <div className="w-full max-w-sm bg-surface-container-low rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md">
        <div className="flex flex-col items-center gap-space-sm">
          <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
            <Icon name="architecture" className="text-[24px]" />
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface text-center">
            Architect Portal
          </h1>
          <p className="font-caption text-caption text-secondary text-center">
            {mode === "signin"
              ? "Sign in to manage your dossiers and writings."
              : "Create an account to begin publishing monographs."}
          </p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container rounded p-space-sm font-caption text-caption">
            {error}
          </div>
        )}

        {checkEmail ? (
          <div className="bg-surface-container-lowest rounded p-space-md flex flex-col items-center text-center gap-space-sm">
            <Icon name="mark_email_read" className="text-[28px] text-primary" />
            <p className="font-body-base text-body-base text-on-surface-variant">
              Almost done — please check your email and finish the setup. We
              sent a confirmation link to{" "}
              <span className="text-on-surface font-medium">{email}</span>.
            </p>
            <button
              onClick={() => {
                setCheckEmail(false);
                setMode("signin");
                setError(null);
              }}
              className="mt-1 text-primary font-label-md text-label-md underline decoration-primary underline-offset-4 transition-colors hover:text-on-primary-container"
            >
              Go to Sign In
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={submit} className="flex flex-col gap-space-sm">
              {mode === "signup" && (
                <label className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-secondary font-medium">
                    Full Name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Louis I. Kahn"
                    className="w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors"
                  />
                </label>
              )}

              <label className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-secondary font-medium">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="architect@example.com"
                  className="w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-secondary font-medium">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors"
                />
              </label>

              <button
                type="submit"
                disabled={pending}
                className="mt-1 w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm active:scale-[0.99] transition-all disabled:opacity-60"
              >
                {pending
                  ? "Processing…"
                  : mode === "signin"
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            <button
              onClick={() => {
                setMode((m) => (m === "signin" ? "signup" : "signin"));
                setError(null);
              }}
              className="text-center font-label-sm text-label-sm text-primary hover:text-on-primary-container transition-colors"
            >
              {mode === "signin"
                ? "New architect? Create an account"
                : "Already an architect? Sign in"}
            </button>
          </>
        )}

        <div className="text-center">
          <a
            href="/"
            className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors"
          >
            ← Return to public folio
          </a>
        </div>
      </div>
    </div>
  );
}