import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home } from "lucide-react";

const links = [
  { href: "/", label: "Home", route: true, icon: Home },
  { href: "/juridical-singularity.html", label: "Juridical Singularity", route: true },
  { href: "/electric-technocracy.html", label: "Electric Technocracy", route: true },
  { href: "/research.html", label: "Research", route: true },
  { href: "/courses.html", label: "Courses", route: true },
  { href: "/news.html", label: "News", route: true },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const wrapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const delta = y - lastY.current;
      if (y > 120 && delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click outside closes mobile menu
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={wrapRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/60" : ""
      } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Singularity University — Home">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Singularity University logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain drop-shadow-[0_0_18px_hsl(var(--primary)/0.35)] transition-transform group-hover:scale-105"
          />
          <div className="leading-tight">
            <div className="text-sm md:text-base font-semibold tracking-tight">Singularity University</div>
            <div className="text-[10px] md:text-xs text-muted-foreground tracking-[0.18em] uppercase">KdK Krzb.</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group inline-flex items-center gap-1.5"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-accent group-hover:w-full transition-all duration-300" />
              </Link>
            );
          })}
          <a
            href="/#cta"
            className="text-sm px-4 py-2 rounded-md border border-primary/50 text-foreground hover:bg-primary/10 hover:shadow-[0_0_24px_hsl(var(--primary)/0.4)] transition-all"
          >
            Join the Frontier
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="lg:hidden text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <nav className="container py-6 flex flex-col gap-4">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
