// Generates dist/sitemap.xml, dist/robots.txt and dist/rss.xml at build time
// using absolute URLs so search engines and feed readers resolve them correctly.
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://singularity-news.github.io/University").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);
const nowRfc822 = new Date().toUTCString();

const routes = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/news/post-westphalian-order.html", priority: "0.8", changefreq: "monthly", lastmod: "2026-05-02" },
];

const articles = [
  {
    title: "The Post-Westphalian Order: Treaty Succession in a Networked Age",
    link: "/news/post-westphalian-order.html",
    description:
      "Examining how legal continuity propagates through interconnected institutional architectures.",
    pubDate: new Date("2026-05-02").toUTCString(),
    category: "International Law",
  },
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

const xmlEscape = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const rssItems = articles
  .map(
    (a) => `    <item>
      <title>${xmlEscape(a.title)}</title>
      <link>${SITE_URL}${a.link}</link>
      <guid isPermaLink="true">${SITE_URL}${a.link}</guid>
      <pubDate>${a.pubDate}</pubDate>
      <category>${xmlEscape(a.category)}</category>
      <description>${xmlEscape(a.description)}</description>
    </item>`,
  )
  .join("\n");

writeFileSync(
  resolve(dist, "rss.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Singularity University · Public News Portal</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Editorial, research and dispatches from Singularity University KdK Krzb. — Juridical Singularity, Electric Technocracy, AI Governance.</description>
    <language>en</language>
    <lastBuildDate>${nowRfc822}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`,
);

console.log("✓ sitemap.xml, robots.txt and rss.xml generated for", SITE_URL);
