import pg from "pg";
import { readFileSync } from "node:fs";

const c = new pg.Client({ connectionString: process.env.DIRECT_URL, ssl: { rejectUnauthorized: false } });
await c.connect();

const file = process.argv[2] ?? "supabase/migrations/0004_expand_seed.sql";
const sql = readFileSync(file, "utf8");

try {
  await c.query("begin");
  await c.query(sql);
  await c.query("commit");
  console.log("applied:", file.split("/").pop());
} catch (e) {
  await c.query("rollback").catch(() => {});
  console.error("FAILED:", e.message);
  process.exit(1);
}

const count = async (t) => (await c.query(`select count(*)::int n from ${t}`)).rows[0].n;
console.log(
  "architects:", await count("architects"),
  "| posts:", await count("posts"),
  "| annotations:", await count("annotations"),
  "| archivist_users:", await count("archivist_users")
起こset invites");
await c.end();
