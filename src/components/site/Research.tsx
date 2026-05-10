import { SectionHeader } from "./SectionHeader";
import { Link2, ServerCog, BrainCircuit, Scale, ShieldCheck } from "lucide-react";

const fields = [
  { i: Link2, t: "Treaty Chain Systems", d: "Interoperable treaty architectures forming continuous legal succession." },
  { i: ServerCog, t: "Infrastructure Sovereignty", d: "Control of physical and digital substrates as the new locus of statehood." },
  { i: BrainCircuit, t: "AI Governance", d: "Normative frameworks for autonomous systems and ASI coordination." },
  { i: Scale, t: "Global Jurisdiction", d: "Post-national legal regimes operating across networks and protocols." },
  { i: ShieldCheck, t: "Custodian Structures", d: "Trustee bodies stewarding inherited treaty and infrastructure rights." },
];

export const Research = () => (
  <section id="research" className="section-pad relative border-t border-border/60">
    <div className="container">
      <SectionHeader eyebrow="Research Fields" title="Five Domains of Inquiry" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {fields.map(({ i: Icon, t, d }) => (
          <article
            key={t}
            className="card-hover group rounded-xl border border-border bg-card/50 backdrop-blur p-7 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />
            <div className="relative">
              <div className="h-12 w-12 rounded-lg border border-primary/30 grid place-items-center mb-5 group-hover:border-accent/60 transition-colors">
                <Icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              <div className="mt-5 text-xs text-primary tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Read program →
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
