import { SectionHeader } from "./SectionHeader";
import { GraduationCap, LayoutDashboard, Database, Library, Users, Lock } from "lucide-react";

const modules = [
  { i: GraduationCap, t: "Digital Classrooms", d: "Live seminars and recorded lecture archives." },
  { i: LayoutDashboard, t: "Governance Dashboards", d: "Real-time analytics on treaty and infrastructure flows." },
  { i: Database, t: "Treaty Databases", d: "Indexed corpora of international legal instruments." },
  { i: Library, t: "Academic Archives", d: "Historical, doctrinal and policy literature." },
  { i: Users, t: "Collaborative Research", d: "Distributed working groups across research desks." },
];

export const Campus = () => (
  <section id="campus" className="section-pad relative border-t border-border/60">
    <div className="container">
      <SectionHeader
        eyebrow="Future Academic Platform"
        title="Conceptual Campus Mockup"
        description="A visual preview of the future academic environment. The restricted academic platform is currently non-operational — this section is a conceptual mockup only and represents no active restricted system."
      />

      <div className="rounded-2xl border border-border bg-[var(--gradient-card)] overflow-hidden glow-border">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/70 bg-background/50">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          </div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground flex items-center gap-2">
            <Lock className="h-3 w-3" /> campus.kdkkrzb · conceptual preview
          </div>
          <div className="text-[10px] text-muted-foreground hidden sm:block">v0.1 · mockup</div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] min-h-[480px]">
          <aside className="border-r border-border/70 p-5 bg-background/40 hidden lg:block">
            <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Navigation</div>
            <nav className="space-y-1.5">
              {["Overview", "Seminars", "Treaty Atlas", "Research Desks", "Library", "Custodian Index"].map((n, i) => (
                <div
                  key={n}
                  className={`text-sm px-3 py-2 rounded-md ${
                    i === 0 ? "bg-primary/10 text-foreground border border-primary/30" : "text-muted-foreground"
                  }`}
                >
                  {n}
                </div>
              ))}
            </nav>
          </aside>

          <div className="p-6 md:p-8 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                ["Active Programs", "12"],
                ["Treaty Records", "1,488"],
                ["Research Papers", "324"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border bg-card/60 p-4">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">{k}</div>
                  <div className="text-2xl font-semibold text-gradient-accent">{v}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {modules.map(({ i: Icon, t, d }) => (
                <div
                  key={t}
                  className="rounded-lg border border-border bg-card/40 p-5 hover:border-primary/40 transition-colors"
                >
                  <Icon className="h-5 w-5 text-primary mb-3" />
                  <div className="font-medium mb-1">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-xs text-muted-foreground flex items-start gap-3">
              <Lock className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              <span>
                Currently non-operational. No restricted academic systems are active. This interface
                is a conceptual mockup illustrating the future structure of the platform.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
