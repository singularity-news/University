// Fetches English technology RSS feeds at build time and writes
// src/data/tech-news.generated.ts so all article texts are bundled
// directly into the SPA (immediate load, fully crawlable).
//
// CI-safe: never throws. Individual feed failures are logged but do
// NOT fail the build. If ALL feeds fail, a previous generated file
// is preserved (fallback) so the build keeps going.
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
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

const RETRIES = 2;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fetchOnce = async (feed) => {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(feed.url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SingularityUniversity-FeedFetcher/1.1; +https://singularity-news.github.io/kdk-university/)",
        Accept: "application/rss+xml,application/atom+xml,application/xml;q=0.9,text/xml;q=0.8,*/*;q=0.5",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
};

const fetchFeed = async (feed) => {
  const started = Date.now();
  for (let attempt = 1; attempt <= RETRIES + 1; attempt++) {
    try {
      const xml = await fetchOnce(feed);
      const items = parseItems(xml).map((i) => ({ ...i, source: feed.source }));
      console.log(`✓ ${feed.source.padEnd(22)} ${String(items.length).padStart(2)} items  (${Date.now() - started}ms, attempt ${attempt})`);
      return { ok: true, items, source: feed.source };
    } catch (err) {
      const last = attempt === RETRIES + 1;
      console.warn(`${last ? "✗" : "↻"} ${feed.source.padEnd(22)} attempt ${attempt}/${RETRIES + 1} failed — ${err.message}`);
      if (last) return { ok: false, items: [], source: feed.source, error: err.message };
      await sleep(500 * attempt);
    }
  }
  return { ok: false, items: [], source: feed.source };
};

console.log(`→ fetching ${FEEDS.length} RSS feeds (timeout ${TIMEOUT_MS}ms, ${RETRIES} retries)…`);
const results = await Promise.all(FEEDS.map(fetchFeed));
const ok = results.filter((r) => r.ok).length;
const failed = results.filter((r) => !r.ok);
const all = results.flatMap((r) => r.items);
all.sort((a, b) => (Date.parse(b.pubDate) || 0) - (Date.parse(a.pubDate) || 0));
const items = all.slice(0, TOTAL);

console.log(`→ summary: ${ok}/${FEEDS.length} feeds ok, ${items.length} items aggregated`);
if (failed.length) console.warn(`→ failed sources: ${failed.map((f) => f.source).join(", ")}`);

const target = resolve("src/data/tech-news.generated.ts");
mkdirSync(dirname(target), { recursive: true });

if (items.length === 0 && existsSync(target)) {
  console.warn("! all feeds failed — keeping previously generated tech-news.generated.ts as fallback");
  process.exit(0);
}

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
export const TECH_NEWS_SOURCES_OK = ${ok};
export const TECH_NEWS_SOURCES_TOTAL = ${FEEDS.length};
`;

writeFileSync(target, out);
console.log(`✓ tech-news.generated.ts written with ${items.length} items`);

