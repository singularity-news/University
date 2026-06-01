// Generates dist/sitemap.xml (a sitemap index) plus per-section
// sitemaps (sitemap-static.xml, sitemap-news.xml), dist/robots.txt
// and dist/rss.xml at build time using absolute URLs so search
// engines and feed readers resolve them correctly on both
// GitHub Pages and Cloudflare Pages.
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://singularity-news.github.io/kdk-university").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);
const nowRfc822 = new Date().toUTCString();

const articles = JSON.parse(readFileSync(resolve("src/data/articles.json"), "utf8"));

const staticRoutes = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/juridical-singularity.html", priority: "0.9", changefreq: "monthly" },
  { loc: "/electric-technocracy.html", priority: "0.9", changefreq: "monthly" },
  { loc: "/research.html", priority: "0.9", changefreq: "monthly" },
  { loc: "/courses.html", priority: "0.9", changefreq: "monthly" },
  { loc: "/news.html", priority: "0.9", changefreq: "daily" },
];

const newsRoutes = articles.map((a) => ({
  loc: `/news/${a.slug}.html`,
  priority: "0.8",
  changefreq: "monthly",
  lastmod: a.date,
}));

const dist = resolve("dist");
if (!existsSync(dist)) mkdirSync(dist, { recursive: true });

const buildUrlset = (routes) => {
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
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

writeFileSync(resolve(dist, "sitemap-static.xml"), buildUrlset(staticRoutes));
writeFileSync(resolve(dist, "sitemap-news.xml"), buildUrlset(newsRoutes));

// Sitemap INDEX — points to each per-section sitemap with absolute URLs
writeFileSync(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-static.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-news.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`,
);

writeFileSync(
  resolve(dist, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-static.xml
Sitemap: ${SITE_URL}/sitemap-news.xml
`,
);

const xmlEscape = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const cdata = (s = "") => `<![CDATA[${String(s).replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;

const rssItems = articles
  .map((a) => {
    const link = `${SITE_URL}/news/${a.slug}.html`;
    const pubDate = new Date(a.date).toUTCString();
    const fullText = (a.body || []).join("\n\n").trim();
    const richDescription = fullText ? `${a.excerpt}\n\n${fullText}` : a.excerpt;
    const snippet = a.excerpt;
    return `    <item>
      <title>${xmlEscape(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${xmlEscape(a.category)}</category>
      <dc:creator>${xmlEscape(`Singularity University — ${a.author}`)}</dc:creator>
      <description>${cdata(snippet)}</description>
      <content:encoded>${cdata(
        `<p><strong>${a.title}</strong></p><p>${snippet}</p>${(a.body || [])
          .map((p) => `<p>${p}</p>`)
          .join("")}`,
      )}</content:encoded>
    </item>`;
  })
  .join("\n");

writeFileSync(
  resolve(dist, "rss.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Singularity University · Public News Portal</title>
    <link>${SITE_URL}/news.html</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Editorial, research and dispatches from Singularity University KdK Krzb. — Juridical Singularity, Electric Technocracy, AI Governance, infrastructure sovereignty and treaty systems.</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} Singularity University · KdK Krzb.</copyright>
    <lastBuildDate>${nowRfc822}</lastBuildDate>
    <ttl>60</ttl>
${rssItems}
  </channel>
</rss>
`,
);

console.log(
  `✓ sitemap index + ${staticRoutes.length} static + ${newsRoutes.length} news urls, robots.txt and rss.xml (${articles.length} items) generated for ${SITE_URL}`,
);
