import pg from "pg";
import { readFileSync } from "node:fs";

const c = new pg.Client({
  connectionString: process.env.DIRECT_URL,
  ssl: { rejectUnauthorized: false },
});
await c.connect();

const file = process.argv[2];
const sql = readFileSync(file, "utf8");

try {
  await c.query("begin");
  await c.query(sql);
  await c.query("commit");
  console.log("[apply] OK:", file.split("/").pop());
} catch (e) {
  await c.query("rollback").catch(() => {});
  console.error("[apply] FAILED:", e.message);
  process.exitCode = 1;
}

const q = async (t) => (await c.query("select count(*)::int n from " + t)).rows[0].n;
console.log(
  "architects:",
  await q("architects"),
  "| posts:",
  await q("posts"),
  "| annotations:",
  await q("annotations"),
  "| archivist_users:",
  await q("archivist_users")
apse();
