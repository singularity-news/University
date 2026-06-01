import { useEffect } from "react";
import { ExternalLink, ArrowRight, BookOpen, GraduationCap, Scale, BrainCircuit, Network, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ShareButtons } from "@/components/site/ShareButtons";
import { BackToTop } from "@/components/site/BackToTop";
import { SectionHeader } from "@/components/site/SectionHeader";

const TITLE = "Free Singularity University Courses · International Law, Treaty Chains, AI Governance";
const DESCRIPTION =
  "Explore free Singularity University Courses on New International Law, Treaty Chains, Notary Custodian systems, Juridical Singularity, Electric Technocracy, AI governance, treaty interoperability, digital sovereignty, and global legal transformation in the Age of Transition.";
const KEYWORDS =
  "Singularity University Courses, New International Law, Treaty Chains, Juridical Singularity, Electric Technocracy, Notary Custodian, Treaty Interoperability, AI Governance, Digital Sovereignty, International Law, Customary International Law, NATO SOFA, UN Treaty Systems, Infrastructure Governance, Global Governance, Direct Digital Democracy, Treaty Succession, Telecommunications Law, Age of Transition, Legal Singularity";
const PATH = "/courses.html";

const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "")
  || (typeof window !== "undefined" ? window.location.origin : "");

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) || [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const topics = [
  { i: Scale, t: "New International Law", d: "Modern international law evolving through treaty chains, supplementary agreements, institutional interoperability, customary international law, and sovereign contractual freedom." },
  { i: Network, t: "Treaty Chains & Supplementary Instruments", d: "How treaties interact dynamically across NATO, UN, ITU, telecommunications, infrastructure, and Host Nation Support systems." },
  { i: ShieldCheck, t: "Notary Custodian Systems", d: "The role of neutral third-party custodians preserving treaty continuity, digital archives, technical annexes, infrastructure agreements, and interoperable legal systems." },
  { i: BookOpen, t: "Juridical Singularity", d: "The theory that interconnected treaties, infrastructure, AI governance, and digital interoperability gradually consolidate fragmented legal systems into unified governance architectures." },
  { i: BrainCircuit, t: "Electric Technocracy", d: "Direct Digital Democracy, automated governance systems, AI-supported coordination, and infrastructure-based governance models for the post-scarcity era." },
  { i: GraduationCap, t: "Age of Transition", d: "Global transformation from industrial nation-state systems toward digitally interconnected governance structures driven by AI, telecommunications and planetary interoperability." },
];

const themes = [
  "Customary International Law",
  "Pacta Sunt Servanda",
  "Treaty Succession",
  "Institutional Interoperability",
  "AI Governance",
  "Telecommunications Systems",
  "Infrastructure Sovereignty",
  "Digital Identity Systems",
  "Automated Governance",
  "Global Legal Transformation",
];

const Courses = () => {
  useEffect(() => {
    const absoluteUrl = `${SITE_URL}${PATH}`;
    const ogImage = `${SITE_URL}/og-pic.png`;
    document.title = TITLE;
    setMeta('meta[name="description"]', "content", DESCRIPTION);
    setMeta('meta[name="keywords"]', "content", KEYWORDS);
    setMeta('meta[property="og:title"]', "content", TITLE);
    setMeta('meta[property="og:description"]', "content", DESCRIPTION);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", absoluteUrl);
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", TITLE);
    setMeta('meta[name="twitter:description"]', "content", DESCRIPTION);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = absoluteUrl;
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="relative pt-32 pb-12 border-b border-border/60">
        <div className="container max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary mb-6">
            <GraduationCap className="h-3.5 w-3.5" />
            Open Courses · 100% Free
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6">
            <span className="text-gradient">Singularity University Courses</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-foreground/90 leading-snug">
            Free Courses on the Future of International Law, Governance, and Digital Civilization
          </h2>
        </div>
      </section>

      <section className="section-pad">
        <div className="container max-w-4xl space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            Welcome to the central hub for free educational resources and university-level courses exploring the
            transformation of international law, governance systems, infrastructure sovereignty, and technological
            civilization in the Age of Transition.
          </p>
          <p>
            This platform provides open-access learning materials focused on emerging concepts such as Treaty Chains,
            Juridical Singularity, Electric Technocracy, AI Governance, Notary Custodian systems, and the evolution of
            interconnected global legal architectures.
          </p>
          <p>
            The courses combine international law, digital infrastructure theory, treaty interoperability, governance
            systems, telecommunications law, and post-national institutional models into one integrated educational
            framework.
          </p>
        </div>
      </section>

      <section className="section-pad border-t border-border/60">
        <div className="container">
          <SectionHeader eyebrow="Available Courses" title="Start Learning" description="Two open courses are currently available — one hosted on this platform, one external." />
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href={`${import.meta.env.BASE_URL}courses/treaty_chain/index.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover group rounded-xl border border-border bg-card/50 backdrop-blur p-7 flex flex-col"
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3">Course · Hosted</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">
                Treaty Chains, Supplementary Instruments, and the Transformability of International Law
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                Interactive lesson exploring how treaty chains, supplementary instruments and institutional
                interoperability shape the transformability of modern international law.
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-primary">
                Open course <ArrowRight className="h-3 w-3" />
              </div>
            </a>

            <a
              href="https://honen.com/share/QTUobGRldMIJSzlqHnveZfTUv9TMoAhC"
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover group rounded-xl border border-border bg-card/50 backdrop-blur p-7 flex flex-col"
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3">Course · External</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">
                Customary International Law, Sovereign Consent, and the Juridical Singularity
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                External free course examining the role of customary international law and sovereign consent in the
                emergence of the Juridical Singularity.
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-primary">
                Open course <ExternalLink className="h-3 w-3" />
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-border/60">
        <div className="container">
          <SectionHeader eyebrow="Topics Covered" title="Six Pillars of Study" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map(({ i: Icon, t, d }) => (
              <article key={t} className="card-hover group rounded-xl border border-border bg-card/50 backdrop-blur p-7">
                <div className="h-12 w-12 rounded-lg border border-primary/30 grid place-items-center mb-5 group-hover:border-accent/60 transition-colors">
                  <Icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-border/60">
        <div className="container max-w-4xl space-y-10">
          <div>
            <SectionHeader eyebrow="Free Educational Resources" title="A Central Access Point" />
            <p className="text-muted-foreground leading-relaxed mb-4">
              This website acts as a central access point linking to:
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-foreground/85 list-disc pl-5">
              <li>Free online courses</li>
              <li>Lecture modules</li>
              <li>Legal working papers</li>
              <li>Research archives</li>
              <li>Treaty analyses</li>
              <li>AI governance studies</li>
              <li>Telecommunications law materials</li>
              <li>Digital governance frameworks</li>
              <li>Interdisciplinary educational projects</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-5">
              The goal is to make advanced international-law and governance education freely accessible worldwide.
            </p>
          </div>

          <div>
            <SectionHeader eyebrow="Academic Orientation" title="Who the Materials Are Designed For" />
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-foreground/85 list-disc pl-5">
              <li>University students</li>
              <li>Legal scholars</li>
              <li>Governance researchers</li>
              <li>Political scientists</li>
              <li>AI ethics specialists</li>
              <li>Infrastructure analysts</li>
              <li>Independent researchers</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-5">
              All materials are presented in formal academic English with structured doctrinal analysis, historical
              context, and interdisciplinary integration.
            </p>
          </div>

          <div>
            <SectionHeader eyebrow="Central Research Themes" title="Doctrinal Coordinates" />
            <div className="flex flex-wrap gap-2">
              {themes.map((th) => (
                <span
                  key={th}
                  className="text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border border-border bg-card/50 text-foreground/80"
                >
                  {th}
                </span>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader eyebrow="Explore the Future of Governance" title="A Gateway into Emerging Systems" />
            <p className="text-muted-foreground leading-relaxed">
              The Singularity University Courses platform serves as an educational gateway into the rapidly evolving
              relationship between law, infrastructure, AI, sovereignty, and global governance in the 21st century.
            </p>
          </div>

          <ShareButtons url={PATH} title={TITLE} />
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
};

export default Courses;
