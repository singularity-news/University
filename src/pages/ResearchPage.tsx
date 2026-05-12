import { StaticPage } from "./StaticPage";

const publications = [
  {
    t: "AGE OF TRANSITION & THE MENTAL SINGULARITY",
    u: "https://doi.org/10.5281/zenodo.18735660",
    d: "A socio-legal analysis of the coming transition from Homo Sapiens to technologically integrated civilizations shaped by AI, BCI systems, and post-scarcity economics.",
  },
  {
    t: "The Next Civilization – Why Electric Technocracy Matters Now",
    u: "https://doi.org/10.5281/zenodo.18073084",
    d: "Explains why traditional political systems are reaching structural limits in the age of automation and intelligent systems.",
  },
  {
    t: "Foundations of Electric Technocracy",
    u: "https://doi.org/10.5281/zenodo.18028339",
    d: "Introduces the theoretical and legal foundations of Electric Technocracy as a new governance model for a united world.",
  },
  {
    t: "The Rise of the Electric Technocracy – Governance for a Post-Scarcity Society",
    u: "https://doi.org/10.5281/zenodo.18012036",
    d: "Explores AI-driven governance, machine taxation, and Universal Basic Income within future abundance economies.",
  },
  {
    t: "THE INEVITABLE ELECTRIC TECHNOCRACY – Why Traditional Governance No Longer Works",
    u: "https://doi.org/10.5281/zenodo.20041846",
    d: "Analyzes the systemic inefficiencies of party politics and proposes ASI-supported governance alternatives.",
  },
  {
    t: "Drittverwahrung von nationalen und internationalen Verträgen",
    u: "https://doi.org/10.5281/zenodo.18216674",
    d: "Examines treaty custody, sovereignty transfer structures, and international legal continuity.",
  },
  {
    t: "LEGAL SINGULARITY IN INTERNATIONAL LAW",
    u: "https://doi.org/10.5281/zenodo.18505843",
    d: "Defines the Juridical Singularity as the transition point from classical international law toward unified global legal structures.",
  },
];

const ResearchPage = () => (
  <StaticPage
    title="Research · Electric Technocracy & Juridical Singularity | Singularity University KdK Krzb."
    description="Open research on Artificial Superintelligence governance, post-scarcity economics, Direct Digital Democracy and the Juridical Singularity. Open access publications via Zenodo."
    path="/research.html"
    eyebrow="Research Center"
    heading="Research at Singularity University KdK Krzb."
  >
    <p>
      Singularity University KdK Krzb is one of the leading academic platforms for research into the
      future of governance, Artificial Superintelligence (ASI), post-scarcity economics, and the
      transformation of international law through the doctrine of the Juridical Singularity. The
      university supports open scientific collaboration through the global
      <strong> Electric Technocracy Research Community on Zenodo</strong>.
    </p>
    <p>
      The research focuses on how humanity transitions from industrial nation-state systems toward a
      technologically integrated civilization based on Direct Digital Democracy (DDD), automation,
      Universal Basic Income (UBI), and AI-supported governance.
    </p>

    <h2>Key Publications</h2>
    {publications.map((p) => (
      <div key={p.u} className="not-prose my-6 rounded-lg border border-border bg-card/40 p-5">
        <div className="text-[10px] tracking-[0.2em] uppercase text-accent mb-2">📖 Open Access · Zenodo</div>
        <h3 className="text-lg font-semibold mb-2">{p.t}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.d}</p>
        <a
          href={p.u}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-[0.2em] uppercase text-primary hover:underline break-all"
        >
          {p.u}
        </a>
      </div>
    ))}
  </StaticPage>
);

export default ResearchPage;
