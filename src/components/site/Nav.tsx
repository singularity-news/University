import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#juridical", label: "Juridical Singularity" },
  { href: "#technocracy", label: "Electric Technocracy" },
  { href: "#research", label: "Research" },
  { href: "#news", label: "News" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/60" : ""
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 rounded-md border border-primary/40 grid place-items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20" />
            <span className="relative font-bold text-sm tracking-wider text-foreground">SU</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm md:text-base font-semibold tracking-tight">Singularity University</div>
            <div className="text-[10px] md:text-xs text-muted-foreground tracking-[0.18em] uppercase">KdK Krzb.</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#cta"
            className="text-sm px-4 py-2 rounded-md border border-primary/50 text-foreground hover:bg-primary/10 hover:shadow-[0_0_24px_hsl(var(--primary)/0.4)] transition-all"
          >
            Join the Frontier
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          className="lg:hidden text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <nav className="container py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
