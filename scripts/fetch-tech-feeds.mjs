// Fetches English technology RSS feeds at build time and writes
// src/data/tech-news.generated.ts so all article texts are bundled
// directly into the SPA (immediate load, fully crawlable).
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";

const FEEDS = [
  { url: "https://www.wired.com/feed/rss", source: "WIRED" },
  { url: "https://www.zdnet.com/news/rss.xml", source: "ZDNet" },
  { url: "https://techcrunch.com/feed/", source: "TechCrunch" },
  { url: "https://www.theverge.com/rss/index.xml", source: "The Verge" },
  { url: "https://www.theregister.co.uk/headlines.atom", source: "The Register" },
  { url: "https://feeds.bloomberg.com/technology/news.rss", source: "Bloomberg Technology" },
  { url: "https://hnrss.org/frontpage", source: "Hacker News" },
  { url: "https://feeds.arstechnica.com/arstechnica/technology-lab", source: "Ars Technica" },
  { url: "https://www.technologyreview.com/feed/", source: "MIT Technology Review" },
];

const PER_FEED = 5;
const TOTAL = 32;
const TIMEOUT_MS = 8000;

const stripTags = (s = "") =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<\/(p|div|li|h[1-6]|br)>/gi, " ")
    .replace(/<br\s*\/?>(?!\s*<)/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/\s+/g, " ")
    .trim();

const trimToSentence = (s, max = 320) => {
  if (!s) return "";
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (lastStop > max * 0.6) return cut.slice(0, lastStop + 1).trim();
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim() + "…";
};

const pick = (xml, tag) => {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? stripTags(m[1]) : "";
};

const pickLink = (xml) => {
  const a = xml.match(/<link[^>]*href="([^"]+)"[^>]*\/?>/i);
  if (a) return a[1];
  const b = xml.match(/<link[^>]*>([^<]+)<\/link>/i);
  return b ? b[1].trim() : "";
};

const parseItems = (xml) => {
  const out = [];
  const re = /<(item|entry)[\s\S]*?<\/\1>/gi;
  let m;
  while ((m = re.exec(xml))) {
    const block = m[0];
    const title = pick(block, "title");
    const link = pickLink(block);
    const raw =
      pick(block, "content:encoded") ||
      pick(block, "content") ||
      pick(block, "description") ||
      pick(block, "summary") ||
      "";
    const description = trimToSentence(raw, 320);
    const pubDate = pick(block, "pubDate") || pick(block, "updated") || pick(block, "published") || "";
    if (title && link) out.push({ title: trimToSentence(title, 180), link, description, pubDate });
    if (out.length >= PER_FEED) break;
  }
  return out;
};

const fetchFeed = async (feed) => {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const res = await fetch(feed.url, {
      signal: ctrl.signal,
      headers: { "User-Agent": "SingularityUniversity-FeedFetcher/1.0", Accept: "application/rss+xml,application/xml,text/xml,*/*" },
    });
    clearTimeout(t);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    return parseItems(xml).map((i) => ({ ...i, source: feed.source }));
  } catch (err) {
    console.warn(`! feed failed: ${feed.source} (${feed.url}) — ${err.message}`);
    return [];
  }
};

const all = (await Promise.all(FEEDS.map(fetchFeed))).flat();
all.sort((a, b) => {
  const da = Date.parse(a.pubDate) || 0;
  const db = Date.parse(b.pubDate) || 0;
  return db - da;
});
const items = all.slice(0, TOTAL);

const out = `// AUTO-GENERATED FILE — do not edit by hand.
// Regenerated at build time by scripts/fetch-tech-feeds.mjs from public English RSS sources.
export type TechNewsItem = {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  description: string;
};

export const TECH_NEWS: TechNewsItem[] = ${JSON.stringify(items, null, 2)};
export const TECH_NEWS_GENERATED_AT = ${JSON.stringify(new Date().toISOString())};
`;

const target = resolve("src/data/tech-news.generated.ts");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, out);
console.log(`✓ tech-news.generated.ts written with ${items.length} items`);
