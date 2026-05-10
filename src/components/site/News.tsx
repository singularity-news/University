import { useState } from "react";
import { Link } from "react-router-dom";
import { Rss, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TECH_NEWS, TECH_NEWS_GENERATED_AT } from "@/data/tech-news.generated";

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

const articles = [
  { c: "International Law", t: "The Post-Westphalian Order: Treaty Succession in a Networked Age", e: "Examining how legal continuity propagates through interconnected institutional architectures.", d: "May 02, 2026", url: "/news/post-westphalian-order.html" },
  { c: "AI & Governance", t: "Coordinating Artificial Intelligence Across Sovereign Boundaries", e: "Toward an interoperable framework for autonomous decision systems.", d: "Apr 28, 2026" },
  { c: "Infrastructure Systems", t: "Electrical Grids as Carriers of Legal Effect", e: "Energy networks become primary substrates of jurisdictional power.", d: "Apr 19, 2026" },
  { c: "Treaty Chains", t: "World Succession Deed 1400/98: A Structural Reading", e: "A doctrinal analysis of treaty interoperability and custodian inheritance.", d: "Apr 11, 2026" },
  { c: "Telecommunications", t: "Backbones, Borders and the New Sovereignty", e: "How fiber routes redraw the cartography of state authority.", d: "Apr 03, 2026" },
  { c: "Future Civilization", t: "Planetary Coordination and the Architecture of Continuity", e: "Designing institutions resilient across centuries of technological change.", d: "Mar 27, 2026" },
  { c: "Electric Technocracy", t: "Cybernetic Feedback as a Constitutional Principle", e: "From static codes to adaptive normative systems.", d: "Mar 18, 2026" },
  { c: "Research Papers", t: "Custodian Structures in Post-National Regimes", e: "A working paper on trustee bodies stewarding infrastructure rights.", d: "Mar 09, 2026" },
];

const formatDate = (s: string) => {
  const t = Date.parse(s);
  if (!t) return "";
  return new Date(t).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
};

export const News = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? articles : articles.filter((a) => a.c === active);
  return (
    <section id="news" className="section-pad relative border-t border-border/60">
      <div className="container">
        <SectionHeader
          eyebrow="Public News Portal"
          title="Editorial · Research · Dispatches"
          description="Open access publications from the university's editorial board, research desks and policy laboratory."
        />

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
          {filtered.map((a) => {
            const Inner = (
              <>
                <div className="aspect-[16/9] relative overflow-hidden bg-secondary">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-steel to-accent/20" />
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="absolute bottom-3 left-3 text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-background/70 border border-border backdrop-blur text-accent">
                    {a.c}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-muted-foreground mb-2">{a.d}</div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">
                    {a.t}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{a.e}</p>
                  <div className="mt-5 text-xs tracking-[0.2em] uppercase text-primary">Read article →</div>
                </div>
              </>
            );
            const cls =
              "card-hover group rounded-xl border border-border bg-card/50 backdrop-blur overflow-hidden flex flex-col";
            return a.url ? (
              <Link key={a.t} to={a.url} className={cls}>
                {Inner}
              </Link>
            ) : (
              <article key={a.t} className={cls}>
                {Inner}
              </article>
            );
          })}
        </div>

        {TECH_NEWS.length > 0 && (
          <div className="mt-24">
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
        )}
      </div>
    </section>
  );
};
