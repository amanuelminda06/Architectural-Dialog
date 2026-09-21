-- 0003_annotation_authors.sql
-- The seed for annotations was authored against the richer author-identity
-- model (user_id + author_name/initials/affiliation). The original 0001
-- migration left annotations at the minimum shape. This reconciliation makes
-- the live schema match what the seed (and the UI type `Annotation`) expect,
-- without reverting anything already applied.

alter table public.annotations
  add column if not exists user_id        uuid,
  add column if not exists author_name       text not null default '',
  add column if not exists author_initials   text not null default '',
  add column if not exists author_affiliation text not null default '';
