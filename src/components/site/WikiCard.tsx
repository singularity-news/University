import { ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export const WikiCard = () => (
  <section id="wiki" className="section-pad border-t border-border/60">
    <div className="container max-w-5xl">
      <SectionHeader
        eyebrow="Knowledge Base"
        title="Singularity University Wiki"
        description="The companion encyclopedia — doctrine, treaty annexes, glossaries and the working vocabulary of the Age of Transition."
      />
      <a
        href="https://singularity-news.github.io/wiki"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the Singularity University Wiki"
        className="card-hover group grid md:grid-cols-[260px_1fr] gap-8 items-center rounded-2xl border border-border bg-card/50 backdrop-blur p-8 md:p-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.18),transparent_60%)] pointer-events-none" />
        <div className="relative flex justify-center md:justify-start">
          <img
            src={`${import.meta.env.BASE_URL}wiki-logo.png`}
            alt="Singularity University Wiki emblem"
            width={220}
            height={220}
            className="h-44 w-44 md:h-52 md:w-52 object-contain drop-shadow-[0_0_30px_hsl(var(--primary)/0.35)] transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="relative">
          <div className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3">External · Wiki</div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-3 group-hover:text-primary transition-colors">
            Singularity University Wiki
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-5">
            Browse the open knowledge base: definitions, treaty maps, doctrinal articles
            and curated references supporting every course and research desk.
          </p>
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-primary">
            Open Wiki <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </div>
      </a>
    </div>
  </section>
);
