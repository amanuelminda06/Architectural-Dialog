import pg from "pg";
import { readFileSync } from "node:fs";

const target = process.env.DIRECT_URL;
const c = new pg.Client({
  connectionString: target,
  ssl: { rejectUnauthorized: false },
});
await c.connect();

const count = async (t) =>
  (await c.query(`select count(*)::int n from public.${t}`)).rows[0].n;

const seedPath = "supabase/migrations/0004_expand_seed.sql";
const sql = readFileSync(seedPath, "utf8");

console.log("[apply] target host:", new URL(target).hostname);
try {
  await c.query("begin");
  await c.query(sql);
  await c.query("commit");
  console.log("[apply] OK:", seedPath.split("/").pop());
} catch (e) {
  await c.query("rollback").catch(() => {});
  console.error("[apply] FAILED:", e.message);
  process.exit(1);
}

for (const t of ["architects", "posts", "annotations", "archivist_users"]) {
  console.log(`  ${t}:`, await count(t));
}
await c.end();
