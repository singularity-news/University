import { Link } from "react-router-dom";
import { ArrowRight, Rss } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import articlesData from "@/data/articles.json";

export const News = () => {
  const featured = articlesData.slice(0, 3);
  return (
    <section id="news" className="section-pad relative border-t border-border/60">
      <div className="container">
        <SectionHeader
          eyebrow="Public News Portal"
          title="Editorial · Research · Dispatches"
          description="Open access publications from the university's editorial board, research desks and policy laboratory."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((a) => (
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

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/news.html"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary/50 text-foreground hover:bg-primary/10 hover:shadow-[0_0_24px_hsl(var(--primary)/0.4)] transition-all text-sm tracking-[0.18em] uppercase"
          >
            Open News Portal <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="/rss.xml"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-accent/60 text-accent hover:bg-accent/10 transition-all text-sm tracking-[0.18em] uppercase"
            aria-label="Subscribe to RSS feed"
          >
            <Rss className="h-4 w-4" /> Subscribe RSS
          </a>
        </div>
      </div>
    </section>
  );
};
