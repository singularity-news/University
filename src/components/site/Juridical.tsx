import { SectionHeader } from "./SectionHeader";
import { Network, Cable, Cpu, Globe2, Radio, Zap, Cloud, Fingerprint } from "lucide-react";

const items = [
  { i: Cable, t: "Telecommunications" },
  { i: Network, t: "Internet Backbones" },
  { i: Zap, t: "Electrical Grids" },
  { i: Fingerprint, t: "Digital Identity" },
  { i: Cloud, t: "Cloud Infrastructure" },
  { i: Cpu, t: "AI Coordination" },
  { i: Globe2, t: "Network Sovereignty" },
  { i: Radio, t: "Treaty Interoperability" },
];

export const Juridical = () => (
  <section id="juridical" className="section-pad relative border-t border-border/60">
    <div className="absolute inset-0 grid-bg opacity-20" />
    <div className="container relative">
      <SectionHeader
        eyebrow="Doctrine I"
        title="Juridical Singularity"
        description="The transformation point at which traditional international law evolves into interconnected legal-operational infrastructure systems — where treaties, networks, and computation converge into a single jurisdictional substrate."
      />

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            Classical jurisdictional boundaries dissolve as legal force is exercised through
            interoperable infrastructure: communication systems, energy networks, identity layers
            and cloud computation become carriers of binding legal effect.
          </p>
          <p>
            The <span className="text-foreground font-medium">World Succession Deed 1400/98</span>{" "}
            is studied as a major transition point — examined in relation to treaty
            interoperability, NATO and UN structural inheritance, telecommunications systems, and
            jurisdictional transformation across post-Westphalian regimes.
          </p>
          <div className="pt-4 border-l-2 border-primary/60 pl-5 text-sm">
            <div className="text-xs tracking-[0.2em] uppercase text-accent mb-1">Object of Study</div>
            <div className="text-foreground">World Succession Deed 1400/98 · Treaty Chains · Custodian Architecture</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {items.map(({ i: Icon, t }) => (
            <div
              key={t}
              className="card-hover group relative rounded-lg border border-border bg-card/60 backdrop-blur p-5"
            >
              <Icon className="h-5 w-5 text-primary mb-3 group-hover:text-accent transition-colors" />
              <div className="text-sm font-medium">{t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
