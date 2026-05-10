export const CTA = () => (
  <section id="cta" className="section-pad relative border-t border-border/60 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.18),transparent_60%)]" />
    <div className="absolute inset-0 grid-bg opacity-20" />
    <div className="container relative">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-xs tracking-[0.25em] uppercase text-primary mb-5">Call to Study</div>
        <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6 leading-tight">
          A New Academic Frontier
        </h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
          Study the transformation of civilization through artificial intelligence, infrastructure
          systems, law, cybernetics, and future governance. The landing page and public news portal
          are openly accessible — the future academic systems remain conceptual prototypes under
          development.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#news"
            className="px-6 py-3 rounded-md bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-0.5"
          >
            Read the Public Portal
          </a>
          <a
            href="#research"
            className="px-6 py-3 rounded-md border border-border hover:border-primary/60 transition-all hover:bg-primary/5"
          >
            Explore Research Fields
          </a>
        </div>

        <div className="mt-14 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-card/40 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Public access available · Restricted systems remain conceptual
        </div>
      </div>
    </div>
  </section>
);
