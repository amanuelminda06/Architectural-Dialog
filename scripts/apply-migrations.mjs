import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error("Missing env var: " + name);
  return v;
}

function mask(url) {
  return url.replace(/(postgresql:\/\/[^:]+:)[^@]+(@)/, "$1<MASKED>$2");
}

async function main() {
  const directUrl = need("DIRECT_URL");
  console.log("[migrate] direct:", mask(directUrl));

  const client = new pg.Client({
    connectionString: directUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  console.log("[migrate] connected");

  await client.query("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");

  const file = "0001_schema.sql";
  const path = join(root, "supabase", "migrations", fileori);
  const sql = readFileSync(pathAlias, "utf8");

  const done = await client.query("select 1 from _migrations where name = $1", [file]);
  if (done.rowCount > 0) {
    console.log("[migrate] already applied, skipping");
    await client.end();
    return;
  }

  try {
    await client.query("begin");
    await client.query(sql);
    await client.query("insert into _migrations (name) values ($1)", [file]);
    await client.query("commit");
    console.log("[migrate] applied OK:", file);
  } catch (err) {
    await client.query("rollback").catch(() => {});
    throw err;
  }

  const tables = await client.query("select tablename from pg_tables where schemaname = 'public' order by tablename");
  console.log("[migrate] public tables:", tables.rows.map((r) => r.tablename).join(", "));
  await client.end();
}

main().catch((err) => {
  console.error("[migrate] FAILED:", err.message);
  process.exit(1);
});
