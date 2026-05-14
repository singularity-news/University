const gptLinks = [
  { t: "World Succession Deed GPT", u: "https://chatgpt.com/g/g-69d82340e27081918e08803ce62e46e1-new-international-law-world-succession-deed-1400" },
  { t: "Electric Technocracy GPT", u: "https://chatgpt.com/g/g-69d8635591d48191adc315b8f2b8be32-electric-technocracy-a-new-form-of-government" },
  { t: "Juridical Singularity GPT", u: "https://chatgpt.com/g/g-69d95a89896081918fcb207e1665bf26-juridical-singularity-domestic-international-law" },
  { t: "A Complete Micronation Guide GPT", u: "https://chatgpt.com/g/g-69d98081a2c881919de667f21dd2063c-a-complete-micronation-guide" },
  { t: "Age of Transition & The Mental Singularity GPT", u: "https://chatgpt.com/g/g-69d99f78d6a081919cd29d8d33531852-age-of-transition-the-mental-singularity" },
  { t: "Kreuzbergkaserne Research GPT", u: "https://chatgpt.com/g/g-69e02f1a2f608191b164d972f49876f7-kreuzbergkaserne-research-gpt" },
];

const tools = [
  { t: "Specialized Search Engine (GSE)", u: "https://cse.google.com/cse?cx=86021a982e3a14848" },
  { t: "Future‑Self Qualification Test", u: "https://future-self-qualification-test.sticklight.app" },
];

export const Footer = () => (
  <footer className="border-t border-border/60 pt-20 pb-10 relative">
    <div className="container">
      <div className="grid md:grid-cols-4 gap-10 mb-14">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Singularity University logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <div>
              <div className="text-sm font-semibold">Singularity University</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">KdK Krzb.</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The Architecture of Future Civilization. An independent online institution.
          </p>
        </div>

        <div>
          <div className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">Institution</div>
          <ul className="space-y-2.5">
            <li><a href="/juridical-singularity.html" className="text-sm text-muted-foreground hover:text-primary transition-colors">Juridical Singularity</a></li>
            <li><a href="/electric-technocracy.html" className="text-sm text-muted-foreground hover:text-primary transition-colors">Electric Technocracy</a></li>
            <li><a href="/research.html" className="text-sm text-muted-foreground hover:text-primary transition-colors">Research</a></li>
            <li><a href="/news.html" className="text-sm text-muted-foreground hover:text-primary transition-colors">Public News</a></li>
            <li><a href="/rss.xml" className="text-sm text-muted-foreground hover:text-primary transition-colors">RSS Feed</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">GPT Assistants</div>
          <ul className="space-y-2.5">
            {gptLinks.map((g) => (
              <li key={g.u}>
                <a href={g.u} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  🗨️ {g.t}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">Tools & Search</div>
          <ul className="space-y-2.5">
            {tools.map((g) => (
              <li key={g.u}>
                <a href={g.u} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {g.t}
                </a>
              </li>
            ))}
            <li><a href="https://singularity-news.github.io/kdk-university/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub Pages Mirror</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Singularity University · KdK Krzb. All rights reserved.</div>
      </div>
    </div>
  </footer>
);
