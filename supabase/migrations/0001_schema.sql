-- 0001_schema.sql — dossier data model (matches lib/types.ts)
-- Applied via `supabase db push`. RLS is added in 0002_rls.sql.

begin;

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- architects
-- ---------------------------------------------------------------------------
create table if not exists public.architects (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  portrait_url  text not null default '',
  bio           text not null default '',
  curatorial_statement text not null default '',
  era           text not null default '',
  location      text not null default '',
  keywords      text[] not null default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- posts  (body is a jsonb PostBlock[]; content plates use figure blocks)
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  excerpt         text not null default '',
  body            jsonb not null default '[]'::jsonb,
  category        text not null default '',
  read_time       text not null default '',
  published_at    text not null default '',
  cover_image_url text not null default '',
  architect_id    uuid references public.architects(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists posts_architect_idx on public.posts(architect_id);
create index if not exists posts_category_idx on public.posts(category);

-- ---------------------------------------------------------------------------
-- annotations  (marginalia on a post body)
-- ---------------------------------------------------------------------------
create table if not exists public.annotations (
  id                  uuid primary key default gen_random_uuid(),
  post_id             uuid not null references public.posts(id) on delete cascade,
  author_name         text not null,
  author_initials     text not null default '',
  author_affiliation  text not null default '',
  body                text not null,
  likes               integer not null default 0,
  created_at          timestamptz not null default now(),
  created_date_label  text not null default ''
);

create index if not exists annotations_post_idx on public.annotations(post_id);

-- ---------------------------------------------------------------------------
-- archivist_users  (portal authors; role 'portal-archivist')
-- ---------------------------------------------------------------------------
create table if not exists public.archivist_users (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  name       text not null default '',
  role       text not null default 'portal-archivist',
  avatar_url text not null default '',
  created_at timestamptz not null default now()
);

commit;
