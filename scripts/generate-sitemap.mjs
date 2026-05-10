// Generates dist/sitemap.xml and dist/robots.txt at build time.
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://singularity-news.github.io/University").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/news/post-westphalian-order.html", priority: "0.8", changefreq: "monthly", lastmod: "2026-05-02" },
];

const dist = resolve("dist");
if (!existsSync(dist)) mkdirSync(dist, { recursive: true });

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.loc}</loc>
    <lastmod>${r.lastmod || today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join("\n");

writeFileSync(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
);

writeFileSync(
  resolve(dist, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
);

console.log("✓ sitemap.xml and robots.txt generated for", SITE_URL);
