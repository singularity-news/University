export const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Brand fallback hero image — also used as the social sharing card */}
      <img
        src={`${import.meta.env.BASE_URL}og-pic.png`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-30 pointer-events-none select-none"
      />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl pulse-glow" />

      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-4xl float-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Online University · KdK Krzb.
          </div>
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
            <span className="text-gradient">SINGULARITY</span>
            <br />
            <span className="text-gradient-accent">UNIVERSITY</span>
          </div>
          <p className="text-lg md:text-2xl text-silver/90 max-w-2xl mb-4 font-light" style={{ color: 'hsl(var(--silver))' }}>
            The Architecture of Future Civilization
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-10">
            An independent digital institution at the intersection of law, technology, infrastructure
            and intelligence — defining the academic frontier of the post-national era.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#about"
              className="px-6 py-3 rounded-md bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-0.5"
            >
              Explore the University
            </a>
            <a
              href="#news"
              className="px-6 py-3 rounded-md border border-border hover:border-primary/60 text-foreground transition-all duration-300 hover:bg-primary/5"
            >
              Public News Portal
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50 border border-border/50 rounded-lg overflow-hidden max-w-4xl">
          {[
            ["Doctrine", "Juridical Singularity"],
            ["Framework", "Electric Technocracy"],
            ["Domain", "Global Governance"],
            ["Mode", "Digital · Public"],
          ].map(([k, v]) => (
            <div key={k} className="bg-card/60 backdrop-blur p-5">
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{k}</div>
              <div className="text-sm md:text-base font-medium text-foreground">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
