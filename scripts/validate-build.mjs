// CI check: validates that dist/sitemap.xml (sitemap index) plus the
// per-section sitemaps, robots.txt, rss.xml and the SPA meta-tag /
// JSON-LD pipeline all use the correct absolute base path on both
// GitHub Pages (/kdk-university/) and Cloudflare Pages (root /).
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://singularity-news.github.io/kdk-university").replace(/\/$/, "");
const dist = resolve("dist");
const errors = [];
const ok = [];
const must = (cond, msg) => (cond ? ok.push(msg) : errors.push(msg));

const isAbsoluteOnSite = (u) => u === SITE_URL || u.startsWith(SITE_URL + "/");

// ---------- 1. sitemap.xml — must be a sitemap INDEX ----------
const sitemapPath = resolve(dist, "sitemap.xml");
must(existsSync(sitemapPath), "sitemap.xml exists");
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, "utf8") : "";
must(/<sitemapindex/.test(sitemap), "sitemap.xml is a <sitemapindex>");
const indexLocs = [...sitemap.matchAll(/<sitemap>[\s\S]*?<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
must(indexLocs.length >= 2, `sitemap index lists ${indexLocs.length} child sitemaps (>=2)`);
for (const loc of indexLocs) must(isAbsoluteOnSite(loc), `sitemap index <loc> absolute on SITE_URL: ${loc}`);

// ---------- 2. per-section sitemaps ----------
const sectionFiles = ["sitemap-static.xml", "sitemap-news.xml"];
const allLocs = [];
for (const f of sectionFiles) {
  const p = resolve(dist, f);
  must(existsSync(p), `${f} exists`);
  if (!existsSync(p)) continue;
  const xml = readFileSync(p, "utf8");
  must(/<urlset/.test(xml), `${f} is a <urlset>`);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  must(locs.length >= 1, `${f} has ${locs.length} <loc> entries (>=1)`);
  for (const loc of locs) must(isAbsoluteOnSite(loc), `${f} <loc> absolute on SITE_URL: ${loc}`);
  allLocs.push(...locs);
}

// each sitemap URL maps to a built file under dist/ (with SPA fallback)
const base = new URL(SITE_URL + "/").pathname; // "/" or "/kdk-university/"
for (const loc of allLocs) {
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

// ---------- 3. robots.txt ----------
const robotsPath = resolve(dist, "robots.txt");
must(existsSync(robotsPath), "robots.txt generated");
const robots = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8") : "";
must(/^User-agent:\s*\*/m.test(robots), "robots.txt has User-agent: *");
must(/^Allow:\s*\//m.test(robots), "robots.txt allows all");
must(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), `robots.txt sitemap uses absolute SITE_URL`);
for (const f of sectionFiles) {
  must(robots.includes(`Sitemap: ${SITE_URL}/${f}`), `robots.txt advertises ${f}`);
}

// ---------- 4. rss.xml ----------
const rssPath = resolve(dist, "rss.xml");
must(existsSync(rssPath), "rss.xml generated");
const rss = existsSync(rssPath) ? readFileSync(rssPath, "utf8") : "";
const links = [...rss.matchAll(/<link>([^<]+)<\/link>/g)].map((m) => m[1]);
const guids = [...rss.matchAll(/<guid[^>]*>([^<]+)<\/guid>/g)].map((m) => m[1]);
const atomSelf = (rss.match(/<atom:link[^>]*href="([^"]+)"/) || [])[1];
must(atomSelf === `${SITE_URL}/rss.xml`, `rss atom:self points to ${SITE_URL}/rss.xml (got ${atomSelf})`);
for (const l of links) must(isAbsoluteOnSite(l), `rss <link> absolute on SITE_URL: ${l}`);
for (const g of guids) must(isAbsoluteOnSite(g), `rss <guid> absolute on SITE_URL: ${g}`);

// ---------- 5. index.html base & required tags ----------
const indexHtml = existsSync(resolve(dist, "index.html")) ? readFileSync(resolve(dist, "index.html"), "utf8") : "";
must(/google-site-verification/.test(indexHtml), "index.html has google-site-verification");
must(/<div id="root">/.test(indexHtml), "index.html has #root mount point");
must(/rss\.xml/.test(indexHtml), "index.html links to rss.xml");
must(/og-pic\.png/.test(indexHtml), "index.html uses og-pic.png as social image");

// every script/css href in index.html should resolve under base path
const expectedBase = base; // "/" or "/kdk-university/"
const assetRefs = [...indexHtml.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
const localAssets = assetRefs.filter((u) => u.startsWith("/") && !u.startsWith("//"));
const wrongBase = localAssets.filter((u) => expectedBase !== "/" && !u.startsWith(expectedBase) && !u.startsWith("/sitemap") && !u.startsWith("/robots") && !u.startsWith("/rss") && !u.startsWith("/_redirects"));
must(wrongBase.length === 0, `index.html assets respect base ${expectedBase} (offenders: ${wrongBase.join(", ") || "none"})`);

// ---------- 6. SPA meta-tag pipeline source check ----------
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
  must(/\$\{SITE_URL\}\/og-pic\.png/.test(src), `${p} uses absolute og:image URL (og-pic.png)`);
  for (const m of requiredMeta) {
    must(src.includes(m), `${p} sets ${m}`);
  }
}
for (const p of ["src/pages/NewsArticle.tsx", "src/pages/StaticPage.tsx"]) {
  const src = readFileSync(resolve(p), "utf8");
  must(/rel="canonical"/.test(src) || /canonical\.rel\s*=\s*"canonical"/.test(src), `${p} sets canonical link`);
}

// ---------- 7. JSON-LD NewsArticle structured data ----------
const newsArticleSrc = readFileSync(resolve("src/pages/NewsArticle.tsx"), "utf8");
must(/application\/ld\+json/.test(newsArticleSrc), "NewsArticle.tsx injects application/ld+json");
must(/"@type":\s*"NewsArticle"/.test(newsArticleSrc), "NewsArticle.tsx JSON-LD uses @type NewsArticle");
const requiredJsonLdFields = ["headline", "description", "datePublished", "image", "author", "publisher", "mainEntityOfPage"];
for (const f of requiredJsonLdFields) {
  must(new RegExp(`\\b${f}:`).test(newsArticleSrc), `NewsArticle.tsx JSON-LD includes ${f}`);
}
// image must be derived from absolute SITE_URL
must(/image:\s*\[[^\]]*ogImage[^\]]*\]|image:\s*ogImage/.test(newsArticleSrc),
  "NewsArticle.tsx JSON-LD image uses absolute ogImage");

// validate articles.json content drives valid JSON-LD payloads
const articles = JSON.parse(readFileSync(resolve("src/data/articles.json"), "utf8"));
must(articles.length > 0, `articles.json has ${articles.length} entries`);
for (const a of articles) {
  must(typeof a.title === "string" && a.title.length > 0, `article ${a.slug}: headline (title) present`);
  must(typeof a.excerpt === "string" && a.excerpt.length > 0, `article ${a.slug}: description (excerpt) present`);
  must(typeof a.date === "string" && /^\d{4}-\d{2}-\d{2}/.test(a.date), `article ${a.slug}: datePublished is ISO date`);
}
// confirm the og-pic image is actually shipped to dist so absolute image URL resolves
const ogImageDist = resolve(dist, "og-pic.png");
must(existsSync(ogImageDist) && statSync(ogImageDist).size > 1000, "dist/og-pic.png exists for absolute JSON-LD image URL");

// ---------- report ----------
console.log("\n=== Build validation ===");
ok.forEach((m) => console.log("  ✓ " + m));
if (errors.length) {
  console.error("\nFAILURES:");
  errors.forEach((m) => console.error("  ✗ " + m));
  process.exit(1);
}
console.log(`\nAll ${ok.length} checks passed for SITE_URL=${SITE_URL}`);
