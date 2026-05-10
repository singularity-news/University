import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rss, ExternalLink, ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeader } from "@/components/site/SectionHeader";
import { TECH_NEWS, TECH_NEWS_GENERATED_AT } from "@/data/tech-news.generated";
import articlesData from "@/data/articles.json";

const TITLE = "Public News Portal · Editorial · Research · Dispatches | Singularity University";
const DESCRIPTION =
  "Open access publications from the Singularity University editorial board, research desks and policy laboratory — covering Juridical Singularity, Electric Technocracy, AI Governance, infrastructure sovereignty and treaty systems.";

const categories = [
  "All",
  "International Law",
  "AI & Governance",
  "Infrastructure Systems",
  "Treaty Chains",
  "Telecommunications",
  "Future Civilization",
  "Electric Technocracy",
  "Research Papers",
];

const formatDate = (s: string) => {
  const t = Date.parse(s);
  if (!t) return "";
  return new Date(t).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
};

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) || [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const NewsIndex = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? articlesData : articlesData.filter((a) => a.category === active);

  useEffect(() => {
    document.title = TITLE;
    setMeta('meta[name="description"]', "content", DESCRIPTION);
    setMeta('meta[property="og:title"]', "content", TITLE);
    setMeta('meta[property="og:description"]', "content", DESCRIPTION);
    setMeta('meta[property="og:type"]', "content", "website");
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="relative pt-32 pb-12 border-b border-border/60">
        <div className="container">
          <SectionHeader
            eyebrow="Public News Portal"
            title="Editorial · Research · Dispatches"
            description="Open access publications from the university's editorial board, research desks and policy laboratory."
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-full border transition-all ${
                  active === c
                    ? "border-primary bg-primary/10 text-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
            <a
              href="/rss.xml"
              className="ml-auto inline-flex items-center gap-2 text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-full border border-accent/60 text-accent hover:bg-accent/10 transition-all"
              aria-label="Subscribe to RSS feed"
            >
              <Rss className="h-3.5 w-3.5" /> Subscribe RSS
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a) => (
              <Link
                key={a.slug}
                to={`/news/${a.slug}.html`}
                className="card-hover group rounded-xl border border-border bg-card/50 backdrop-blur overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-secondary">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-steel to-accent/20" />
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="absolute bottom-3 left-3 text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-background/70 border border-border backdrop-blur text-accent">
                    {a.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-muted-foreground mb-2">{a.dateLabel}</div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{a.excerpt}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-primary">
                    Read article <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {TECH_NEWS.length > 0 && (
        <section className="section-pad border-t border-border/60">
          <div className="container">
            <SectionHeader
              eyebrow="Syndicated · Technology Wire"
              title="Global Technology Dispatches"
              description="Auto-aggregated from leading English technology publications via RSS. Refreshed on every deployment."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TECH_NEWS.map((a) => (
                <a
                  key={a.link}
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover group rounded-xl border border-border bg-card/50 backdrop-blur overflow-hidden flex flex-col p-6"
                >
                  <div className="flex items-center justify-between mb-3 text-[10px] tracking-[0.2em] uppercase">
                    <span className="text-accent">{a.source}</span>
                    <span className="text-muted-foreground">{formatDate(a.pubDate)}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">
                    {a.title}
                  </h3>
                  {a.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{a.description}</p>
                  )}
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-primary">
                    Read source <ExternalLink className="h-3 w-3" />
                  </div>
                </a>
              ))}
            </div>

            {TECH_NEWS_GENERATED_AT && (
              <div className="mt-8 text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                Wire updated · {new Date(TECH_NEWS_GENERATED_AT).toUTCString()}
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default NewsIndex;
