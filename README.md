# Architecture Dialogue

A dialogue publication: an interactive reading draft for issues of *Architecture
Dialogue*, a publication that stages the interpretive surrender of architectural
objects to ecological chance. This repository is the production app — a next-gen
migration of the original static stitch-remix HTML prototype into
**Next.js (App Router) + Supabase**.

## Run locally

```bash
npm install
npm run dev
```

Without Supabase keys the app runs on bundled demo content:

- `/` — the issue feed
- `/reader` — the reader inventory
- `/articles/[slug]` — long-form readings (e.g. `/articles/order-is-what-a-brick-wants-to-be`)
- `/architects` and `/architects/[slug]` — architect dossiers
- `/library` and `/colophon` — supporting pages
- `/auth` — architect sign in / sign up
- `/architect-portal` — architect self-service dashboard (new posts, editing, profile)

## Supabase setup

1. Create a project (or start a local stack: `supabase start`).
2. Run the migrations under `supabase/migrations/` in the SQL editor
   (`0001_schema.sql`, then `0002_seed.sql`).
3. Copy `.env.local.example` to `.env.local` and fill in your project URL and
   anon key.

```bash
cp .env.local.example .env.local
```

### RLS model

- `architects`: public read; insert/update/delete only when `id = auth.uid()`.
- `posts`: public read; write only when `architect_id = auth.uid()`.
- `annotations`: public read; write when `user_id = auth.uid()`.
- Sign-ups with metadata `{ "role": "architect" }` are promoted to the
  `architect` application claim via the `handle_new_user` trigger, and a
  matching `architects` row is created for them (id = their `auth.uid()`).

Seed rows use fixed UUIDs (matching the demo content) and are written with
`on conflict do nothing`.

## Commands

- `npm run dev` — dev server
- `npm run build` / `npm run start` — production build/serve
- `npm run lint` — eslint (`npx tsc --noEmit` for typecheck)