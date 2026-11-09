#!/usr/bin/env node
/**
 * Crawls the running site and verifies every internal link and in-page anchor.
 * Usage: BASE_URL=http://localhost:3000 node scripts/check-links.mjs
 */
const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const seen = new Map(); // path -> { status, ids }
const queue = ["/"];
const links = []; // { from, href }
const ext = new Set();

const getIds = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const res = await fetch(BASE + path, { redirect: "manual" });
  const html = res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
  seen.set(path, { status: res.status, ids: getIds(html) });
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (/^(tel:|mailto:)/.test(href)) { links.push({ from: path, href, kind: "contact" }); continue; }
    if (/^https?:\/\//.test(href)) { ext.add(href); continue; }
    links.push({ from: path, href, kind: "internal" });
    const target = href.split("#")[0] || path;
    if (target.startsWith("/") && !seen.has(target) && !queue.includes(target) && !/\.(svg|png|xml|txt)$/.test(target)) queue.push(target);
  }
}

let errors = 0;
for (const l of links.filter((l) => l.kind === "internal")) {
  const [p, hash] = l.href.split("#");
  const target = p || l.from;
  let entry = seen.get(target);
  if (!entry) { const r = await fetch(BASE + target); entry = { status: r.status, ids: new Set() }; seen.set(target, entry); }
  if (entry.status >= 400) { errors++; console.log(`✗ ${l.from} → ${l.href} (${entry.status})`); }
  else if (hash && !entry.ids.has(hash)) { errors++; console.log(`✗ ${l.from} → ${l.href} (missing #${hash})`); }
}
const bad = [...seen].filter(([, v]) => v.status >= 400);
const tel = links.filter((l) => l.kind === "contact");
console.log(`\nPages crawled: ${seen.size} | internal links checked: ${links.filter((l) => l.kind === "internal").length} | tel/mailto links: ${tel.length} | external links: ${ext.size}`);
for (const [p, v] of bad) console.log(`  ${v.status} ${p}`);
console.log("External links (verify manually):\n  " + [...ext].sort().join("\n  "));
console.log(errors ? `\n${errors} broken link(s).` : "\nNo broken internal links or anchors.");
process.exit(errors ? 1 : 0);
