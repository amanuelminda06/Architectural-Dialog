-- Architecture Dialogue — schema, RLS, helpers
-- Run in the Supabase SQL editor or via `supabase db push`.

-- Architects double as author accounts: physical desktop accounts create a
-- row here with id = auth.uid(). Seed/demo dossiers use standalone ids.
create table public.architects (
  id uuid primary key,
  name text not null,
  slug text unique not null,
  portrait_url text,
  bio text,
  curatorial_statement text,
  era text,
  location text,
  keywords text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  architect_id uuid not null references public.architects(id) on delete cascade,
  title text not null,
  slug text unique not null,
  excerpt text,
  body jsonb not null default '[]',
  category text not null default 'Monograph',
  cover_image_url text,
  read_time text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.annotations (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  author_name text,
  author_initials text,
  author_affiliation text,
  body text not null,
  likes integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.architects enable row level security;
alter table public.posts enable row level security;
alter table public.annotations enable row level security;

-- Architects: profiles are public; accounts manage their own row.
create policy "architects_select" on public.architects
  for select using (true);

create policy "architects_insert_own" on public.architects
  for insert with check (id = auth.uid());

create policy "architects_update_own" on public.architects
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "architects_delete_own" on public.architects
  for delete using (id = auth.uid());

-- Posts: published writings are public; each architect edits only their own.
create policy "posts_select" on public.posts
  for select using (true);

create policy "posts_insert_own" on public.posts
  for insert with check (architect_id = auth.uid());

create policy "posts_update_own" on public.posts
  for update using (architect_id = auth.uid()) with check (architect_id = auth.uid());

create policy "posts_delete_own" on public.posts
  for delete using (architect_id = auth.uid());

-- Annotations: marginalia is public to read; authors edit their own.
create policy "annotations_select" on public.annotations
  for select using (true);

create policy "annotations_insert_own" on public.annotations
  for insert with check (user_id = auth.uid());

create policy "annotations_update_own" on public.annotations
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "annotations_delete_own" on public.annotations
  for delete using (user_id = auth.uid());

-- Like counter (RLS forbids direct writes by readers).
create or replace function public.increment_annotation_likes(p_annotation_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.annotations set likes = likes + 1 where id = p_annotation_id;
$$;

-- Grant the standard Supabase roles table access. Service role bypasses RLS.
grant select, insert, update, delete on table public.architects to anon, authenticated;
grant select, insert, update, delete on table public.posts to anon, authenticated;
grant select, insert, update, delete on table public.annotations to anon, authenticated;
grant execute on function public.increment_annotation_likes to anon, authenticated;

-- "architect" role signalling: promote signups whose metadata declares the
-- architect role into app_metadata custom claims (used for the portal role).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(new.raw_user_meta_data ->> 'role', '') = 'architect' then
    update auth.users
      set raw_app_meta_data = raw_app_meta_data || '{"is_architect": true}'::jsonb
      where id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();