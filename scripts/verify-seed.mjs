import pg from "pg";

const c = new pg.Client({
  connectionString: process.env.DIRECT_URL,
  ssl: { rejectUnauthorized: false },
});
await c.connect();

const { rows: a } = await c.query("select count(*)::int n from architects");
const { rows: p } = await c.query("select count(*)::int n from posts");
const { rows: an } = await c.query("select count(*)::int n from annotations");
const { rows: u } = await c.query("select count(*)::int n from archivist_users");

console.log("architects:", a[0].n, "| posts:", p[0].n, "| annotations:", an[0].n, "| archivist_users:", u[0].n);

const { rows: cimg } = await c.query(
  "select count(*)::int n from posts where cover_image_url is not null and cover_image_url <> ''"
);
const { rows: pimg } = await c.query(
  "select count(*)::int n from architects where portrait_url is not null and portrait_url <> ''"
);
console.log("posts WITH cover image:", cimg[0].n, "of", p[0].n);
console.log("architects WITH portrait:", pimg[0].n, "of", a[0].n);

const { rows: anames } = await c.query(
  "select a.name, count(x.id)::int n from architects a left join posts po on po.architect_id = a.id left join annotations x on x.post_id = po.id group by a.name order by a.name"
);
for (const r of anames) console.log(" -", r.name, "-> annotations:", r.n);

const { rows: posts } = await c.query(
  "select title, slug, read_time, category from posts order by published_at"
);
console.log("posts:", posts.map((x) => x.title).join(" | "));

await c.end();
