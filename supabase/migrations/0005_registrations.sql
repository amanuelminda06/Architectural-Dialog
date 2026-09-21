-- 0005_registrations.sql — admin approval ledger
-- Tracks sign-ups so the /admin console can approve architects using only the
-- public anon key (no service-role secret needed). Approval grants portal
-- access by creating the architect's `architects` dossier row.

begin;

create table if not exists public.registrations (
  user_id            uuid primary key,
  name               text not null default '',
  email              text not null default '',
  status             text not null default 'pending',
  email_confirmed_at timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists registrations_status_idx
  on public.registrations(status);

commit;