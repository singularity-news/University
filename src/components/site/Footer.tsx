export const Footer = () => (
  <footer className="border-t border-border/60 pt-20 pb-10 relative">
    <div className="container">
      <div className="grid md:grid-cols-4 gap-10 mb-14">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-md border border-primary/40 grid place-items-center bg-gradient-to-br from-primary/20 to-accent/10">
              <span className="text-sm font-bold">SU</span>
            </div>
            <div>
              <div className="text-sm font-semibold">Singularity University</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">KdK Krzb.</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The Architecture of Future Civilization. An independent online institution.
          </p>
        </div>

        {[
          { h: "Institution", l: ["About", "Doctrine", "Research Fields", "Editorial Board"] },
          { h: "Publications", l: ["Public News", "Research Papers", "Working Drafts", "RSS Feed"] },
          { h: "Legal", l: ["Imprint", "Disclaimer", "Privacy Notice", "Editorial Policy"] },
        ].map((col) => (
          <div key={col.h}>
            <div className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">{col.h}</div>
            <ul className="space-y-2.5">
              {col.l.map((i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Singularity University · KdK Krzb. All rights reserved.</div>
        <div className="tracking-[0.2em] uppercase">Public landing · Conceptual prototype</div>
      </div>
    </div>
  </footer>
);
