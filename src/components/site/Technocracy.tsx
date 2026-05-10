import { SectionHeader } from "./SectionHeader";

const layers = [
  { n: "01", t: "AI-Assisted Coordination", d: "Intelligent allocation of resources and decisions across planetary systems." },
  { n: "02", t: "Intelligent Infrastructure", d: "Self-regulating energy, data and logistics networks as governance carriers." },
  { n: "03", t: "Digital Democracy", d: "Verifiable participation and continuous consensus through cryptographic systems." },
  { n: "04", t: "Cybernetic Governance", d: "Feedback-driven institutions that adapt in real time to systemic signals." },
  { n: "05", t: "Post-Bureaucratic Administration", d: "Programmable rule execution replacing procedural legacy structures." },
];

export const Technocracy = () => (
  <section id="technocracy" className="section-pad relative border-t border-border/60">
    <div className="container">
      <SectionHeader
        eyebrow="Doctrine II"
        title="Electric Technocracy"
        description="A framework for future governance built on AI-assisted coordination, intelligent infrastructure, digital democracy, cybernetic feedback loops and post-bureaucratic administration."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {layers.map((l) => (
          <article
            key={l.n}
            className="card-hover relative rounded-xl border border-border bg-[var(--gradient-card)] p-7 overflow-hidden"
          >
            <div className="absolute -top-8 -right-6 text-7xl font-bold text-primary/10 select-none">
              {l.n}
            </div>
            <div className="relative">
              <div className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Layer {l.n}</div>
              <h3 className="text-xl font-semibold mb-3">{l.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{l.d}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
