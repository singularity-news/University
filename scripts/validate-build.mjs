// CI check: validates that dist/sitemap.xml, robots.txt, rss.xml and the
// SPA meta-tag pipeline all use the correct absolute base path on both
// GitHub Pages (/kdk-university/) and Cloudflare Pages (root /).
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://singularity-news.github.io/kdk-university").replace(/\/$/, "");
const dist = resolve("dist");
const errors = [];
const ok = [];
const must = (cond, msg) => (cond ? ok.push(msg) : errors.push(msg));

// ---------- 1. sitemap.xml ----------
const sitemapPath = resolve(dist, "sitemap.xml");
must(existsSync(sitemapPath), "sitemap.xml exists");
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, "utf8") : "";
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
must(locs.length >= 2, `sitemap has ${locs.length} <loc> entries (>=2)`);

// every <loc> must be an absolute URL using SITE_URL
for (const loc of locs) {
  must(loc.startsWith(SITE_URL + "/") || loc === SITE_URL, `sitemap loc absolute & on SITE_URL: ${loc}`);
}

// each sitemap URL maps to a built file under dist/ (with SPA fallback)
const base = new URL(SITE_URL + "/").pathname; // "/" or "/kdk-university/"
for (const loc of locs) {
  const u = new URL(loc);
  let rel = u.pathname;
  if (base !== "/" && rel.startsWith(base)) rel = "/" + rel.slice(base.length);
  if (rel.endsWith("/")) rel += "index.html";
  const filePath = resolve(dist, "." + rel);
  const indexHtml = resolve(dist, "index.html");
  const hit = existsSync(filePath) ? filePath : (rel.endsWith(".html") || rel === "/" ? indexHtml : null);
  if (hit && statSync(hit).size > 500) ok.push(`url OK: ${loc}`);
  else errors.push(`url FAIL (no file): ${loc} -> ${rel}`);
}

// ---------- 2. robots.txt ----------
const robotsPath = resolve(dist, "robots.txt");
must(existsSync(robotsPath), "robots.txt generated");
const robots = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8") : "";
must(/^User-agent:\s*\*/m.test(robots), "robots.txt has User-agent: *");
must(/^Allow:\s*\//m.test(robots), "robots.txt allows all");
must(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), `robots.txt sitemap uses absolute SITE_URL`);

// ---------- 3. rss.xml ----------
const rssPath = resolve(dist, "rss.xml");
must(existsSync(rssPath), "rss.xml generated");
const rss = existsSync(rssPath) ? readFileSync(rssPath, "utf8") : "";
const links = [...rss.matchAll(/<link>([^<]+)<\/link>/g)].map((m) => m[1]);
const guids = [...rss.matchAll(/<guid[^>]*>([^<]+)<\/guid>/g)].map((m) => m[1]);
const atomSelf = (rss.match(/<atom:link[^>]*href="([^"]+)"/) || [])[1];
must(atomSelf === `${SITE_URL}/rss.xml`, `rss atom:self points to ${SITE_URL}/rss.xml (got ${atomSelf})`);
for (const l of links) must(l.startsWith(SITE_URL + "/"), `rss <link> absolute on SITE_URL: ${l}`);
for (const g of guids) must(g.startsWith(SITE_URL + "/"), `rss <guid> absolute on SITE_URL: ${g}`);

// ---------- 4. index.html base & required tags ----------
const indexHtml = existsSync(resolve(dist, "index.html")) ? readFileSync(resolve(dist, "index.html"), "utf8") : "";
must(/google-site-verification/.test(indexHtml), "index.html has google-site-verification");
must(/<div id="root">/.test(indexHtml), "index.html has #root mount point");
must(/rss\.xml/.test(indexHtml), "index.html links to rss.xml");

// every script/css href in index.html should resolve under base path
const expectedBase = base; // "/" or "/kdk-university/"
const assetRefs = [...indexHtml.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
const localAssets = assetRefs.filter((u) => u.startsWith("/") && !u.startsWith("//"));
const wrongBase = localAssets.filter((u) => expectedBase !== "/" && !u.startsWith(expectedBase) && !u.startsWith("/sitemap") && !u.startsWith("/robots") && !u.startsWith("/rss") && !u.startsWith("/_redirects"));
must(wrongBase.length === 0, `index.html assets respect base ${expectedBase} (offenders: ${wrongBase.join(", ") || "none"})`);

// ---------- 5. SPA meta-tag pipeline source check ----------
// We can't render the SPA at build time, but we can statically guarantee
// the meta-tag setters exist in the page sources so every News article and
// static page produces og:title / og:description / og:image / twitter:card
// using absolute SITE_URL.
const pagesToCheck = [
  "src/pages/NewsArticle.tsx",
  "src/pages/StaticPage.tsx",
  "src/pages/NewsIndex.tsx",
];
const requiredMeta = [
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[property="og:image"]',
  'meta[name="twitter:card"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
  'meta[name="twitter:image"]',
];
for (const p of pagesToCheck) {
  const src = existsSync(resolve(p)) ? readFileSync(resolve(p), "utf8") : "";
  must(src.includes("SITE_URL"), `${p} derives absolute SITE_URL`);
  must(/\$\{SITE_URL\}\/og-image\.png/.test(src), `${p} uses absolute og:image URL`);
  for (const m of requiredMeta) {
    must(src.includes(m), `${p} sets ${m}`);
  }
}
// Canonical only required on per-page (not list)
for (const p of ["src/pages/NewsArticle.tsx", "src/pages/StaticPage.tsx"]) {
  const src = readFileSync(resolve(p), "utf8");
  must(/rel="canonical"/.test(src) || /canonical\.rel\s*=\s*"canonical"/.test(src), `${p} sets canonical link`);
}

// ---------- report ----------
console.log("\n=== Build validation ===");
ok.forEach((m) => console.log("  ✓ " + m));
if (errors.length) {
  console.error("\nFAILURES:");
  errors.forEach((m) => console.error("  ✗ " + m));
  process.exit(1);
}
console.log(`\nAll ${ok.length} checks passed for SITE_URL=${SITE_URL}`);
