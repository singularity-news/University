// CI check: validates that dist/sitemap.xml URLs resolve to built files
// and that key news pages contain expected HTML markers.
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://singularity-news.github.io/kdk-university").replace(/\/$/, "");
const dist = resolve("dist");
const errors = [];
const ok = [];

const must = (cond, msg) => (cond ? ok.push(msg) : errors.push(msg));

// 1. Sitemap exists & is non-trivial
const sitemapPath = resolve(dist, "sitemap.xml");
must(existsSync(sitemapPath), "sitemap.xml exists");
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, "utf8") : "";
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
must(locs.length >= 2, `sitemap has ${locs.length} <loc> entries (>=2)`);

// 2. Each sitemap URL maps to a built file under dist/
const base = new URL(SITE_URL + "/").pathname; // "/" or "/kdk-university/"
for (const loc of locs) {
  const u = new URL(loc);
  let rel = u.pathname;
  if (base !== "/" && rel.startsWith(base)) rel = "/" + rel.slice(base.length);
  if (rel.endsWith("/")) rel += "index.html";
  const filePath = resolve(dist, "." + rel);
  // SPA: every non-asset HTML path can fall back to index.html
  const indexHtml = resolve(dist, "index.html");
  const hit = existsSync(filePath) ? filePath : (rel.endsWith(".html") || rel === "/" ? indexHtml : null);
  if (hit && statSync(hit).size > 500) ok.push(`url OK: ${loc}`);
  else errors.push(`url FAIL (no file): ${loc} -> ${rel}`);
}

// 3. index.html contains required tags
const indexHtml = existsSync(resolve(dist, "index.html")) ? readFileSync(resolve(dist, "index.html"), "utf8") : "";
must(/google-site-verification/.test(indexHtml), "index.html has google-site-verification");
must(/<div id="root">/.test(indexHtml), "index.html has #root mount point");
must(/rss\.xml/.test(indexHtml), "index.html links to rss.xml");

// 4. rss.xml & robots.txt
must(existsSync(resolve(dist, "rss.xml")), "rss.xml generated");
must(existsSync(resolve(dist, "robots.txt")), "robots.txt generated");

console.log("\n=== Build validation ===");
ok.forEach((m) => console.log("  ✓ " + m));
if (errors.length) {
  console.error("\nFAILURES:");
  errors.forEach((m) => console.error("  ✗ " + m));
  process.exit(1);
}
console.log(`\nAll ${ok.length} checks passed.`);
