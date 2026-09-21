"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestArchitectApproval } from "@/lib/actions";

export function RequestApproval() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  const submit = () => {
    setSent(true);
    startTransition(async () => {
      await requestArchitectApproval();
      router.refresh();
    });
  };

  return (
    <button
      onClick={submit}
      disabled={pending || sent}
      className="w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm active:scale-[0.99] transition-all disabled:opacity-60"
    >
      {sent ? "Request sent — check back shortly" : "Request approval"}
    </button>
  );
}