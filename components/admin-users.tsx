"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";
import {
  approveArchitect,
  unapproveArchitect,
  deleteAuthUserAdmin,
} from "@/lib/admin-actions";

export function AdminUsers({
  users,
}: {
  users: {
    id: string;
    email: string;
    name: string;
    confirmed: boolean;
    approved: boolean;
    created_at: string;
  }[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  const run = (id: string, action: () => Promise<{ error?: string }>) => {
    setBusyId(id);
    startTransition(async () => {
      const res = await action();
      if (res.error) alert(res.error);
      else router.refresh();
      setBusyId(null);
    });
  };

  if (users.length === 0) {
    return (
      <p className="font-caption text-caption text-secondary bg-surface-container-low rounded-lg p-space-md">
        No sign-ups yet. New architects appear here after they confirm their
        email.
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-outline-variant/30 bg-surface-container-low rounded-lg overflow-hidden">
      {users.map((u) => (
        <div
          key={u.id}
          className="p-space-md flex flex-col gap-2"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                {u.name}
              </span>
              <span className="font-meta-mono text-meta-mono text-secondary truncate">
                {u.email}
              </span>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <StatusChip ok={u.confirmed} label={u.confirmed ? "Email verified" : "Unconfirmed"} />
              <StatusChip ok={u.approved} label={u.approved ? "Approved" : "Pending"} />
            </div>
          </div>

          <div className="flex items-center gap-space-sm pt-1">
            {u.approved ? (
              <button
                onClick={() =>
                  run(
                    u.id,
                    () => unapproveArchitect(u.id)
                  )
                }
                disabled={pending && busyId === u.id}
                className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary hover:text-error transition-colors disabled:opacity-50"
              >
                <Icon name="person_remove" className="text-[16px]" />
                Revoke
              </button>
            ) : (
              <button
                onClick={() =>
                  run(u.id, () => approveArchitect(u.id))
                }
                disabled={pending && busyId === u.id}
                className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-medium disabled:opacity-50"
              >
                <Icon name="person_add" className="text-[16px]" />
                {pending && busyId === u.id ? "Approving…" : "Approve"}
              </button>
            )}
            <button
              onClick={() => {
                if (!confirm(`Delete ${u.email} and all their posts?`)) return;
                run(u.id, () => deleteAuthUserAdmin(u.id));
              }}
              disabled={pending && busyId === u.id}
              className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary hover:text-error transition-colors ml-auto disabled:opacity-50"
            >
              <Icon name="delete" className="text-[16px]" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusChip({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`font-meta-mono text-meta-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
        ok
          ? "bg-primary-fixed text-on-primary-fixed"
          : "bg-surface-variant text-on-surface-variant"
      }`}
    >
      {label}
    </span>
  );
}