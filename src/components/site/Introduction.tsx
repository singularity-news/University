import { SectionHeader } from "./SectionHeader";

const pillars = [
  { t: "Digital University", d: "Open academic structure for the planetary digital era." },
  { t: "Research Institute", d: "Doctrinal study of law, infrastructure and AI systems." },
  { t: "Policy Laboratory", d: "Treaty interoperability and governance prototypes." },
  { t: "Future Think Tank", d: "Civilizational architecture for post-national systems." },
];

export const Introduction = () => (
  <section id="about" className="section-pad relative">
    <div className="container">
      <SectionHeader
        eyebrow="Introduction"
        title="A New Academic Institution for a Networked Civilization"
        description="The Singularity University is an independent online institution dedicated to the exploration of future legal systems, global infrastructure governance, artificial intelligence, and the transformation of civilization in the age of interconnected digital networks."
      />

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            The university examines the transition from classical nation-state structures toward
            integrated global systems shaped by communication infrastructure, intelligent
            coordination technologies, and advanced AI-supported governance models.
          </p>
          <p>
            It combines law, technology, systems theory, infrastructure analysis, geopolitics, and
            futurism into a unified academic framework designed for the coming era of planetary
            digital civilization.
          </p>
        </div>
        <div className="relative rounded-xl border border-border bg-[var(--gradient-card)] p-8 glow-border">
          <div className="text-xs tracking-[0.2em] uppercase text-accent mb-4">Operating Modes</div>
          <ul className="space-y-4">
            {pillars.map((p, i) => (
              <li key={p.t} className="flex gap-4 items-start">
                <span className="text-primary font-mono text-sm mt-1">0{i + 1}</span>
                <div>
                  <div className="font-medium text-foreground">{p.t}</div>
                  <div className="text-sm text-muted-foreground">{p.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
